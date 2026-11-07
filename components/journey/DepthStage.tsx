'use client'

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { stops } from '@/lib/journey'

export type StageHandle = {
  setProgress: (index: number, local: number) => void
}

/**
 * Una foto, un clip, una cámara.
 *
 * La foto y su mapa de profundidad quedan como respaldo y como capa de paralaje.
 * Cuando el clip del tramo está listo, el scroll mueve su currentTime y sustituye
 * a la foto. Los clips se descargan como blob para que el seeking no dependa del
 * servidor y no haya saltos.
 */

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`

const FRAG = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uPhoto;
uniform sampler2D uDepth;
uniform vec2 uFit;
uniform vec2 uPan;
uniform float uZoom;
uniform float uRot;
uniform float uAmount;
uniform float uFocus;

mat2 rot(float a) {
  float c = cos(a), s = sin(a);
  return mat2(c, -s, s, c);
}

void main() {
  vec2 r = rot(vUv - 0.5, uRot);
  float centerX = mix(0.5, uFocus, step(uFit.x, 0.999));
  vec2 uv = vec2(r.x * uFit.x / uZoom + centerX, r.y * uFit.y / uZoom + 0.5);
  uv = clamp(uv, 0.002, 0.998);

  float d = texture2D(uDepth, uv).r;
  float near = 1.0 - d;

  vec2 off = uPan * near * uAmount;
  vec2 suv = clamp(uv + off, 0.002, 0.998);

  vec3 col = texture2D(uPhoto, suv).rgb;
  vec3 base = texture2D(uPhoto, uv).rgb;
  float edge = smoothstep(0.0, 0.045, min(min(suv.x, 1.0 - suv.x), min(suv.y, 1.0 - suv.y)));

  gl_FragColor = vec4(mix(base, col, edge), 1.0);
}
`

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh) ?? 'shader'
    gl.deleteShader(sh)
    throw new Error(log)
  }
  return sh
}

type Slot = { photo: WebGLTexture; depth: WebGLTexture; done: number }
type MediaState = {
  state: 'idle' | 'loading' | 'ready' | 'error'
  url?: string
  pending?: number | null
}

const DepthStage = forwardRef<StageHandle>(function DepthStage(_props, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const photoRefs = useRef<Array<HTMLImageElement | null>>([])
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const live = useRef({ index: 0, local: 0 })
  const setProgressRef = useRef<(index: number, local: number) => void>(() => {})

  useImperativeHandle(
    ref,
    () => ({
      setProgress: (index, local) => setProgressRef.current(index, local),
    }),
    [],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    const container = canvas?.parentElement
    if (!canvas || !container) return

    const gl = canvas.getContext('webgl', {
      antialias: false,
      alpha: true,
      premultipliedAlpha: false,
    })
    const slots = new Map<number, Slot>()
    const media: MediaState[] = stops.map(() => ({ state: 'idle', pending: null }))
    const controllers: AbortController[] = []
    const pendingSeeks = new Array<number | null>(stops.length).fill(null)
    const canWebm = document.createElement('video').canPlayType('video/webm; codecs="vp9"') !== ''
    let current = -1
    let disposed = false
    let glOk = false
    let prog: WebGLProgram | null = null
    let uniforms: Record<string, WebGLUniformLocation | null> = {}
    let prefetchTimer: ReturnType<typeof setTimeout> | null = null

    const draw = () => {
      if (!glOk || !gl) return
      const { index, local } = live.current
      const slot = slots.get(index)
      if (!slot || slot.done < 2) return

      const stop = stops[index]
      const w = canvas.width || 1
      const h = canvas.height || 1
      const canvasAspect = w / h
      let fx = 1
      let fy = 1
      if (canvasAspect > stop.aspect) fy = stop.aspect / canvasAspect
      else fx = canvasAspect / stop.aspect

      const t = local * 2 - 1
      gl.uniform2f(uniforms.uFit, fx, fy)
      gl.uniform2f(uniforms.uPan, t * 0.92, t * 0.2)
      gl.uniform1f(uniforms.uZoom, 1.13 - 0.09 * local)
      gl.uniform1f(uniforms.uRot, t * 0.008)
      gl.uniform1f(uniforms.uAmount, 0.065)
      gl.uniform1f(uniforms.uFocus, stop.focus ?? 0.5)

      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, slot.photo)
      gl.activeTexture(gl.TEXTURE1)
      gl.bindTexture(gl.TEXTURE_2D, slot.depth)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const ensure = (i: number) => {
      if (!glOk || !gl || i < 0 || i >= stops.length) return
      if (slots.has(i)) return
      const stop = stops[i]
      const photo = gl.createTexture()!
      const depth = gl.createTexture()!
      const slot: Slot = { photo, depth, done: 0 }
      slots.set(i, slot)

      const blank = (tex: WebGLTexture) => {
        gl.bindTexture(gl.TEXTURE_2D, tex)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]))
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      }
      blank(photo)
      blank(depth)

      const load = (tex: WebGLTexture, url: string) => {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => {
          if (disposed) return
          gl.bindTexture(gl.TEXTURE_2D, tex)
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
          slot.done += 1
          if (slot.done === 2 && live.current.index === i) draw()
        }
        img.src = url
      }
      load(photo, `${stop.base}-1920.jpg`)
      load(depth, stop.depth)
    }

    const applyVisibility = (i: number) => {
      photoRefs.current.forEach((el, j) => {
        if (el) el.style.visibility = j === i ? 'visible' : 'hidden'
      })
      videoRefs.current.forEach((v, j) => {
        if (!v) return
        const on = j === i && media[j].state === 'ready'
        v.style.visibility = on ? 'visible' : 'hidden'
        v.style.opacity = on ? '1' : '0'
      })
      const hideCanvas = media[i].state === 'ready'
      canvas.style.opacity = hideCanvas ? '0' : '1'
      canvas.style.visibility = hideCanvas ? 'hidden' : 'visible'
    }

    const seek = (i: number, local: number, force = false) => {
      const v = videoRefs.current[i]
      if (!v || media[i].state !== 'ready') return
      if (!Number.isFinite(v.duration) || v.duration <= 0) return
      const end = Math.max(0, v.duration - 0.04)
      const t = Math.min(Math.max(local * v.duration, 0), end)
      if (v.seeking) {
        pendingSeeks[i] = t
        return
      }
      if (force || Math.abs(v.currentTime - t) > 0.02) v.currentTime = t
    }

    const load = (i: number) => {
      if (i < 0 || i >= stops.length) return
      if (media[i].state !== 'idle') return
      const v = videoRefs.current[i]
      if (!v) return
      media[i].state = 'loading'
      const controller = new AbortController()
      controllers.push(controller)

      const onMeta = () => {
        if (disposed) return
        // iOS no pinta los fotogramas buscados hasta que el vídeo se ha reproducido una vez.
        v.play().then(() => v.pause()).catch(() => {})
        media[i].state = 'ready'
        if (live.current.index === i) {
          seek(i, live.current.local, true)
          applyVisibility(i)
        }
        if (i === 0 || live.current.index === i) {
          if (prefetchTimer) clearTimeout(prefetchTimer)
          prefetchTimer = setTimeout(() => load(i + 1), 700)
        }
      }
      v.addEventListener('loadedmetadata', onMeta, { once: true })
      v.addEventListener('error', () => {
        if (disposed) return
        media[i].state = 'error'
        applyVisibility(live.current.index)
      }, { once: true })

      fetch(canWebm ? stops[i].video.webm : stops[i].video.mp4, { signal: controller.signal })
        .then((res) => {
          if (!res.ok) throw new Error(String(res.status))
          return res.blob()
        })
        .then((blob) => {
          if (disposed) return
          const url = URL.createObjectURL(blob)
          media[i].url = url
          v.src = url
          v.load()
        })
        .catch(() => {
          if (disposed) return
          media[i].state = 'error'
          applyVisibility(live.current.index)
        })
    }

    const setProgress = (index: number, local: number) => {
      const i = Math.max(0, Math.min(stops.length - 1, index))
      const l = Math.max(0, Math.min(1, local))
      live.current = { index: i, local: l }
      if (i !== current) {
        current = i
        ensure(i)
        ensure(Math.min(stops.length - 1, i + 1))
        load(i)
        applyVisibility(i)
      }
      seek(i, l)
      draw()
    }

    if (gl) {
      try {
        gl.clearColor(0, 0, 0, 0)
        gl.enable(gl.BLEND)
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
        prog = gl.createProgram()!
        gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT))
        gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG))
        gl.linkProgram(prog)
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error('link')
        gl.useProgram(prog)

        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
        const aPos = gl.getAttribLocation(prog, 'aPos')
        gl.enableVertexAttribArray(aPos)
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

        uniforms = {
          uPhoto: gl.getUniformLocation(prog, 'uPhoto'),
          uDepth: gl.getUniformLocation(prog, 'uDepth'),
          uFit: gl.getUniformLocation(prog, 'uFit'),
          uPan: gl.getUniformLocation(prog, 'uPan'),
          uZoom: gl.getUniformLocation(prog, 'uZoom'),
          uRot: gl.getUniformLocation(prog, 'uRot'),
          uAmount: gl.getUniformLocation(prog, 'uAmount'),
          uFocus: gl.getUniformLocation(prog, 'uFocus'),
        }
        gl.uniform1i(uniforms.uPhoto, 0)
        gl.uniform1i(uniforms.uDepth, 1)
        glOk = true
      } catch {
        glOk = false
      }
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.max(1, Math.round(container.clientWidth * dpr))
      const h = Math.max(1, Math.round(container.clientHeight * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        if (gl) gl.viewport(0, 0, w, h)
        draw()
      }
    }

    const ro = new ResizeObserver(resize)
    ro.observe(container)
    resize()

    videoRefs.current.forEach((v, i) => {
      if (!v) return
      v.addEventListener('seeked', () => {
        const t = pendingSeeks[i]
        if (t == null) return
        pendingSeeks[i] = null
        if (Math.abs(v.currentTime - t) > 0.02) v.currentTime = t
      })
    })

    setProgressRef.current = setProgress
    setProgress(0, 0)

    return () => {
      disposed = true
      if (prefetchTimer) clearTimeout(prefetchTimer)
      controllers.forEach((c) => c.abort())
      ro.disconnect()
      media.forEach((m) => {
        if (m.url) URL.revokeObjectURL(m.url)
      })
      videoRefs.current.forEach((v) => {
        if (!v) return
        v.removeAttribute('src')
        v.load()
      })
      if (gl) {
        slots.forEach((s) => {
          gl.deleteTexture(s.photo)
          gl.deleteTexture(s.depth)
        })
        if (prog) gl.deleteProgram(prog)
      }
      slots.clear()
    }
  }, [])

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#14120F]">
      {stops.map((stop, i) => (
        <picture key={`photo-${stop.id}`} className="absolute inset-0 block">
          <source
            type="image/avif"
            srcSet={`${stop.base}-1280.avif 1280w, ${stop.base}-1920.avif 1920w`}
            sizes="100vw"
          />
          <source
            type="image/webp"
            srcSet={`${stop.base}-1280.webp 1280w, ${stop.base}-1920.webp 1920w`}
            sizes="100vw"
          />
          <img
            ref={(el) => {
              photoRefs.current[i] = el
            }}
            src={`${stop.base}-1920.jpg`}
            alt=""
            aria-hidden
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              visibility: i === 0 ? 'visible' : 'hidden',
              objectPosition: `${(stop.focus ?? 0.5) * 100}% 50%`,
            }}
          />
        </picture>
      ))}

      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />

      {stops.map((stop, i) => (
        <video
          key={`video-${stop.id}`}
          ref={(el) => {
            videoRefs.current[i] = el
          }}
          muted
          playsInline
          preload="none"
          poster={stop.video.poster}
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            visibility: 'hidden',
            opacity: 0,
            objectPosition: `${(stop.focus ?? 0.5) * 100}% 50%`,
          }}
        />
      ))}
    </div>
  )
})

export default DepthStage

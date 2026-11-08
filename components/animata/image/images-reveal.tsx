"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

interface RevealImage {
  src: string;
  angle: string;
  alt: string;
}

interface CustomProps {
  index: number;
  angle: string;
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.2 },
  visible: (custom: CustomProps) => ({
    opacity: 1,
    scale: 1,
    rotate: custom.angle,
    transition: {
      delay: custom.index * 0.1,
      duration: 0.3,
      type: "spring" as const,
      stiffness: 150,
      damping: 20,
      mass: 0.5,
    },
  }),
};

export default function ImagesReveal({
  title,
  images,
}: {
  title: string;
  images: RevealImage[];
}) {
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    if (selected === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  const active = selected === null ? null : images[selected];

  return (
    <div>
      <h2 className="paseo-display text-center text-2xl font-semibold text-white">
        {title}
      </h2>
      <div className="relative my-10 flex flex-wrap justify-center gap-2 px-2 sm:ml-11 sm:flex-nowrap sm:gap-0 sm:px-0 md:ml-24">
        {images.map((image, i) => (
          <motion.img
            key={i}
            className="relative size-20 cursor-pointer rounded-2xl border-[6px] border-white object-cover shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:-ml-11 sm:size-24 md:-ml-24 md:size-44"
            src={image.src}
            alt={image.alt}
            role="button"
            tabIndex={0}
            aria-label={`Ampliar imagen: ${image.alt}`}
            onClick={() => setSelected(i)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setSelected(i);
              }
            }}
            custom={{ index: i, angle: image.angle }}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{
              scale: 1,
              rotate: "0deg",
              zIndex: 10,
              transition: { duration: 0.3, type: "spring", stiffness: 150, damping: 20 },
            }}
          />
        ))}
      </div>

      {typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {active && (
                <motion.div
                  key="inmueble-lightbox"
                  className="fixed inset-0 z-[80] flex items-center justify-center p-6"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      backgroundColor: "rgba(5, 5, 6, 0.55)",
                      backdropFilter: "blur(26px)",
                      WebkitBackdropFilter: "blur(26px)",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.42, 0, 0.58, 1] }}
                    onClick={() => setSelected(null)}
                  />
                  <motion.img
                    key={active.src}
                    src={active.src}
                    alt={active.alt}
                    className="relative max-h-[82vh] max-w-[92vw] cursor-zoom-out rounded-2xl border-[6px] border-white object-contain shadow-xl"
                    initial={{ opacity: 0, scale: 0.86 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ type: "spring", bounce: 0.28, duration: 0.7 }}
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelected(null);
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </div>
  );
}

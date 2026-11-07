# CINEMATIC RECONSTRUCTION OF `/paseo` — KUBRIKA

# 0. OBJECTIVE AND ENVIRONMENT

**Working directory:**

`C:\Users\maico\Documents\WS ASESORIA\website\`

**Development page:**

`http://localhost:3100/paseo`

COMPLETELY rebuild the animation experience of `/paseo`.

The result must be a cinematic real-estate experience controlled through scrolling, combining:

1. Three cinematic videos generated with Higgsfield.
2. Camera movement and depth effects in photographs.
3. Temporal synchronization through scroll scrubbing.
4. Professional visual direction using the referenced skills and tools.

**Do not build a conventional carousel with zoom effects.**

Higgsfield IS authorized and is part of this project. It will be used to generate exactly three audiovisual assets, making use of the user's available plan and credits.

**Mandatory audiovisual production:**

| Video | Scene | Duration |
|---|---|---|
| 1 | Living room | 5 seconds |
| 2 | Entering through the door | 5 seconds |
| 3 | Kitchen | 5 seconds |
| **Total** | **3 videos** | **15 seconds** |

Do not generate additional videos or increase their duration.

**Financial restriction:**

Before generating each video, you must inform the user how many credits it will cost. Do not consume credits without the user's explicit authorization for the stated cost.

Do not make additional purchases or subscribe to external services.

**Scope restriction:** work exclusively on `/paseo`. Do not modify `app/page.tsx`, the main landing page, or production.

---

# PHASE 1. PROJECT AUDIT

Before writing code, read the following files in their entirety:

### Documentation

- `C:\Users\maico\Documents\6PWALK\KUBRIKA-LABS\HERRAMIENTAS.md`
- `C:\Users\maico\Documents\6PWALK\KUBRIKA-LABS\WORKFLOW.md`
- `C:\Users\maico\Documents\6PWALK\KUBRIKA-LABS\strategy\ART-DIRECTION.md`

### Current implementation

- `app\paseo\page.tsx`
- `components\journey\`
- `lib\journey.ts`
- Available assets in `public/paseo`.

### Reference engines

Study the actual implementations:

- Arko: `midudev/mcp-higgsfield-landing` → `src/scripts/world.ts`
- `scroll-world` → `references/scrub-engine.js`

Identify how continuous progress, synchronization, camera movement, depth maps, and frame management work.

Do not assume their implementations are compatible with each other: analyze their mechanisms and adapt what is necessary.

Before implementation, identify which photographs correspond to each of the three scenes.

---

# PHASE 2. MANDATORY TOOLS AND SKILLS

You must study, install when necessary, and apply the following resources.

## 2.1. Tool repositories

**Repository 1 — AI Design Skills**

[https://github.com/elayadesign/ai-design-skills](https://github.com/elayadesign/ai-design-skills)

Use especially:

- `landing-page-design`

Review its documentation, instructions, dependencies, and installation procedure.

**Repository 2 — Scroll World**

[https://github.com/oso95/scroll-world](https://github.com/oso95/scroll-world)

Use:

- Skill `scroll-world`.
- Reference `references/scrub-engine.js`.

Study its architecture and apply its scroll-scrubbing mechanisms.

## 2.2. Additional mandatory skills

| Skill | Application |
|---|---|
| `frontend-design` | Visual direction, typography, composition, and aesthetic quality. |
| `ui-ux-pro-max` | UX, accessibility, responsive behavior, conversion, and design system. |
| `landing-page-design` | Page structure, intake, and page design rules. |
| `scroll-world` | Scrubbing, continuity, synchronization, and frame locking. |

Load all four skills in the CommandCode session:
```javascript
activate_skill(name="frontend-design")
activate_skill(name="ui-ux-pro-max")
activate_skill(name="landing-page-design")
activate_skill(name="scroll-world")
```

If any skill is unavailable, verify that it is missing before installing it.

Install missing skills:
```bash
npx skills add elayadesign/ai-design-skills --skill landing-page-design -g -y
npx skills add oso95/scroll-world -g -y
```

Do not reinstall existing skills.

**Important:** read and apply their actual instructions. Do not pretend to have activated them or replace their contents with general knowledge.

## 2.3. Design system

Run:
```bash
python "C:\Users\maico\.agents\skills\ui-ux-pro-max\scripts\search.py" "real estate editorial immersive" --design-system -p "WS Inmobiliaria"
```

Apply its results together with `ART-DIRECTION.md`.

---

# PHASE 3. AUDIOVISUAL PRODUCTION WITH HIGGSFIELD

Higgsfield is part of the production workflow.

## 3.1. Objective: exactly three videos

Generate exactly three cinematic clips, each **5 seconds** long, using the existing real-estate photographs.

The scenes will be:

**Video 1 — Living room**

- Cinematic camera movement inside the living room.
- Natural movement that allows the room's spaciousness and layout to be appreciated.
- Visual composition that highlights the space without altering its characteristics.

**Video 2 — Entering through the door**

- Camera movement simulating entry through the door and progression into the interior.
- It must convey a natural spatial transition.
- Preserve the actual geometry, dimensions, and layout.
- Prevent the camera from passing through walls, doors, or other elements.

**Video 3 — Kitchen**

- Cinematic camera movement inside the kitchen.
- Natural movement that allows its dimensions, layout, and finishes to be appreciated.
- Faithfully preserve all its elements.

All three videos must:

- Preserve the property's architecture and layout.
- Maintain proportions, materials, furniture, and structural elements.
- Simulate natural camera movements.
- Avoid distortions, invented objects, and structural changes.
- Maintain a high-quality editorial real-estate aesthetic.
- Be exactly 5 seconds long each.

Do not generate additional videos or credit-consuming test clips.

## 3.2. Models

Check which models are enabled in the Higgsfield Starter account.

Prioritize:

1. MiniMax H3, if available and if it supports the required duration.
2. Kling 3.0 at 720p, if available and if it supports the required duration.
3. Another alternative only if the previous models are unavailable and there is a technical justification.

Do not assume a model is included in the plan: verify its actual availability.

Compare available models considering:

- Architectural fidelity.
- Visual quality.
- Naturalness of camera movement.
- Ability to preserve elements from the original photograph.
- Resolution.
- Supported duration.
- Credit cost.

Select the model with the best balance of quality, fidelity, and cost.

## 3.3. MANDATORY CREDIT CONSUMPTION CONTROL

**This section is mandatory and takes priority over any automatic generation instruction.**

Before generating any video:

1. Check the current Higgsfield credit balance.
2. Verify the exact cost of the selected configuration.
3. Identify the model, resolution, duration, and generation parameters.
4. Calculate the individual cost of each video.
5. Calculate the estimated total cost of all three videos.
6. Report the balance that would remain after each generation.

Present the information using this structure:

| Scene | Model | Resolution | Duration | Credit cost |
|---|---|---|---|---|
| Living room | Selected model | Resolution | 5 s | X |
| Entering through the door | Selected model | Resolution | 5 s | X |
| Kitchen | Selected model | Resolution | 5 s | X |
| **Total** | | | **15 s** | **X credits** |

Include:

- Current balance.
- Estimated consumption per video.
- Total consumption.
- Estimated remaining balance.
- Any additional costs associated with the configuration.

**After presenting this information, STOP AND WAIT FOR MY AUTHORIZATION.**

Do not generate any of the three videos before receiving my explicit approval.

If the cost of a scene changes because of a different model, resolution, or configuration, inform me again and wait for authorization for the new cost.

If you cannot verify the exact cost, explicitly state that. Do not invent figures or present estimates as confirmed costs.

If the balance is insufficient to produce all three videos, report this and wait for instructions. Do not purchase credits or silently reduce the number of videos.

Authorization for one generation does not authorize additional expenses or configuration changes that increase its cost.

**Do not purchase additional credits.**

## 3.4. Generation execution

Once the costs have been authorized:

- Generate one video per scene.
- Respect the exact 5-second duration.
- Avoid redundant generations.
- Do not perform additional experiments.
- Check each result before proceeding to the next.
- Record the actual cost of each generation.
- Update the remaining balance after each video.

If a generation fails or requires another attempt that consumes credits, stop and report the cost of the new attempt before executing it.

## 3.5. Asset organization

Save the final videos in an organized structure within `public/paseo`, for example:
```text
public/
└── paseo/
    ├── images/
    ├── depth/
    └── videos/
        ├── sala/
        ├── entrada/
        └── cocina/
```

Adapt this structure to the existing assets. Do not duplicate files unnecessarily.

---

# PHASE 4. JOURNEY ARCHITECTURE

## 4.1. Cinematic stage

Build a full-screen stage that remains fixed throughout the journey.

- Visual height: `100svh`.
- `fixed` stage throughout the journey.
- Scroll track with a height equivalent to `N × 100vh`.
- Visibility limited to the corresponding section.
- Do not rely on `position: sticky` if container `overflow` prevents it from working.
- Do not allow cards or text blocks to obscure the images.

## 4.2. Continuous progress

Replicate the synchronization principle used by Arko and `scroll-world`.

- Convert scrolling into continuous progress `0 → N-1`.
- Interpolate progress across sections.
- Use Lenis to smooth scrolling.
- Use GSAP ScrollTrigger to synchronize the scene.
- The visitor controls the progression.

Do not use autoplay, loops, or playback independent of scrolling.

---

# PHASE 5. THE THREE STOPS

Preserve exactly this order:

1. Living room.
2. Entering through the door.
3. Kitchen.

Use the existing photographs and depth maps in `public/paseo` and `lib/journey.ts`.

Integrate one 5-second Higgsfield video into each stop.

Do not request new photographs.

Do not add additional stops.

The second stop must visually convey entry through the door and create a spatial connection with the property's interior experience.

---

# PHASE 6. VIDEO SYNCHRONIZATION AND MOTION

## 6.1. Scroll-controlled videos

Each of the three stops will have its own video.

When a stop has a video:
```javascript
video.currentTime = progress * video.duration;
```

Scrolling must control the video's playback time.

Do not use continuous playback through `video.play()`.

- Obtain the poster from the first frame of the MP4.
- Prioritize downloading the video for the current section.
- Then prepare the asset for the nearest section.
- Manage loading and storage through Blob when appropriate.
- Implement the `play()` / `pause()` initialization sequence required for seeking on iOS.

Progress must map correctly to each video's time interval, from 0 to 5 seconds.

Avoid jumps, freezes, and desynchronization between scrolling and video.

## 6.2. Photographs with depth

Existing photographs and depth maps must continue to be used as complementary visual assets and as fallbacks.

Implement:

- Panning.
- Dolly movement.
- Minimal rotation.
- Differential movement according to depth.

Reference:
```javascript
off = pan * (1 - depth) * amount;
```

Depth Anything maps use the convention that lighter values represent distant elements. Invert the convention when necessary.

Nearby objects must move more than distant ones.

## 6.3. Transitions

- Only one image or video visible at full opacity.
- Changes between stops must use hard cuts.
- No crossfades.
- No 50% blends.
- No white fades.
- No CSS zoom as a substitute for spatial movement.

If a video is unavailable, fall back to a photograph with depth-based parallax.

---

# PHASE 7. ACCESSIBILITY AND RESPONSIVE DESIGN

Detect `prefers-reduced-motion` and `saveData`.

When either is active:

- Display static photographs.
- Include an explicit button: **"Activate the animated journey"**.
- Do not permanently hide the animated experience.

Additionally:

- Respect keyboard focus.
- Maintain a minimum contrast ratio of 4.5:1.
- Adapt each stop's `focus` field to the mobile horizontal crop.
- Maintain natural touch scrolling.
- Avoid movements that make navigation difficult.

---

# PHASE 8. PERFORMANCE AND DEPENDENCIES

Targets:

- 60 FPS on desktop.
- At least 30 FPS on mobile.
- Load the asset for the current section and prepare the next one.
- Avoid unnecessary simultaneous downloads.
- Avoid recreating WebGL contexts during scrolling.
- Minimize expensive operations on the main thread.

Use GSAP, ScrollTrigger, and Lenis as appropriate.

Do not install Three.js or additional dependencies without a concrete technical justification.

---

# PHASE 9. MANDATORY VERIFICATION

Run:
```bash
npx tsc --noEmit
npm run build
```

Start the server:
```bash
NODE_ENV=production npx next start -p 3100
```

Check:

`http://localhost:3100/paseo`

### Acceptance checklist

- Exactly three stops are displayed.
- Stops appear in the correct order: Living room, Entering through the door, Kitchen.
- Exactly three videos have been generated.
- Each video is exactly 5 seconds long.
- The stage remains fixed while scrolling.
- Videos respond to scrolling and do not play independently.
- The second scene correctly conveys entering through the door.
- Photographs have perceptible depth-based movement.
- No white fades or blended transitions appear.
- No black or white blocks appear.
- The experience works on desktop and mobile.
- Reduced motion allows users to voluntarily activate animation.
- There are no TypeScript or compilation errors.
- Audiovisual assets are properly organized.
- Actual credit consumption is recorded per video.

If browser tools are available, take screenshots and test the entire journey, not just the initial page load.

Fix issues until the result is smooth and natural.

---

# PHASE 10. FINAL REPORT

Deliver:

1. Modified files.
2. Skills loaded, installed, and applied.
3. Repositories and technical references studied.
4. The three generated videos, with their corresponding scenes.
5. Model used for each video.
6. Resolution and duration of each video.
7. Actual individual generation cost.
8. Total credit consumption.
9. Remaining Higgsfield balance.
10. Implemented synchronization architecture.
11. Tests executed and their results.
12. Visual screenshots, if available.
13. Outstanding limitations.

Distinguish between passed, failed, and unexecuted tests.

Do not claim completion without having checked the actual journey in the browser.

---

# FINAL INSTRUCTION

Execute the work sequentially:

**Audit → Skills → Visual Direction → Audiovisual Plan → Cost Report → User Authorization → Generation of the Three Videos → Implementation → Integration → Testing → Report.**

Do not alter the main landing page or production.

**Generate exactly three videos, each five seconds long.**

**Before each generation, report the credit consumption and wait for explicit authorization.**

Do not purchase additional credits.

The final objective is to achieve a cinematic real-estate experience that is visually sophisticated, scroll-controlled, and features genuine spatial movement, combining three Higgsfield videos and depth-enabled photographs where appropriate.
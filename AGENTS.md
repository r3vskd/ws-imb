# AGENTS.md — WS INMOBILIARIA WEBSITE

## 1. PROJECT IDENTITY

You are working on the official website of **WS Asesoría Inmobiliaria**, a real-estate advisory and brokerage business based in Mérida, Yucatán, Mexico.

The website represents a professional real-estate operation serving Mérida, Progreso, Chicxulub, Chuburná, and the Yucatán coast.

Its digital presence must communicate:

- Professionalism and credibility.
- Real-estate expertise and local market knowledge.
- Clear property information.
- Trust, transparency, and accessibility.
- High-quality presentation of properties and developments.
- Effective lead generation and client communication.

Treat this as an established business website, not a generic landing-page experiment.

## 2. PRIMARY OBJECTIVE — COMPLETE WEBSITE REDESIGN

The website will undergo a comprehensive visual and UX redesign.

**Redesign the entire interface while preserving the existing website's information, routes, subpages, and functional capabilities.**

Before making changes:

1. Audit the complete repository.
2. Identify every existing route and subpage.
3. Inspect existing components, layouts, assets, integrations, forms, metadata, and navigation.
4. Identify all content and business information currently published.
5. Map dependencies between pages and shared components.
6. Establish a baseline of existing functionality.

### Non-negotiable preservation rules

- Do not delete existing pages or routes.
- Do not remove property listings, descriptions, images, or business information.
- Do not invent property details, prices, availability, certifications, testimonials, or business claims.
- Do not silently rewrite factual or legal information.
- Do not break existing forms, contact methods, tracking, SEO metadata, or integrations.
- Preserve existing URLs whenever possible.
- If a route must change, implement an appropriate redirect.
- Preserve existing functionality unless a documented technical reason justifies changing it.

**The design may change completely. The underlying information architecture and business information must remain intact.**

New components and page structures are encouraged when they improve the experience without compromising existing functionality.

## 3. MANDATORY DESIGN SKILLS

Use the following skills as the primary design and implementation standards.

| Skill | Responsibility |
|---|---|
| `frontend-design` | Visual direction, typography, layout, composition, implementation quality. |
| `ui-ux-pro-max` | UX architecture, accessibility, responsive behavior, conversion, design systems. |
| `landing-page-design` | Landing-page structure, content hierarchy, visual storytelling, conversion. |
| `scroll-world` | Scroll-driven experiences, animation synchronization, cinematic interactions when appropriate. |
| `security-audit` | Cloudflare infrastructure, deployment, DNS, Workers, and platform-specific workflows where applicable. |


### Skill execution rules

- Inspect available skills before installing anything.
- Read and follow each skill's actual instructions.
- Activate relevant skills before implementation.
- Apply the skills consistently across the website, not just the homepage.
- Do not claim a skill was used if it was not actually available and applied.
- Do not reinstall existing skills.
- Do not install additional skills without a concrete need and budget consideration.

For Cloudflare:

1. Locate the Cloudflare skill already present in the environment.
2. Read its complete instructions and supporting references.
3. Follow its documented commands, deployment procedures, and security practices.
4. Inspect the actual repository and account configuration before changing infrastructure.
5. Do not replace the existing Cloudflare workflow with an assumed alternative.

If the Cloudflare skill is unavailable, report that limitation instead of inventing its instructions.

### Design principles

The visual direction must be:

- Premium, contemporary, editorial, and professional.
- Appropriate for a real-estate advisory brand.
- Visually distinctive rather than template-driven.
- Consistent across all routes.
- Responsive from mobile to large desktop displays.
- Accessible and performant.

Avoid:

- Generic AI-generated landing-page aesthetics.
- Excessive gradients, glassmorphism, and decorative effects.
- Unnecessary animation.
- Repetitive cards and oversized empty sections.
- Inconsistent typography and spacing.
- Decorative elements that reduce readability or conversion.

Build a coherent design system covering typography, color, spacing, buttons, forms, navigation, imagery, and responsive behavior.

Do not impose a new brand identity without examining existing WS branding and assets.

## 4. INFORMATION AND CONTENT INTEGRITY

Existing repository content is the primary source of truth for the website.

When information is missing:

- Mark it as missing.
- Do not fabricate an answer.
- Do not infer legal or commercial claims.
- Do not replace verified information with generic marketing language.

Keep content separate from presentation wherever practical.

Prefer reusable data structures for property listings and repeated content.

Preserve Spanish as the website's public-facing language unless a specific page already supports another language or the project explicitly requires otherwise.

**Development instructions and documentation in this repository must be written in English.**

## 5. BUDGET AND RESOURCE GOVERNANCE

Operate under a strict user-controlled budget.

### General rules

- No purchases.
- No subscription upgrades.
- No paid API usage.
- No paid hosting or infrastructure changes.
- No credit purchases.
- No external services that introduce recurring costs.
- No unapproved paid assets, fonts, plugins, or dependencies.

Prefer existing subscriptions, available tools, installed dependencies, and free-tier resources.

### Before resource-consuming operations

For any operation that may consume credits, incur charges, or change a paid service:

1. Identify the operation.
2. Verify whether it has a cost.
3. Calculate the expected cost when possible.
4. Report the available budget and projected remaining balance when verifiable.
5. Explain cheaper alternatives when relevant.
6. Wait for explicit user authorization.

If the cost cannot be verified, do not proceed with the potentially chargeable operation.

### Dependencies and installations

Before adding a dependency:

- Check whether the functionality already exists.
- Prefer native platform capabilities and installed packages.
- Evaluate maintenance, security, bundle size, and compatibility.
- Avoid redundant packages.
- Explain why the dependency is necessary.

Do not silently replace an existing tool or infrastructure service.

## 6. SECURITY HARNESS — MANDATORY

Apply a security-first development workflow.

### Repository and filesystem safety

- Inspect the working directory before modifying files.
- Never assume the current branch, deployment target, or environment.
- Do not overwrite unrelated user work.
- Do not delete files or directories without verifying their purpose.
- Avoid broad commands such as recursive deletion or indiscriminate cleanup.
- Preserve existing changes that were not created by the current task.
- Review `git status` before and after significant work.
- Use small, reviewable changes.

### Secrets and credentials

Never expose, print, commit, or transmit:

- API keys.
- Access tokens.
- Passwords.
- Private keys.
- Session cookies.
- Cloudflare credentials.
- Database connection strings.
- Environment secrets.

Rules:

- Never read or dump complete `.env` files into logs or responses.
- Inspect only variable names or specific non-sensitive configuration when necessary.
- Keep secrets in the appropriate environment or secret manager.
- Never commit credentials.
- Verify `.gitignore` and deployment secret handling.
- Never place secrets in client-side code.

If a secret is accidentally exposed, stop, report the exposure, and recommend revocation and rotation.

### Application security

Follow secure defaults:

- Validate and sanitize user input.
- Validate data on the server, not only in the browser.
- Protect forms and endpoints against abuse.
- Use appropriate authentication and authorization.
- Avoid insecure direct object references.
- Prevent XSS, injection, CSRF, and unsafe redirects.
- Apply secure HTTP headers where supported.
- Avoid exposing internal errors or sensitive system information.
- Use least-privilege permissions.
- Keep dependencies reasonably current without introducing unverified breaking changes.

### Cloudflare security

Follow the existing Cloudflare skill and actual project configuration.

- Do not expose Cloudflare tokens.
- Do not disable existing security protections without authorization.
- Do not change DNS records, nameservers, SSL/TLS settings, WAF rules, access policies, or Worker routes casually.
- Verify the target environment before deployment.
- Preserve existing mail-related DNS records and unrelated infrastructure.
- Never overwrite production configuration to solve a local development issue.
- Document infrastructure changes and their rollback procedure.

### Human approval gates

Explicit approval is required before:

- Production deployment.
- DNS or domain changes.
- Database migrations that can affect real data.
- Destructive filesystem or repository operations.
- Credential rotation.
- Changes to paid infrastructure.
- External purchases or credit consumption.
- Irreversible changes to business data.

Do not interpret silence as authorization.

## 7. DEVELOPMENT AND IMPLEMENTATION WORKFLOW

Follow this sequence:

### Phase A — Discovery

- Inspect repository structure.
- Read existing project instructions, including any `AGENTS.md` files.
- Audit routes, pages, layouts, components, assets, and integrations.
- Inspect the current framework and dependency versions.
- Identify deployment architecture and Cloudflare usage.
- Record existing functionality that must be preserved.

### Phase B — Design architecture

- Define the global visual direction.
- Establish design tokens and typography.
- Define shared components and layout primitives.
- Map the redesign to every existing route.
- Identify opportunities to improve navigation and conversion.
- Plan responsive behavior.

### Phase C — Implementation

- Implement shared design-system components first.
- Redesign pages consistently.
- Preserve existing content and functionality.
- Reuse existing assets when appropriate.
- Optimize images and media.
- Implement accessible interactions.
- Avoid unnecessary dependencies and architectural rewrites.

### Phase D — Validation

Run the appropriate checks for the actual repository.

At minimum, where supported:

- TypeScript checks.
- Linting.
- Production build.
- Route verification.
- Responsive testing.
- Form and interaction testing.
- Browser console inspection.
- SEO metadata verification.
- Accessibility checks.
- Performance inspection.

Do not claim tests passed unless they were actually executed.

### Phase E — Delivery

Report:

1. Pages and routes audited.
2. Pages and components redesigned.
3. Existing information and functionality preserved.
4. Skills actually used.
5. Dependencies added or removed, with justification.
6. Security-relevant changes.
7. Cloudflare changes, if any.
8. Tests executed and their results.
9. Outstanding issues and limitations.
10. Any operation requiring user authorization.

## 8. PERFORMANCE, ACCESSIBILITY, AND SEO

Performance and accessibility are architectural requirements, not final cosmetic tasks.

Prioritize:

- Responsive image delivery.
- Efficient loading and code splitting.
- Minimal JavaScript where practical.
- Stable layouts and minimal layout shifts.
- Accessible navigation and forms.
- Keyboard operability.
- Semantic HTML.
- Appropriate contrast.
- Descriptive image alternative text.
- Metadata and canonical URLs.
- Structured data only when supported by verified business information.
- Search-engine-friendly route structure.

Do not sacrifice usability or accessibility for visual effects.

## 9. ENGINEERING PRINCIPLES

- Follow the existing framework and project architecture unless there is a documented reason to change them.
- Prefer maintainable, modular, reusable components.
- Keep business data separate from presentation.
- Avoid unnecessary abstractions.
- Avoid duplicated logic.
- Keep changes scoped and reviewable.
- Use clear naming and consistent conventions.
- Do not introduce mock data into production.
- Do not leave unfinished placeholders presented as real functionality.
- Do not modify unrelated applications or repositories.

Use scroll-driven animation only where it contributes meaningfully to the experience. Apply `scroll-world` when appropriate; do not force cinematic effects onto every page.

## 10. COMMUNICATION AND EXECUTION RULES

All agent communication, technical documentation, plans, code comments, and reports must be in English.

Be concise, precise, and evidence-based.

Clearly distinguish:

- Verified facts.
- Assumptions.
- Proposed changes.
- Completed changes.
- Failed checks.
- Pending authorization.

Do not claim access to tools, accounts, skills, or infrastructure that has not been verified.

Do not ask for approval for ordinary, reversible development work within the authorized scope. Do ask before the approval-gated operations defined above.

When blocked, explain the exact blocker and the minimum action needed to proceed.

## 11. FINAL OPERATING PRINCIPLE

**Preserve the business. Rebuild the experience. Protect the infrastructure. Control the budget. Verify every significant change.**

The objective is to transform the WS Inmobiliaria website into a cohesive, premium, modern real-estate digital experience while retaining its existing information, subpages, routes, business identity, and operational capabilities.

The redesign must be comprehensive, but the execution must remain controlled, secure, reversible, and respectful of the existing project.
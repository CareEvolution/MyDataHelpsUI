# Spec: Dark Mode Refresh + WCAG/APCA Dual-Conformance Color System

**Status:** Approved for implementation (see Locked Decisions). Research completed in a prior Claude session; this spec is the handoff. Implementation session should not need to re-derive anything in §2–§5 — start at §6.

---

## 1. Objective

1. Fix the "dingy" dark mode: failing muted-text contrast, near-zero surface separation, dead-neutral greys, accents that don't pop.
2. Re-anchor the "magic number" palette documentation from WCAG 2.x relative luminance to APCA (perceptual contrast), while **keeping WCAG 2.x conformance as a hard floor** (dual conformance — WCAG 2.x is still the legal standard; WCAG 3/APCA is not yet normative).
3. Map the hand-picked semantic layer (`--mdhui-*`) onto the magic-number palette (`--ce-*`) so dark mode inherits palette guarantees instead of being bespoke hexes.

## 2. Locked decisions (do not re-litigate)

| # | Decision |
|---|----------|
| D1 | **Keep the `--mdhui-*` semantic variable API exactly as-is.** No renames, no removals, no new required variables. 331 usages across 125 component files depend on it. Only the *values* change — they become `var(--ce-…)` references. |
| D2 | **Dual conformance.** Every guaranteed pairing must pass BOTH a WCAG 2.x ratio floor AND an APCA Lc floor (§5). A pair failing either fails. |
| D3 | **Polarity policy = Option A.** The published "magic number" guarantee is the *minimum* Lc across both polarities (dark-on-light and light-on-dark). Storybook tooltips additionally show both directional values for precision users. |
| D4 | **Font reference for Lc thresholds:** body-text thresholds assume ≥16px / weight 400. Document this next to the magic-number table. |
| D5 | **Dark surfaces may carry a subtle cool (violet-blue) tint.** Inherit it from the grey ramp's existing cast (e.g. `--ce-grey-90` = rgb(29,28,34), blue channel highest). Hold hue angle constant across the elevation ramp; vary lightness (and slightly chroma) only. Keep chroma subtle — it must read as depth, not a white-balance error. |
| D6 | **Palette hexes may be edited and grades may be added** where dark mode or APCA needs them. Precedent: `--ce-orange-45: #E35C33` (globalCss.ts:111) is already a one-off added grade. Never remove or rename an existing `--ce-*` variable (published package; downstream consumers may reference them). |
| D7 | **"Dingy" ≠ just contrast.** Accent pop / modern feel is an explicit goal alongside conformance. The cool surface tint (simultaneous contrast pushing warm accents — reds/oranges/yellows — forward) is the main lever; evaluate accent vividness on the new surfaces as part of the design pass. |
| D8 | WCAG floors: **4.5:1** body/secondary text, **3:1** large text & UI components (proposed in research session, not objected to — confirm at kickoff if desired). |

## 3. Current state inventory (verified file:line pointers)

- **Palette ramps:** `src/helpers/globalCss.ts` lines ~58–314, inside `core` css. 11 hues (grey, blue, blue-vivid, indigo, violet, cyan, green, red, red-vivid, orange, yellow) × 20 grades (1,2,3,4,5,10,20,30,40,50,55,60,70,80,90,95,96,97,98,99); orange has an extra 45. 221 vars total, `--ce-{hue}-{grade}`.
- **Semantic layers:** `lightColorStyle` (globalCss.ts:316), `darkColorStyle` (globalCss.ts:346). Raw hexes, NOT derived from `--ce-*`. Applied via Emotion `Global` in `src/components/presentational/Layout/Layout.tsx:71–76` based on `colorScheme` prop ("light" | "dark" | "auto").
- **Usage:** `--mdhui-(background|text|border)-color-*`: 331 refs / 125 files. `--ce-*` refs outside globalCss.ts: **only** in `src/stories/foundation/colorDocs.{tsx,css}` (docs). → Changing `--ce-*` *values* is low-risk in-repo; the risk is only downstream consumers of the published package (`@careevolution/mydatahelps-ui`, v3.20.0 at research time).
- **Gradients:** `--ce-gradient-*` (globalCss.ts ~293–313) use **raw rgba values that duplicate palette colors** (e.g. alpine-overlook-dark ends at rgba(76,152,207) = blue-40). If a duplicated palette hex changes, update the gradient stop to match.
- **Color docs page:** `src/stories/foundation/colorDocs.tsx`. Contains a WCAG calc (OK) and an APCA calc (lines ~100–113) that is a flagged-inaccurate approximation (`TODO: THESE HELPERS MIGHT NOT BE ACCURATE`) — it omits APCA's per-plane exponents, black soft-clamp, and low-contrast offset. Replace with the `apca-w3` package. The magic-number explainer text (lines ~376–408) and the 40/50/70 hover-highlight logic in `ColorRow` (lines ~283–307) must be rewritten per D3/D4/§5.

## 4. Measured baseline (full APCA-4g formula + WCAG 2.x; re-verify with `apca-w3` in Phase 1)

### 4a. Current dark tokens — the failures

| Pair (dark mode) | Role | WCAG | APCA Lc | Verdict |
|---|---|---|---|---|
| `#FFF` on `#2c2c2d` (text-0 on bg-0) | primary text | 13.95:1 | −103.6 | fine |
| `#9e9ea5` on `#2c2c2d` (text-2 on bg-0) | secondary text | 5.24:1 | −45.8 | passes WCAG, **fails Lc 60 secondary floor** — the "muddy" look |
| `#59595d` on `#2c2c2d` (text-3/4 on bg-0) | muted/disabled | **2.00:1** | **−13.6** | fails everything; below even APCA non-text minimum (15) |
| `#59595d` on `#1c1c1d` (text-3/4 on bg-1) | muted/disabled | **2.44:1** | **−16.2** | fails |
| `#2c2c2d` vs `#1c1c1d` (bg-0 vs bg-1) | card vs app bg | 1.22:1 | ~0 | no perceptible surface separation |
| `#444446` on `#2c2c2d` (border-0 on bg-0) | border | 1.44:1 | ~0 | border barely visible |

Also: text-3 and text-4 are the *same hex* (`#59595d`) — no muted-vs-disabled distinction exists. And the dark tokens are dead-neutral (`#2c2c2d`), discarding the grey ramp's cool cast (D5 restores it).

### 4b. Candidate text mapping onto existing grey ramp (surface = grey-90 `#1d1c22`) — text side works as-is

| Candidate | WCAG | APCA Lc | Notes |
|---|---|---|---|
| grey-1 on grey-90 | 16.46:1 | −104.1 | text-0 (primary) |
| grey-5 on grey-90 | 14.57:1 | −95.0 | text-1 |
| grey-20 on grey-90 | 10.26:1 | −72.5 | text-2 (secondary) — passes Lc 60 easily |
| grey-30 on grey-90 | 7.60:1 | −56.6 | text-3 (muted) — passes Lc 45. **Dual-conformance case study: WCAG calls this AAA (7:1) but APCA puts it under body-text 60 — dark polarity is the binding constraint. This is why Option A (D3) exists.** |
| grey-40 on grey-90 | 5.38:1 | −41.5 | text-4 (disabled; conformance-exempt but clearly visible, and finally distinct from text-3) |
| grey-50 on grey-90 | 3.71:1 | −28.3 | too weak for text roles; fine for decorative |

### 4c. Surface separation on existing ramp — **this is the gap that forces new grades (D6)**

| Candidate surfaces | WCAG | APCA Lc |
|---|---|---|
| grey-90 vs grey-95 | 1.02:1 | ~0 |
| grey-90 vs grey-99 | 1.12:1 | ~0 |
| grey-80 vs grey-95 | 1.27:1 | ~0 |
| grey-80 vs grey-99 | 1.39:1 | ~0 |

The ramp's dark end (90–99) was tuned for *text on top of it*, not for *elevation steps between surfaces* — grades 90–99 span only rgb(29,28,34)→rgb(17,16,19). No existing pair of dark grades gives visible card-vs-background separation (grey-80 as card is the closest but reads charcoal, and 80↔99 still only hits 1.39:1). **Resolution: add elevated-surface grade(s) (e.g. `--ce-grey-85` or a spread/lift of 80–99 region), designed in OKLCH holding the ramp's hue angle (D5), targeting surface-vs-surface separation ≥ ~Lc 15 (APCA non-text minimum) or ≥ ~1.4:1 WCAG between adjacent elevation steps — plus a visible border (border tokens mapped so border-on-surface clears non-text Lc 15).** Exact targets are a design call within these floors.

## 5. Conformance policy (what "passes" means)

Every role pairing below must pass BOTH columns in the **dark (light-on-dark) polarity as computed** — and any pairing promised generically (the magic number) uses the min of both polarities (D3).

| Role pair | WCAG floor | APCA floor (|Lc|) |
|---|---|---|
| Primary text (text-0/1) on any surface (bg-0/1/2) | 4.5:1 | 75 |
| Secondary text (text-2) on any surface | 4.5:1 | 60 |
| Muted text (text-3) on any surface | 3:1 | 45 |
| Disabled text (text-4) | exempt | exempt (target ≥30 for visibility; must differ from text-3) |
| Borders on adjacent surface | — | 15 (non-text) |
| Adjacent elevation surfaces | — | target ~15 or border-assisted |

Magic-number re-documentation (Phase 5): replace "40→A, 50→AA, 70→AAA" with delta→guaranteed-min-Lc bands derived from the audit (Phase 2), stated per D3/D4, with the WCAG ratio guarantee kept alongside.

## 6. Implementation plan

Phases 1–2 and 6 are mechanical — run them on a cheaper model or delegate to subagents; reserve the expensive model's judgment for Phases 3–4 (hex design, tint tuning, pop evaluation).

1. **Scoring tool** (mechanical). Node script, e.g. `scripts/color-audit.mjs`, deps `apca-w3` + `colorjs.io` (dev-only). Given fg/bg: WCAG ratio, APCA Lc both polarities, pass/fail against §5 floors by role. Modes: (a) audit full `--ce-*` ramp pairs per hue → delta→min-Lc table; (b) audit a proposed semantic mapping; (c) CI-friendly exit code so regressions can't land silently.
2. **Baseline audit** (mechanical). Run mode (a); produces the data for the new magic-number doc bands and confirms §4 numbers via the official library.
3. **Dark semantic remap** (design judgment). Rewrite `darkColorStyle` values as `var(--ce-…)` refs using §4b as the starting point; design the new elevated-surface grade(s) per §4c in OKLCH (hue held to ramp cast, D5); map borders and box-shadows; keep `--mdhui-background-color-highest-contrast` semantics (pure black in dark). Validate every pair with the tool. Also decide bg-2 / overlay / shadow tokens. Update gradient raw values only if a duplicated hex changed.
4. **Pop / modern pass** (design judgment). With new surfaces in place, evaluate warm accents (heart-rate red-orange, activity yellow, orange warnings) and `--mdhui-color-primary/success/warning/danger` on dark surfaces for vividness + conformance; tune or add grades (e.g. brighter dark-mode accent grades) where they look muted. Iterate numerically via the tool first; screenshots/Storybook only for final confirmation (cheaper).
5. **Docs update** (mixed). colorDocs.tsx: swap approximate APCA for `apca-w3`; rewrite magic-number explainer per §5/D3/D4; hover highlights driven by audited Lc bands instead of hardcoded 40/50/70 deltas; tooltips show both polarities; consider a dark-surface preview row.
6. **Verification** (mechanical). Scoring tool green on the final mapping; Storybook visual pass in dark mode (Layout `colorScheme="dark"`); Chromatic snapshots; existing jest tests.

**Light mode remap** (lightColorStyle → `var(--ce-*)`) is a natural follow-up using the same tool, but is explicitly out of scope for this pass unless trivial.

## 7. Acceptance criteria

- [ ] All §5 role pairs pass both floors (tool-verified, not eyeballed).
- [ ] text-3 ≠ text-4, and both are distinguishable from text-2.
- [ ] Card (bg-0) visibly separates from app background (bg-1) per §4c resolution.
- [ ] Dark surfaces carry the ramp's cool cast; hue angle constant across elevation.
- [ ] No `--mdhui-*` or `--ce-*` variable removed or renamed; additions to `--ce-*` allowed.
- [ ] colorDocs APCA math uses `apca-w3`; docs describe dual conformance + Option A polarity + font reference.
- [ ] Gradients still match any palette hexes they duplicate.
- [ ] Chromatic/Storybook dark-mode review shows no unintended light-mode changes.

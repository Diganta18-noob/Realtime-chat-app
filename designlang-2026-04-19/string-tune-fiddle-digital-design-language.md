# Design Language: StringTune

> Extracted from `https://string-tune.fiddle.digital/` on April 19, 2026
> 789 elements analyzed

This document describes the complete design language of the website. It is structured for AI/LLM consumption — use it to faithfully recreate the visual design in any framework.

## Color Palette

### Primary Colors

| Role | Hex | RGB | HSL | Usage Count |
|------|-----|-----|-----|-------------|
| Primary | `#101214` | rgb(16, 18, 20) | hsl(210, 11%, 7%) | 856 |
| Secondary | `#e6dfe4` | rgb(230, 223, 228) | hsl(317, 12%, 89%) | 43 |
| Accent | `#e6dfe4` | rgb(230, 223, 228) | hsl(317, 12%, 89%) | 43 |

### Neutral Colors

| Hex | HSL | Usage Count |
|-----|-----|-------------|
| `#ffffff` | hsl(0, 0%, 100%) | 529 |
| `#544d56` | hsl(287, 6%, 32%) | 121 |
| `#a399a8` | hsl(280, 8%, 63%) | 30 |
| `#a7a7b4` | hsl(240, 8%, 68%) | 14 |
| `#787878` | hsl(0, 0%, 47%) | 14 |

### Background Colors

Used on large-area elements: `#101214`, `#e6dfe4`, `#ffffff`, `#dad3dc`

### Text Colors

Text color palette: `#ffffff`, `#544d56`, `#a399a8`, `#e6dfe4`, `#101214`, `#c8c2cf`, `#ff4f36`, `#596375`

### Gradients

```css
background-image: linear-gradient(to right, rgba(0, 0, 0, 0) 8px, rgb(255, 255, 255) 8px, rgb(255, 255, 255) calc(0% + 8px), rgba(0, 0, 0, 0) calc(0% + 8px)), linear-gradient(to right, rgb(84, 77, 86), rgb(84, 77, 86)), linear-gradient(to right, rgba(0, 0, 0, 0) 8px, rgb(84, 77, 86) 8px, rgb(84, 77, 86) 9px, rgba(0, 0, 0, 0) 9px, rgba(0, 0, 0, 0) calc(25% - 4px));
```

```css
background-image: linear-gradient(0deg, rgb(16, 18, 20), rgb(16, 18, 20));
```

```css
background-image: linear-gradient(to top, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0) calc(100% - 1px), rgb(255, 255, 255) calc(100% - 1px), rgb(255, 255, 255) 100%, rgba(0, 0, 0, 0) 100%), linear-gradient(to right, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0) calc(100% - 1px), rgb(255, 255, 255) calc(100% - 1px), rgb(255, 255, 255) 100%, rgba(0, 0, 0, 0) 100%);
```

```css
background-image: linear-gradient(to right, rgba(0, 0, 0, 0) 50%, rgb(200, 194, 207) 50%, rgb(200, 194, 207) calc(50% + 1px), rgba(0, 0, 0, 0) calc(50% + 1px));
```

```css
background-image: radial-gradient(circle, rgba(0, 0, 0, 0) 29.5%, rgb(255, 79, 54) 30%);
```

### Full Color Inventory

| Hex | Contexts | Count |
|-----|----------|-------|
| `#101214` | background, text, border | 856 |
| `#ffffff` | text, border, background | 529 |
| `#544d56` | text, border | 121 |
| `#e6dfe4` | text, border, background | 43 |
| `#a399a8` | text, border | 30 |
| `#a7a7b4` | background | 14 |
| `#787878` | background | 14 |
| `#ff4f36` | background, text, border | 10 |
| `#c8c2cf` | text, border | 8 |
| `#596375` | text, border | 6 |
| `#dad3dc` | background | 2 |

## Typography

### Font Families

- **KHTeka** — used for all (727 elements)
- **KHTekaMono** — used for body (59 elements)
- **Manrope** — used for body (3 elements)

### Type Scale

| Size (px) | Size (rem) | Weight | Line Height | Letter Spacing | Used On |
|-----------|------------|--------|-------------|----------------|---------|
| 225.28px | 14.08rem | 400 | 168.455px | -13.5168px | h1, span, div, canvas |
| 112.205px | 7.0128rem | 400 | 88.4294px | -2.24409px | span |
| 84.1745px | 5.2609rem | 400 | 66.3386px | -1.68349px | h2, span, div |
| 63.1467px | 3.9467rem | 400 | 75.776px | normal | div, svg, use, span |
| 47.3719px | 2.9607rem | 400 | 41.472px | -0.947437px | span |
| 35.5378px | 2.2211rem | 400 | 34.56px | -0.710756px | span |
| 26.66px | 1.6663rem | 400 | 28.8px | -0.5332px | div, p, span |
| 20px | 1.25rem | 400 | 24px | normal | html, head, meta, title |
| 17.92px | 1.12rem | 400 | 25.088px | normal | div |
| 15.0038px | 0.9377rem | 400 | 18.0045px | normal | span, br, a, p |
| 14px | 0.875rem | 500 | 19.6px | normal | div, button |
| 11.2556px | 0.7035rem | 400 | 13.5068px | normal | div, span, br, figure |

### Heading Scale

```css
h1 { font-size: 225.28px; font-weight: 400; line-height: 168.455px; }
h2 { font-size: 84.1745px; font-weight: 400; line-height: 66.3386px; }
```

### Body Text

```css
body { font-size: 20px; font-weight: 400; line-height: 24px; }
```

### Font Weights in Use

`400` (788x), `500` (1x)

## Spacing

| Token | Value | Rem |
|-------|-------|-----|
| spacing-0 | 0px | 0rem |
| spacing-7 | 7px | 0.4375rem |
| spacing-20 | 20px | 1.25rem |
| spacing-27 | 27px | 1.6875rem |
| spacing-32 | 32px | 2rem |
| spacing-36 | 36px | 2.25rem |
| spacing-42 | 42px | 2.625rem |
| spacing-45 | 45px | 2.8125rem |
| spacing-52 | 52px | 3.25rem |
| spacing-61 | 61px | 3.8125rem |
| spacing-85 | 85px | 5.3125rem |
| spacing-99 | 99px | 6.1875rem |
| spacing-112 | 112px | 7rem |
| spacing-120 | 120px | 7.5rem |
| spacing-150 | 150px | 9.375rem |
| spacing-154 | 154px | 9.625rem |
| spacing-195 | 195px | 12.1875rem |
| spacing-225 | 225px | 14.0625rem |
| spacing-256 | 256px | 16rem |

## Border Radii

| Label | Value | Count |
|-------|-------|-------|
| md | 8px | 5 |
| lg | 11px | 1 |
| lg | 15px | 4 |
| xl | 20px | 4 |
| full | 27px | 6 |
| full | 30px | 1 |
| full | 36px | 23 |
| full | 40px | 18 |
| full | 50px | 23 |

## Box Shadows

**xs (inset)** — blur: 0px
```css
box-shadow: rgba(120, 120, 120, 0.25) 1px 0px 0px 0px inset, rgba(120, 120, 120, 0.25) -1px 0px 0px 0px inset;
```

**sm (inset)** — blur: 8px
```css
box-shadow: rgba(16, 18, 20, 0.4) 0px 0px 8px 4px inset, rgba(84, 77, 86, 0.05) 0px 16px 16px 0px;
```

**sm (inset)** — blur: 8px
```css
box-shadow: rgba(16, 18, 20, 0.1) 0px 0px 8px 4px inset;
```

**md (inset)** — blur: 16px
```css
box-shadow: rgba(16, 18, 20, 0.05) 0px 0px 16px 2px inset, rgba(84, 77, 86, 0.05) 0px 16px 16px 0px;
```

**lg** — blur: 16px
```css
box-shadow: rgba(84, 77, 86, 0.1) 0px 8px 16px 0px;
```

**lg** — blur: 16px
```css
box-shadow: rgba(84, 77, 86, 0.05) 0px 16px 16px 0px;
```

**lg** — blur: 24px
```css
box-shadow: rgba(84, 77, 86, 0.15) 0px 8px 24px 0px;
```

## CSS Custom Properties

### Spacing

```css
--body-font-size: 1rem;
--g-gap: .4rem;
--g-margin: calc(var(--g-gap)*2);
```

### Typography

```css
--body-line-height: 1.2;
--line-height-step: var(--body-line-height) /var(--type-step);
--font: "KHTeka",system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif;
--font-mono: "KHTekaMono","KHTeka",system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif;
```

### Other

```css
--type-step: 1.333;
--p: 1rem;
--m: calc(var(--p)/var(--type-step));
--mm: calc(var(--m)/var(--type-step));
--h6: calc(var(--p)*var(--type-step));
--h5: calc(var(--h6)*var(--type-step));
--h4: calc(var(--h5)*var(--type-step));
--h3: calc(var(--h4)*var(--type-step));
--h2: calc(var(--h3)*var(--type-step));
--h1: calc(var(--h2)*var(--type-step));
--h0: calc(var(--h1)*var(--type-step));
--large: max(calc(var(--h1)*var(--type-step)*var(--type-step)),17.6vw);
--ls-intencity: -2;
--large-lh: calc(var(--body-line-height)*pow(var(--line-height-step), 4.5));
--h0-lh: calc(var(--body-line-height)*pow(var(--line-height-step), 4));
--h1-lh: calc(var(--body-line-height)*pow(var(--line-height-step), 4));
--h2-lh: calc(var(--body-line-height)*pow(var(--line-height-step), 4));
--h3-lh: calc(var(--body-line-height)*pow(var(--line-height-step), 4));
--h4-lh: calc(var(--body-line-height)*pow(var(--line-height-step), 3));
--h5-lh: calc(var(--body-line-height)*pow(var(--line-height-step), 2));
--h6-lh: calc(var(--body-line-height)*pow(var(--line-height-step), 1));
--c-white: #fff;
--c-white-rgb: 255,255,255;
--c-black: #101214;
--c-black-rgb: 16,18,20;
--c-grey-dark: #544d56;
--c-grey-dark-rgb: 84,77,86;
--c-yellow: #f4ff1e;
--c-yellow-rgb: 244,255,30;
--c-red: #ff4f36;
--c-red-rgb: 255,79,54;
--c-blue: #3687ff;
--c-blue-rgb: 54,135,255;
--c-green: #4dbf9d;
--c-green-rgb: 77,191,157;
--c-berry: #c8c2cf;
--c-berry-rgb: 200,194,207;
--c-purple: #a399a8;
--c-purple-rgb: 163,153,168;
--c-grey: #e6dfe4;
--c-grey-rgb: 230,223,228;
--f-cubic: cubic-bezier(.35,.35,0,1);
--f-cubic-in: cubic-bezier(.69,0,0,1);
--f-fast: cubic-bezier(0,.81,.35,1);
--f-smooth: cubic-bezier(.5,0,.3,1);
--f-smooth-alt: cubic-bezier(.6,0,.05,1);
--f-bounce: cubic-bezier(.6,.5,0,3);
--f-bounce-alt: cubic-bezier(.6,.5,0,2);
--g-columns: 6;
--columns: 6;
--col: calc(var(--vw,1vw)*100/6 - var(--g-margin)*2/6 - var(--g-gap)*5/6);
--push-x: 0;
--y: 0;
--magnetic-x: 0;
--lerp: 0;
--push-y: 0;
--dy: 0;
--progress: 0;
--magnetic-y: 0;
--angle: 0;
--vh: 8px;
--x-lerp: 0;
--push-rotation: 0;
--glide: 0;
--magnetic-target-y: 0;
--angle-deg: 0;
--progress-slice: 0;
--y-lerp: 0;
--spotlight-distance: 0;
--y-px: 0;
--magnetic-target-x: 0;
--x: 0;
--x-px: 0;
--spotlight-angle: 0;
--dx: 0;
--vw: 12.8px;
```

### Dependencies

```css
--line-height-step: --body-line-height,--type-step;
--m: --p,--type-step;
--mm: --m,--type-step;
--h6: --p,--type-step;
--h5: --h6,--type-step;
--h4: --h5,--type-step;
--h3: --h4,--type-step;
--h2: --h3,--type-step;
--h1: --h2,--type-step;
--h0: --h1,--type-step;
--large: --h1,--type-step,--type-step;
--large-lh: --body-line-height,--line-height-step;
--h0-lh: --body-line-height,--line-height-step;
--h1-lh: --body-line-height,--line-height-step;
--h2-lh: --body-line-height,--line-height-step;
--h3-lh: --body-line-height,--line-height-step;
--h4-lh: --body-line-height,--line-height-step;
--h5-lh: --body-line-height,--line-height-step;
--h6-lh: --body-line-height,--line-height-step;
--g-margin: --g-gap;
--col: --vw,--g-margin,--g-gap;
```

### Semantic

```css
success: [object Object];
warning: [object Object];
error: [object Object];
info: [object Object];
```

## Breakpoints

| Name | Value | Type |
|------|-------|------|
| lg | 1024px | min-width |
| 1440px | 1440px | min-width |
| 2xl | 1600px | min-width |
| 1920px | 1920px | min-width |
| 2560px | 2560px | min-width |

## Transitions & Animations

**Easing functions:** `[object Object]`, `[object Object]`, `[object Object]`, `[object Object]`, `[object Object]`, `[object Object]`

**Durations:** `0.9s`, `1.2s`, `0.15s`, `0.3s`, `0.45s`, `0s`, `0.6s`, `1.8s`, `6s`, `1.5s`, `3s`, `0.75s`, `0.975s`

### Common Transitions

```css
transition: all;
transition: scale 0.9s cubic-bezier(0.69, 0, 0, 1), translate 0.9s cubic-bezier(0.69, 0, 0, 1);
transition: opacity 1.2s cubic-bezier(0.35, 0.35, 0, 1);
transition: translate 0.9s cubic-bezier(0.35, 0.35, 0, 1);
transition: opacity 0.15s cubic-bezier(0.35, 0.35, 0, 1), scale 0.3s cubic-bezier(0.35, 0.35, 0, 1);
transition: scale 0.45s cubic-bezier(0.6, 0.5, 0, 3) 0.15s, transform 0.3s cubic-bezier(0.6, 0.5, 0, 3) 0.15s, opacity 0s cubic-bezier(0.35, 0.35, 0, 1) 0.15s;
transition: scale 0.45s cubic-bezier(0.6, 0.5, 0, 3), transform 0.3s cubic-bezier(0.6, 0.5, 0, 3), opacity 0.3s cubic-bezier(0.35, 0.35, 0, 1);
transition: background-color 0.6s cubic-bezier(0.35, 0.35, 0, 1), box-shadow 1.8s cubic-bezier(0.35, 0.35, 0, 1), scale 0.45s cubic-bezier(0.6, 0.5, 0, 3), transform 0.3s cubic-bezier(0.6, 0.5, 0, 3), backdrop-filter 0.6s cubic-bezier(0.35, 0.35, 0, 1), -webkit-backdrop-filter 0.6s cubic-bezier(0.35, 0.35, 0, 1);
transition: translate 0.3s cubic-bezier(0.35, 0.35, 0, 1), opacity 0.3s cubic-bezier(0.35, 0.35, 0, 1);
transition: background-size 0.45s cubic-bezier(0.5, 0, 0.3, 1);
```

### Keyframe Animations

**blink-69cb7047**
```css
@keyframes blink-69cb7047 {
  0% { opacity: 0; }
  50% { opacity: 1; }
}
```

**marquee**
```css
@keyframes marquee {
  0% { transform: translate3d(25%, 0px, 0px) rotate(0.01deg); }
  100% { transform: translate3d(-25%, 0px, 0px) rotate(0.01deg); }
}
```

**marqueeHor**
```css
@keyframes marqueeHor {
  0% { transform: translate3d(0px, 25%, 0px) rotate(0.01deg); }
  100% { transform: translate3d(0px, -25%, 0px) rotate(0.01deg); }
}
```

**loading**
```css
@keyframes loading {
  0% { rotate: 0deg; }
  100% { rotate: 1turn; }
}
```

**blinking**
```css
@keyframes blinking {
  0% { opacity: 1; }
  10% { opacity: 0; }
  12% { opacity: 1; }
  20% { opacity: 0.3; }
  22% { opacity: 1; }
  30% { opacity: 0.6; }
  32% { opacity: 1; }
  38% { opacity: 0; }
  40% { opacity: 1; }
  55% { opacity: 0.7; }
  60% { opacity: 1; }
  72% { opacity: 0; }
  74% { opacity: 1; }
  82% { opacity: 0.4; }
  85% { opacity: 0.6; }
  100% { opacity: 0; }
}
```

**arrowActive-8887bf68**
```css
@keyframes arrowActive-8887bf68 {
  0% { transform: translate(0px); }
  50% { transform: translate(-25%); }
}
```

**charMove-2ed6c532**
```css
@keyframes charMove-2ed6c532 {
  0% { background-position: 0px center; }
  33% { background-position: 50% center; }
  66% { background-position: 100% center; }
}
```

**blink-ac4ffa19**
```css
@keyframes blink-ac4ffa19 {
  50% { visibility: hidden; }
}
```

**ScrollSmoothly-f2e2227c**
```css
@keyframes ScrollSmoothly-f2e2227c {
  0% { translate: 0px -50%; }
  50% { translate: 0px 50%; }
  100% { translate: 0px -50%; }
}
```

**ScrollSmoothly2-f2e2227c**
```css
@keyframes ScrollSmoothly2-f2e2227c {
  0% { transform: translate(-50%); }
  50% { transform: translate(50%); }
  100% { transform: translate(-50%); }
}
```

## Component Patterns

Detected UI component patterns and their most common styles:

### Buttons (13 instances)

```css
.button {
  background-color: rgb(222, 212, 230);
  color: rgb(255, 255, 255);
  font-size: 20px;
  font-weight: 400;
  padding-top: 4px;
  padding-right: 26.66px;
  border-radius: 40px;
}
```

### Cards (10 instances)

```css
.card {
  background-color: rgb(255, 255, 255);
  border-radius: 35.5378px;
  box-shadow: rgba(84, 77, 86, 0.1) 0px 8px 16px 0px;
  padding-top: 8px;
  padding-right: 0px;
}
```

### Links (13 instances)

```css
.link {
  color: rgb(255, 255, 255);
  font-size: 20px;
  font-weight: 400;
}
```

### Navigation (2 instances)

```css
.navigatio {
  color: rgb(255, 255, 255);
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  position: relative;
}
```

### Footer (1 instances)

```css
.foote {
  color: rgb(255, 255, 255);
  padding-top: 0px;
  padding-bottom: 0px;
  font-size: 20px;
}
```

### Modals (5 instances)

```css
.modal {
  background-color: rgb(16, 18, 20);
  border-radius: 0px;
  padding-top: 0px;
  padding-right: 0px;
}
```

### ProgressBars (7 instances)

```css
.progressBar {
  color: rgb(255, 255, 255);
  border-radius: 0px;
  font-size: 20px;
}
```

## Component Clusters

Reusable component instances grouped by DOM structure and style similarity:

### Button — 3 instances, 1 variant

**Variant 1** (3 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 4px 15.0038px 4px 15.0038px;
  border-radius: 40px;
  border: 0px none rgb(255, 255, 255);
  font-size: 20px;
  font-weight: 400;
```

### Card — 3 instances, 1 variant

**Variant 1** (3 instances)

```css
  background: rgb(255, 255, 255);
  color: rgb(16, 18, 20);
  padding: 16px 24px 32px 24px;
  border-radius: 20px;
  border: 0px none rgb(16, 18, 20);
  font-size: 20px;
  font-weight: 400;
```

### Button — 5 instances, 2 variants

**Variant 1** (3 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(16, 18, 20);
  padding: 4px 26.66px 4px 26.66px;
  border-radius: 40px;
  border: 0px none rgb(16, 18, 20);
  font-size: 20px;
  font-weight: 400;
```

**Variant 2** (2 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 4px 26.66px 4px 26.66px;
  border-radius: 40px;
  border: 0px none rgb(255, 255, 255);
  font-size: 20px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 4px 16px 4px 16px;
  border-radius: 40px;
  border: 0px none rgb(255, 255, 255);
  font-size: 20px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 4px 16px 4px 16px;
  border-radius: 40px;
  border: 0px none rgb(255, 255, 255);
  font-size: 20px;
  font-weight: 400;
```

### Button — 3 instances, 2 variants

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(16, 18, 20);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(16, 18, 20);
  font-size: 14px;
  font-weight: 400;
```

**Variant 2** (2 instances)

```css
  background: rgb(222, 212, 230);
  color: rgb(16, 18, 20);
  padding: 12px 36px 12px 36px;
  border-radius: 15.0038px;
  border: 0px none rgb(16, 18, 20);
  font-size: 14px;
  font-weight: 400;
```

## Layout System

**31 grid containers** and **316 flex containers** detected.

### Container Widths

| Max Width | Padding |
|-----------|---------|
| 100% | 0px |
| calc(28.5714% - 18.2854px) | 0px |
| 540px | 20px |

### Grid Column Patterns

| Columns | Usage Count |
|---------|-------------|
| 1-column | 13x |
| 14-column | 9x |
| 5-column | 5x |
| 2-column | 1x |
| 12-column | 1x |
| 20-column | 1x |
| 4-column | 1x |

### Grid Templates

```css
grid-template-columns: 1280px;
grid-template-columns: 1280px;
grid-template-columns: 79.4219px 79.4219px 79.4375px 79.4219px 79.4219px 79.4219px 79.4219px 79.4219px 79.4219px 79.4219px 79.4219px 79.4375px 79.4219px 79.4375px;
gap: normal 8px;
grid-template-columns: 79.4219px 79.4219px 79.4375px 79.4219px 79.4375px 79.4219px 79.4375px 79.4219px 79.4219px 79.4375px 79.4219px 79.4375px 79.4219px 79.4375px;
gap: normal 8px;
grid-template-columns: 79.4219px 79.4219px 79.4375px 79.4219px 79.4219px 79.4219px 79.4219px 79.4219px 79.4219px 79.4219px 79.4219px 79.4375px 79.4219px 79.4219px;
gap: normal 8px;
```

### Flex Patterns

| Direction/Wrap | Count |
|----------------|-------|
| row/nowrap | 288x |
| column/nowrap | 16x |
| row/wrap | 8x |
| column/wrap | 4x |

**Gap values:** `10px`, `11.2556px`, `1px`, `8px`, `normal 8px`

## Accessibility (WCAG 2.1)

**Overall Score: 84%** — 53 passing, 10 failing color pairs

### Failing Color Pairs

| Foreground | Background | Ratio | Level | Used On |
|------------|------------|-------|-------|---------|
| `#ffffff` | `#a7a7b4` | 2.38:1 | FAIL | div, span (9x) |
| `#ffffff` | `#e6dfe4` | 1.31:1 | FAIL | div (1x) |

### Passing Color Pairs

| Foreground | Background | Ratio | Level |
|------------|------------|-------|-------|
| `#ffffff` | `#787878` | 4.42:1 | AA |
| `#ffffff` | `#101214` | 18.77:1 | AAA |
| `#101214` | `#e6dfe4` | 14.34:1 | AAA |
| `#101214` | `#a7a7b4` | 7.89:1 | AAA |
| `#101214` | `#ffffff` | 18.77:1 | AAA |
| `#a399a8` | `#101214` | 6.86:1 | AA |
| `#101214` | `#dad3dc` | 12.81:1 | AAA |
| `#000000` | `#e6dfe4` | 16.04:1 | AAA |
| `#101214` | `#ff4f36` | 5.74:1 | AAA |
| `#101214` | `#dfd8de` | 13.42:1 | AAA |

## Design System Score

**Overall: 68/100 (Grade: D)**

| Category | Score |
|----------|-------|
| Color Discipline | 85/100 |
| Typography Consistency | 70/100 |
| Spacing System | 40/100 |
| Shadow Consistency | 75/100 |
| Border Radius Consistency | 40/100 |
| Accessibility | 84/100 |
| CSS Tokenization | 100/100 |

**Strengths:** Tight, disciplined color palette, Good CSS variable tokenization

**Issues:**
- 12 distinct font sizes — consider a tighter type scale
- No consistent spacing base unit detected — values appear arbitrary
- 9 unique border radii — standardize to 3-4 values
- 10 WCAG contrast failures
- 34 !important rules — prefer specificity over overrides
- 3228 duplicate CSS declarations

## Gradients

**8 unique gradients** detected.

| Type | Direction | Stops | Classification |
|------|-----------|-------|----------------|
| linear | to right | 4 | bold |
| linear | to right | 2 | brand |
| linear | to right | 5 | complex |
| linear | 0deg | 2 | brand |
| linear | to top | 5 | complex |
| linear | to right | 5 | complex |
| linear | to right | 4 | bold |
| radial | circle | 2 | brand |

```css
background: linear-gradient(to right, rgba(0, 0, 0, 0) 8px, rgb(255, 255, 255) 8px, rgb(255, 255, 255) calc(0% + 8px), rgba(0, 0, 0, 0) calc(0% + 8px));
background: linear-gradient(to right, rgb(84, 77, 86), rgb(84, 77, 86));
background: linear-gradient(to right, rgba(0, 0, 0, 0) 8px, rgb(84, 77, 86) 8px, rgb(84, 77, 86) 9px, rgba(0, 0, 0, 0) 9px, rgba(0, 0, 0, 0) calc(25% - 4px));
background: linear-gradient(0deg, rgb(16, 18, 20), rgb(16, 18, 20));
background: linear-gradient(to top, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0) calc(100% - 1px), rgb(255, 255, 255) calc(100% - 1px), rgb(255, 255, 255) 100%, rgba(0, 0, 0, 0) 100%);
```

## Z-Index Map

**13 unique z-index values** across 4 layers.

| Layer | Range | Elements |
|-------|-------|----------|
| modal | 1000,1000 | div.c.u.r.s.o.r. .-.m.m |
| dropdown | 100,999 | div.c.h.a.r.-.w.r.a.p. .-.f.-.p, div.p.i.x.e.l.s. .-.m.m. .-.u.p. .-.t.a.c, div.p.i.x.e.l.s. .-.m.m. .-.u.p. .-.t.a.c |
| sticky | 10,90 | div.b.-.w, div.b.-.w, section.c.-.t.r.a.n.s.i.t.i.o.n |
| base | 0,5 | div.s.t.o.r.m.-.b.g, section.c.-.s.t.o.r.m, div.v.e.h.i.c.l.e |

## SVG Icons

**19 unique SVG icons** detected. Dominant style: **filled**.

| Size Class | Count |
|------------|-------|
| xs | 1 |
| md | 5 |
| xl | 13 |

**Icon colors:** `rgb(163, 153, 168)`, `rgb(16, 18, 20)`, `rgb(255, 255, 255)`, `rgb(84, 77, 86)`, `rgb(230, 223, 228)`

## Font Files

| Family | Source | Weights | Styles |
|--------|--------|---------|--------|
| KHTeka | self-hosted | 400, normal | normal |
| KHTekaMono | self-hosted | 400, normal | normal |
| fdsi | self-hosted | 400 | normal |

## Image Style Patterns

| Pattern | Count | Key Styles |
|---------|-------|------------|
| thumbnail | 10 | objectFit: cover, borderRadius: 0px, shape: square |
| gallery | 1 | objectFit: cover, borderRadius: 0px, shape: square |
| general | 1 | objectFit: fill, borderRadius: 0px, shape: square |

**Aspect ratios:** 1:1 (10x), 2:1 (1x), 6.59:1 (1x)

## Quick Start

To recreate this design in a new project:

1. **Install fonts:** Add `KHTeka` from Google Fonts or your font provider
2. **Import CSS variables:** Copy `variables.css` into your project
3. **Tailwind users:** Use the generated `tailwind.config.js` to extend your theme
4. **Design tokens:** Import `design-tokens.json` for tooling integration

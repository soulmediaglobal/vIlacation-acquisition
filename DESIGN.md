---
name: Precision Ledger
colors:
  surface: '#faf9f6'
  surface-dim: '#dbdad7'
  surface-bright: '#faf9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f1'
  surface-container: '#efeeeb'
  surface-container-high: '#e9e8e5'
  surface-container-highest: '#e3e2e0'
  on-surface: '#1a1c1a'
  on-surface-variant: '#3c4a45'
  inverse-surface: '#2f312f'
  inverse-on-surface: '#f1f1ee'
  outline: '#6b7a75'
  outline-variant: '#bacac3'
  surface-tint: '#006b58'
  primary: '#006b58'
  on-primary: '#ffffff'
  primary-container: '#00c7a6'
  on-primary-container: '#004d3f'
  inverse-primary: '#3bdebc'
  secondary: '#565f6d'
  on-secondary: '#ffffff'
  secondary-container: '#dae3f4'
  on-secondary-container: '#5c6573'
  tertiary: '#585f6c'
  on-tertiary: '#ffffff'
  tertiary-container: '#aab1c0'
  on-tertiary-container: '#3d4451'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#61fbd7'
  primary-fixed-dim: '#3bdebc'
  on-primary-fixed: '#002019'
  on-primary-fixed-variant: '#005142'
  secondary-fixed: '#dae3f4'
  secondary-fixed-dim: '#bec7d7'
  on-secondary-fixed: '#131c28'
  on-secondary-fixed-variant: '#3e4755'
  tertiary-fixed: '#dce2f3'
  tertiary-fixed-dim: '#c0c7d6'
  on-tertiary-fixed: '#151c27'
  on-tertiary-fixed-variant: '#404754'
  background: '#faf9f6'
  on-background: '#1a1c1a'
  surface-variant: '#e3e2e0'
typography:
  headline-xl:
    fontFamily: DM Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: DM Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: DM Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.025em
  headline-sm:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.015em
  metric-display:
    fontFamily: DM Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.03em
  body-base:
    fontFamily: DM Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: -0.01em
  body-base-medium:
    fontFamily: DM Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: -0.01em
  body-compact:
    fontFamily: DM Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: -0.005em
  body-compact-medium:
    fontFamily: DM Sans
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: -0.005em
  caption:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0em
  caption-bold:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  table-header:
    fontFamily: DM Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  code-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: -0.01em
  numeric-data:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: -0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  space-2xs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-base: 1rem
  space-lg: 1.25rem
  space-xl: 1.5rem
  space-2xl: 2rem
  space-3xl: 3rem
  gutter-desktop: 1rem
  gutter-mobile: 0.75rem
  card-padding-dense: 0.75rem 1rem
  card-padding-relaxed: 1.25rem 1.5rem
  table-cell-padding-y: 0.5rem
  table-cell-padding-x: 0.75rem
---

## Brand & Style

This design system delivers an operational fintech platform built for high-throughput reconciliation, cash-flow monitoring, and ledger accounting. The audience consists of payment operations managers, financial controllers, and risk analysts who interact with data for extended working hours.

The emotional baseline is calculated authority, extreme precision, and reduced cognitive friction. The design movement embraces **Data-Dense Modern Minimalist**:
- **Utilitarian Surface Balance:** Information hierarchy is defined by structural hairline borders and intentional spacing rather than decorative accents or faux-depth artifacts.
- **Zero Illusion:** Drop shadows are eliminated. Surface differentiation relies solely on subtle background contrasts and hairline partitions.
- **Tactical Acceleration:** Accent color is deployed strictly for primary actionable states, confirmation workflows, and precise visual anchors.

## Colors

The palette is engineered for prolonged data consumption, leaning on an off-white canvas with cool dark slate ink to reduce screen glare.

### Core Canvas & Structure
- **Canvas Base:** `#FBFAF7` (warm off-white / unbleached paper tone) serves as the full-viewport application background.
- **Surface Elevation (Cards & Panels):** `#FFFFFF` pure white, creating natural, clean separation against the off-white canvas.
- **Structural Dividers & Outlines:** `#E5E7EB` crisp 1px borders across all cards, table cells, and module seams.
- **Secondary Subtle Lines:** `#F3F4F6` for dense nested dividers within sub-tables and metric splits.

### Typography & Content Tone
- **Ink Primary:** `#1B2430` (deep ink-navy) for high-contrast headlines, primary metrics, table values, and active interface labels.
- **Ink Muted:** `#6B7280` (neutral cool slate) for secondary metadata, tabular column headers, timestamps, and descriptive hints.
- **Ink Disabled:** `#9CA3AF` for inactive controls, null state notations, and placeholders.

### Accents & Operational State Signals
- **Brand & Action Accent:** `#00C7A6` (electric mint-teal). Used exclusively for primary interactive components, active pagination numbers, focused input borders, and primary CTA buttons. Hover shifts to `#00A88C`, active to `#008C75`.
- **Status Signal: Hot / Urgent:** `#EF4444` (crimson red) paired with a background tint of `#FEF2F2` for settlement exceptions, disputes, critical chargebacks, and downward variance.
- **Status Signal: Warm / Pending:** `#F59E0B` (amber orange) paired with a background tint of `#FFFBEB` for manual review flags, pending escrow, and routing delays.
- **Status Signal: Cold / Info:** `#3B82F6` (cobalt blue) paired with a background tint of `#EFF6FF` for scheduled transfers, batched ACH clears, and audit logs.
- **Status Signal: Success:** `#10B981` (emerald green) paired with `#ECFDF5` for completed transactions and matched ledgers.

## Typography

Typography balances clean neo-grotesque readability with monospaced data precision.

- **Primary Interface Font:** `DM Sans` handles navigation, headers, controls, and standard body text. Tabular numbers (`font-variant-numeric: tabular-nums`) must be active globally across DM Sans to ensure multi-row numbers align vertically without jitter.
- **Monospaced Data Font:** `JetBrains Mono` is reserved for technical identifiers (API keys, transaction UUIDs, authorization tokens, IBANs) and strictly aligned numerical tables.
- **Scale Hierarchy Rules:**
  - Table column labels use `table-header` in uppercase format with subtle letter-spacing (`0.04em`) to establish visual separation from the row data underneath.
  - Financial tallies and currency indicators use `numeric-data` or `metric-display`, aligned right whenever displayed in tabular views.
  - Inline descriptions and secondary card headers stay within `body-compact` to maintain compact density.

## Layout & Spacing

The architecture operates on an 8-point baseline grid with a 4-point micro-adjustment scale specifically tuned for enterprise-grade data density.

### Layout Philosophy
- **Structure:** Fluid grid bounded inside a maximized viewport wrapper. Content stretches dynamically to span wide multi-monitor desktop setups, using max-width containment only on transactional detail drawers.
- **Screen Distribution:**
  - **Desktop (1280px+):** Fixed 240px collateral navigation sidebar, fluid operational workspace broken into a 12-column grid system with 16px (`gutter-desktop`) gutters and 24px outer safe margins.
  - **Tablet (768px - 1279px):** Collapsible 64px icon-only rail, 8-column layout with 16px gutters, horizontal scrolling panels for financial tables.
  - **Mobile (< 768px):** Off-canvas bottom-sheet navigation, 4-column layout with 12px (`gutter-mobile`) gutters, card-wrapped single records replacing wide horizontal data tables.

### Data Grid Rhythm
Table row heights are strictly calibrated:
- Standard dense row height: `36px` to `40px` max.
- Vertical cell padding: `8px` (`space-sm`).
- Horizontal cell padding: `12px` (`space-md`).
- Multi-metric KPI top strips use `12px` to `16px` padding to balance breathing room with immediate scan density.

## Elevation & Depth

This system avoids ambient blur and floating shadows, adopting a purely planar architectural style with distinct boundary containment.

- **Zero Drop Shadow Policy:** No `box-shadow` values are used to represent elevation. Depth is created through surface contrast and crisp 1px borders (`#E5E7EB`).
- **Surface Layer Hierarchy:**
  - **Layer 0 (Canvas):** `#FBFAF7` – the base layout substrate visible in gaps, page margins, and navigation sidebars.
  - **Layer 1 (Containers & Data Tables):** Pure `#FFFFFF` resting on `#FBFAF7`, framed by a solid 1px `#E5E7EB` border.
  - **Layer 2 (Embedded Tables, Input Fields & Filter Trays):** Pure `#FFFFFF` or `#FBFAF7` enclosed inside 1px `#E5E7EB` internal containers.
  - **Layer 3 (Overlays, Flyouts & Modals):** `#FFFFFF` surfaces bounded by an intensified border of 1px `#1B2430` at 15% alpha, backed by an unblurred dark overlay scrim (`rgba(27, 36, 48, 0.4)`).
- **Interactive Focus States:** Active or selected rows transition their background to `#F9FAFB`. Focused input controls rely on a solid 1px `#00C7A6` outline accompanied by an outer `0 0 0 1px #00C7A6` ring with zero blur.

## Shapes

The interface balances sharp architectural utility with subtle corner softening to avoid visual fatigue across dense data matrices.

- **Standard Cards, Data Grids & Modals:** Radius of `8px` (`0.5rem`). This provides crisp compartmentalization without appearing blunt or brutalist.
- **Buttons, Text Inputs & Dropdown Triggers:** Radius of `6px` to `8px` (`0.375rem` - `0.5rem`) maintaining proportional harmony with nested tabular containers.
- **Status Badges, Filter Pills & Tags:** Radius of `4px` (`0.25rem`) to ensure high text density within table rows; avoids pill-shaped ovals which waste horizontal space.
- **Structural Lines:** Border widths are locked strictly at `1px` (or `0.5px` on high-DPI displays where supported by web renderers) using solid styles. Double borders, grooved borders, or dashed borders are disallowed except for file upload drop targets (`1px dashed #E5E7EB`).

## Components

### Buttons
- **Primary:** Background `#00C7A6`, label `#1B2430` (high-contrast deep slate) with weight `500` or `600`, radius `6px`, padding `6px 14px`, height `32px` (dense) or `36px` (regular). Hover: `#00A88C`. Active: `#008C75`.
- **Secondary / Default:** Background `#FFFFFF`, border `1px solid #E5E7EB`, label `#1B2430`, height `32px`. Hover: background `#F9FAFB`, border `#D1D5DB`.
- **Ghost / Subtle:** Background transparent, border none, label `#6B7280`. Hover: background `#F3F4F6`, label `#1B2430`.
- **Destructive:** Background `#FFFFFF`, border `1px solid #EF4444`, label `#EF4444`. Hover: background `#FEF2F2`.

### Inputs & Select Fields
- **Container:** Background `#FFFFFF`, border `1px solid #E5E7EB`, height `32px` for dense operational forms, radius `6px`, horizontal padding `10px`.
- **Typography:** DM Sans 13px, color `#1B2430`. Placeholder `#9CA3AF`.
- **Focus State:** Border color `#00C7A6`, box-shadow `0 0 0 1px #00C7A6`.
- **Monospace Variant:** Fields accepting card numbers, routing codes, IBANs, or API keys switch typography automatically to `JetBrains Mono` 12px.

### Badges & Operational Status Chips
- **Geometry:** Height `20px`, padding `2px 6px`, radius `4px`, font size `11px`, weight `600`, text-transform uppercase or title case.
- **Hot (Critical / Failed):** Background `#FEF2F2`, border `1px solid #FECACA`, text `#EF4444`.
- **Warm (Review / Warning):** Background `#FFFBEB`, border `1px solid #FDE68A`, text `#D97706`.
- **Cold (Processing / Pending):** Background `#EFF6FF`, border `1px solid #BFDBFE`, text `#2563EB`.
- **Success (Cleared / Settled):** Background `#ECFDF5`, border `1px solid #A7F3D0`, text `#059669`.
- **Neutral (Archived / Closed):** Background `#F3F4F6`, border `1px solid #E5E7EB`, text `#6B7280`.

### Data Tables (The Primary Operational Workhorse)
- **Container:** Pure `#FFFFFF` background, wrapped in a continuous `1px solid #E5E7EB` border.
- **Header Row:** Background `#FBFAF7`, height `32px`, border-bottom `1px solid #E5E7EB`. Headers use `DM Sans` 11px uppercase, font weight `600`, color `#6B7280`.
- **Data Rows:** Height `36px` to `40px`. Border bottom `1px solid #F3F4F6`. Hover state: `#F9FAFB`.
- **Alignment Rules:** Left-align alphanumeric entities and descriptions; right-align currency, percentages, and quantity columns; center status badges.
- **Cell Content:** Text truncation using an ellipsis with hover tooltips; identifiers set in `JetBrains Mono`.

### Cards & Metric Panels
- **Structure:** `#FFFFFF` background, `1px solid #E5E7EB` border, radius `8px`.
- **Metric Header:** 12px `DM Sans` bold/uppercase label in `#6B7280`, accompanied by an optional top-right micro trend badge.
- **Metric Figure:** 28px `DM Sans` semi-bold in `#1B2430`.
- **Metric Footer:** 12px description detailing delta vs. previous settlement cycle with a directional `#10B981` (up) or `#EF4444` (down) inline icon indicator.

### Checkboxes & Selection Controls
- **Geometry:** 14px x 14px square, radius `3px`, border `1px solid #D1D5DB`.
- **Checked State:** Background `#00C7A6`, border-color `#00C7A6`, checkmark icon in `#1B2430` (maximum visible contrast against mint teal).
- **Indeterminate State:** Solid `-` horizontal dash in `#1B2430` centered over `#00C7A6`.
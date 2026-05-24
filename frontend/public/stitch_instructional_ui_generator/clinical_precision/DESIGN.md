---
name: Clinical Precision
colors:
  surface: '#faf8ff'
  surface-dim: '#d9d9e5'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3fe'
  surface-container: '#ededf9'
  surface-container-high: '#e7e7f3'
  surface-container-highest: '#e1e2ed'
  on-surface: '#191b23'
  on-surface-variant: '#434655'
  inverse-surface: '#2e3039'
  inverse-on-surface: '#f0f0fb'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#943700'
  on-tertiary: '#ffffff'
  tertiary-container: '#bc4800'
  on-tertiary-container: '#ffede6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#faf8ff'
  on-background: '#191b23'
  surface-variant: '#e1e2ed'
  slate-dark: '#1E293B'
  slate-muted: '#64748B'
  mint-bg: '#F0FDFA'
  warning-orange: '#F59E0B'
  critical-red: '#EF4444'
  surface-off-white: '#F8FAFC'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1440px
  sidebar-width: 260px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style

The design system is engineered for high-stakes healthcare environments where clarity, speed, and trust are paramount. The brand personality is **authoritative yet empathetic**, balancing the clinical rigor of a hospital with the accessibility of modern consumer software. It targets medical administrators, doctors, and nurses who require a low-cognitive-load interface during long shifts.

The design style is **Corporate / Modern** with subtle **Glassmorphic** influences. It utilizes a high-ratio of whitespace ("Airy layout") to prevent data density from becoming overwhelming. Visual depth is achieved through layered surfaces and tonal shifts rather than heavy shadows, ensuring the interface feels lightweight and performant. The aesthetic is "clinical-fresh"—avoiding the sterile coldness of legacy systems in favor of a vibrant, health-focused palette.

## Colors

The color strategy prioritizes legibility and functional signaling. 
- **Primary (Medical Blue):** Used for primary actions, active navigation states, and branding. It evokes professional trust.
- **Secondary (Mint/Teal):** Used for "healing" actions, success states, and secondary accents to soften the interface.
- **Neutral (Slate):** Dark Slate is reserved for high-contrast typography (AA/AAA compliant), while Muted Slate is used for borders and secondary labels.
- **Semantic Colors:** Critical Red, Warning Orange, and Success Green are used strictly for status indicators and destructive actions.

The system uses a default **Light Mode** to maintain a clinical, clean appearance, utilizing `surface-off-white` as the base canvas to reduce eye strain.

## Typography

This design system uses **Inter** exclusively to ensure maximum legibility across data-heavy tables and complex forms. 

- **Scale:** A modular scale is used to create clear hierarchy. 
- **Weights:** Regular (400) for body text, Medium (500) for UI labels, and Semi-Bold (600) to Bold (700) for headings.
- **Readability:** Line heights are set generously (1.6 for body) to improve scanability of patient records.
- **Labels:** Small labels use a slight tracking increase and uppercase transform for categorization (e.g., Blood Group tags).

## Layout & Spacing

The layout utilizes a **Sidebar Dashboard** model. 
- **Desktop:** A fixed 260px sidebar with a fluid main content area. Content is contained within a 1440px max-width wrapper for readability.
- **Grid:** A 12-column grid is used for dashboard layouts, with cards typically spanning 3 columns (KPIs) or 6 columns (Charts/Lists).
- **Rhythm:** An 8px base unit drives all spacing.
- **Adaptation:** On tablets, the sidebar collapses into an icon-only rail. On mobile, the sidebar becomes a hidden drawer accessed via a hamburger menu in the Top Navbar. Margins compress from 32px to 16px to maximize screen real estate.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Ambient Shadows**:
- **Level 0 (Base):** `surface-off-white` (#F8FAFC).
- **Level 1 (Cards/Surface):** Pure White (#FFFFFF) with a very soft, diffused shadow (0px 4px 20px rgba(30, 41, 59, 0.05)).
- **Level 2 (Modals/Popovers):** Pure White with a more pronounced shadow (0px 10px 30px rgba(30, 41, 59, 0.1)) and a 1px soft border (#E2E8F0).
- **Glassmorphism:** Used sparingly for the Sidebar and Top Navbar to maintain context of the background content, utilizing a 12px backdrop-blur and 80% opacity.

## Shapes

The shape language is **Rounded**, favoring an approachable and modern medical aesthetic. 
- **UI Elements (Inputs, Buttons):** 0.5rem (8px) radius.
- **Large Containers (Cards, Modals):** 1rem (16px) radius.
- **Tags/Pills (Status, Blood Group):** Fully rounded (Pill-shaped) to distinguish them from interactive buttons.

## Components

### Buttons
- **Primary:** Medical Blue background, White text. High-contrast, 8px radius.
- **Secondary:** Mint Green tint background (#ECFDF5) with Teal text.
- **Ghost:** No background, Slate text, visible on hover.

### Form Inputs
- **Text Fields:** White background, 1px Slate-200 border. On focus: 1px Primary Blue border with a soft blue outer glow.
- **Validation:** Error states use a red border and a 12px helper text icon.

### Data Tables
- Row hover states use `mint-bg`.
- Header cells use `label-sm` typography with a subtle bottom border.
- Vertical lines are avoided; use horizontal rules only for a cleaner, "airy" look.

### Cards
- Dashboard KPI cards feature a 16px padding, `headline-md` for metrics, and a small sparkline chart (Primary Blue or Secondary Teal).

### Status Chips
- **Confirmed:** Green background (10% opacity), Green text.
- **Pending:** Orange background (10% opacity), Orange text.
- **Canceled:** Red background (10% opacity), Red text.
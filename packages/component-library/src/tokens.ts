enum BreakpointNames {
  small = 'small',
  medium = 'medium',
  wide = 'wide',
}

type NumericBreakpoints = {
  [key in BreakpointNames]: number;
};

export const breakpoints: NumericBreakpoints = {
  small: 512,
  medium: 730,
  wide: 1100,
};

type BreakpointsPx = {
  [B in keyof NumericBreakpoints as `breakpoint_${B}`]: string;
};

// Provide the same breakpoints in a form usable by CSS media queries
// {
//   breakpoint_small: '512px',
//   breakpoint_medium: '740px',
//   breakpoint_wide: '1100px',
// }
export const tokens: BreakpointsPx = Object.entries(
  breakpoints,
).reduce<BreakpointsPx>(
  (acc, [key, val]) => ({
    ...acc,
    [`breakpoint_${key}`]: `${val}px`,
  }),
  {} as BreakpointsPx,
);

// Corner radius scale. Softer corners read as more contemporary; the scale is
// deliberately short so nested surfaces stay visually related.
export const radius = {
  none: 0,
  /** Hairline insets and small indicators */
  xxs: 3,
  /** Dense surfaces: table cells, inline chips, compact controls */
  xs: 6,
  /** Inputs, buttons, pills */
  sm: 8,
  /** Cards, containers, tooltips */
  md: 10,
  /** Floating surfaces: menus, popovers, modals */
  lg: 12,
  /** Large hero surfaces */
  xl: 16,
  /** Fully rounded */
  pill: 9999,
} as const;

// Layered shadows. Each level pairs a tight contact shadow with a wider,
// lower-opacity ambient one, so edges read as diffused light rather than a
// hard offset band stamped under the element.
export const shadows = {
  /** Barely-lifted surfaces that still need separation from the background */
  xs: '0 1px 2px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.06)',
  /** Resting cards and raised rows */
  sm: '0 1px 2px rgba(0, 0, 0, 0.04), 0 2px 6px rgba(0, 0, 0, 0.07)',
  /** Cards and hovered/raised surfaces */
  md: '0 1px 2px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.08)',
  /** Floating surfaces: menus, popovers, tooltips, modals */
  lg: '0 2px 4px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.1), 0 16px 40px rgba(0, 0, 0, 0.06)',
} as const;

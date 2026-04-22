// React Theme — extracted from https://string-tune.fiddle.digital/
// Compatible with: Chakra UI, Stitches, Vanilla Extract, or any CSS-in-JS

/**
 * TypeScript type definition for this theme:
 *
 * interface Theme {
 *   colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    neutral50: string;
    neutral100: string;
    neutral200: string;
    neutral300: string;
    neutral400: string;
 *   };
 *   fonts: {
    body: string;
    mono: string;
 *   };
 *   fontSizes: {
    '14': string;
    '20': string;
    '225.28': string;
    '112.205': string;
    '84.1745': string;
    '63.1467': string;
    '47.3719': string;
    '35.5378': string;
    '26.66': string;
    '17.92': string;
    '15.0038': string;
    '11.2556': string;
 *   };
 *   space: {
    '0': string;
    '7': string;
    '20': string;
    '27': string;
    '32': string;
    '36': string;
    '42': string;
    '45': string;
    '52': string;
    '61': string;
    '85': string;
    '99': string;
    '112': string;
    '120': string;
    '150': string;
    '154': string;
 *   };
 *   radii: {
    md: string;
    lg: string;
    xl: string;
    full: string;
 *   };
 *   shadows: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
 *   };
 *   states: {
 *     hover: { opacity: number };
 *     focus: { opacity: number };
 *     active: { opacity: number };
 *     disabled: { opacity: number };
 *   };
 * }
 */

export const theme = {
  "colors": {
    "primary": "#101214",
    "secondary": "#e6dfe4",
    "accent": "#e6dfe4",
    "background": "#101214",
    "foreground": "#ffffff",
    "neutral50": "#ffffff",
    "neutral100": "#544d56",
    "neutral200": "#a399a8",
    "neutral300": "#a7a7b4",
    "neutral400": "#787878"
  },
  "fonts": {
    "body": "'Manrope', sans-serif",
    "mono": "'KHTekaMono', monospace"
  },
  "fontSizes": {
    "14": "14px",
    "20": "20px",
    "225.28": "225.28px",
    "112.205": "112.205px",
    "84.1745": "84.1745px",
    "63.1467": "63.1467px",
    "47.3719": "47.3719px",
    "35.5378": "35.5378px",
    "26.66": "26.66px",
    "17.92": "17.92px",
    "15.0038": "15.0038px",
    "11.2556": "11.2556px"
  },
  "space": {
    "0": "0px",
    "7": "7px",
    "20": "20px",
    "27": "27px",
    "32": "32px",
    "36": "36px",
    "42": "42px",
    "45": "45px",
    "52": "52px",
    "61": "61px",
    "85": "85px",
    "99": "99px",
    "112": "112px",
    "120": "120px",
    "150": "150px",
    "154": "154px"
  },
  "radii": {
    "md": "8px",
    "lg": "15px",
    "xl": "20px",
    "full": "50px"
  },
  "shadows": {
    "xs": "rgba(120, 120, 120, 0.25) 1px 0px 0px 0px inset, rgba(120, 120, 120, 0.25) -1px 0px 0px 0px inset",
    "sm": "rgba(16, 18, 20, 0.1) 0px 0px 8px 4px inset",
    "md": "rgba(16, 18, 20, 0.05) 0px 0px 16px 2px inset, rgba(84, 77, 86, 0.05) 0px 16px 16px 0px",
    "lg": "rgba(84, 77, 86, 0.15) 0px 8px 24px 0px"
  },
  "states": {
    "hover": {
      "opacity": 0.08
    },
    "focus": {
      "opacity": 0.12
    },
    "active": {
      "opacity": 0.16
    },
    "disabled": {
      "opacity": 0.38
    }
  }
};

// MUI v5 theme
export const muiTheme = {
  "palette": {
    "primary": {
      "main": "#101214",
      "light": "hsl(210, 11%, 22%)",
      "dark": "hsl(210, 11%, 10%)"
    },
    "secondary": {
      "main": "#e6dfe4",
      "light": "hsl(317, 12%, 95%)",
      "dark": "hsl(317, 12%, 74%)"
    },
    "background": {
      "default": "#101214",
      "paper": "#e6dfe4"
    },
    "text": {
      "primary": "#ffffff",
      "secondary": "#544d56"
    }
  },
  "typography": {
    "fontFamily": "'KHTekaMono', sans-serif",
    "h1": {
      "fontSize": "35.5378px",
      "fontWeight": "400",
      "lineHeight": "34.56px"
    }
  },
  "shape": {
    "borderRadius": 8
  },
  "shadows": [
    "rgba(120, 120, 120, 0.25) 1px 0px 0px 0px inset, rgba(120, 120, 120, 0.25) -1px 0px 0px 0px inset",
    "rgba(16, 18, 20, 0.4) 0px 0px 8px 4px inset, rgba(84, 77, 86, 0.05) 0px 16px 16px 0px",
    "rgba(16, 18, 20, 0.1) 0px 0px 8px 4px inset",
    "rgba(16, 18, 20, 0.05) 0px 0px 16px 2px inset, rgba(84, 77, 86, 0.05) 0px 16px 16px 0px",
    "rgba(84, 77, 86, 0.1) 0px 8px 16px 0px"
  ]
};

export default theme;

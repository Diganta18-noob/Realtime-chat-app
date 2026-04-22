/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
    colors: {
        primary: {
            '50': 'hsl(NaN, NaN%, 97%)',
            '100': 'hsl(NaN, NaN%, 94%)',
            '200': 'hsl(NaN, NaN%, 86%)',
            '300': 'hsl(NaN, NaN%, 76%)',
            '400': 'hsl(NaN, NaN%, 64%)',
            '500': 'hsl(NaN, NaN%, 50%)',
            '600': 'hsl(NaN, NaN%, 40%)',
            '700': 'hsl(NaN, NaN%, 32%)',
            '800': 'hsl(NaN, NaN%, 24%)',
            '900': 'hsl(NaN, NaN%, 16%)',
            '950': 'hsl(NaN, NaN%, 10%)',
            DEFAULT: '#101214'
        },
        secondary: {
            '50': 'hsl(NaN, NaN%, 97%)',
            '100': 'hsl(NaN, NaN%, 94%)',
            '200': 'hsl(NaN, NaN%, 86%)',
            '300': 'hsl(NaN, NaN%, 76%)',
            '400': 'hsl(NaN, NaN%, 64%)',
            '500': 'hsl(NaN, NaN%, 50%)',
            '600': 'hsl(NaN, NaN%, 40%)',
            '700': 'hsl(NaN, NaN%, 32%)',
            '800': 'hsl(NaN, NaN%, 24%)',
            '900': 'hsl(NaN, NaN%, 16%)',
            '950': 'hsl(NaN, NaN%, 10%)',
            DEFAULT: '#e6dfe4'
        },
        accent: {
            '50': 'hsl(NaN, NaN%, 97%)',
            '100': 'hsl(NaN, NaN%, 94%)',
            '200': 'hsl(NaN, NaN%, 86%)',
            '300': 'hsl(NaN, NaN%, 76%)',
            '400': 'hsl(NaN, NaN%, 64%)',
            '500': 'hsl(NaN, NaN%, 50%)',
            '600': 'hsl(NaN, NaN%, 40%)',
            '700': 'hsl(NaN, NaN%, 32%)',
            '800': 'hsl(NaN, NaN%, 24%)',
            '900': 'hsl(NaN, NaN%, 16%)',
            '950': 'hsl(NaN, NaN%, 10%)',
            DEFAULT: '#e6dfe4'
        },
        'neutral-50': '#ffffff',
        'neutral-100': '#544d56',
        'neutral-200': '#a399a8',
        'neutral-300': '#a7a7b4',
        'neutral-400': '#787878',
        background: '#101214',
        foreground: '#ffffff'
    },
    fontFamily: {
        sans: [
            'KHTeka',
            'sans-serif'
        ],
        body: [
            'Manrope',
            'sans-serif'
        ]
    },
    fontSize: {
        '14': [
            '14px',
            {
                lineHeight: '19.6px'
            }
        ],
        '20': [
            '20px',
            {
                lineHeight: '24px'
            }
        ],
        '225.28': [
            '225.28px',
            {
                lineHeight: '168.455px',
                letterSpacing: '-13.5168px'
            }
        ],
        '112.205': [
            '112.205px',
            {
                lineHeight: '88.4294px',
                letterSpacing: '-2.24409px'
            }
        ],
        '84.1745': [
            '84.1745px',
            {
                lineHeight: '66.3386px',
                letterSpacing: '-1.68349px'
            }
        ],
        '63.1467': [
            '63.1467px',
            {
                lineHeight: '75.776px'
            }
        ],
        '47.3719': [
            '47.3719px',
            {
                lineHeight: '41.472px',
                letterSpacing: '-0.947437px'
            }
        ],
        '35.5378': [
            '35.5378px',
            {
                lineHeight: '34.56px',
                letterSpacing: '-0.710756px'
            }
        ],
        '26.66': [
            '26.66px',
            {
                lineHeight: '28.8px',
                letterSpacing: '-0.5332px'
            }
        ],
        '17.92': [
            '17.92px',
            {
                lineHeight: '25.088px'
            }
        ],
        '15.0038': [
            '15.0038px',
            {
                lineHeight: '18.0045px'
            }
        ],
        '11.2556': [
            '11.2556px',
            {
                lineHeight: '13.5068px'
            }
        ]
    },
    spacing: {
        '0': '0px',
        '1': '7px',
        '2': '20px',
        '3': '27px',
        '4': '32px',
        '5': '36px',
        '6': '42px',
        '7': '45px',
        '8': '52px',
        '9': '61px',
        '10': '85px',
        '11': '99px',
        '12': '112px',
        '13': '120px',
        '14': '150px',
        '15': '154px',
        '16': '195px',
        '17': '225px',
        '18': '256px'
    },
    borderRadius: {
        md: '8px',
        lg: '15px',
        xl: '20px',
        full: '50px'
    },
    boxShadow: {
        xs: 'rgba(120, 120, 120, 0.25) 1px 0px 0px 0px inset, rgba(120, 120, 120, 0.25) -1px 0px 0px 0px inset',
        sm: 'rgba(16, 18, 20, 0.1) 0px 0px 8px 4px inset',
        md: 'rgba(16, 18, 20, 0.05) 0px 0px 16px 2px inset, rgba(84, 77, 86, 0.05) 0px 16px 16px 0px',
        lg: 'rgba(84, 77, 86, 0.15) 0px 8px 24px 0px'
    },
    screens: {
        lg: '1024px',
        '1440px': '1440px',
        '2xl': '1600px',
        '1920px': '1920px',
        '2560px': '2560px'
    },
    transitionDuration: {
        '0': '0s',
        '150': '0.15s',
        '300': '0.3s',
        '450': '0.45s',
        '600': '0.6s',
        '750': '0.75s',
        '900': '0.9s',
        '975': '0.975s',
        '1200': '1.2s',
        '1500': '1.5s',
        '1800': '1.8s',
        '3000': '3s',
        '6000': '6s'
    },
    transitionTimingFunction: {
        custom: 'cubic-bezier(0.22, 0.31, 0, 1)'
    },
    container: {
        center: true,
        padding: '0px'
    },
    maxWidth: {
        container: '100%'
    }
},
  },
};

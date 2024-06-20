module.exports = {
  content: ["./src/**/*.{html,ts}", "./projects/**/*.{html,ts}"],
  darkMode: "media",
  theme: {
    fontFamily: {
      display: ["Open Sans"],
      body: ["Open Sans"],
    },
    container: {
      center: true,
      padding: "1.5rem",
    },
    extend: {
      // colors: {
      //   primary: 'var(--primary-color)',
      //   danger: 'var(--danger)',
      //   success: 'var(--sucess)',
      //   warning: 'var(--warning)',
      //   maskbg: 'var(--maskbg)',
      //   'text-color': 'var(--text-color)',
      //   'text-color-secondary': 'var(--text-color-secondary)',
      //   'primary-text': 'var(--primary-color-text)',
      //   'input-border-color': 'var(--input-border-color)',
      //   'border-color': 'var(--border-color)',
      //   'sell-color': 'var(--sell-color)',
      //   'buy-color': 'var(--buy-color)',
      //   'buy-bg-color': 'var(--buy-bg-color)',
      //   'blue-color': 'var(--blue-color)',
      //   'bg-color': 'var(--background-color)',
      //   'panel-color': 'var(--panel-color)',
      //   'input-bg': 'var(--input-background)',
      //   'btn-bg': 'var(--btn-background)',
      //   'panel-overlay-color': 'var(--panel-overlay-color)',
      //   'backdrop-color': 'var(--backdrop-color)',
      //   'hr-color': 'var(--hr-color)',
      //   'text-color-tertiary': 'var(--text-color-tertiary)',
      //   'table-border-color': 'var(--table-border-color)',
      //   'table-text-color': 'var(--table-text-color)',
      //   'table-text-color-secondary': 'var(--table-text-color-secondary)',
      //   'blue-color2': 'var(--blue-color2)',
      //   'light-silver': 'var(--light-silver)',
      //   'ultramarine-blue': 'var(--ultramarine-blue)',
      //   'bright-gray': 'var(--bright-gray)',
      //   'ghost-white': 'var(--ghost-white)',
      //   'black-coral': 'var(--black-coral)',
      //   cultured: 'var(--cultured)',
      //   'panel-color2': 'var(--panel-color2)',
      //   'blue-jeans': 'var(--blue-jeans)',
      //   'text-color-title': 'var(--text-color-title)',
      //   'primary-color2': 'var(--primary-color2)',
      //   'primary-color2-rgba': 'var(--primary-color2-rgba)',
      //   success2: 'var(--success2)',
      //   'bg-color2': 'var(--background-color2)',
      //   'bg-color3': 'var(--background-color3)',
      //   'dropdown-bg': 'var(--dropdown-bg)',
      //   'gray-custom-400': 'var(--gray-custom-400)',
      // },
      boxShadow: {
        menu: "0px 16px 56px rgba(0, 0, 0, 0.1)",
      },
      // fontSize: {
      //   xs: ".75rem",
      //   sm: ".875rem",
      //   base: "1rem",
      //   lg: "1.125rem",
      //   xl: "1.25rem",
      //   "2xl": "1.5rem",
      //   "3xl": "1.875rem",
      //   "3.2xl": "2rem",
      //   "4xl": "2.25rem",
      //   "5xl": "3rem",
      //   "6xl": "4rem",
      //   "7xl": "5rem",
      //   "8xl": "6rem",
      // },
      spacing: {
        0: "0px",
        0.5: "0.125rem",
        1: "0.25rem",
        1.5: "0.375rem",
        2: "0.5rem",
        2.5: "0.625rem",
        3: "0.75rem",
        3.5: "0.825rem",
        4: "1rem",
        12: "3rem",
        16: "4rem",
      },
      scale: {
        300: "3.0",
      },
      minHeight: {
        20: "20rem",
      },
      maxWidth: {
        0.9: "90%",
        48: "48rem",
        60: "60rem",
        0.45: "45%",
      },
      borderWidth: {
        1.5: "1.5px",
      },
      minWidth: {
        10: "10rem",
        8: "8rem",
        12.5: "12.5rem",
        "1/2": "50%",
      },
      height: {
        0.9: "90%",
        control: "56px",
      },
    },
    screens: {
      sm: "576px",
      // => @media (min-width: 576px) { ... }

      md: "678px",
      // => @media (min-width: 678px) { ... }

      lg: "992px",
      // => @media (min-width: 992px) { ... }

      xl: "1200px",
      // => @media (min-width: 1200px) { ... }

      "2xl": "1400px",
      // => @media (min-width: 1400px) { ... }
      "3xl": "1920px",
    },
  },
  plugins: [],
};

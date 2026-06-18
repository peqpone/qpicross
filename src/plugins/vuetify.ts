// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { md3 } from 'vuetify/blueprints';

// Vuetify
import { createVuetify } from 'vuetify';

export default createVuetify({
  blueprint: md3,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#f5f5f5',
          surface: '#ffffff',
          'on-background': '#333333',
        },
      },
      dark: {
        dark: true,
        colors: {
          background: '#1a1a1a',
          surface: '#242424',
          'on-background': '#d8d8d8',
        },
      },
    },
  },
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides

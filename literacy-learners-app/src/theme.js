import { createTheme } from '@mui/material/styles';

// Provided theme colors:
// #ffffef (Lightest - Background/Paper)
// #fdd05a (Yellow - Primary)
// #50c4a4 (Green/Teal - Secondary)
// #fe7835 (Orange - Accent/Warning)
// #cdf4d3 (Light Green - Subtle Accent/Info)
// #1a1a18 (Dark - Text)

const theme = createTheme({
  palette: {
    primary: {
      main: '#fdd05a', // Yellow
      contrastText: '#1a1a18', // Ensure text on primary is readable
    },
    secondary: {
      main: '#50c4a4', // Green/Teal
      contrastText: '#1a1a18', // Ensure text on secondary is readable
    },
    error: {
      main: '#fe7835', // Orange, often used for errors too, or specify a red if preferred
    },
    warning: {
      main: '#fe7835', // Orange
    },
    info: {
      main: '#cdf4d3', // Light Green
    },
    background: {
      default: '#ffffef', // Lightest color for overall background
      paper: '#ffffff',   // Default paper is white, but can use #ffffef or a slightly off-white variant if desired
    },
    text: {
      primary: '#1a1a18',   // Main text color
      secondary: '#4f4f4f', // Lighter text color, derive or specify
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    // You can customize h1, h2, button, etc. typography here later
  },
  // You can add overrides for specific components here later if needed
  // components: {
  //   MuiButton: {
  //     styleOverrides: {
  //       root: {
  //         borderRadius: 8, // Example global button border radius
  //       },
  //     },
  //   },
  // },
});

export default theme;

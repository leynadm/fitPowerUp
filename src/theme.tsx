import { createTheme } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";
import { PaletteOptions } from "@mui/material";
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    dbz: true;
    dbz_mini: true;
    dbz_save: true;
    dbz_clear: true;
    dbz_mini_icon: true;
  }
}

declare module "@mui/material/TextField" {
  interface TextFieldPropsVariantOverrides {
    dbz: true;
  }
}

// Extend the Typography interface to include the 'secondary' variant
declare module "@mui/material/styles" {
  interface TypographyVariants {
    secondary: React.CSSProperties;
  }

  // Allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    secondary?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    secondary: true;
  }
}

// Extend MUI theme types to include new palette properties
declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary']; // Define the new property type
  }

  interface PaletteOptions {
    neutral?: PaletteOptions['primary']; // Extend the options to include the new property
  }
}

// Extend the color property in Button to use the new `neutral` color type
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}
// Function to determine the theme mode based on Local Storage and system preferences
export const getThemeMode = (): 'light' | 'dark' => {
  // Check Local Storage for saved user preference
  const savedPreference = localStorage.getItem('darkMode');
  if (savedPreference !== null) {
    return JSON.parse(savedPreference) ? 'dark' : 'light';
  }

  // Default to system preference if no saved preference is found
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

console.log("logging theme mode:")
console.log(getThemeMode())
const theme = createTheme({

  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          fontFamily:"LuckiestGuy, Arial, sans-serif",
          '&:hover': {
            textDecoration: "underline", // Example hover effect
          },
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiButton: {
      styleOverrides: {},

      variants: [
        {
          props: { variant: "dbz" },
          style: {
            backgroundColor: "#FFA500",
            border: "2px solid #422800",
            borderRadius: "30px",
            boxShadow: "4px 4px 0 0 #422800",
            color: "#000",
            cursor: "pointer",
            display: "inline-block",

            fontSize: "1.5rem",
            padding: "0 8px",
            textAlign: "center",
            textDecoration: "none",
            userSelect: "none",
            WebkitUserSelect: "none",
            touchAction: "manipulation",

            "&:hover": {
              backgroundColor: "#520975",
              color: "#FFFFFF",
            },
            "&:active": {
              boxShadow: "2px 2px 0 0 #422800",
              transform: "translate(2px, 2px)",
            },
          },
        },
        {
          props: { variant: "dbz_save" },
          style: {
            backgroundColor: "#228B22",
            border: "2px solid #422800",
            borderRadius: "30px",
            boxShadow: "4px 4px 0 0 #422800",
            color: "white",
            cursor: "pointer",
            display: "inline-block",
            fontWeight: 600,
            fontSize: "1rem",
            padding: "0 8px",
            textAlign: "center",
            textDecoration: "none",
            userSelect: "none",
            WebkitUserSelect: "none",
            touchAction: "manipulation",

            "&:hover": {
              backgroundColor: "#520975",
              color: "#FFFFFF",
            },
            "&:active": {
              boxShadow: "2px 2px 0 0 #422800",
              transform: "translate(2px, 2px)",
            },
          },
        },

        {
          props: { variant: "dbz_mini_icon" },
          style: {
            backgroundColor: "#FFA500",
            border: "2px solid #422800",
            borderRadius: "30px",
            boxShadow: "4px 4px 0 0 #422800",
            color: "black",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "1rem",
            padding: "0 16px 0 16px",
            textAlign: "center",
            textDecoration: "none",
            userSelect: "none",
            WebkitUserSelect: "none",
            touchAction: "manipulation",
            display: "flex",
            gap: 2,
            "&:hover": {
              backgroundColor: "#520975",
              color: "#FFFFFF",
            },
            "&:active": {
              boxShadow: "2px 2px 0 0 #422800",
              transform: "translate(2px, 2px)",
            },
          },
        },

        {
          props: { variant: "dbz_mini" },
          style: {
            backgroundColor: "#FFA500",
            border: "2px solid #422800",
            borderRadius: "30px",
            boxShadow: "4px 4px 0 0 #422800",
            color: "black",
            cursor: "pointer",
            fontSize: "1rem",
            padding: "0 16px 0 16px",
            textAlign: "center",
            textDecoration: "none",
            userSelect: "none",
            WebkitUserSelect: "none",
            touchAction: "manipulation",
            "&:hover": {
              backgroundColor: "#520975",
              color: "#FFFFFF",
            },
            "&:active": {
              boxShadow: "2px 2px 0 0 #422800",
              transform: "translate(2px, 2px)",
            },
          },
        },

        {
          props: { variant: "dbz_clear" },
          style: {
            backgroundColor: "#808080",
            border: "2px solid #422800",
            borderRadius: "30px",
            boxShadow: "4px 4px 0 0 #422800",
            color: "white",
            cursor: "pointer",
            display: "inline-block",
            fontWeight: 600,
            fontSize: "1rem",
            padding: "0 8px",
            textAlign: "center",
            textDecoration: "none",
            userSelect: "none",
            WebkitUserSelect: "none",
            touchAction: "manipulation",

            "&:hover": {
              backgroundColor: "#ff0000",
              color: "#FFFFFF",
            },
            "&:active": {
              boxShadow: "2px 2px 0 0 #422800",
              transform: "translate(2px, 2px)",
            },
          },
        },
      ],
    },

    MuiSelect: {
      styleOverrides: {
        select: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#520975",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#520975", // Optional: Change color on hover
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#520975", // Optional: Change color when focused
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          "&.dbz-subvariant": {
            "& fieldset": {
              borderRadius: "25px",
            },
            "& .MuiInputBase-input": {
              padding: 0, // Adjust this as needed
            },
            "& .MuiInputBase-input.MuiInputBase-input": {
              padding: 0, // Adjust this as needed
            },
            "& .MuiInputBase-input:hover + fieldset": {
              border: `1px solid blue`,
              padding: 0,
            },
            "& .MuiInputBase-input:focus + fieldset": {
              border: `1px solid blue`,
              padding: 0,
            },
            "& label.Mui-focused": {
              color: "#520975",
            },
          },

          "& label.Mui-focused": {
            color: "#520975",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#520975",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#520975",
            },
            "&:hover fieldset": {
              borderColor: "#520975",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#520975",
            },
          },
        },
      },
    },

    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: "#520975",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#520975",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#520975",
            },
            "&:hover fieldset": {
              borderColor: "#520975",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#520975",
            },
          },
        },
      },
    },
  },

  colorSchemes:{
    dark:getThemeMode()==='dark'
  },

  palette: {

    primary: {
      main: "#01080a", // Deep black for intense DBZ energy
      light: "#303030", // Optional lighter version if needed
      dark: "#000000", // Darker version for contrast
      contrastText: "#FFFFFF", // White text for readability
    },
    secondary: {
      main: "#1c4595", // Bold blue for Saiyan aura
      light: "#4a6fb3", // Lighter blue for softer elements
      dark: "#102e72", // Dark blue for deeper accents
      contrastText: "#FFFFFF", // White for good contrast
    },
    success: {
      main: "#FF8C00", // Bright orange for Super Saiyan vibes
      light: "#ffb347", // Lighter orange for highlights
      dark: "#e67600", // Darker orange for strong accents
      contrastText: "#000000", // Black text for high contrast
    },
    neutral: {
      main: "#FFA500", // Bright orange similar to Goku's gi
      light: "#ffcc80", // Light orange for background or highlights
      dark: "#000", // Dark orange for deeper shades
      contrastText: "#000000", // Black text for contrast
    },
    error: {
      main: "#FF0000", // Red for danger or intense action
      light: "#ff4c4c", // Light red for warnings
      dark: "#b20000", // Dark red for deeper tones
      contrastText: "#FFFFFF", // White text for contrast
    },
    warning: {
      main: "#FFD700", // Gold, reminiscent of Super Saiyan aura
      light: "#ffe34f", // Light gold for warnings or subtle accents
      dark: "#b29600", // Dark gold for richer tones
      contrastText: "#000000", // Black text for readability
    },
    info: {
      main: "#00BFFF", // Cyan blue for special techniques like energy blasts
      light: "#66d9ff", // Lighter blue for softer elements
      dark: "#0080bf", // Dark blue for richer accents
      contrastText: "#FFFFFF", // White text for contrast
    },
    background: {
      default: "#f5f5f5", // Light gray for app background
      paper: "#ffffff", // White for cards and dialogs,
    },
    text: {
      primary: "#01080a", // Deep black for main text
      secondary: "#1c4595", // Blue for secondary text or accents
    },
  },

  typography: {
    fontFamily: "LuckiestGuy, Arial, sans-serif", // Default font
    secondary: {
      fontFamily: "Raleway, sans-serif", // Custom variant using the secondary font
    },
    button: {
      fontWeight: "lighter",
    },
    h1: {
      fontFamily: "LuckiestGuy, Arial, sans-serif", // Specific font for headers
    },
    h2: {
      fontFamily: "LuckiestGuy, Arial, sans-serif", // Specific font for headers
    },
    body1: {
      fontFamily: "LuckiestGuy, Arial, sans-serif", // Body text using 'Saiyan' font
    },
  },
  

  shape: {},
});

export default theme;

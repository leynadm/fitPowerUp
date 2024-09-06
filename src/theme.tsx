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


const theme = createTheme({
  components: {
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

  palette: {
    primary: {
      main: "#01080a",
    },
    secondary: {
      main: "#1c4595",
    },

    success: {
      main: "#FF8C00",
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
    }
  },
  shape: {},
});

export default theme;

import { createTheme } from "@mui/material";

export const colors = {
  primary: {
    main: "rgba(175, 82, 222, 1)",
    dark: "rgba(137, 68, 171, 1)",
    light: "rgba(245, 233, 251, 1)",
    extraLight: "#F7F7F7",
  },
  light: "#efefef",
  text: {
    primary: "#1A1D1F",
    neutral: "#6F767E",
  },
  error: "#EE2750",
  white: "#fff",
  gray: {
    light: "#F5F6F8",
  },
};

export const theme = createTheme({
  palette: {
    // default: {
    //   background: "rgba(234, 234, 234, 1)"
    // },
    primary: colors.primary,
    // white: colors.white,
    secondary: {
      light: "#FFFFFF",
      main: "#6F767E",
    },
    success: {
      main: "#34C759",
    },
    error: {
      main: "#EE2750",
    },
    warning: {
      main: "#F0681B",
    },
    text: {
      primary: "rgba(26, 29, 31, 1)",
      //   neutral: "rgba(111, 118, 126, 1)"
    },
    action: {
      disabled: "#858585",
    },
  },

  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          background: "transparent !important",
          // color: "#2A2A2A !important",
          ":hover": {
            background: "#f3eff9",
          },
          ":active": {
            background: "#d2c1ea",
          },
          "&.Mui-disabled": {
            color: "#E8EBEF",
          },
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: "Alexandria",
          position: "relative",
          "& .MuiInputAdornment-positionEnd": {
            minWidth: "45px",
          },
        },
        input: {
          fontSize: "14px",
          lineHeight: "21px",
          fontWeight: "500",
          "&::placeholder": {
            fontSize: 14,
            fontWeight: 300,
            color: "#676E85",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          alignItems: "center",
          borderRadius: "12px",
          backgroundColor: "rgba(255, 255, 255, 1)",
          color: "rgba(26,29,31,1) !important",
          // maxHeight: '52px',
          "&.Mui-disabled": {
            WebkitTextFillColor: colors.text.neutral,
            color: "#9CA1B2",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#E8EBEF !important",
            },
          },
          "&.MuiInputBase-adornedEnd": {
            paddingRight: "0px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: `2px solid  rgba(230,231,236,1)`,
            ":hover": {
              border: `2px solid  rgba(215,217,226,1)`,
            },
          },
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              border: `2px solid  #010000`,
            },
          },
          ".MuiOutlinedInput-input::placeholder": {
            color: colors.text.neutral,
            opacity: 1,
          },
          ".MuiOutlinedInput-input.Mui-disabled::placeholder": {
            color: "#9CA1B2",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontStyle: "normal",
          color: "#2A2A2A",
          fontSize: 16,
          fontWeight: 500,
          backgroundColor: "rgba(255, 255, 255, 1)",
          padding: "0px 8px",
          borderRadius: "4px",
          "&.Mui-focused": {
            color: `#010000`,
          },
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          background: "inherit",
          fontFamily: "Alexandria",
          fontStyle: "Normal",
          color: "#1A1D1F",
          //   height: "21px",
          lineHeight: "21px",
          fontSize: "14px",
          fontWeight: 400,
          gap: "8px !important",
          ":hover": {
            background: "#F9F2FD",
            padding: "8px, 10px, 8px, 10px",
            gap: "8px",
            borderRadius: "8px",
          },
          "&.Mui-selected": {
            backgroundColor: "turquoise",
            color: "white",
            fontWeight: 600,
          },
        },
      },
    },
    // MuiTab: {
    //   styleOverrides: {
    //     root: {
    //       textTransform: "none",
    //       fontFamily: "Alexandria !important",
    //       fontStyle: "Normal",
    //       color: colors.text.neutral,
    //       borderBottom: '2px solid #E6E7EC',
    //       "&.Mui-selected": {
    //         color: `rgba(175, 82, 222, 1)`
    //       },
    //       "& .MuiTabs-indicator": {
    //         backgroundColor: "rgba(175, 82, 222, 1)"
    //       }
    //     }

    //   }
    // },
    MuiButton: {
      styleOverrides: {
        sizeLarge: {
          height: "48px",
          borderRadius: "12px",
        },
        sizeMedium: {
          height: "44px",
          borderRadius: "12px",
        },
        sizeSmall: {
          height: "40px",
          borderRadius: "12px",
        },
        root: {
          padding: "0px 16px 0px 16px",
          gap: "4px",
          opacity: "0px",
          fontFamily: "Alexandria !important",
          fontStyle: "Normal",
          fontWeight: 600,
          fontSize: 14,
          minWidth: "44px",
        },
        text: {
          lineHeight: "18px",
          color: "rgba(255, 255, 255, 1)",
          ":hover": {
            boxShadow: "none",
            background: "none",
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "#83899F",
          fontFamily: "Alexandria",
          padding: "8px 12px",
          marginLeft: "0px",
          marginRight: "0px",
          fontSize: "12px",
          lineHeight: "18px",
          fontWeight: "400",
          "&.Mui-error": {
            color: "#d62348",
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          fontSize: "16px !important",
          marginRight: "0px !important",
        },
        label: {
          fontSize: "16px !important",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          "&.MuiTypography-root": {
            fontWeight: 400,
            fontSize: 14,
            fontFamily: "Alexandria !important",
          },
          "&.MuiTypography-inherit": {
            fontWeight: 400,
            fontSize: 14,
            fontFamily: "Alexandria !important",
          },
          "&.MuiTypography-h1": {
            fontWeight: 400,
            fontSize: 28,
            fontFamily: "Alexandria !important",
          },
          "&.MuiTypography-h2": {
            fontWeight: 500,
            fontSize: 20,
            fontFamily: "Alexandria !important",
          },
          "&.MuiTypography-h3": {
            fontWeight: 500,
            fontSize: 20,
            fontFamily: "Alexandria !important",
          },
          "&.MuiTypography-h4": {
            fontWeight: 400,
            fontSize: 16,
            fontFamily: "Alexandria !important",
          },
          "&.MuiTypography-h5": {
            fontWeight: 400,
            fontSize: 15,
            fontFamily: "Alexandria !important",
          },
          "&.MuiTypography-h6": {
            fontWeight: 300,
            fontSize: 14,
            fontFamily: "Alexandria !important",
          },
          "&.MuiTypography-subtitle1": {
            fontWeight: 400,
            fontSize: 13,
            fontFamily: "Alexandria !important",
          },
          "&.MuiTypography-subtitle2": {
            fontWeight: 400,
            fontSize: 12,
            fontFamily: "Alexandria !important",
          },
        },
      },
    },

    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontFamily: "Alexandria !important",
          fontStyle: "Normal",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          "&.MuiDrawer-paper": {
            backgroundColor: "red + important",
            fontFamily: "Alexandria !important",
          },
        },
      },
    },
  },
});

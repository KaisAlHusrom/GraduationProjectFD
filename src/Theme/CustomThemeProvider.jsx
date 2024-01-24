

//Theme
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';

//react
import { useMemo } from 'react';

//redux
import { useSelector } from 'react-redux';

//propTypes 
import propTypes from "prop-types"

const CustomThemeProvider = ({children}) => {
    //redux
    const mode = useSelector(state => state.modeSlice.mode)


    //Colors Based On Mode
    const getDesignTokens = (mode) => ({
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode
                text: {
                    primary: "rgba(0, 0, 0, 0.87)",
                    secondary: "rgba(0, 0, 0, 0.6)",
                    disabled: "rgba(0, 0, 0, 0.38)",
                },
                action: {
                    active: "rgba(0, 0, 0, 0.54)",
                    hover: "rgba(0, 0, 0, 0.04)",
                    selected: "rgba(0, 0, 0, 0.08)",
                    disabled: "rgba(0, 0, 0, 0.26)",
                    disabledBackground: "rgba(0, 0, 0, 0.12)",
                },
                background: {
                    default: "#fff",
                    paper: "#fff"
                },
                divider: "rgba(0, 0, 0, 0.12)"
            }
            : {
                // palette values for dark mode
                text: {
                    primary: "#fff",
                    secondary: "rgba(255, 255, 255, 0.7)",
                    disabled: "rgba(255, 255, 255, 0.5)",
                },
                action: {
                    active: "#fff",
                    hover: "rgba(255, 255, 255, 0.08)",
                    selected: "rgba(255, 255, 255, 0.16)",
                    disabled: "rgba(255, 255, 255, 0.3)",
                    disabledBackground: "rgba(255, 255, 255, 0.12)",
                },
                background: {
                    default: "#121212",
                    paper: "#111111"
                },
                divider: "rgba(255, 255, 255, 0.12)"
            }),
        
    });

    //theme
    const theme = useMemo(() =>  createTheme({

            typography: {
                fontFamily: 'Tajawal, sans-serif', // Use your custom font family here
                h1: {
                    fontSize: '6rem',
                    fontWeight: "300",
                    lineHeight: "1.167"
                },
                h2: {
                    fontSize: '3.75rem',
                    fontWeight: "300",
                    lineHeight: "1.2"
                },
                h3: {
                    fontSize: '3rem',
                    fontWeight: "400",
                    lineHeight: "1.167"
                },
                h4: {
                    fontSize: '2.125rem',
                    fontWeight: "400",
                    lineHeight: "1.235"
                },
                h5: {
                    fontSize: '1.5rem',
                    fontWeight: "400",
                    lineHeight: "1.334"
                },
                h6: {
                    fontSize: '1.25rem',
                    fontWeight: "500",
                    lineHeight: "1.6"
                },
                h7: {
                    fontSize: '0.95rem',
                    fontWeight: "600",
                    lineHeight: "1.4"
                },
                subtitle1: {
                    fontSize: "1rem",
                    fontWeight: "400",
                    lineHeight: "1.75"
                },
                subtitle2: {
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    lineHeight: "1.57"
                },
                body1: {
                    fontSize: "1rem",
                    fontWeight: "400",
                    lineHeight: "1.5"
                },
                body2: {
                    fontSize: "0.875rem",
                    fontWeight: "400",
                    lineHeight: "1.43",
                },
                button: {
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    lineHeight: "1.75",
                    textTransform: "uppercase"
                },
                caption: {
                    fontSize: "0.75rem",
                    fontWeight: "400",
                    lineHeight: "1.66",
                },
                overline: {
                    fontSize: "0.875rem",
                    fontWeight: "400",
                    lineHeight: "2.66",
                    textTransform: "uppercase"
                },
            },
            spacing: 8,
            palette: {
                ...getDesignTokens(mode),
                primary: {
                    main: "#1976d2",
                    // light: '#E9DB5D',
                    // dark: '#A29415',
                    // contrastText: '#242105',
                },
                white: {
                    main: "#fff",
                    // light: '#E9DB5D',
                    // dark: '#A29415',
                    // contrastText: '#242105',
                },
                secondary: {
                    main: "#d27519",
                    // light: '',
                    // dark: '',
                    // contrastText: '',
                },
                error: {
                    main: "#f44336",
                    // light: '',
                    // dark: '',
                    // contrastText: '',
                },
                warning: {
                    main: "#ff9800",
                    // light: '',
                    dark: '#750E21',
                    // contrastText: '',
                },
                info: {
                    main: "#2196f3"
                    // light: '',
                    // dark: '',
                    // contrastText: '',
                },
                success: {
                    main: "#4caf50",
                    // light: '',
                    dark: '#304D30',
                    // contrastText: '',
                },
            
            
            },
            transitions: {
                duration: {
                    shortest: 150,
                    shorter: 200,
                    short: 250,
                    // most basic recommended timing
                    standard: 300,
                    // this is to be used in complex animations
                    complex: 375,
                    // recommended when something is entering screen
                    enteringScreen: 225,
                    // recommended when something is leaving screen
                    leavingScreen: 195,
                },
                easing: {
                    // This is the most common easing curve.
                    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    // Objects enter the screen at full velocity from off-screen and
                    // slowly decelerate to a resting point.
                    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
                    // Objects leave the screen at full velocity. They do not decelerate when off-screen.
                    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
                    // The sharp curve is used by objects that may return to the screen at any time.
                    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
                },
            },
            breakpoints: {
                values: {
                    xxs: 300,
                    xs: 430,
                    sm: 600,
                    md: 900,
                    lg: 1200,
                    xl: 1536,
                },
            },
            components: {
                // Name of the component
                MuiButtonBase: {
                    defaultProps: {
                        // The props to change the default for.
                        disableRipple: true, // No more ripple, on the whole application 💣!
                    },
                },
                MuiButton: {

                    // variants: [
                    //     {
                    //         props: { variant: "outlined"},
                    //         style: (theme) => ({
                    //             borderColor: theme.palette.divider,
                    //             backgroundColor: theme.palette.secondary.main,
                    //             borderRadius: "10px",
                    //             transition: theme.transitions.create(['background-color', 'border-color'], {
                    //                 duration: theme.transitions.duration.standard,
                    //             }),
                    //             "&:hover": {
                    //                 borderColor: "rgb(47, 58, 70)",
                    //                 background: theme.palette.secondary.light,
                    //             }
                    //         })
                    //     }
                    // ]
                },
                MuiTablePagination: {
                    defaultProps: {
                        labelRowsPerPage: 'عدد الصفوف بالصفحة الواحدة:',
                    },
                },
            },

            })
        , [mode])

    return (
        <ThemeProvider theme={theme} >
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}

CustomThemeProvider.propTypes = {
    children: propTypes.element
}

export default CustomThemeProvider
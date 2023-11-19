import { defaultTheme } from 'react-admin';

const theme = {
    ...defaultTheme,
    components: {
        ...defaultTheme.components,
        MuiScopedCssBaseline:{
            styleOverrides: {
                root: {
                    background: "var(--body-color)"
                }
            }
        }
    }
};

export default theme;
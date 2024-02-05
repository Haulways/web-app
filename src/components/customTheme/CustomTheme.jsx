import { defaultDarkTheme } from "react-admin";


const customTheme = {
    ...defaultDarkTheme,
    palette: {
        primary: {
            main: '#333'
        },
        secondary: {
            main: "#fff"
          },
    },
    typography: {
        fontFamily: 'Rubik, Rubik', // Replace 'YourCustomFont' with the name of your desired font
    },
    
    components: {
        // ... 
        RaMenuItemLink: {
            styleOverrides: {
                root: {
                    // invisible border when not active, to avoid position flashs
                    
                    '&.RaMenuItemLink-active': {
                        fontWeight: '500',
                        color: '#222', 
                        background: 'rgba(0, 0, 0, 0.10)',
                        borderRadius: '5px'
                        
                    },
                    
                    '&.MuiMenuItem-root': {
                        
                        margin: '10px 0 0' 
                    },
                    '& .RaMenuItemLink-icon': {
                        color: '#222',
                    },
                },
            },
       },
        RaAppbar: {
            root: {
               boxShadow: 'none'
           }
       }
    },
};

export default customTheme;
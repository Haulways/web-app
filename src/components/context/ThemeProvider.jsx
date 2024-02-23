import * as React from 'react';

const ThemeContext = React.createContext({
    theme: 'light',
    toggleTheme: () => { }
});

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = React.useState(
        // window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        'light'
    );
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    React.useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;

export { ThemeContext };

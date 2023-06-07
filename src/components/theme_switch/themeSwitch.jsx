import './themeSwitch.css';
import { useState, useEffect } from 'react';

export default function ThemeSwitch() {
    const getInitialTheme = () => {
        const savedTheme = sessionStorage.getItem('theme');
        return savedTheme ? savedTheme : (
            window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        );
    };

    const [theme, setTheme] = useState(getInitialTheme());

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        sessionStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    return (
        <label className="switch">
            <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
            <span className="slider"></span>
        </label>
    );
}

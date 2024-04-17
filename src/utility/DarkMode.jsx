import React, { useEffect, useState } from 'react';
import { FaDesktop, FaMoon, FaSun } from 'react-icons/fa';

export default function DarkMode() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');
    const element = document.documentElement;
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const options = [
        {
            icon: <FaSun />,
            text: 'light',
        },
        {
            icon: <FaMoon />,
            text: 'dark',
        },
        {
            icon: <FaDesktop />,
            text: 'system',
        },
    ];

    function onWindowMatch() {
        if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && darkQuery.matches)) {
            element.classList.add('dark');
        } else {
            element.classList.remove('dark');
        }
    }

    useEffect(() => {
        switch (theme) {
            case 'dark':
                element.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                break;
            case 'light':
                element.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                break;
            default:
                localStorage.removeItem('theme');
                onWindowMatch();
                break;
        }
    }, [theme]);

    darkQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                element.classList.add('dark');
            } else {
                element.classList.remove('dark');
            }
        }
    });
    return (
        <div className='flex items-center duration-100 dark:bg-gray-900 bg-gray-50 rounded-md'>
            {options?.map((opt) => (
                <button
                    key={opt.text}
                    onClick={() => setTheme(opt.text)}
                    className={`flex items-center justify-center w-6 h-6 text-md leading-6 rounded-full ${
                        theme === opt.text ? 'text-orange-500' : 'dark:text-gray-700 text-gray-400'
                    } m-1`}
                >
                    {opt.icon}
                </button>
            ))}
        </div>
    );
}
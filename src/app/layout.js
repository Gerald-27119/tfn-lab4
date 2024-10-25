import Navigation from './navigation';

export default function RootLayout({ children }) {
    return (
        <html>
            <head>
                <title>Moja aplikacja</title>
            </head>
            <body>
                <header>
                    <h1>Nagłówek główny</h1>
                    <Navigation />
                </header>
                {children}
                <footer>
                    <p>Stopka główna</p>
                </footer>
            </body>
        </html>
    );
}

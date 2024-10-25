'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div>
            <h1>Wystąpił błąd</h1>
            <p>Przepraszamy za niedogodności. Spróbuj ponownie później.</p>
            <button onClick={() => reset()}>Odśwież</button>
        </div>
    );
}

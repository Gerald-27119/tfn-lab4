"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function CharacterPage() {
    const router = useRouter();
    const { id } = router.query;
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            console.log(id);
            fetch(`https://rickandmortyapi.com/api/character/${id}`)
                .then((res) => {
                    if (!res.ok) throw new Error("Network response was not ok");
                    return res.json();
                })
                .then((data) => {
                    setCharacter(data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            {character ? (
                <>
                    <h1>{character.name}</h1>
                    <img src={character.image} alt={character.name} />
                    <p>Status: {character.status}</p>
                    <p>Species: {character.species}</p>
                    <p>Gender: {character.gender}</p>
                </>
            ) : (
                <p>No character found</p>
            )}
        </div>
    );
}

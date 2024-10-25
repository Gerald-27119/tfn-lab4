import {notFound} from 'next/navigation';

export async function generateMetadata({params}) {
    const {id} = await params;

    const characterResponse = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    if (!characterResponse.ok) {
        return {
            title: 'Postać nie znaleziona',
        };
    }
    const characterData = await characterResponse.json();

    return {
        title: characterData.name,
    };
}

export default async function CharacterPage({params}) {
    const {id} = await params;

    const characterResponse = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    if (!characterResponse.ok) {
        notFound();
    }
    const characterData = await characterResponse.json();

    return (
        <div>
            <h1>{characterData.name}</h1>
            <img src={characterData.image} alt={characterData.name}/>
            <p>Status: {characterData.status}</p>
            <p>Gatunek: {characterData.species}</p>
        </div>
    );
}

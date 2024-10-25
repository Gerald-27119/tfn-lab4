import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const { id, episodeId } = await params;

    const characterResponse = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    if (!characterResponse.ok) {
        return {
            title: 'Postać nie znaleziona',
        };
    }
    const characterData = await characterResponse.json();

    const episodeUrl = characterData.episode[episodeId - 1];
    if (!episodeUrl) {
        return {
            title: 'Odcinek nie znaleziony',
        };
    }

    const episodeResponse = await fetch(episodeUrl);
    if (!episodeResponse.ok) {
        return {
            title: 'Odcinek nie znaleziony',
        };
    }
    const episodeData = await episodeResponse.json();

    return {
        title: `Odcinek: ${episodeData.name} | Postać: ${characterData.name}`,
    };
}

export default async function CharacterEpisodePage({ params }) {
    const { id, episodeId } = await params;

    const characterResponse = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    if (!characterResponse.ok) {
        notFound();
    }
    const characterData = await characterResponse.json();

    const episodeUrl = characterData.episode[episodeId - 1];
    if (!episodeUrl) {
        notFound();
    }

    const episodeResponse = await fetch(episodeUrl);
    if (!episodeResponse.ok) {
        notFound();
    }
    const episodeData = await episodeResponse.json();

    return (
        <div>
            <h2>Odcinek: {episodeData.name}</h2>
            <p>Kod odcinka: {episodeData.episode}</p>
            <p>Data emisji: {episodeData.air_date}</p>
        </div>
    );
}

export async function generateMetadata({ searchParams }) {
    searchParams = await searchParams;

    const seasonFilter = searchParams.season;

    let title = 'Lista odcinków';

    if (seasonFilter) {
        title += ` - Sezon ${seasonFilter.replace('S', '')}`;
    }

    return {
        title,
    };
}

export default async function EpisodeListPage({ searchParams }) {
    searchParams = await searchParams;

    const seasonFilter = searchParams.season; // "S01" dla sezonu 1
    const sortOrder = searchParams.sort; // "episode_asc"

    try {
        let allEpisodes = [];
        let nextPage = 'https://rickandmortyapi.com/api/episode';

        while (nextPage) {
            const response = await fetch(nextPage);
            if (!response.ok) throw new Error("Failed to fetch episodes");
            const data = await response.json();
            allEpisodes = [...allEpisodes, ...data.results];
            nextPage = data.info.next;
        }

        if (seasonFilter) {
            const seasonFilterUpper = seasonFilter.toUpperCase();
            allEpisodes = allEpisodes.filter(ep => ep.episode.startsWith(seasonFilterUpper));
        }

        if (sortOrder) {
            if (sortOrder === "episode_asc") {
                allEpisodes.sort((a, b) => {
                    const [seasonA, episodeA] = a.episode.match(/\d+/g).map(Number);
                    const [seasonB, episodeB] = b.episode.match(/\d+/g).map(Number);
                    return seasonA - seasonB || episodeA - episodeB;
                });
            } else if (sortOrder === "episode_desc") {
                allEpisodes.sort((a, b) => {
                    const [seasonA, episodeA] = a.episode.match(/\d+/g).map(Number);
                    const [seasonB, episodeB] = b.episode.match(/\d+/g).map(Number);
                    return seasonB - seasonA || episodeB - episodeA;
                });
            } else if (sortOrder === "air_date_asc") {
                allEpisodes.sort((a, b) => new Date(a.air_date) - new Date(b.air_date));
            } else if (sortOrder === "air_date_desc") {
                allEpisodes.sort((a, b) => new Date(b.air_date) - new Date(a.air_date));
            }
        }

        return (
            <div>
                <h1>Lista odcinków</h1>
                <ul>
                    {allEpisodes.map((episode) => (
                        <li key={episode.id}>
                            <h2>{episode.name} ({episode.episode})</h2>
                            <p>Data emisji: {episode.air_date}</p>
                            <p>Liczba postaci: {episode.characters.length}</p>
                        </li>
                    ))}
                </ul>
            </div>
        );
    } catch (err) {
        return <p>Error: {err.message}</p>;
    }
}

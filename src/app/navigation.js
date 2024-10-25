'use client';

import { useRouter } from 'next/navigation';

export default function Navigation() {
    const router = useRouter();

    const navigateTo = (path) => {
        router.push(path);
    };

    return (
        <nav>
            <button onClick={() => navigateTo('/character/1')}>
                Przejdź do /character/1
            </button>
            <button onClick={() => navigateTo('/character/1/episodes/1')}>
                Przejdź do /character/1/episodes/1
            </button>
            <button onClick={() => navigateTo('/episode-list?season=S01&sort=episode_desc')}>
                Przejdź do /episode-list?season=S01&sort=episode_desc
            </button>
        </nav>
    );
}

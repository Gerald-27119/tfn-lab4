// app/NotFound.js
export default function NotFound({message}) {
    return (
        <div>
            <h1>Strona nie znaleziona</h1>
            <p>wystapil blad 404: {message}</p>
            <p>Przepraszamy, ale nie możemy znaleźć żądanej strony.</p>
        </div>
    );
}

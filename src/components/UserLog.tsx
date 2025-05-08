import React, { useEffect, useRef, useState } from "react";
import { OctagonX } from "lucide-react";
import { Button } from "./ui/button";
import { Filter } from 'bad-words';
import { formatDate } from "@/helper/formatDate";
import { randomUsername, schools, badWords } from "@/data/index";

/**
 * @description Componente del popup per la registrazione dell'utente.
 * 
 * @returns {JSX.Element} UserLog component
 */


export default function UserLog({ existingUsernames, onConfirm }: {
    existingUsernames: string[]; onConfirm: (username: string, school: string, date: string) => void;
}) {

    const [username, setUsername] = useState("");
    const [school, setSchool] = useState("");
    const [error, setError] = useState("");
    const errorRef = useRef<HTMLDivElement>(null);

    // Inizializza il filtro per le parole cattive
    const filter = new Filter();
    filter.addWords(...badWords);

    useEffect(() => {
        if (error && errorRef.current) {
            errorRef.current.focus();
        }
    }, [error]);


    //ritorna un nome casuale tra quelli della lista che non sia già in uso
    const getRandomUsername = () => {
        const available = randomUsername.filter(u => !existingUsernames.includes(u)); //qua controlla quelli disponibili
        return available[Math.floor(Math.random() * available.length)];
    };


    const data = new Date().toISOString() // ISO per salvataggio preciso
    const date = formatDate(data);

    const handleSubmit = () => {
        const trimmed = username.trim();
        const sanitized = trimmed.toLowerCase().replace(/[^a-z0-9]/g, '');

        if (!trimmed || !school) {
            setError("Compila tutti i campi.");
        } else if (existingUsernames.map(u => u.toLowerCase()).includes(trimmed.toLowerCase())) {
            setError("Questo nome è già usato.");
        } else if (filter.isProfane(sanitized)) {
            setError("Il nome utente contiene parole non appropriate.");
        } else {
            sessionStorage.setItem("user", JSON.stringify({ username: trimmed, school, date }));
            onConfirm(trimmed, school, date);
        }
    };



    return (
        <div
            className="fixed w-full inset-0 z-50 bg-black/70 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="userlog-title"
        >
            <div className="bg-primary/60 dark:bg-primary/50 p-6 rounded-xl w-[90%] max-w-md shadow-xl text-white">
                <h2 id="userlog-title" className="text-xl font-semibold mb-4">
                    Benvenuto!<span role="decoration">🎉</span> Scegli il tuo nome
                </h2>

                <label htmlFor="username" className="block">
                    Nome utente
                    <input
                        id="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="bg-white text-black p-2 w-full mt-2 rounded"
                        placeholder="Es. Gatto Rosso"
                        aria-describedby="username-desc"
                    />
                </label>

                <Button
                    onClick={() => setUsername(getRandomUsername())}
                    className="text-sm text-blue-300 underline mb-4 p-0"
                    type="button"
                    id="username-desc"
                    variant="link"
                >
                    Genera un nome casuale
                </Button>

                <label htmlFor="school" className="block mb-2">
                    Scuola di provenienza
                    <select
                        id="school"
                        value={school}
                        onChange={e => setSchool(e.target.value)}
                        className="bg-white text-black mt-2 p-2 w-full rounded mb-2"
                    >
                        <option value="">-- Seleziona --</option>
                        {schools.map((s, i) => (
                            <option key={i} value={s}>{s}</option>
                        ))}
                    </select>
                </label>

                {error && (
                    <div
                        ref={errorRef}
                        role="alert"
                        tabIndex={-1}
                        className="flex text-red-500 items-center justify-start mb-2 gap-2"
                        aria-live="assertive"
                    >
                        <OctagonX aria-hidden="true" />
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                <Button
                    onClick={handleSubmit}
                    className="bg-white text-primary px-4 py-2 rounded w-full"
                    type="button"
                >
                    Inizia
                </Button>
            </div>
        </div>
    );
}

import React, { useEffect, useRef, useState } from "react";
import { OctagonX } from "lucide-react";
import { Button } from "./ui/button";

// Array per i nomi randomici
const randomUsername = [
    "Cane Blu", "Gatto Rosso", "Pinguino Viola", "Elefante Verde", "Orso Rosa",
    "Volpe Arancione", "Aquila Gialla", "Leone Grigio", "Koala Bianco", "Lupo Marrone",
    "Gufo Nero", "Delfino Celeste", "Scoiattolo Dorato", "Tigre Rossa", "Zebra Viola",
    "Panda Turchese", "Cervo Beige", "Riccio Lilla", "Fenice Argento", "Tartaruga Azzurra",
    "Canguro Indaco", "Cobra Giallo", "Ippopotamo Lime", "Scimmia Rosa", "Giraffa Fucsia",
    "Topo Sabbia", "Cammello Blu", "Airone Grigio", "Balena Bianca", "Formica Verde"
];

const schools = [
    "Liceo Scientifico", "Liceo Scienze Applicate", "Liceo Scienze Umane",
    "Liceo Linguistico", "Istituto Tecnico", "Istituto Professionale", "Altro"
];

export default function UserLog({
    existingUsernames,
    onConfirm,
}: {
    existingUsernames: string[];
    onConfirm: (username: string, school: string, date: string) => void;
}) {
    const [username, setUsername] = useState("");
    const [school, setSchool] = useState("");
    const [error, setError] = useState("");
    const errorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (error && errorRef.current) {
            errorRef.current.focus();
        }
    }, [error]);

    const getRandomUsername = () => {
        const available = randomUsername.filter(u => !existingUsernames.includes(u));
        return available[Math.floor(Math.random() * available.length)];
    };

    const handleSubmit = () => {
        const trimmed = username.trim();
        if (!trimmed || !school) {
            setError("Compila tutti i campi.");
        } else if (existingUsernames.includes(trimmed)) {
            setError("Questo nome è già usato.");
        } else {
            const date = new Date().toISOString(); // ISO per salvataggio preciso
            sessionStorage.setItem("user", JSON.stringify({ username: trimmed, school, date }));
            onConfirm(trimmed, school, date);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
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

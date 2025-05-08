"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";

function NavSwitcher() {
    const [width, setWidth] = useState<number>(0); // Iniziamo con valore 0 (indefinito)
    const [isMounted, setIsMounted] = useState<boolean>(false); // Stato per verificare se il componente è montato

    useEffect(() => {
        // Funzione che aggiorna la larghezza
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        // Aggiungiamo un listener per il resize
        window.addEventListener("resize", handleResize);

        // Impostiamo la larghezza iniziale subito dopo il montaggio del componente
        handleResize();

        // Iniziamo la fase di montaggio
        setIsMounted(true);

        // Cleanup del listener
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Se il componente non è ancora montato, non renderizzare nulla
    if (!isMounted) {
        return null; // O puoi mettere un caricamento
    }

    // Render condizionale in base alla larghezza
    return width > 768 ? <Navbar /> : <MobileNav />;
}

export default NavSwitcher;

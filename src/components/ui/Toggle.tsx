"use client"

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export default function Toggle() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="bg-background dark:bg-blue-950"
            aria-hidden="true"
            aria-label="Toggle theme"
        >
            {theme === "light" ? (
                <Sun className="stroke-amber-600"
                />
            ) : (
                <Moon
                />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
"use client"
import { useState } from "react";
import UserLog from "@/components/UserLog";

// Mock existing usernames (in future: fetch from GitHub)
const existingUsernames = ["Gatto Rosso", "Pinguino Viola"];

export default function Home() {
  const [user, setUser] = useState<{ username: string; school: string } | null>(null);

  return (
    <>
      {!user && (
        <UserLog
          existingUsernames={existingUsernames}
          onConfirm={(username, school) => setUser({ username, school })}
        />
      )}
      {user && (
        <>
          <h1 className="text-2xl font-bold">
            Ciao {user.username}<span role="decoration">👋</span>. ({user.school})
          </h1>
          <div className="h-[150em] bg-gray-200 dark:bg-gray-700 rounded-lg mt-4">
          </div>
          <p id="main-content" className="mb-5" >Questo è un placeholder per lo skip al maincontent</p>
        </>
      )}
    </>
  );
}

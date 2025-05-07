"use client";
import { useEffect, useState } from "react";
import UserLog from "@/components/UserLog";
import { fetchUsers, updateUsersAuto } from "@/helper/gh";
import { User } from "@/types";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);

  // Caricamento iniziale degli utenti e del sessionStorage
  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data);

        // Recupera utente da sessionStorage, se presente e valido
        const saved = sessionStorage.getItem("user");
        if (saved) {
          const parsed = JSON.parse(saved) as User;
          const exists = data.some(
            (u) => u.username === parsed.username && u.school === parsed.school
          );
          if (exists) {
            setUser(parsed);
          } else {
            sessionStorage.removeItem("user");
          }
        }
      })
      .catch((err) => {
        console.error("Errore nel caricamento utenti:", err);
      });
  }, []);

  const handleConfirm = async (username: string, school: string, date: string) => {
    const newUser: User = { username, school, date };

    try {
      const latestUsers = await fetchUsers();

      const alreadyExists = latestUsers.some(
        (u) => u.username === username && u.school === school
      );

      if (!alreadyExists) {
        const updatedUsers = [...latestUsers, newUser];
        await updateUsersAuto(updatedUsers);
        setUsers(updatedUsers);
      }

      sessionStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      console.error("Errore nel salvataggio dell’utente:", error);
      alert("Errore nel salvataggio. Riprova.");
    }
  };

  console.log("Utenti caricati:", users);


  return (
    <>
      {!user && (
        <UserLog
          existingUsernames={users.map((u) => u.username)}
          onConfirm={handleConfirm}
        />
      )}
      {user && (
        <>
          <h1 className="text-2xl font-bold">
            Ciao {user.username}
            <span role="decoration">👋</span>. ({user.school})
          </h1>
          <div className="h-[150em] bg-gray-200 dark:bg-gray-700 rounded-lg mt-4"></div>
          <p id="main-content" className="mb-5">
            Questo è un placeholder per lo skip al maincontent
          </p>
        </>
      )}
    </>
  );
}

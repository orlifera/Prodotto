"use client";
import { useEffect, useState } from "react";
import UserLog from "@/components/UserLog";
import { fetchUsers, updateUsersAuto } from "@/helper/gh";
import { User } from "@/types";
import Loader from "@/components/ui/loader";
import BC from "@/components/BC";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Funzione sleep per introdurre un ritardo
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Caricamento iniziale degli utenti e del sessionStorage
  useEffect(() => {
    const firstVisit = !sessionStorage.getItem("hasVisited");

    fetchUsers()
      .then(async (data) => {
        setUsers(data);

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

        // Mostra il loader solo se è la prima visita
        if (firstVisit) {
          await sleep(500);
        }

        sessionStorage.setItem("hasVisited", "true"); // salva la flag
        setLoading(false);
      })
      .catch((err) => {
        console.error("Errore nel caricamento utenti:", err);
        setLoading(false);
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
      {loading &&
        (
          <Loader />
        )

      }
      {!user && !loading && (
        <div className="w-full h-screen flex items-center justify-center">
          <UserLog
            existingUsernames={users.map((u) => u.username)}
            onConfirm={handleConfirm}
          />
        </div>
      )}
      {user && !loading && (
        <>
          <BC currentPage={null} />
          <div className="h-[150em] flex rounded-lg mt-2">

          </div>
          <p id="main-content" className="mb-5">
            Questo è un placeholder per lo skip al maincontent
          </p>
        </>
      )}
    </>
  );
}

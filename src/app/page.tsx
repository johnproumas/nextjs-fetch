"use client";

import { useEffect, useState } from "react";

import { User } from "./types";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch users on the client side
    async function fetchUsers() {
      try {
        const response = await fetch(
          `https://${process.env.NEXT_PUBLIC_MOCK_API_KEY}.mockapi.io/users`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const userData = await response.json();
        setUsers(userData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  // console.log("users", users);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5">
      <h1>Users</h1>
      <h2>Hey there</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
}

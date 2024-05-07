"use client";

import { useEffect, useState } from 'react';

import { User } from '../types';

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch users on the client side
        async function fetchUsers() {
            try {
                const response = await fetch('https://6509b6b6f6553137159be44b.mockapi.io/api/users');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const userData = await response.json();
                setUsers(userData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Users</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}
import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface User {
  firstName: string | undefined;
  lastName: string | undefined;
  id: string;
  email: string;
  role?: string | { name: string };
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Decodifica o token para extrair o id do usuário (assumindo que esteja em 'sub')
        const decoded: { sub: string } = jwtDecode(token);
        const userId = decoded.sub;
        // Busca os dados do usuário pelo id
        axios
          .get<User>(`http://localhost:3000/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(response => {
            const userData = response.data;
            // Se a propriedade role for um objeto, mapeia-a para o nome da role
            if (userData.role && typeof userData.role === 'object') {
              userData.role = userData.role.name.toLowerCase();
            }
            setUser(userData);
          })
          .catch(() => {
            localStorage.removeItem('token');
            setUser(null);
          });
      } catch (error) {
        console.error('Invalid token', error);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return { user, logout };
}
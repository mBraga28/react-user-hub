import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: string;
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No access token found. Please login.');
      return;
    }
    console.log('Token:', token); // Check if the token is not null
    axios.get('http://localhost:3003/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <section className="w-screen overflow-x-hidden bg-gray-50 dark:bg-gray-900 min-h-screen">
      <header className="bg-white dark:bg-gray-800 border-b p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
        <div className="space-x-4">
          <Link 
            to="/profile" 
            className="text-blue-600 hover:underline dark:text-blue-400">
            Profile
          </Link>
          <button 
            onClick={handleLogout}
            className="text-gray-50 hover:underline">
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Users</h1>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {users.map(user => (
            <div key={user.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <p className="text-xl font-medium text-gray-900 dark:text-white">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-gray-500">{user.email}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
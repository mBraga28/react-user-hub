import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <nav className="flex gap-4">
          <Link to="/" className="font-bold">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/users">Users</Link>
        </nav>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
      <footer className="bg-gray-200 text-center py-2">
        <p>&copy; 2025 My App</p>
      </footer>
    </div>
  );
};
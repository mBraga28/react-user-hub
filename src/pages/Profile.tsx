import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  newPassword?: string;
  confirmNewPassword?: string;
  roleId: string;
}

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Fill the form with the user's data.
      // If the role field is an object, use the string mapped by useAuth.
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        newPassword: '',
        confirmNewPassword: '',
        roleId: typeof user.role === 'string' ? user.role : ''
      });
      setLoading(false);
    }
  }, [user, reset]);

  const onSubmit = async (data: ProfileData) => {
    const token = localStorage.getItem('token');
    const updateData: Partial<ProfileData> = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      roleId: data.roleId
    };

    if (data.newPassword || data.confirmNewPassword) {
      if (data.newPassword !== data.confirmNewPassword) {
        alert("New passwords do not match");
        return;
      }
      updateData.password = data.newPassword;
    }
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/users/${user?.id}`, updateData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem('token');
    if (!token || !user) return;
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmDelete) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/users/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Your account has been deleted.");
      logout();
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert("Failed to delete account.");
    }
  };

  return (
    <section className="w-screen overflow-x-hidden bg-gray-50 dark:bg-gray-900 min-h-screen">
      <header className="bg-white dark:bg-gray-800 border-b p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile</h2>
        <button onClick={handleLogout} className="text-gray-50 hover:underline">
          Logout
        </button>
      </header>
      <div className="max-w-md mx-auto px-4 py-8">
        {(typeof user?.role === 'string' ? user.role.toLowerCase() : user?.role?.name?.toLowerCase() ?? '') !== 'consumer' && (
          <div className="mb-4 text-left">
            <Link to="/users" className="text-blue-600 hover:underline font-medium text-sm">
              &larr; Back to Users
            </Link>
          </div>
        )}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          My Profile
        </h1>
        {loading ? (
          <p className="text-center text-gray-900 dark:text-white">Loading...</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                {...register("firstName", { required: "First name is required" })}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                {...register("lastName", { required: "Last name is required" })}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                readOnly
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            {/* New Password */}
            <div>
              <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                placeholder="••••••••"
                {...register('newPassword', { minLength: { value: 6, message: "Minimum 6 characters" } })}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
            </div>
            {/* Confirm New Password */}
            <div>
              <label htmlFor="confirmNewPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                placeholder="••••••••"
                {...register('confirmNewPassword', { minLength: { value: 6, message: "Minimum 6 characters" } })}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {errors.confirmNewPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmNewPassword.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Update Profile
            </button>
            <a
              onClick={handleDeleteAccount}
              className="block w-full text-center text-red-600 hover:underline cursor-pointer font-medium text-sm px-5 py-2.5"
            >
              Delete Account
            </a>
          </form>
        )}
      </div>
    </section>
  );
}
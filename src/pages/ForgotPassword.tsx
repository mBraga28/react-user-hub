import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type FormData = {
  email: string;
  newPassword: string;
  confirmNewPassword: string;
};

const schema = yup.object({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  newPassword: yup
    .string()
    .min(6, 'Minimum 6 characters')
    .required('New password is required'),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), undefined], 'Passwords must match')
    .required('Please confirm your new password'),
}).required();

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { email },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await axios.patch('http://localhost:3003/auth/reset-password', {
        email: data.email,
        newPassword: data.newPassword,
      });
      alert('Password updated successfully!');
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Failed to reset password. Please try again.');
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 p-6">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white mb-6 text-center">
          Reset Password
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              placeholder="••••••••"
              {...register('newPassword')}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
              required
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="confirmNewPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              placeholder="••••••••"
              {...register('confirmNewPassword')}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
              required
            />
            {errors.confirmNewPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmNewPassword.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Update Password
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Remembered your password?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
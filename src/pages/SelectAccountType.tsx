import { useNavigate } from 'react-router-dom';

export default function SelectAccountType() {
  const navigate = useNavigate();

  const handleSelectAccount = (accountType: string) => {
    // Redirects to the register with a query param that indicates the account type
    navigate(`/register?type=${accountType}`);
  };

  return (
    <section className="bg-white dark:bg-gray-900">
    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
      <div className="mr-auto place-self-center lg:col-span-7">
        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
          Welcome to User Hub
        </h1>
        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
          Please select the type of account you wish to register:
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => handleSelectAccount('admin')}
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
          >
            Register as Admin
          </button>
          <button
            onClick={() => handleSelectAccount('consumer')}
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900"
          >
            Register as Consumer
          </button>
        </div>
        <div>
          <p className="mt-4 text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
              Sign in
            </a>
          </p>
        </div>
      </div>
      <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
        <img
          src="/image.svg"
          alt="User Hub mockup"
        />
      </div>
    </div>
  </section>
  );
}
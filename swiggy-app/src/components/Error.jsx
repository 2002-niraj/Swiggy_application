import { useRouteError } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="bg-white shadow-xl rounded-xl p-12 max-w-md text-center border">
        <h1 className="text-4xl font-extrabold text-red-600 mb-4">Oops!!</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Something went wrong.</h2>
        <h3 className="text-lg text-red-500 font-medium">
          {error?.status || 'Unknown Error'}: {error?.statusText || 'An unexpected error occurred'}
        </h3>
        <p className="mt-6 text-sm text-gray-500">
          Please try again later or return to the   
          <Link href="/" className="text-blue-600 underline" to={"/"} >home page</Link>.
        </p>
      </div>
    </div>
  );
};

export default Error;

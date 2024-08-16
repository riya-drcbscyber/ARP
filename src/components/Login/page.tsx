  "use client";

  import { useState, ChangeEvent, FormEvent } from 'react';
  import axios from 'axios';
  import { useRouter } from 'next/navigation';

  interface FormData {
    employeeId: string;
    password: string;
  }

  interface InputStyles {
    employeeId: string;
    password: string;
  }

  const Login = () => {
    const [formData, setFormData] = useState<FormData>({
      employeeId: '',
      password: '',
    });

    const [inputStyles, setInputStyles] = useState<InputStyles>({
      employeeId: 'font-bold',
      password: 'font-bold',
    });

    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [darkMode, setDarkMode] = useState<boolean>(true);

    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));

      setInputStyles((prevInputStyles) => ({
        ...prevInputStyles,
        [name]: value ? 'font-normal' : 'font-bold',
      }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setErrorMessage(null);
      setSuccessMessage(null);

      try {
        const response = await axios.post('http://localhost:3000/api/login', formData);
        setSuccessMessage(response.data.message);
        router.push('/Dboard');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data.message || 'Login failed');
        } else {
          setErrorMessage('An unexpected error occurred');
        }
      }
    };

    const handleForgotPassword = async () => {
      setErrorMessage(null);
      setSuccessMessage(null);

      try {
        const response = await axios.post('http://localhost:5000/api/forgot_password', {
          employeeId: formData.employeeId,
        });
        setSuccessMessage(response.data.message);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data.message || 'Password reset failed');
        } else {
          setErrorMessage('An unexpected error occurred');
        }
      }
    };

    const togglePasswordVisibility = () => {
      setPasswordVisible((prevVisible) => !prevVisible);
    };

    const toggleDarkMode = () => {
      setDarkMode((prevMode) => !prevMode);
    };

    return (
      <main className={`flex min-h-screen flex-col items-center justify-center p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        <button 
          onClick={toggleDarkMode} 
          className={`absolute top-4 right-4 px-4 py-2 rounded-lg ${darkMode ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-900'}`}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <div className={`shadow-lg rounded-lg px-6 pt-4 pb-6 w-full max-w-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className={`text-2xl font-bold mb-6 text-center ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            Login
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm mb-4 text-center">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="text-green-500 text-sm mb-4 text-center">
              {successMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-bold mb-2">
              Employee ID:
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                required
                className={`block border rounded px-3 py-2 mt-1 w-full text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'} ${inputStyles.employeeId}`}
              />
            </label>
            <label className="block text-sm font-bold mb-2">
              Password:
              <div className="relative">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`block border rounded px-3 py-2 mt-1 w-full text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'} ${inputStyles.password}`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 font-semibold py-1 px-2 rounded text-xs focus:outline-none focus:ring-2 ${darkMode ? 'bg-blue-500 text-white focus:ring-blue-500 focus:ring-opacity-50' : 'bg-blue-600 text-white focus:ring-blue-500 focus:ring-opacity-50'}`}
                >
                  {passwordVisible ? 'Hide' : 'Show'}
                </button>
              </div>
            </label>
            <button 
              type="submit" 
              className={`mt-4 font-semibold py-2 px-4 rounded-lg text-sm w-full transition-transform transform hover:scale-105 ${darkMode ? 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 focus:ring-opacity-50' : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600 focus:ring-opacity-50'}`}
            >
              Submit
            </button>
          </form>
          <div className="mt-4">
            <button 
              onClick={handleForgotPassword} 
              className={`block text-sm text-center ${darkMode ? 'text-blue-400 hover:underline' : 'text-blue-600 hover:underline'}`}
            >
              Forgot Password?
            </button>
            <p className="mt-2 text-sm text-center">
              Don't have an account? 
              <a 
                href="http://localhost:3000/" 
                className={`${darkMode ? 'text-blue-400 hover:underline' : 'text-blue-600 hover:underline'}`}
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </main>
    );
  };

  export default Login;



// "use client";
// import { useState } from 'react';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     employeeId: '',
//     password: '',
//   });

//   const [inputStyles, setInputStyles] = useState({
//     employeeId: 'font-bold',
//     password: 'font-bold',
//   });

//   const [passwordVisible, setPasswordVisible] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });

//     if (value) {
//       setInputStyles({
//         ...inputStyles,
//         [name]: 'font-normal',
//       });
//     } else {
//       setInputStyles({
//         ...inputStyles,
//         [name]: 'font-bold',
//       });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//   };

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
//       <div className="bg-white shadow-lg rounded-lg px-6 pt-4 pb-6 w-full max-w-sm">
//         <div className="text-blue-600 text-2xl font-bold mb-6 text-center">
//           Login
//         </div>
//         <form onSubmit={handleSubmit}>
//           <label className="block text-sm font-bold mb-2">
//             Employee ID:
//             <input
//               type="text"
//               name="employeeId"
//               value={formData.employeeId}
//               onChange={handleChange}
//               required
//               className={`block border border-gray-300 rounded px-3 py-2 mt-1 w-full text-sm ${inputStyles.employeeId}`}
//             />
//           </label>
//           <label className="block text-sm font-bold mb-2">
//             Password:
//             <div className="relative">
//               <input
//                 type={passwordVisible ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 className={`block border border-gray-300 rounded px-3 py-2 mt-1 w-full text-sm ${inputStyles.password}`}
//               />
//               <button
//                 type="button"
//                 onClick={togglePasswordVisibility}
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//               >
//                 {passwordVisible ? "Hide" : "Show"}
//               </button>
//             </div>
//           </label>
//           <button 
//             type="submit" 
//             className="mt-4 bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white font-semibold py-2 px-4 rounded-lg text-sm w-full transition-transform transform hover:scale-105"
//           >
//             Submit
//           </button>
//         </form>
//         <div className="mt-4">
//           <a 
//             href="/forgot_password" 
//             className="block text-blue-500 hover:underline text-sm text-center"
//           >
//             Forgot Password?
//           </a>
//           <p className="mt-2 text-sm text-center">
//             Don't have an account? 
//             <a 
//               href="http://localhost:3000/" 
//               className="text-blue-500 hover:underline"
//             >
//               Sign Up
//             </a>
//           </p>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Login;

"use client";
import { useState, ChangeEvent, FormEvent } from 'react';

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg px-6 pt-4 pb-6 w-full max-w-sm">
        <div className="text-blue-600 text-2xl font-bold mb-6 text-center">
          Login
        </div>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-bold mb-2">
            Employee ID:
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              required
              className={`block border border-gray-300 rounded px-3 py-2 mt-1 w-full text-sm ${inputStyles.employeeId}`}
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
                className={`block border border-gray-300 rounded px-3 py-2 mt-1 w-full text-sm ${inputStyles.password}`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                {passwordVisible ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>
          <button 
            type="submit" 
            className="mt-4 bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white font-semibold py-2 px-4 rounded-lg text-sm w-full transition-transform transform hover:scale-105"
          >
            Submit
          </button>
        </form>
        <div className="mt-4">
          <a 
            href="/forgot_password" 
            className="block text-blue-500 hover:underline text-sm text-center"
          >
            Forgot Password?
          </a>
          <p className="mt-2 text-sm text-center">
            Don't have an account? 
            <a 
              href="http://localhost:3000/" 
              className="text-blue-500 hover:underline"
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


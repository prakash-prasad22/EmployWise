import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      const data = await response.json();

      const { token } = data;

      localStorage.setItem('token', token);
      navigate('/users');
      toast.success('Login successful!'); // Toast on success

    } catch (error) {
      setError(error.message || 'Invalid credentials');
      console.error('Login failed:', error);
      toast.error(error.message || 'Login failed'); // Toast on failure
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-b from-[#ECDCFF] to-white'>
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md p-5 md:p-10 bg-white ">
        <h3 className="text-gray-900 text-[22px] leading-9 font-bold mb-10">
          Login Page
        </h3>

        <form className="py-4 md:py-0" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor='email'>Email :</label>
            <input
              type='email'
              id='email'
              className="w-full pl-3 py-3 border-b border-solid border-[#0066ff61] focus:outline:none
                                  focus:border-b-[#5618AD] text-[16px] leading-7 text-gray-700 
                                  placeholder:text-gray-400 cursor-pointer"
              required
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your Email'
            />
          </div>

          <div className="mb-5">
            <label htmlFor='password'>Password :</label>
            <div className='flex items-center '>
              <input
                type={showPassword ? "text" : "password"}
                id='password'
                className="w-full pl-3 py-3 border-b border-solid border-[#0066ff61] focus:outline:none
                                    focus:border-b-[#5618AD] text-[16px] leading-7 text-gray-700 
                                    placeholder:text-gray-400 cursor-pointer"
                required
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter your Password'
              />
              <div onClick={() => setShowPassword(preve => !preve)} className='cursor-pointer'>
                {
                  showPassword ? (
                    <FaRegEye />
                  ) : (
                    <FaRegEyeSlash />
                  )
                }
              </div>
            </div>

          </div>

          <button type="submit" className="shadow-lg shadow-[#ECDCFF] bg-[#ECDCFF] hover:bg-[#5618AD] w-full text-black hover:text-white font-bold text-[18px] leading-[30px] rounded-lg px-4 py-3 cursor-pointer">Login</button>

        </form>
      </div>
    </div>
  );
};

export default Login;
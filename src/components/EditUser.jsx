import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: '', last_name: '', email: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://reqres.in/api/users/${id}`);

        if (!response.ok) {
          throw new Error('Error fetching user data.');
        }

        const data = await response.json();

        setUser(data.data);
      } catch (error) {
        setError(error.message || 'Error fetching user data.');
        console.error('Fetch Error:', error);
        toast.error(error.message || 'Error fetching user data.');
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://reqres.in/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Error updating user.');
      }

      navigate('/users');
      toast.success('User updated successfully!');
    } catch (error) {
      setError(error.message || 'Error updating user.');
      console.error('Update Error:', error);
      toast.error(error.message || 'Error updating user.');
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-[#ECDCFF] to-white">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md p-5 md:p-10 bg-white">
        <h3 className="text-gray-900 text-[22px] leading-9 font-bold mb-10 text-center">
          Edit User
        </h3>
        {error && <p className="text-red-600 text-center capitalize">{error}</p>}
        <form onSubmit={handleSubmit} className="py-4 md:py-0">
          <div className="mb-5">
            <label htmlFor="first_name" className="block text-gray-700 text-sm font-bold mb-2">
              First Name:
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={user.first_name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="last_name" className="block text-gray-700 text-sm font-bold mb-2">
              Last Name:
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={user.last_name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button
            type="submit"
            className="shadow-lg shadow-[#5618AD] bg-[#ECDCFF] hover:bg-[#5618AD] w-full text-black hover:text-white font-bold text-[18px] leading-[30px] rounded-lg px-4 py-3 cursor-pointer"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { toast } from 'react-toastify';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [hasMoreUsers, setHasMoreUsers] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://reqres.in/api/users?page=${page}`
        );

        if (!response.ok) {
          throw new Error("Error fetching users");
        }

        const data = await response.json();

        if (data.data && data.data.length > 0) {
          setUsers(data.data);
          setHasMoreUsers(true);
        } else {
          setUsers([]);
          setHasMoreUsers(false);
        }
      } catch (error) {
        setError(error.message || "Error fetching users.");
        console.error("Error:", error);
        setHasMoreUsers(false);
        toast.error(error.message || "Error fetching users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  useEffect(() => {
    const results = users.filter(
      (user) =>
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(results);
  }, [searchTerm, users]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://reqres.in/api/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error deleting user");
      }

      setUsers(users.filter((user) => user.id !== id));
      toast.success("User deleted successfully!");
    } catch (error) {
      setError(error.message || "Error deleting user.");
      console.error("Delete Error:", error);
      toast.error(error.message || "Error deleting user.");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleBack = () => {
    if (page > 1) {
      setPage(page - 1); // Go to the previous page within the user list
    } else {
      navigate(-1); // Go back in history if on the first page
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="bg-gradient-to-b from-[#ECDCFF] to-white mb-20">
      <h2 className="text-center font-bold text-[22px] md:text-[30px] py-12">
        Users List Page
      </h2>

      <div className="flex justify-end items-center w-full pr-2 sm:pr-4 md:pr-8 lg:pr-12">
        <div className="relative w-full min-w-[300px] lg:min-w-[400px] lg:max-w-[400px] h-11 lg:h-10 rounded-lg border border-neutral-300 shadow-md overflow-hidden flex items-center bg-white p-2 focus-within:border-[#5618AD] transition-colors duration-300">
          <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
            <IoSearch size={20} className="text-neutral-400" />
          </div>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full h-full pl-8 pr-2 text-neutral-700 placeholder-neutral-500 focus:outline-none bg-transparent"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="w-64 sm:w-56 md:w-72 lg:w-80 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
            >
              <div className="flex flex-col items-center p-4 gap-4">
                <img
                  key={user.avatar}
                  src={user.avatar}
                  alt={`${user.first_name} ${user.last_name}`}
                  className="rounded-full w-24 h-24 object-cover"
                />
                <p className="text-center text-lg font-semibold text-gray-800">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-center text-gray-600">{user.email}</p>
                <div className="flex justify-center gap-4 mt-2">
                  <Link
                    to={`/users/${user.id}/edit`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 mt-16">
            <p className="text-center text-gray-700 text-lg">No more Users Found</p>
            <button
              onClick={handleBack}
              className="px-4 py-2 rounded-md bg-[#ECDCFF] text-white hover:bg-[#5618AD] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Back
            </button>
          </div>
        )}
      </div>

      {filteredUsers.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 rounded-md bg-white text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            Previous
          </button>
          <span className="text-gray-700 font-semibold">Page: {page}</span>
          <button
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 rounded-md bg-white text-gray-700 hover:bg-gray-200 shadow-md"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default UserList;
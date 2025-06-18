/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import axios from 'axios';

// User type definition
type User = {
  id: number;
  username: string;
  email: string;
  role: string;
};

const ManageAccountsContent = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ email: '', role: '' });
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '', role: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!token) return;
        const response = await axios.get<User[]>(
          'http://localhost:8000/admin/users/',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('Users:', response.data);
        setUsers(response.data);
      } catch (error: any) {
        console.error('Error fetching users:', error.response || error.message);
      }
    };

    fetchUsers();
  }, [token]);

  // Add new user
  const handleAddUser = async () => {
    try {
      const response = await axios.post<User>('http://localhost:8000/admin/users/', newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers((prev) => [...prev, response.data]);
      setNewUser({ username: '', email: '', password: '', role: '' });
    } catch (error: any) {
      console.error('Failed to add user:', error.response || error.message);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user.id);
    setEditForm({ email: user.email, role: user.role });
  };

  const handleCancel = () => {
    setEditingUser(null);
    setEditForm({ email: '', role: '' });
  };

  const handleUpdate = async (id: number) => {
    try {
      const response = await axios.put<User>(
        `http://localhost:8000/admin/users/${id}`,
        editForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? response.data : u))
      );
      handleCancel();
    } catch (error: any) {
      console.error('Update failed:', error.response || error.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`http://localhost:8000/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (error: any) {
      console.error('Delete failed:', error.response || error.message);
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-[#b36f34] mb-6">Manage Accounts</h2>

      {/* Add New User Form */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Add New User</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            className="border px-2 py-1 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="border px-2 py-1 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            className="border px-2 py-1 rounded"
          />
          <input
            type="text"
            placeholder="Role"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="border px-2 py-1 rounded"
          />
        </div>
        <button
          onClick={handleAddUser}
          className="mt-2 px-4 py-1 bg-[#b36f34] text-white rounded hover:bg-[#9e5e2d]"
        >
          Add User
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by username or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.username}
                </td>

                {editingUser === user.id ? (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) =>
                          setEditForm({ ...editForm, email: e.target.value })
                        }
                        className="border px-2 py-1 rounded w-full"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <input
                        type="text"
                        value={editForm.role}
                        onChange={(e) =>
                          setEditForm({ ...editForm, role: e.target.value })
                        }
                        className="border px-2 py-1 rounded w-full"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleUpdate(user.id)}
                        className="text-green-600 hover:text-green-900 mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-indigo-600 hover:text-indigo-900 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAccountsContent;

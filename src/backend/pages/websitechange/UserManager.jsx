// backend/pages/websitechange/UserManager.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, EyeOff, Trash2, User, Mail, Phone, MapPin, Calendar, CheckCircle, XCircle } from 'lucide-react';
import Sidebar from '../Sidebar';
import { apiUrl } from '../https';
import { AdminAuthContext } from '../../context/AdminAuth';

const UserManager = () => {
  const { user } = useContext(AdminAuthContext);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/memeber/users`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      if (res.data.status) {
        setUsers(res.data.data || []);
      } else {
        toast.error('Failed to load users');
      }
    } catch (err) {
      toast.error('Error fetching users');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleUserStatus = async (userId, currentStatus) => {
    setActionLoading(true);
    try {
      const res = await axios.post(
        `${apiUrl}/memeber/users/${userId}/toggle`,
        {},
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      );
      if (res.data.status) {
        toast.success(`User ${currentStatus ? 'deactivated' : 'activated'} successfully`);
        fetchUsers();
      }
    } catch (err) {
      toast.error('Failed to update user status');
    } finally {
      setActionLoading(false);
    }
  };

  const viewUserDetails = (userData) => {
    setSelectedUser(userData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter(u =>
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.phone?.includes(searchTerm)
  );

  const getStatusBadge = (isActive) => {
    return isActive ? (
      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
        <CheckCircle className="w-3 h-3" /> Active
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
        <XCircle className="w-3 h-3" /> Inactive
      </span>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 md:p-8 overflow-y-auto max-h-screen">
        <ToastContainer position="top-right" autoClose={3000} theme="light" />

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">User Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage all registered users</p>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
              <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
            <button
              onClick={fetchUsers}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Users</p>
                <p className="text-2xl font-bold text-green-600">
                  {users.filter(u => u.is_active).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 rounded-xl">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Inactive Users</p>
                <p className="text-2xl font-bold text-red-600">
                  {users.filter(u => !u.is_active).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">New This Month</p>
                <p className="text-2xl font-bold text-purple-600">
                  {users.filter(u => {
                    const date = new Date(u.created_at);
                    const now = new Date();
                    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                  }).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">#</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Joined</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12">
                      <div className="animate-spin w-8 h-8 border-4 border-indigo-500 rounded-full border-t-transparent mx-auto"></div>
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-gray-500">
                      {searchTerm ? 'No users found matching your search' : 'No users registered yet'}
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((userData, index) => (
                    <tr key={userData.id} className="border-b hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm font-medium text-gray-700">#{index + 1}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">{userData.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{userData.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{userData.phone}</td>
                      <td className="px-6 py-4">{getStatusBadge(userData.is_active)}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(userData.created_at).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => viewUserDetails(userData)}
                            className="text-indigo-600 hover:text-indigo-800 transition"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => toggleUserStatus(userData.id, userData.is_active)}
                            disabled={actionLoading}
                            className={`transition ${
                              userData.is_active
                                ? 'text-red-600 hover:text-red-800'
                                : 'text-green-600 hover:text-green-800'
                            }`}
                            title={userData.is_active ? 'Deactivate' : 'Activate'}
                          >
                            {userData.is_active ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Details Modal */}
        <AnimatePresence>
          {isModalOpen && selectedUser && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700 transition"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  {/* User Header */}
                  <div className="flex items-center gap-4 pb-4 border-b">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{selectedUser.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusBadge(selectedUser.is_active)}
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">ID: #{selectedUser.id}</span>
                      </div>
                    </div>
                  </div>

                  {/* User Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">Email</span>
                      </div>
                      <p className="text-gray-900">{selectedUser.email}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">Phone</span>
                      </div>
                      <p className="text-gray-900">{selectedUser.phone}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">Address</span>
                      </div>
                      <p className="text-gray-900">{selectedUser.address || 'Not provided'}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">Joined</span>
                      </div>
                      <p className="text-gray-900">
                        {new Date(selectedUser.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Additional Information</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">City:</span>
                        <span className="ml-2 text-gray-900">{selectedUser.city || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">State:</span>
                        <span className="ml-2 text-gray-900">{selectedUser.state || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Pincode:</span>
                        <span className="ml-2 text-gray-900">{selectedUser.pincode || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Country:</span>
                        <span className="ml-2 text-gray-900">{selectedUser.country || 'India'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t">
                    <button
                      onClick={() => {
                        toggleUserStatus(selectedUser.id, selectedUser.is_active);
                        closeModal();
                      }}
                      disabled={actionLoading}
                      className={`flex-1 py-2 rounded-lg transition text-white ${
                        selectedUser.is_active
                          ? 'bg-red-600 hover:bg-red-700'
                          : 'bg-green-600 hover:bg-green-700'
                      }`}
                    >
                      {selectedUser.is_active ? 'Deactivate User' : 'Activate User'}
                    </button>
                    <button
                      onClick={closeModal}
                      className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserManager;
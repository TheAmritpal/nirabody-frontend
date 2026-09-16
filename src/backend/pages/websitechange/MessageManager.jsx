import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';
import Sidebar from '../Sidebar';
import { apiUrl } from '../https';
import { AdminAuthContext } from '../../context/AdminAuth';

const MessageManager = () => {
  const { user, isAuthenticated } = useContext(AdminAuthContext);

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unviewedCount, setUnviewedCount] = useState(0);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchMessages = async () => {
    if (!isAuthenticated()) {
      toast.error('Please log in as admin');
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/memeber/messages`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      if (res.data.status) {
        setMessages(res.data.data || []);
        setUnviewedCount(res.data.unviewed_count || 0);
      }
    } catch (err) {
      toast.error('Failed to load messages');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Mark All as Viewed
  const markAllViewed = async () => {
    setActionLoading(true);
    try {
      const res = await axios.post(
        `${apiUrl}/memeber/messages/viewed`,
        {},
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );

      if (res.data.status) {
        toast.success('All messages marked as viewed');
        fetchMessages(); // refresh
      }
    } catch (err) {
      toast.error('Failed to mark as viewed');
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Single Message
  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    setActionLoading(true);

    try {
      const res = await axios.delete(
        `${apiUrl}/memeber/messages/${confirmDeleteId}`,
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );

      if (res.data.status) {
        toast.success('Message deleted successfully');
        fetchMessages();
      }
    } catch (err) {
      toast.error('Delete failed');
    } finally {
      setConfirmDeleteId(null);
      setActionLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-6 md:p-8">
        <ToastContainer position="top-right" autoClose={3000} />

        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Messages Management</h1>
            <p className="mt-1 text-gray-600">
              Total Messages: <span className="font-semibold">{messages.length}</span> | 
              Unviewed: <span className="font-semibold text-red-600">{unviewedCount}</span>
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={markAllViewed}
            disabled={actionLoading || unviewedCount === 0}
            className="flex items-center gap-2 px-6 py-3 text-white transition-colors bg-green-600 rounded-xl hover:bg-green-700 disabled:opacity-60"
          >
            <EyeIcon className="w-5 h-5" />
            Mark All as Viewed
          </motion.button>
        </div>

        {/* Table */}
        <div className="overflow-hidden bg-white border border-gray-200 shadow-lg rounded-2xl">
          <div className="max-h-[70vh] overflow-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="sticky top-0 z-10 bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">ID</th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Name</th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Email</th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Phone</th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Message</th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Date</th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Status</th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={8} className="py-20 text-center">
                      <div className="flex items-center justify-center gap-3 text-gray-500">
                        <div className="w-8 h-8 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin" />
                        Loading messages...
                      </div>
                    </td>
                  </tr>
                ) : messages.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-16 text-center text-gray-500">
                      No messages yet.
                    </td>
                  </tr>
                ) : (
                  messages.map((msg) => (
                    <tr key={msg.id} className="transition-colors hover:bg-gray-50">
                      <td className="px-6 py-5 text-sm font-medium text-gray-700">#{msg.id}</td>
                      <td className="px-6 py-5 text-sm font-medium text-gray-800">{msg.name}</td>
                      <td className="px-6 py-5 text-sm text-gray-600">{msg.email}</td>
                      <td className="px-6 py-5 text-sm text-gray-600">{msg.phone}</td>
                      <td className="max-w-md px-6 py-5 text-sm text-gray-600 truncate">
                        {msg.message}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-500">
                        {new Date(msg.created_at).toLocaleString()}
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                            msg.viewed
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {msg.viewed ? 'Viewed' : 'New'}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <button
                          onClick={() => setConfirmDeleteId(msg.id)}
                          disabled={actionLoading}
                          className="text-red-600 transition-colors hover:text-red-800"
                          title="Delete Message"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {confirmDeleteId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl"
              >
                <h3 className="mb-4 text-xl font-bold text-gray-900">Confirm Deletion</h3>
                <p className="mb-8 text-gray-600">
                  Are you sure you want to delete this message? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setConfirmDeleteId(null)}
                    disabled={actionLoading}
                    className="px-6 py-3 text-gray-700 transition-colors border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-60"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={actionLoading}
                    className={`px-6 py-3 text-white rounded-xl shadow-md flex items-center gap-2 ${
                      actionLoading ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                    }`}
                  >
                    {actionLoading && (
                      <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin" />
                    )}
                    Delete Message
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MessageManager;
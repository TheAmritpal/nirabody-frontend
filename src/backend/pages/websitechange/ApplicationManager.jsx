import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import Sidebar from '../Sidebar';
import { apiUrl } from '../https';
import { AdminAuthContext } from '../../context/AdminAuth';

const ApplicationManager = () => {
  const { user, isAuthenticated } = useContext(AdminAuthContext);
  const [applications, setApplications] = useState([]);
  const [unviewedCount, setUnviewedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchApplications = async () => {
    if (!isAuthenticated()) return;

    setIsLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/memeber/applications`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      if (res.data.status) {
        setApplications(res.data.data || []);
        setUnviewedCount(res.data.unviewed_count || 0);
      }
    } catch (err) {
      toast.error('Failed to load applications');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const markAllViewed = async () => {
    setActionLoading(true);
    try {
      const res = await axios.post(
        `${apiUrl}/memeber/applications/viewed`,
        {},
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      if (res.data.status) {
        toast.success('All applications marked as viewed');
        fetchApplications();
      }
    } catch (err) {
      toast.error('Failed to mark as viewed');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    setActionLoading(true);

    try {
      const res = await axios.delete(
        `${apiUrl}/memeber/applications/${confirmDeleteId}`,
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      if (res.data.status) {
        toast.success('Application deleted successfully');
        fetchApplications();
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

        <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Applications Management</h1>
            <p className="mt-1 text-gray-600">
              Total: <span className="font-semibold">{applications.length}</span> | 
              Unviewed: <span className="font-semibold text-red-600">{unviewedCount}</span>
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            onClick={markAllViewed}
            disabled={actionLoading || unviewedCount === 0}
            className="flex items-center gap-2 px-6 py-3 text-white bg-green-600 rounded-xl hover:bg-green-700 disabled:opacity-60"
          >
            <EyeIcon className="w-5 h-5" />
            Mark All as Viewed
          </motion.button>
        </div>

        <div className="overflow-hidden bg-white border border-gray-200 shadow-lg rounded-2xl">
          <div className="max-h-[70vh] overflow-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="sticky top-0 bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">ID</th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Full Name</th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Email</th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Phone</th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Membership Type</th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Reason</th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Date</th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Status</th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <tr><td colSpan={9} className="py-20 text-center">Loading...</td></tr>
                ) : applications.length === 0 ? (
                  <tr><td colSpan={9} className="py-16 text-center text-gray-500">No applications yet</td></tr>
                ) : (
                  applications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-6 py-5">#{app.id}</td>
                      <td className="px-6 py-5 font-medium">{app.full_name}</td>
                      <td className="px-6 py-5">{app.email}</td>
                      <td className="px-6 py-5">{app.phone}</td>
                      <td className="px-6 py-5 capitalize">{app.membership_type}</td>
                      <td className="max-w-xs px-6 py-5 truncate">{app.experience}</td>
                      <td className="px-6 py-5 text-sm text-gray-500">
                        {new Date(app.created_at).toLocaleString()}
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${app.viewed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {app.viewed ? 'Viewed' : 'New'}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <button
                          onClick={() => setConfirmDeleteId(app.id)}
                          className="text-red-600 hover:text-red-800"
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
            <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className="w-full max-w-md p-8 bg-white rounded-2xl" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
                <h3 className="text-xl font-bold">Confirm Deletion</h3>
                <p className="mt-4 text-gray-600">Are you sure you want to delete this application?</p>
                <div className="flex justify-end gap-4 mt-8">
                  <button onClick={() => setConfirmDeleteId(null)} className="px-6 py-3 border rounded-xl">Cancel</button>
                  <button onClick={handleDelete} className="px-6 py-3 text-white bg-red-600 rounded-xl">Delete</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ApplicationManager;
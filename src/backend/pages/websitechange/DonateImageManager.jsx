import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import Sidebar from '../Sidebar';
import { apiUrl } from '../https';
import { AdminAuthContext } from '../../context/AdminAuth';
import { getImageUrl } from '../../../Helper';

const DonateImageManager = () => {
  const { user, isAuthenticated } = useContext(AdminAuthContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const recordsPerPage = 20;

  const fetchItems = async (page = 1) => {
    if (!isAuthenticated()) {
      toast.error('Please log in');
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/donations`, {
        params: { page, per_page: recordsPerPage },
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      if (res.data.status) {
        setItems(res.data.data || []);
        setCurrentPage(res.data.current_page || 1);
        setTotalPages(res.data.last_page || 1);
      } else {
        toast.error('Failed to load donations');
      }
    } catch (err) {
      toast.error('Error fetching donations');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(currentPage);
  }, [currentPage]);

  const openAddModal = () => {
    setEditingItem(null);
    reset({ image: null });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    reset();
  };

  const onSubmit = async (data) => {
    setActionLoading(true);
    const formData = new FormData();
    if (data.image?.[0]) formData.append('image', data.image[0]);

    try {
      let res;

      if (editingItem) {
        formData.append('_method', 'PATCH');
        res = await axios.post(
          `${apiUrl}/memeber/donations/${editingItem.id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
      } else {
        res = await axios.post(
          `${apiUrl}/memeber/donations`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
      }

      if (res.data.status) {
        toast.success(editingItem ? 'Updated successfully' : 'Added successfully');
        fetchItems(1);
        closeModal();
      } else {
        toast.error(res.data.message || 'Operation failed');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    setActionLoading(true);

    try {
      const res = await axios.delete(
        `${apiUrl}/memeber/donations/${confirmDeleteId}`,
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      );
      if (res.data.status) {
        toast.success('Deleted successfully');
        fetchItems(currentPage);
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
        <ToastContainer position="top-right" autoClose={3000} theme="light" />

        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Donation Gallery Management</h1>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={openAddModal}
            disabled={actionLoading}
            className="flex items-center gap-2 px-6 py-3 text-white transition-colors bg-indigo-600 shadow-md rounded-xl hover:bg-indigo-700 disabled:opacity-60"
          >
            <PlusIcon className="w-5 h-5" />
            Add New Image
          </motion.button>
        </div>

        {/* Table */}
        <div className="overflow-hidden bg-white border border-gray-200 shadow-lg rounded-2xl">
          <div className="max-h-[70vh] overflow-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">ID</th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Image</th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={3} className="py-20 text-center">
                      <div className="flex items-center justify-center gap-3 text-gray-500">
                        <div className="w-8 h-8 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin" />
                        Loading donations...
                      </div>
                    </td>
                  </tr>
                ) : items.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-16 text-center text-gray-500">
                      No donation images found. Start by adding one.
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item.id} className="transition-colors hover:bg-gray-50">
                      <td className="px-6 py-5 text-sm font-medium text-gray-700">#{item.id}</td>
                      <td className="px-6 py-5">
                        {item.image ? (
                          <img
                            src={getImageUrl(item.image)}
                            alt="donation image"
                            className="object-cover w-20 h-20 border border-gray-200 rounded-lg shadow-sm"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-20 h-20 text-xs text-gray-400 bg-gray-100 rounded-lg">
                            No image
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-5">
                          <button
                            onClick={() => openEditModal(item)}
                            disabled={actionLoading}
                            className="text-indigo-600 transition-colors hover:text-indigo-800"
                            title="Edit item"
                          >
                            <PencilIcon className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(item.id)}
                            disabled={actionLoading}
                            className="text-red-600 transition-colors hover:text-red-800"
                            title="Delete item"
                          >
                            <TrashIcon className="w-5 h-5" />
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

        {/* Pagination - Same as before */}
        {totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              disabled={currentPage === 1 || actionLoading}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-5 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages || actionLoading}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-5 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {/* Add/Edit Modal - Same UI */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
            >
              <motion.div
                initial={{ scale: 0.95, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 30 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6 md:p-8">
                  <h2 className="mb-6 text-2xl font-bold text-gray-900">
                    {editingItem ? 'Edit Donation Image' : 'Add New Donation Image'}
                  </h2>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Image {editingItem ? '(leave blank to keep current)' : '(required)'}
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        {...register('image', { required: !editingItem })}
                        className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                      />
                      {errors.image && (
                        <p className="mt-2 text-sm text-red-600">Image is required</p>
                      )}
                    </div>

                    {editingItem?.image && (
                      <div className="mt-4">
                        <p className="mb-2 text-sm font-medium text-gray-700">Current Image:</p>
                        <img
                          src={getImageUrl(editingItem.image)}
                          alt="current preview"
                          className="object-cover w-40 h-40 border border-gray-200 shadow-md rounded-xl"
                        />
                      </div>
                    )}

                    <div className="flex justify-end gap-4 mt-8">
                      <button
                        type="button"
                        onClick={closeModal}
                        disabled={actionLoading}
                        className="px-6 py-3 text-gray-700 transition-colors border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-60"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={actionLoading}
                        className={`px-8 py-3 text-white rounded-xl shadow-md transition-all flex items-center gap-2 ${
                          actionLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                        }`}
                      >
                        {actionLoading && (
                          <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin" />
                        )}
                        {actionLoading
                          ? 'Saving...'
                          : editingItem
                          ? 'Update Image'
                          : 'Add Image'}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation - Same */}
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
                  Are you sure you want to delete this donation image? This action cannot be undone.
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
                    Delete
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



export default DonateImageManager;
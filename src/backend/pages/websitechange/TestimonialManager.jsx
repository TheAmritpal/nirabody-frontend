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
  EyeIcon,
  EyeSlashIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import Sidebar from '../Sidebar';
import { apiUrl } from '../https';
import { AdminAuthContext } from '../../context/AdminAuth';

const TestimonialManager = () => {
  const { user, isAuthenticated } = useContext(AdminAuthContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [rating, setRating] = useState(5);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const fetchItems = async () => {
    if (!isAuthenticated()) {
      toast.error('Please log in');
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/memeber/testimonials`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      if (res.data.status) {
        setItems(res.data.data || []);
      } else {
        toast.error('Failed to load testimonials');
      }
    } catch (err) {
      toast.error('Error fetching testimonials');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setRating(5);
    reset({ name: '', location: '', text: '', rating: 5 });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setRating(item.rating || 5);
    setValue('name', item.name);
    setValue('location', item.location || '');
    setValue('text', item.text);
    setValue('rating', item.rating || 5);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setRating(5);
    reset();
  };

  const onSubmit = async (data) => {
    setActionLoading(true);

    try {
      let res;

      if (editingItem) {
        res = await axios.put(
          `${apiUrl}/memeber/testimonials/${editingItem.id}`,
          {
            name: data.name,
            location: data.location,
            text: data.text,
            rating: parseInt(data.rating) || 5,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
      } else {
        res = await axios.post(
          `${apiUrl}/memeber/testimonials`,
          {
            name: data.name,
            location: data.location,
            text: data.text,
            rating: parseInt(data.rating) || 5,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
      }

      if (res.data.status) {
        toast.success(editingItem ? 'Updated successfully' : 'Added successfully');
        fetchItems();
        closeModal();
      } else {
        toast.error(res.data.message || 'Operation failed');
      }
    } catch (err) {
      if (err.response?.data?.errors) {
        const errors = Object.values(err.response.data.errors).flat();
        toast.error(errors.join(', '));
      } else {
        toast.error(err.response?.data?.message || 'Something went wrong');
      }
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
        `${apiUrl}/memeber/testimonials/${confirmDeleteId}`,
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      );
      if (res.data.status) {
        toast.success('Deleted successfully');
        fetchItems();
      }
    } catch (err) {
      toast.error('Delete failed');
    } finally {
      setConfirmDeleteId(null);
      setActionLoading(false);
    }
  };

  const toggleActive = async (item) => {
    try {
      const res = await axios.post(
        `${apiUrl}/memeber/testimonials/${item.id}/toggle`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      
      if (res.data.status) {
        toast.success(`Testimonial ${!item.is_active ? 'activated' : 'deactivated'}`);
        fetchItems();
      }
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  // Render stars for display
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <StarIcon key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
    ));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-6 md:p-8">
        <ToastContainer position="top-right" autoClose={3000} theme="light" />

        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Testimonial Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage customer testimonials</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={openAddModal}
            disabled={actionLoading}
            className="flex items-center gap-2 px-6 py-3 text-white transition-colors bg-indigo-600 shadow-md rounded-xl hover:bg-indigo-700 disabled:opacity-60"
          >
            <PlusIcon className="w-5 h-5" />
            Add New Testimonial
          </motion.button>
        </div>

        {/* Table */}
        <div className="overflow-hidden bg-white border border-gray-200 shadow-lg rounded-2xl">
          <div className="max-h-[75vh] overflow-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="sticky top-0 bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">#</th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Name</th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Location</th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Testimonial</th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Rating</th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Status</th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="py-20 text-center">
                      <div className="flex items-center justify-center gap-3 text-gray-500">
                        <div className="w-8 h-8 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin" />
                        Loading testimonials...
                      </div>
                    </td>
                  </tr>
                ) : items.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-gray-500">
                      No testimonials found. Start by adding one.
                    </td>
                  </tr>
                ) : (
                  items.map((item, index) => (
                    <tr key={item.id} className="transition-colors hover:bg-gray-50">
                      <td className="px-6 py-5 text-sm font-medium text-gray-700">
                        #{index + 1}
                      </td>
                      <td className="px-6 py-5 text-sm font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600">
                        {item.location || '-'}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600 max-w-xs">
                        <p className="line-clamp-2">{item.text}</p>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-1">
                          {renderStars(item.rating || 5)}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <button
                          onClick={() => toggleActive(item)}
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            item.is_active
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          }`}
                        >
                          {item.is_active ? (
                            <>
                              <EyeIcon className="w-4 h-4" />
                              Active
                            </>
                          ) : (
                            <>
                              <EyeSlashIcon className="w-4 h-4" />
                              Inactive
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => openEditModal(item)}
                            disabled={actionLoading}
                            className="text-indigo-600 transition-colors hover:text-indigo-800"
                            title="Edit"
                          >
                            <PencilIcon className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(item.id)}
                            disabled={actionLoading}
                            className="text-red-600 transition-colors hover:text-red-800"
                            title="Delete"
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

        {/* Add/Edit Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.95, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 30 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 md:p-8">
                  <h2 className="mb-6 text-2xl font-bold text-gray-900">
                    {editingItem ? 'Edit Testimonial' : 'Add New Testimonial'}
                  </h2>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Name */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Name *
                      </label>
                      <input
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Enter customer name"
                      />
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <input
                        type="text"
                        {...register('location')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="City, Country"
                      />
                    </div>

                    {/* Testimonial Text */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Testimonial *
                      </label>
                      <textarea
                        {...register('text', { required: 'Testimonial is required', maxLength: 1000 })}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y"
                        placeholder="What did they say?"
                      />
                      {errors.text && (
                        <p className="mt-2 text-sm text-red-600">{errors.text.message}</p>
                      )}
                    </div>

                    {/* Rating */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Rating
                      </label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => {
                              setRating(star);
                              setValue('rating', star);
                            }}
                            className="focus:outline-none"
                          >
                            <StarIcon 
                              className={`w-8 h-8 transition-colors ${
                                star <= rating 
                                  ? 'text-yellow-400 fill-yellow-400' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          </button>
                        ))}
                        <input type="hidden" {...register('rating')} value={rating} />
                      </div>
                      <p className="mt-1 text-xs text-gray-500">Click on stars to rate</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4 mt-8 pt-4 border-t">
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
                          ? 'Update Testimonial'
                          : 'Add Testimonial'}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {confirmDeleteId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
              onClick={() => setConfirmDeleteId(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="mb-4 text-xl font-bold text-gray-900">Confirm Deletion</h3>
                <p className="mb-8 text-gray-600">
                  Are you sure you want to delete this testimonial? This action cannot be undone.
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

export default TestimonialManager;
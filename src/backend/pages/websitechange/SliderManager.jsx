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
} from '@heroicons/react/24/outline';
import Sidebar from '../Sidebar';
import { apiUrl } from '../https';
import { AdminAuthContext } from '../../context/AdminAuth';
import { getImageUrl } from '../../../Helper';

const SliderManager = () => {
  const { user, isAuthenticated } = useContext(AdminAuthContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();
  const imageFile = watch('image');

  // Preview image effect
  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(imageFile[0]);
    } else {
      setPreviewImage(null);
    }
  }, [imageFile]);

  const fetchItems = async () => {
    if (!isAuthenticated()) {
      toast.error('Please log in');
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/sliders`);

      if (res.data.status) {
        setItems(res.data.data || []);
      } else {
        toast.error('Failed to load sliders');
      }
    } catch (err) {
      toast.error('Error fetching sliders');
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
    setPreviewImage(null);
    reset({ image: null, description: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setPreviewImage(getImageUrl(item.image));
    setValue('description', item.description || '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setPreviewImage(null);
    reset();
  };

  const onSubmit = async (data) => {
    setActionLoading(true);
    const formData = new FormData();

    // Only append image if a new one is selected
    if (data.image?.[0]) {
      formData.append('image', data.image[0]);
    }

    if (data.description) {
      formData.append('description', data.description);
    }

    try {
      let res;

      if (editingItem) {
        // Send is_active as '1' or '0' for boolean
        formData.append('is_active', editingItem.is_active ? '1' : '0');
        
        res = await axios.post(
          `${apiUrl}/memeber/sliders/${editingItem.id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${user?.token}`,
            },
          }
        );
      } else {
        res = await axios.post(
          `${apiUrl}/memeber/sliders`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${user?.token}`,
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
      console.error('Error:', err);
      console.error('Response:', err.response?.data);
      
      if (err.response?.data?.errors) {
        const errors = Object.values(err.response.data.errors).flat();
        toast.error(errors.join(', '));
      } else {
        toast.error(err.response?.data?.message || 'Something went wrong');
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    setActionLoading(true);

    try {
      const res = await axios.delete(
        `${apiUrl}/memeber/sliders/${confirmDeleteId}`,
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

  // Toggle active status
  const toggleActive = async (item) => {
    try {
      const formData = new FormData();
      // Send opposite value as '1' or '0'
      formData.append('is_active', item.is_active ? '0' : '1');
      
      const res = await axios.post(
        `${apiUrl}/memeber/sliders/${item.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${user?.token}`,
          },
        }
      );
      
      if (res.data.status) {
        toast.success(`Slider ${!item.is_active ? 'activated' : 'deactivated'}`);
        fetchItems();
      }
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-6 md:p-8">
        <ToastContainer position="top-right" autoClose={3000} theme="light" />

        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Slider Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your homepage slider images</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={openAddModal}
            disabled={actionLoading}
            className="flex items-center gap-2 px-6 py-3 text-white transition-colors bg-indigo-600 shadow-md rounded-xl hover:bg-indigo-700 disabled:opacity-60"
          >
            <PlusIcon className="w-5 h-5" />
            Add New Slider
          </motion.button>
        </div>

        {/* Table */}
        <div className="overflow-hidden bg-white border border-gray-200 shadow-lg rounded-2xl">
          <div className="max-h-[75vh] overflow-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="sticky top-0 bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">#</th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Image</th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Description</th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Status</th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="py-20 text-center">
                      <div className="flex items-center justify-center gap-3 text-gray-500">
                        <div className="w-8 h-8 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin" />
                        Loading sliders...
                      </div>
                    </td>
                  </tr>
                ) : items.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-16 text-center text-gray-500">
                      No sliders found. Start by adding one.
                    </td>
                  </tr>
                ) : (
                  items.map((item, index) => (
                    <tr key={item.id} className="transition-colors hover:bg-gray-50">
                      <td className="px-6 py-5 text-sm font-medium text-gray-700">
                        #{index + 1}
                      </td>
                      <td className="px-6 py-5">
                        {item.image ? (
                          <img
                            src={getImageUrl(item.image)}
                            alt="slider"
                            className="object-cover w-24 h-24 border border-gray-200 rounded-lg shadow-sm"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-24 h-24 text-xs text-gray-400 bg-gray-100 rounded-lg">
                            No image
                          </div>
                        )}
                      </td>
                      <td className="max-w-xs px-6 py-5 text-sm text-gray-700">
                        {item.description ? (
                          <p className="line-clamp-2">{item.description}</p>
                        ) : (
                          <span className="italic text-gray-400">No description</span>
                        )}
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
                    {editingItem ? 'Edit Slider' : 'Add New Slider'}
                  </h2>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Image Upload */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Image {editingItem ? '(Optional - leave blank to keep current)' : '(Required)'}
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        {...register('image', { 
                          required: !editingItem,
                          validate: {
                            fileSize: (file) => {
                              if (!file || !file[0]) return true;
                              return file[0].size <= 2048 * 1024 || 'File size must be less than 2MB';
                            },
                            fileType: (file) => {
                              if (!file || !file[0]) return true;
                              const allowed = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
                              return allowed.includes(file[0].type) || 'Only image files are allowed';
                            }
                          }
                        })}
                        className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                      />
                      {errors.image && (
                        <p className="mt-2 text-sm text-red-600">{errors.image.message}</p>
                      )}
                      <p className="mt-1 text-xs text-gray-500">Max size: 2MB. Allowed: JPG, PNG, GIF, WEBP</p>
                    </div>

                    {/* Image Preview */}
                    {previewImage && (
                      <div>
                        <p className="mb-2 text-sm font-medium text-gray-700">
                          {editingItem ? 'New Image Preview:' : 'Image Preview:'}
                        </p>
                        <img
                          src={previewImage}
                          alt="preview"
                          className="object-cover w-40 h-40 border border-gray-200 shadow-md rounded-xl"
                        />
                      </div>
                    )}

                    {/* Current Image (Edit Mode) */}
                    {editingItem?.image && !previewImage && (
                      <div>
                        <p className="mb-2 text-sm font-medium text-gray-700">Current Image:</p>
                        <img
                          src={getImageUrl(editingItem.image)}
                          alt="current"
                          className="object-cover w-40 h-40 border border-gray-200 shadow-md rounded-xl"
                        />
                      </div>
                    )}

                    {/* Description */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        {...register('description', { maxLength: 500 })}
                        rows={4}
                        placeholder="Enter slider description..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y min-h-[100px]"
                      />
                      <p className="mt-1 text-xs text-gray-500">Maximum 500 characters</p>
                      {errors.description && (
                        <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>
                      )}
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
                          ? 'Update Slider'
                          : 'Add Slider'}
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
                  Are you sure you want to delete this slider? This action cannot be undone.
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

export default SliderManager;
// backend/pages/websitechange/ProductManager.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Plus, Pencil, Trash2, Eye, EyeOff, X } from 'lucide-react';
import Sidebar from '../Sidebar';
import { apiUrl } from '../https';
import { AdminAuthContext } from '../../context/AdminAuth';
import { getImageUrl } from '../../../Helper';

const ProductManager = () => {
  const { user } = useContext(AdminAuthContext);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    short_description: '',
    price: '',
    original_price: '',
    image: null,
    images: [],
    category_id: '',
    badge: '',
    is_active: true,
    is_featured: false,
    benefits: [],
    stock: 0
  });
  const [previewImages, setPreviewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [benefitsInput, setBenefitsInput] = useState('');

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        axios.get(`${apiUrl}/memeber/products`, { 
          headers: { Authorization: `Bearer ${user?.token}` } 
        }),
        axios.get(`${apiUrl}/memeber/categories`, { 
          headers: { Authorization: `Bearer ${user?.token}` } 
        })
      ]);
      if (productsRes.data.status) setItems(productsRes.data.data || []);
      if (categoriesRes.data.status) setCategories(categoriesRes.data.data || []);
    } catch (err) {
      toast.error('Error fetching data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        description: item.description || '',
        short_description: item.short_description || '',
        price: item.price,
        original_price: item.original_price || '',
        image: null,
        images: [],
        category_id: item.category_id,
        badge: item.badge || '',
        is_active: item.is_active,
        is_featured: item.is_featured || false,
        benefits: item.benefits || [],
        stock: item.stock || 0
      });
      setExistingImages(item.images || []);
      setPreviewImages([getImageUrl(item.image)]);
      setBenefitsInput((item.benefits || []).join('\n'));
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        description: '',
        short_description: '',
        price: '',
        original_price: '',
        image: null,
        images: [],
        category_id: categories.length > 0 ? categories[0].id : '',
        badge: '',
        is_active: true,
        is_featured: false,
        benefits: [],
        stock: 0
      });
      setExistingImages([]);
      setPreviewImages([]);
      setBenefitsInput('');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setExistingImages([]);
    setPreviewImages([]);
    setBenefitsInput('');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file' && name === 'images') {
      const fileArray = Array.from(files);
      const previewUrls = fileArray.map(file => URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...fileArray]
      }));
      setPreviewImages(prev => [...prev, ...previewUrls]);
    } else if (type === 'file' && name === 'image') {
      const file = files[0];
      setFormData(prev => ({ ...prev, image: file }));
      setPreviewImages([URL.createObjectURL(file)]);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const removePreviewImage = (index) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const removeExistingImage = (index) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    
    try {
      const data = new FormData();
      
      // Basic fields
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('short_description', formData.short_description || '');
      data.append('price', formData.price);
      data.append('original_price', formData.original_price || '');
      data.append('category_id', formData.category_id);
      data.append('badge', formData.badge || '');
      data.append('is_active', formData.is_active ? '1' : '0');
      data.append('is_featured', formData.is_featured ? '1' : '0');
      data.append('stock', formData.stock || 0);
      
      // Main image - Required for new products
      if (formData.image) {
        data.append('image', formData.image);
      } else if (!editingItem) {
        toast.error('Main image is required');
        setActionLoading(false);
        return;
      }
      
      // Multiple images
      if (formData.images && formData.images.length > 0) {
        formData.images.forEach(img => {
          data.append('images[]', img);
        });
      }
      
      // Existing images (for update)
      if (existingImages.length > 0) {
        data.append('existing_images', JSON.stringify(existingImages));
      }
      
      // 🔥 Benefits - Convert to JSON array
      let benefitsArray = [];
      if (benefitsInput.trim()) {
        // Split by new line, trim each benefit, filter empty
        benefitsArray = benefitsInput.split('\n')
          .map(b => b.trim())
          .filter(b => b.length > 0);
      }
      // Always send as JSON string
      data.append('benefits', JSON.stringify(benefitsArray));

      let res;
      if (editingItem) {
        data.append('_method', 'PUT');
        res = await axios.post(`${apiUrl}/memeber/products/${editingItem.id}`, data, {
          headers: { 
            'Content-Type': 'multipart/form-data', 
            'Authorization': `Bearer ${user?.token}` 
          }
        });
      } else {
        res = await axios.post(`${apiUrl}/memeber/products`, data, {
          headers: { 
            'Content-Type': 'multipart/form-data', 
            'Authorization': `Bearer ${user?.token}` 
          }
        });
      }

      if (res.data.status) {
        toast.success(editingItem ? 'Updated successfully' : 'Added successfully');
        fetchItems();
        closeModal();
      } else {
        toast.error(res.data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error('Error:', err.response?.data);
      
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

  const toggleActive = async (id) => {
    try {
      const res = await axios.post(`${apiUrl}/memeber/products/${id}/toggle`, {}, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      if (res.data.status) {
        toast.success('Status toggled');
        fetchItems();
      }
    } catch (err) {
      toast.error('Failed to toggle');
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    setActionLoading(true);
    try {
      await axios.delete(`${apiUrl}/memeber/products/${confirmDeleteId}`, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      toast.success('Deleted successfully');
      fetchItems();
      setConfirmDeleteId(null);
    } catch (err) {
      toast.error('Delete failed');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 md:p-8 overflow-y-auto max-h-screen">
        <ToastContainer position="top-right" autoClose={3000} theme="light" />
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your products</p>
          </div>
          <button 
            onClick={() => openModal()} 
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            <Plus className="w-5 h-5" /> Add Product
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">#</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Image</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
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
                ) : items.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-gray-500">
                      No products found
                    </td>
                  </tr>
                ) : (
                  items.map((item, index) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm font-medium text-gray-700">#{index + 1}</td>
                      <td className="px-6 py-4">
                        {item.image ? (
                          <img 
                            src={getImageUrl(item.image)} 
                            alt={item.name} 
                            className="w-16 h-16 object-cover rounded-lg" 
                          />
                        ) : '-'}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.category?.name || '-'}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{item.price}</td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => toggleActive(item.id)} 
                          className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                            item.is_active 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {item.is_active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          {item.is_active ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => openModal(item)} 
                            className="text-indigo-600 hover:text-indigo-800"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => setConfirmDeleteId(item.id)} 
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
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
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" 
              onClick={closeModal}
            >
              <motion.div 
                initial={{ scale: 0.9 }} 
                animate={{ scale: 1 }} 
                exit={{ scale: 0.9 }} 
                className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto" 
                onClick={e => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">
                    {editingItem ? 'Edit Product' : 'Add Product'}
                  </h2>
                  <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      required 
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <textarea 
                      name="description" 
                      value={formData.description} 
                      onChange={handleInputChange} 
                      rows={3} 
                      required 
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>

                  {/* Short Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Short Description
                    </label>
                    <input 
                      type="text" 
                      name="short_description" 
                      value={formData.short_description} 
                      onChange={handleInputChange} 
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Price */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price *
                      </label>
                      <input 
                        type="number" 
                        step="0.01" 
                        name="price" 
                        value={formData.price} 
                        onChange={handleInputChange} 
                        required 
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    {/* Original Price */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Original Price
                      </label>
                      <input 
                        type="number" 
                        step="0.01" 
                        name="original_price" 
                        value={formData.original_price} 
                        onChange={handleInputChange} 
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select 
                      name="category_id" 
                      value={formData.category_id} 
                      onChange={handleInputChange} 
                      required 
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Badge */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Badge
                    </label>
                    <input 
                      type="text" 
                      name="badge" 
                      value={formData.badge} 
                      onChange={handleInputChange} 
                      placeholder="New, Best Seller, etc." 
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>

                  {/* Stock */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock
                    </label>
                    <input 
                      type="number" 
                      name="stock" 
                      value={formData.stock} 
                      onChange={handleInputChange} 
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>

                  {/* Main Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Main Image {!editingItem && '*'}
                    </label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleInputChange} 
                      name="image" 
                      className="w-full"
                    />
                    {previewImages.length > 0 && (
                      <div className="mt-2">
                        <img 
                          src={previewImages[0]} 
                          alt="Main preview" 
                          className="w-24 h-24 object-cover rounded-lg border" 
                        />
                      </div>
                    )}
                    {editingItem && !previewImages.length && (
                      <div className="mt-2">
                        <img 
                          src={getImageUrl(editingItem.image)} 
                          alt="Current main" 
                          className="w-24 h-24 object-cover rounded-lg border" 
                        />
                        <p className="text-xs text-gray-500 mt-1">Current main image</p>
                      </div>
                    )}
                  </div>

                  {/* Multiple Images */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Images (Optional)
                    </label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple 
                      onChange={handleInputChange} 
                      name="images" 
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">Select multiple images (Ctrl+Click)</p>
                    
                    {previewImages.length > 1 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {previewImages.map((img, index) => (
                          index > 0 && (
                            <div key={index} className="relative">
                              <img 
                                src={img} 
                                alt={`Preview ${index}`} 
                                className="w-16 h-16 object-cover rounded-lg border" 
                              />
                              <button
                                type="button"
                                onClick={() => removePreviewImage(index)}
                                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs hover:bg-red-600"
                              >
                                ×
                              </button>
                            </div>
                          )
                        ))}
                      </div>
                    )}

                    {editingItem && existingImages.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 mb-1">Current additional images:</p>
                        <div className="flex flex-wrap gap-2">
                          {existingImages.map((img, index) => (
                            <div key={index} className="relative">
                              <img 
                                src={getImageUrl(img)} 
                                alt={`Existing ${index}`} 
                                className="w-16 h-16 object-cover rounded-lg border" 
                              />
                              <button
                                type="button"
                                onClick={() => removeExistingImage(index)}
                                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs hover:bg-red-600"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 🔥 Benefits - One per line */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Benefits (one per line)
                    </label>
                    <textarea 
                      value={benefitsInput} 
                      onChange={(e) => setBenefitsInput(e.target.value)} 
                      rows={3} 
                      placeholder="Deeply nourishes and hydrates&#10;Improves skin elasticity&#10;Rich in antioxidants" 
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter each benefit on a new line</p>
                  </div>

                  {/* Active & Featured */}
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        name="is_active" 
                        checked={formData.is_active} 
                        onChange={handleInputChange} 
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">Active</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        name="is_featured" 
                        checked={formData.is_featured} 
                        onChange={handleInputChange} 
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">Featured</span>
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    disabled={actionLoading} 
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                  >
                    {actionLoading ? 'Saving...' : editingItem ? 'Update Product' : 'Create Product'}
                  </button>
                </form>
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
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
              <motion.div 
                initial={{ scale: 0.9 }} 
                animate={{ scale: 1 }} 
                exit={{ scale: 0.9 }} 
                className="bg-white rounded-2xl max-w-md w-full p-6"
              >
                <h3 className="text-xl font-bold mb-2">Confirm Delete</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this product? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                  <button 
                    onClick={() => setConfirmDeleteId(null)} 
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleDelete} 
                    disabled={actionLoading} 
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                  >
                    {actionLoading ? 'Deleting...' : 'Delete'}
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

export default ProductManager;
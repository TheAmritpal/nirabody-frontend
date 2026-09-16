// backend/pages/websitechange/BlogManager.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Star } from 'lucide-react';
import Sidebar from '../Sidebar';
import { apiUrl } from '../https';
import { AdminAuthContext } from '../../context/AdminAuth';
import { getImageUrl } from '../../../Helper';

const BlogManager = () => {
  const { user } = useContext(AdminAuthContext);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: null,
    category_id: '',
    author: '',
    author_role: '',
    tags: [],
    read_time: '5 min read',
    is_featured: false,
    is_active: true,
    published_at: ''
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [tagsInput, setTagsInput] = useState('');

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const [blogsRes, categoriesRes] = await Promise.all([
        axios.get(`${apiUrl}/memeber/blogs`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        }),
        axios.get(`${apiUrl}/memeber/blog-categories`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
      ]);
      if (blogsRes.data.status) setItems(blogsRes.data.data || []);
      if (categoriesRes.data.status) setCategories(categoriesRes.data.data || []);
    } catch (err) {
      toast.error('Error fetching data');
      console.error(err);
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
        title: item.title,
        excerpt: item.excerpt,
        content: item.content,
        image: null,
        category_id: item.category_id,
        author: item.author,
        author_role: item.author_role || '',
        tags: item.tags || [],
        read_time: item.read_time || '5 min read',
        is_featured: item.is_featured || false,
        is_active: item.is_active,
        published_at: item.published_at ? new Date(item.published_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
      });
      setPreviewImage(getImageUrl(item.image));
      setTagsInput((item.tags || []).join(', '));
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        image: null,
        category_id: categories.length > 0 ? categories[0].id : '',
        author: '',
        author_role: '',
        tags: [],
        read_time: '5 min read',
        is_featured: false,
        is_active: true,
        published_at: new Date().toISOString().split('T')[0]
      });
      setPreviewImage(null);
      setTagsInput('');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setPreviewImage(null);
    setTagsInput('');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      const file = files[0];
      setFormData(prev => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    
    try {
      const data = new FormData();
      
      // Required fields
      data.append('title', formData.title);
      data.append('excerpt', formData.excerpt);
      data.append('content', formData.content);
      data.append('category_id', formData.category_id);
      data.append('author', formData.author);
      data.append('author_role', formData.author_role || '');
      data.append('read_time', formData.read_time || '5 min read');
      data.append('is_featured', formData.is_featured ? '1' : '0');
      data.append('is_active', formData.is_active ? '1' : '0');
      data.append('published_at', formData.published_at || new Date().toISOString().split('T')[0]);
      
      // Image - Required for new posts
      if (formData.image) {
        data.append('image', formData.image);
      } else if (!editingItem) {
        toast.error('Image is required for new posts');
        setActionLoading(false);
        return;
      }
      
      // 🔥 FIX: Tags - Always send as JSON array
      let tagsArray = [];
      if (tagsInput.trim()) {
        tagsArray = tagsInput.split(',').map(t => t.trim()).filter(t => t);
      }
      // Always send tags as JSON string
      data.append('tags', JSON.stringify(tagsArray));

      let res;
      if (editingItem) {
        data.append('_method', 'PUT');
        res = await axios.post(`${apiUrl}/memeber/blogs/${editingItem.id}`, data, {
          headers: { 
            'Content-Type': 'multipart/form-data', 
            'Authorization': `Bearer ${user?.token}` 
          }
        });
      } else {
        res = await axios.post(`${apiUrl}/memeber/blogs`, data, {
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
      const res = await axios.post(`${apiUrl}/memeber/blogs/${id}/toggle`, {}, {
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

  const toggleFeatured = async (id) => {
    try {
      const res = await axios.post(`${apiUrl}/memeber/blogs/${id}/toggle-featured`, {}, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      if (res.data.status) {
        toast.success('Featured toggled');
        fetchItems();
      }
    } catch (err) {
      toast.error('Failed to toggle featured');
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    setActionLoading(true);
    try {
      await axios.delete(`${apiUrl}/memeber/blogs/${confirmDeleteId}`, {
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
            <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage blog posts</p>
          </div>
          <button onClick={() => openModal()} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
            <Plus className="w-5 h-5" /> Add Post
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">#</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Image</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Author</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Featured</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={8} className="text-center py-12"><div className="animate-spin w-8 h-8 border-4 border-indigo-500 rounded-full border-t-transparent mx-auto"></div></td></tr>
                ) : items.length === 0 ? (
                  <tr><td colSpan={8} className="text-center py-12 text-gray-500">No blog posts found</td></tr>
                ) : (
                  items.map((item, index) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm font-medium text-gray-700">#{index + 1}</td>
                      <td className="px-6 py-4">
                        {item.image ? <img src={getImageUrl(item.image)} alt={item.title} className="w-16 h-16 object-cover rounded-lg" /> : '-'}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 max-w-xs truncate">{item.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.category?.name || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.author}</td>
                      <td className="px-6 py-4">
                        <button onClick={() => toggleActive(item.id)} className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${item.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {item.is_active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          {item.is_active ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => toggleFeatured(item.id)} className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${item.is_featured ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>
                          <Star className="w-3 h-3" />
                          {item.is_featured ? 'Featured' : 'No'}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button onClick={() => openModal(item)} className="text-indigo-600 hover:text-indigo-800"><Pencil className="w-4 h-4" /></button>
                          <button onClick={() => setConfirmDeleteId(item.id)} className="text-red-600 hover:text-red-800"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={closeModal}>
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">{editingItem ? 'Edit Post' : 'Add Post'}</h2>
                  <button onClick={closeModal} className="text-gray-500 hover:text-gray-700"><X className="w-5 h-5" /></button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt *</label>
                    <textarea name="excerpt" value={formData.excerpt} onChange={handleInputChange} rows={2} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
                    <textarea name="content" value={formData.content} onChange={handleInputChange} rows={6} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                      <select name="category_id" value={formData.category_id} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500">
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Read Time</label>
                      <input type="text" name="read_time" value={formData.read_time} onChange={handleInputChange} placeholder="5 min read" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Author *</label>
                      <input type="text" name="author" value={formData.author} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Author Role</label>
                      <input type="text" name="author_role" value={formData.author_role} onChange={handleInputChange} placeholder="Wellness Expert" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                    <input type="text" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="Rituals, Skincare, Wellness" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
                    <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image {!editingItem && '*'}</label>
                    <input type="file" accept="image/*" onChange={handleInputChange} name="image" className="w-full" />
                    {previewImage && <img src={previewImage} alt="preview" className="mt-2 w-24 h-24 object-cover rounded-lg" />}
                    {editingItem && !previewImage && editingItem.image && (
                      <div className="mt-2">
                        <img src={getImageUrl(editingItem.image)} alt="Current" className="w-24 h-24 object-cover rounded-lg" />
                        <p className="text-xs text-gray-500 mt-1">Current image</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Published Date</label>
                    <input type="date" name="published_at" value={formData.published_at} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
                  </div>

                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleInputChange} className="w-4 h-4" />
                      <span className="text-sm text-gray-700">Active</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleInputChange} className="w-4 h-4" />
                      <span className="text-sm text-gray-700">Featured</span>
                    </label>
                  </div>

                  <button type="submit" disabled={actionLoading} className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50">
                    {actionLoading ? 'Saving...' : editingItem ? 'Update Post' : 'Create Post'}
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Modal */}
        <AnimatePresence>
          {confirmDeleteId && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white rounded-2xl max-w-md w-full p-6">
                <h3 className="text-xl font-bold mb-2">Confirm Delete</h3>
                <p className="text-gray-600 mb-6">Are you sure you want to delete this blog post?</p>
                <div className="flex justify-end gap-3">
                  <button onClick={() => setConfirmDeleteId(null)} className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition">Cancel</button>
                  <button onClick={handleDelete} disabled={actionLoading} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50">Delete</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BlogManager;
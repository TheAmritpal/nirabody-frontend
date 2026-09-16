import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Pencil,
  RefreshCw,
  Eye,
  EyeOff,
  Save,
  X,
} from 'lucide-react';
import Sidebar from '../Sidebar';
import { apiUrl } from '../https';
import { AdminAuthContext } from '../../context/AdminAuth';

const SiteSettingsManager = () => {
  const { user } = useContext(AdminAuthContext);
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [editValue, setEditValue] = useState('');

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/memeber/settings`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      if (res.data.status) {
        setSettings(res.data.data);
      } else {
        toast.error('Failed to load settings');
      }
    } catch (err) {
      toast.error('Error fetching settings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleEdit = (key, value) => {
    setEditingKey(key);
    setEditValue(value || '');
  };

  const handleSave = async (key) => {
    setSaving(true);
    try {
      const res = await axios.put(
        `${apiUrl}/memeber/settings/${key}`,
        { value: editValue },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      if (res.data.status) {
        toast.success('Setting updated successfully');
        fetchSettings();
        setEditingKey(null);
      } else {
        toast.error(res.data.message || 'Update failed');
      }
    } catch (err) {
      toast.error('Failed to update setting');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (key) => {
    try {
      const res = await axios.post(
        `${apiUrl}/memeber/settings/${key}/toggle`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      if (res.data.status) {
        toast.success('Status toggled successfully');
        fetchSettings();
      }
    } catch (err) {
      toast.error('Failed to toggle status');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  const groupedSettings = settings;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 md:p-8 overflow-y-auto max-h-screen">
        <ToastContainer position="top-right" autoClose={3000} theme="light" />

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Site Settings</h1>
            <p className="text-sm text-gray-500 mt-1">Manage all your website settings</p>
          </div>
          <button
            onClick={fetchSettings}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Refresh
          </button>
        </div>

        {/* Settings Groups */}
        <div className="space-y-6 pb-8">
          {Object.keys(groupedSettings).filter(key => key !== 'all').map((group) => (
            <motion.div
              key={group}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
            >
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 capitalize">
                  {group}
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {groupedSettings[group].map((setting) => (
                  <div key={setting.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <p className="text-sm font-medium text-gray-700">
                            {setting.key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </p>
                          <button
                            onClick={() => toggleActive(setting.id)}
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium transition-colors ${
                              setting.is_active
                                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                          >
                            {setting.is_active ? (
                              <Eye className="w-3 h-3" />
                            ) : (
                              <EyeOff className="w-3 h-3" />
                            )}
                            {setting.is_active ? 'Active' : 'Inactive'}
                          </button>
                        </div>
                        
                        {editingKey === setting.id ? (
                          <div className="mt-2 flex flex-col sm:flex-row gap-2">
                            {setting.type === 'textarea' ? (
                              <textarea
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                rows={3}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              />
                            ) : (
                              <input
                                type={setting.type === 'url' ? 'url' : 'text'}
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              />
                            )}
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleSave(setting.id)}
                                disabled={saving}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
                              >
                                <Save className="w-4 h-4" />
                                Save
                              </button>
                              <button
                                onClick={() => setEditingKey(null)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap flex items-center gap-2"
                              >
                                <X className="w-4 h-4" />
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-1 flex items-start justify-between gap-4">
                            <p className="text-sm text-gray-600 break-all">
                              {setting.value || <span className="text-gray-400 italic">Empty</span>}
                            </p>
                            <button
                              onClick={() => handleEdit(setting.id, setting.value)}
                              className="flex-shrink-0 text-indigo-600 hover:text-indigo-800 transition-colors"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* No settings */}
        {Object.keys(groupedSettings).filter(key => key !== 'all').length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No settings found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SiteSettingsManager;
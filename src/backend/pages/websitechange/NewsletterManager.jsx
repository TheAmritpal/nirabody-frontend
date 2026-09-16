// backend/pages/websitechange/NewsletterManager.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Trash2, Mail, CheckCircle, XCircle } from 'lucide-react';
import Sidebar from '../Sidebar';
import { apiUrl } from '../https';
import { AdminAuthContext } from '../../context/AdminAuth';

const NewsletterManager = () => {
  const { user } = useContext(AdminAuthContext);
  const [subscribers, setSubscribers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSubscribers = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/memeber/newsletters`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      if (res.data.status) {
        setSubscribers(res.data.data || []);
      }
    } catch (err) {
      toast.error('Error fetching subscribers');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 md:p-8 overflow-y-auto max-h-screen">
        <ToastContainer position="top-right" autoClose={3000} theme="light" />

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Newsletter Subscribers</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your email subscribers</p>
          </div>
          <div className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg">
            <Mail className="w-5 h-5" />
            <span className="font-semibold">{subscribers.length}</span>
            <span className="text-sm">Subscribers</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">#</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Subscribed At</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">IP Address</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={5} className="text-center py-12"><div className="animate-spin w-8 h-8 border-4 border-indigo-500 rounded-full border-t-transparent mx-auto"></div></td></tr>
                ) : subscribers.length === 0 ? (
                  <tr><td colSpan={5} className="text-center py-12 text-gray-500">No subscribers yet</td></tr>
                ) : (
                  subscribers.map((item, index) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm font-medium text-gray-700">#{index + 1}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">{item.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${
                          item.is_subscribed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {item.is_subscribed ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {item.is_subscribed ? 'Active' : 'Unsubscribed'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(item.subscribed_at).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.ip_address || '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterManager;
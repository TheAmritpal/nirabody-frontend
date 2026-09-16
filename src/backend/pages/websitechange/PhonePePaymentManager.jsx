import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  TrashIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import Sidebar from '../Sidebar';
import { apiUrl } from '../https';
import { AdminAuthContext } from '../../context/AdminAuth';

const PhonePePaymentManager = () => {
  const { user, isAuthenticated } = useContext(AdminAuthContext);

  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchPayments = async () => {
    if (!isAuthenticated()) {
      toast.error('Please log in as admin');
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/memeber/phonepe-payments`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      if (res.data.status) {
        setPayments(res.data.data || []);
      }
    } catch (err) {
      toast.error('Failed to load PhonePe payments');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  

  const checkPaymentStatus = async (id) => {
    setActionLoading(true);
    try {
      const res = await axios.post(
        `${apiUrl}/memeber/phonepe-payments/${id}/check-status`,
        {},
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );

      if (res.data.status) {
        toast.success(res.data.message || 'Status updated');
        fetchPayments();
      } else {
        toast.error(res.data.message || 'Failed');
      }
    } catch (err) {
      toast.error('Failed to check status');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    setActionLoading(true);

    try {
      const res = await axios.delete(
        `${apiUrl}/memeber/phonepe-payments/${confirmDeleteId}`,
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );

      if (res.data.status) {
        toast.success('Payment record deleted successfully');
        fetchPayments();
      }
    } catch (err) {
      toast.error('Delete failed');
    } finally {
      setConfirmDeleteId(null);
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'success') return <span className="px-3 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">Success</span>;
    if (status === 'failed') return <span className="px-3 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">Failed</span>;
    return <span className="px-3 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">Pending</span>;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-6 md:p-8">
        <ToastContainer position="top-right" autoClose={3000} />

        <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">PhonePe Payments</h1>
            <p className="mt-1 text-gray-600">
              Total Records: <span className="font-semibold">{payments.length}</span>
            </p>
          </div>
        </div>

        <div className="overflow-hidden bg-white border border-gray-200 shadow-lg rounded-2xl">
          <div className="max-h-[75vh] overflow-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="sticky top-0 z-10 bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Date</th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Name</th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Email</th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Amount</th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Status</th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Merchant Tx ID</th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">PhonePe Tx ID</th>
                  <th className="px-6 py-4 text-center text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={8} className="py-20 text-center">
                      <div className="flex items-center justify-center gap-3 text-gray-500">
                        <div className="w-8 h-8 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin" />
                        Loading payments...
                      </div>
                    </td>
                  </tr>
                ) : payments.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-16 text-center text-gray-500">No payments found</td>
                  </tr>
                ) : (
                  payments.map((payment) => (
                    <tr key={payment.id} className="transition-colors hover:bg-gray-50">
                      <td className="px-6 py-5 text-sm text-gray-500">
                        {new Date(payment.created_at).toLocaleString()}
                      </td>
                      <td className="px-6 py-5 text-sm font-medium">{payment.name || 'Anonymous'}</td>
                      <td className="px-6 py-5 text-sm text-gray-600">{payment.email || '-'}</td>
                      <td className="px-6 py-5 text-sm font-semibold">₹{Number(payment.amount).toLocaleString('en-IN')}</td>
                      <td className="px-6 py-5">{getStatusBadge(payment.status)}</td>
                      <td className="px-6 py-5 text-xs text-gray-600 break-all">{payment.merchant_transaction_id}</td>
                      <td className="px-6 py-5 text-xs text-gray-600">{payment.phonepe_transaction_id || '-'}</td>
                      <td className="px-6 py-5 text-center">
                        <div className="flex justify-center gap-5">
                          {payment.status !== 'success' && (
                            <button
                              onClick={() => checkPaymentStatus(payment.id)}
                              className="text-purple-600 hover:text-purple-700"
                            >
                              <EyeIcon className="w-5 h-5" />
                            </button>
                          )}
                          <button
                            onClick={() => setConfirmDeleteId(payment.id)}
                            className="text-red-600 hover:text-red-700"
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
                <h3 className="mb-4 text-xl font-bold">Confirm Deletion</h3>
                <p className="mb-8 text-gray-600">Are you sure you want to delete this payment record?</p>
                <div className="flex justify-end gap-4">
                  <button onClick={() => setConfirmDeleteId(null)} className="px-6 py-3 border border-gray-300 rounded-xl">Cancel</button>
                  <button onClick={handleDelete} disabled={actionLoading} className="px-6 py-3 text-white bg-red-600 rounded-xl">
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

export default PhonePePaymentManager;
// backend/pages/websitechange/OrderManager.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Eye,
  Package,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  ShoppingBag,
  IndianRupee,
  RefreshCw
} from 'lucide-react';
import Sidebar from '../Sidebar';
import { apiUrl } from '../https';
import { AdminAuthContext } from '../../context/AdminAuth';
import { getImageUrl } from '../../../Helper';

const OrderManager = () => {
  const { user } = useContext(AdminAuthContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/memeber/orders`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      if (res.data.status) {
        setOrders(res.data.data || []);
      } else {
        toast.error('Failed to load orders');
      }
    } catch (err) {
      toast.error('Error fetching orders');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    setActionLoading(true);
    try {
      const res = await axios.put(
        `${apiUrl}/memeber/orders/${orderId}/status`,
        { order_status: status },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      );
      if (res.data.status) {
        toast.success(`Order status updated to ${status}`);
        fetchOrders();
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(res.data.data);
        }
      }
    } catch (err) {
      toast.error('Failed to update order status');
    } finally {
      setActionLoading(false);
    }
  };

  const updatePaymentStatus = async (orderId, paymentStatus) => {
    setActionLoading(true);
    try {
      const res = await axios.put(
        `${apiUrl}/memeber/orders/${orderId}/status`,
        { payment_status: paymentStatus },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      );
      if (res.data.status) {
        toast.success(`Payment status updated to ${paymentStatus}`);
        fetchOrders();
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(res.data.data);
        }
      }
    } catch (err) {
      toast.error('Failed to update payment status');
    } finally {
      setActionLoading(false);
    }
  };

  const viewOrderDetails = (orderData) => {
    setSelectedOrder(orderData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      processing: 'bg-blue-100 text-blue-700',
      shipped: 'bg-purple-100 text-purple-700',
      delivered: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <Clock className="w-3 h-3" />,
      processing: <Package className="w-3 h-3" />,
      shipped: <Truck className="w-3 h-3" />,
      delivered: <CheckCircle className="w-3 h-3" />,
      cancelled: <XCircle className="w-3 h-3" />,
    };
    return icons[status] || <Clock className="w-3 h-3" />;
  };

  const getPaymentStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      paid: 'bg-green-100 text-green-700',
      failed: 'bg-red-100 text-red-700',
      refunded: 'bg-gray-100 text-gray-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const filteredOrders = orders.filter(order => {
    const matchSearch = 
      order.order_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone?.includes(searchTerm);
    
    const matchStatus = statusFilter === 'all' || order.order_status === statusFilter;
    const matchPayment = paymentFilter === 'all' || order.payment_status === paymentFilter;
    
    return matchSearch && matchStatus && matchPayment;
  });

  const statusOptions = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  const paymentOptions = ['all', 'pending', 'paid', 'failed', 'refunded'];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 md:p-8 overflow-y-auto max-h-screen">
        <ToastContainer position="top-right" autoClose={3000} theme="light" />

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Order Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage all customer orders</p>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
              <ShoppingBag className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
            <button
              onClick={fetchOrders}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-xl">
                <ShoppingBag className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Orders</p>
                <p className="text-xl font-bold text-gray-900">{orders.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-xl">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Pending</p>
                <p className="text-xl font-bold text-yellow-600">
                  {orders.filter(o => o.order_status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-xl">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Processing</p>
                <p className="text-xl font-bold text-blue-600">
                  {orders.filter(o => o.order_status === 'processing').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Delivered</p>
                <p className="text-xl font-bold text-green-600">
                  {orders.filter(o => o.order_status === 'delivered').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-xl">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Cancelled</p>
                <p className="text-xl font-bold text-red-600">
                  {orders.filter(o => o.order_status === 'cancelled').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700 self-center">Status:</span>
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  statusFilter === status
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700 self-center">Payment:</span>
            {paymentOptions.map((status) => (
              <button
                key={status}
                onClick={() => setPaymentFilter(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  paymentFilter === status
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Order ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Customer</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Items</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Total</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Payment</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={8} className="text-center py-12">
                      <div className="animate-spin w-8 h-8 border-4 border-indigo-500 rounded-full border-t-transparent mx-auto"></div>
                    </td>
                  </tr>
                ) : filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-gray-500">
                      {searchTerm ? 'No orders found matching your search' : 'No orders placed yet'}
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm font-medium text-indigo-600">{order.order_id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{order.name}</p>
                          <p className="text-xs text-gray-500">{order.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {order.items ? order.items.length : 0} items
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        ₹{order.total}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.order_status)}`}>
                          {getStatusIcon(order.order_status)}
                          {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.payment_status)}`}>
                          <CreditCard className="w-3 h-3" />
                          {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(order.created_at).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => viewOrderDetails(order)}
                          className="text-indigo-600 hover:text-indigo-800 transition"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Details Modal */}
        <AnimatePresence>
          {isModalOpen && selectedOrder && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                    <p className="text-sm text-gray-500 font-mono">{selectedOrder.order_id}</p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700 transition"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Order Status */}
                  <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">Order Status:</span>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.order_status)}`}>
                        {getStatusIcon(selectedOrder.order_status)}
                        {selectedOrder.order_status.charAt(0).toUpperCase() + selectedOrder.order_status.slice(1)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                        <button
                          key={status}
                          onClick={() => updateOrderStatus(selectedOrder.id, status)}
                          disabled={actionLoading || selectedOrder.order_status === status}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                            selectedOrder.order_status === status
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Payment Status */}
                  <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">Payment Status:</span>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(selectedOrder.payment_status)}`}>
                        <CreditCard className="w-3 h-3" />
                        {selectedOrder.payment_status.charAt(0).toUpperCase() + selectedOrder.payment_status.slice(1)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['pending', 'paid', 'failed', 'refunded'].map((status) => (
                        <button
                          key={status}
                          onClick={() => updatePaymentStatus(selectedOrder.id, status)}
                          disabled={actionLoading || selectedOrder.payment_status === status}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                            selectedOrder.payment_status === status
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <User className="w-4 h-4" /> Customer Details
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="text-gray-500">Name:</span> {selectedOrder.name}</p>
                        <p><span className="text-gray-500">Email:</span> {selectedOrder.email}</p>
                        <p><span className="text-gray-500">Phone:</span> {selectedOrder.phone}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> Shipping Address
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p>{selectedOrder.address}</p>
                        <p>{selectedOrder.city}, {selectedOrder.state} - {selectedOrder.pincode}</p>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                      <Package className="w-4 h-4" /> Order Items ({selectedOrder.items ? selectedOrder.items.length : 0})
                    </h4>
                    <div className="space-y-2">
                      {selectedOrder.items && selectedOrder.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                          {item.product_image && (
                            <img 
                              src={getImageUrl(item.product_image)} 
                              alt={item.product_name} 
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          )}
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{item.product_name}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-semibold text-gray-900">₹{item.total}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Order Summary</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Subtotal</span>
                        <span>₹{selectedOrder.subtotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Shipping</span>
                        <span>{selectedOrder.shipping === 0 ? 'Free' : `₹${selectedOrder.shipping}`}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Tax (GST 5%)</span>
                        <span>₹{selectedOrder.tax}</span>
                      </div>
                      <div className="flex justify-between font-bold pt-2 border-t">
                        <span>Total</span>
                        <span className="text-indigo-600">₹{selectedOrder.total}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Payment Method</span>
                        <span className="capitalize">{selectedOrder.payment_method}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Payment Status</span>
                        <span className={`capitalize font-medium ${getPaymentStatusColor(selectedOrder.payment_status)}`}>
                          {selectedOrder.payment_status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {selectedOrder.notes && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Order Notes</h4>
                      <p className="text-sm text-gray-600">{selectedOrder.notes}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t">
                    <button
                      onClick={closeModal}
                      className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OrderManager;
import { Clock, CreditCard, Package } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';

export default function OrderSection() {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { cartItem, removeFromCart } = useCart();

  // 1️⃣ Fetch pending payments from backend
  const { data: payments = [], refetch, isLoading } = useQuery({
    queryKey: ['pendingPayments', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data.filter(p => p.payment_status?.toLowerCase() === 'pending');
    },
  });

  // 2️⃣ Fetch tour data for pending payments
  const { data: ordersFromBackend = [], isLoading: loadingTours } = useQuery({
    queryKey: ['pendingOrdersTours', user?.email],
    enabled: payments.length > 0,
    queryFn: async () => {
      const toursData = await Promise.all(
        payments.map(async p => {
          const res = await axiosSecure.get(`/tours/${p.tourId}`);
          return { ...p, tour: res.data };
        })
      );
      return toursData;
    },
  });

  // 3️⃣ Merge cart items + backend orders
  const mergedOrders = [
    ...cartItem.map(item => ({ ...item, fromCart: true, payment_status: 'pending' })),
    ...ordersFromBackend.map(p => ({ ...p, fromCart: false }))
  ];

  // Cancel backend payment
  const handleCancel = async id => {
    try {
      await axiosSecure.delete(`/payments/${id}`);
      toast.success('Order cancelled');
      refetch();
    } catch (err) {
      toast.error('Failed to cancel order');
      console.error(err);
    }
  };

  // Navigate to payment page
  const handlePay = id => {
    navigate(`/payment/${id}`);
  };

  if (isLoading || loadingTours)
    return <p className="text-center mt-40 text-white">Loading...</p>;

  return (
    <section className="min-h-screen px-4 mt-16 py-10">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl text-white font-bold">
          {mergedOrders.length ? 'Pending Orders' : 'Order Packages'}
        </h1>
        <Link
          to="/payment-history"
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl"
        >
          <Package size={20} />
          Payment History
        </Link>
      </div>

      {/* EMPTY STATE */}
      {mergedOrders.length === 0 && (
        <p className="text-center text-gray-300 text-xl py-24">
          You have no pending orders
        </p>
      )}

      {/* ORDERS LIST */}
      <div className="grid gap-6 max-w-6xl mx-auto">
        {mergedOrders.map((order, index) => (
          <motion.div
            key={order._id || index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-md p-4"
          >
            <div className="flex flex-col md:flex-row md:justify-between gap-4">
              {/* LEFT */}
              <div className="flex items-center gap-4">
                <img
                  src={order.tour?.image || order.image}
                  className="w-12 h-12 rounded-full object-cover"
                  alt={order.tour?.title || order.title}
                />
                <div>
                  <h3 className="font-semibold">{order.tour?.title || order.title}</h3>
                  <p className="text-sm text-gray-500">
                    Status:{' '}
                    {order.payment_status === 'pending' || order.fromCart ? 'Pending' : 'Paid'}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-3">
                <Clock className="text-yellow-500" />

                {/* Show Pay button for any pending order */}
                {order.payment_status === 'pending' && (
                  <button
                    onClick={() => handlePay(order._id)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg"
                  >
                    <CreditCard size={18} />
                    Pay
                  </button>
                )}

                {/* Cancel button */}
                {order.fromCart ? (
                  <button
                    onClick={() => removeFromCart(order._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    onClick={() => handleCancel(order._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

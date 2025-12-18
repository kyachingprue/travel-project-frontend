import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../hooks/useAxiosSecure';
import LoadingSpinner from '../components/LoadingSpinner';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch tour data
  const { data: tourId = {}, isLoading } = useQuery({
    queryKey: ['tourId', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tours/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <LoadingSpinner />;

  if (!tourId || !tourId._id) {
    toast.error("Invalid tourId");
    return null;
  }

  const amount = tourId.price || 0;
  const amountInCents = amount * 100;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setProcessing(true);

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setProcessing(false);
      return;
    }

    // Create payment method
    const { error: stripeError } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (stripeError) {
      setError(stripeError.message);
      setProcessing(false);
      return;
    }

    try {
      // Create payment intent
      const res = await axiosSecure.post('/create-payment-intent', {
        amount: amountInCents,
        tourId: tourId._id,
      });

      const clientSecret = res.data.clientSecret;

      // Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user?.displayName,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        setProcessing(false);
        return;
      }

      if (result.paymentIntent.status === 'succeeded') {
        // Record payment in backend
        const paymentData = {
          tourId: tourId._id,
          email: user?.email,
          amount,
          transactionId: result.paymentIntent.id,
          paymentMethod: result.paymentIntent.payment_method_types,
        };

        const paymentRes = await axiosSecure.post('/payments', paymentData);

        if (paymentRes.data?.insertedId) {
          toast.success("Payment successful!");
          navigate('/payment-history');
        } else if (paymentRes.data?.message) {
          toast.error(paymentRes.data.message);
        } else {
          toast.error("Payment failed, please try again.");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Payment failed, please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="min-h-screen flex items-center mt-14 justify-center px-4"
      >
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-6">

          {/* TITLE */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Secure Payment
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Enter your card details to continue
            </p>
          </div>

          {/* CARD INPUT */}
          <div className="border rounded-xl p-4 focus-within:ring-2 focus-within:ring-indigo-500 transition">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#1f2937",
                    fontFamily: "Inter, system-ui, sans-serif",
                    "::placeholder": {
                      color: "#9ca3af",
                    },
                  },
                  invalid: {
                    color: "#dc2626",
                  },
                },
              }}
            />
          </div>

          {/* PAY BUTTON */}
          <button
            type="submit"
            disabled={!stripe || processing}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold transition"
          >
            {processing ? 'Processing...' : `Pay $${amount} USD`}
          </button>

          {/* SECURITY NOTE */}
          <p className="text-xs text-center text-gray-400">
            🔒 Your payment is securely processed by Stripe
          </p>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;

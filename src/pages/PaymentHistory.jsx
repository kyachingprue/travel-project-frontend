import { useQuery } from "@tanstack/react-query";

import { CheckCircle } from "lucide-react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";

export default function PaymentHistory() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch user's payment history
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingSpinner />;

  if (payments.length === 0)
    return (
      <p className="text-center min-h-screen mt-16 py-52 text-2xl text-gray-400">
        No payment history found.
      </p>
    );

  return (
    <section className="min-h-screen px-4 mt-16 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Payment History</h1>

        <div className="space-y-4">
          {payments
            .filter((p) => p.payment_status === "paid")
            .map((payment) => (
              <div
                key={payment._id}
                className="bg-green-50 border border-green-200 rounded-xl p-6 shadow-md"
              >
                <div className="flex items-center gap-2 text-green-700 font-semibold mb-2">
                  <CheckCircle size={20} />
                  Payment Successful
                </div>
                <p>
                  💳 <span className="font-medium">Transaction ID:</span>{" "}
                  {payment.transactionId}
                </p>
                <p>
                  💵 <span className="font-medium">Amount:</span> ${payment.amount}
                </p>
                <p>
                  📅 <span className="font-medium">Paid At:</span>{" "}
                  {new Date(payment.paid_at_string).toLocaleString()}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import router from './router/router';
import AuthProvider from './provider/AuthProvider';
import { Toaster } from 'react-hot-toast';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { CartProvider } from './provider/CartProvider';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const queryClient = new QueryClient();
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <Elements stripe={stripePromise}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={router} />
            <Toaster
              position="top-center"
              reverseOrder={false}
            />
          </AuthProvider>
        </QueryClientProvider>
      </Elements>
    </CartProvider>
  </StrictMode>,
)

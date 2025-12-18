import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";
import TourPackage from "../pages/TourPackage";
import Contact from "../pages/Contact";
import CardDetails from "../components/CardDetails";
import Profile from "../pages/Profile";
import ProtectedRoute from "./ProtectedRoute";
import Services from "../pages/Services";
import BlogsList from "../pages/BlogsList";
import ErrorPage from "../pages/ErrorPage";
import AddBlogs from "../pages/AddBlogs";
import AddPackage from "../pages/AddPackage";
import Dashboard from "../pages/Dashboard";
import Reports from "../pages/Reports";
import AllBlogs from "../pages/AllBlogs";
import AllPackages from "../pages/AllPackages";
import OrderSection from "../pages/OrderSection";
import AllUsers from "../pages/AllUsers";
import Payments from "../payment/Payments";
import PaymentHistory from "../pages/PaymentHistory";


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: '/about',
        element: <About></About>
      },
      {
        path: '/services',
        element: <Services></Services>
      },
      {
        path: '/packages',
        element: <TourPackage></TourPackage>
      },
      {
        path: "/details/:_id",
        element: <CardDetails />
      },
      {
        path: '/blogs',
        element: <BlogsList></BlogsList>
      },
      {
        path: '/contact',
        element: <Contact></Contact>
      },
      {
        path: '/profile',
        element: <ProtectedRoute><Profile></Profile></ProtectedRoute>
      },
      {
        path: '/order-section',
        element: <OrderSection/>
      },
      {
        path: '/payment/:id',
        element: <Payments/>
      },
      {
        path: '/payment-history',
        element: <PaymentHistory/>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: 'add-blogs',
        element: <AddBlogs></AddBlogs>
      },
      {
        path: 'all-users',
        element: <AllUsers/>
      },
      {
        path: 'add-package',
        element: <AddPackage></AddPackage>
      },
      {
        path: 'all-packages',
        element: <AllPackages></AllPackages>
      },
      {
        path: 'all-blogs',
        element: <AllBlogs></AllBlogs>
      },
      {
        path: 'reports',
        element: <Reports></Reports>
      }
    ]
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/register',
    element: <Register></Register>
  }
])

export default router;
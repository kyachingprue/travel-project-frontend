import React from 'react';
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://travel-web-studio.vercel.app/",
  withCredentials: true,
})

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
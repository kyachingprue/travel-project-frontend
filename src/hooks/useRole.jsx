import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';


const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role = null, isLoading, isError } = useQuery({
    queryKey: ['userRole', user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const response = await axiosSecure.get(`/users/role/${user.email}`);
      return response.data.role;
    },
    enabled: !!user?.email,
    staleTime: 1000 * 60 * 5,
  });

  return { role, isLoading, isError };
};

export default useRole;

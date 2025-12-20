import TourCard from './TourCard';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from './LoadingSpinner';
import ErrorSpinner from './ErrorSpinner';

const ShortTourCard = () => {
  const axiosPublic = useAxiosPublic();

  const { data: tours = [], isLoading, isError } = useQuery({
    queryKey: ['tours'],
    queryFn: async () => {
      const res = await axiosPublic.get('/tours');
      return res.data?.data || [];
    }
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorSpinner />;
  }

  return (
    <div>
      <h3 className='text-white py-5 text-center text-2xl md:text-4xl font-bold'>
        This is Short Page ({Array.isArray(tours) ? tours.length : 0})
      </h3>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-10 gap-3'>
        {(Array.isArray(tours) ? tours : []).slice(0, 8).map(item => (
          <TourCard key={item.id} item={item} />
        ))}
      </div>

      <Link to="/packages">
        <button className="
          px-6 py-3 mx-auto my-5 rounded-full 
          bg-linear-to-r from-blue-500 to-indigo-600
          text-white font-semibold 
          shadow-lg shadow-blue-300/40
          hover:shadow-xl hover:scale-105 
          transition-all duration-300
          flex items-center gap-2">
          See More Packages
          <svg className="w-5 h-5" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </Link>
    </div>
  );
};

export default ShortTourCard;

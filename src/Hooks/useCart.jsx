import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../Providers/Authproviders';
import AxiosSecure from './axiosSecure';

const useCart = () => {

    const { user, loading } = useContext(AuthContext);
    const [AXIOS] = AxiosSecure();

    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await AXIOS(`/carts?email=${user.email}`)
            return res.data;
        }
    })

    return [cart, refetch]
};

export default useCart;
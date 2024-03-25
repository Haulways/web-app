import * as React from 'react';
import { Empty, List, WithListContext, useGetIdentity, useGetList, useRedirect } from 'react-admin';
import { AuthContext } from '../../components/context/AuthContext';
import { ShopCard } from '../../components/card/ShopCard';
import InfluencerStore from './influencerStore/InfluencerStore';
import { CircularProgress } from '@mui/material';




const CheckStore = () => {
    const { currentUser } = React.useContext(AuthContext)
    const [usr, setUsr] = React.useState(null);
    const [str, setStr] = React.useState(null);
    const { data: identity, isLoading: identityLoading } = useGetIdentity();
    const redirect = useRedirect();
    const { data: user } = useGetList(
        "user",
        { filter: { email: identity?.email }, },
    );
    const { data: store } = useGetList(
        "store",
        { filter: { id: usr?.store_id } },
    );

    React.useEffect(() => {
        console.log(user, identity)
        if (user && user.length) {
            setUsr(user[0])
        }
    }, [user, identity])

    React.useEffect(() => {
        if (store && store.length) {
            console.log(store)
            setStr(store[0])
        }
    }, [store])


    React.useEffect(() => {
        if (str) {
            console.log(str)
            redirect('show', 'store', str.id)
        }
    }, [str])




    return (<div className='absolute top-[30%] h-[100vw] w-[90vw] flex justify-center items-center'>
        {
            user ? (!str && !user.length ? (<Empty resource='store' />) : (<CircularProgress />)) : (<CircularProgress />)
        }
    </div>)

}



export default CheckStore;


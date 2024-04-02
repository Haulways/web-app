import * as React from 'react';
import { Empty, List, WithListContext, useGetIdentity, useGetList, useGetOne, useRedirect, useStore } from 'react-admin';
import { AuthContext } from '../../components/context/AuthContext';
import { ShopCard } from '../../components/card/ShopCard';
import InfluencerStore from './influencerStore/InfluencerStore';
import { CircularProgress } from '@mui/material';
import { GetStoreVendor } from '../post/Post';
import Medusa from '@medusajs/medusa-js';



const CheckStore = () => {
    const { currentUser } = React.useContext(AuthContext)
    // const [usr, setUsr] = React.useState(null);
    // const [str, setStr] = React.useState(null);
    const { data: identity, isLoading: identityLoading } = useGetIdentity();
    const redirect = useRedirect();
    const [medusaUser, setMedusaUser] = useStore('medusa_user');
    const { store:str, vendor:usr, vendorAcc, loading2, error2 } = GetStoreVendor(medusaUser?.store_id);
    const medusaClient = new Medusa({
        maxRetries: 3,
        baseUrl: "https://ecommerce.haulway.co",
        apiKey: medusaUser?.api_token || null,
    });

    React.useEffect(() => {
        if (identity) {
            medusaClient.admin.auth.createSession({
                email: identity?.email,
                password: import.meta.env.VITE_AUTH_PASSWORD,
            }).then(({ user }) => {
                setMedusaUser(user);
                // console.log(user);

            })
        }

    }, [identity])

    React.useEffect(() => {
        if (medusaUser) {
            // console.log(medusaUser?.api_token)
            medusaClient.admin.auth.getSession()
                .then(({ user }) => {
                    console.log(user);
                })
            // medusaClient.admin.store.retrieve()
            //   .then(({ store }) => {
            //     console.log(store);
            //   })
        }
    }, [medusaUser])
    


    React.useEffect(() => {
        if (str) {
            console.log(str)
            redirect('show', 'store', str.id)
        }
    }, [str])

    




    return (<div className='absolute top-[30%] h-[100vw] w-[90vw] flex justify-center items-center'>
        {
            usr ? (!str ? (<Empty resource='store' />) : (<CircularProgress />)) : (<CircularProgress />)
        }
    </div>)

}



export default CheckStore;


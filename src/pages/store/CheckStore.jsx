import * as React from 'react';
import { List, WithListContext, useGetList, useRedirect } from 'react-admin';
import { AuthContext } from '../../components/context/AuthContext';
import { ShopCard } from '../../components/card/ShopCard';


const CheckStore = () => {
    const { currentUser } = React.useContext(AuthContext)
    const { data: user } = useGetList(
		"user",
		// { filter: { email: currentUser?.email }, },
	);

    React.useEffect(()=> {
        console.log(user)
    },[user])


    return (
        <List
            title={"Your Store"}
            // filter={{ id: user && user.length ? (user[0]?.store_id) : (null) }}
        >
            <WithListContext render={({ data, isLoading }) => (
                <div className='justify-center items-center'>
                    {data && data.length ? (<ShopCard data={data} />) : (isLoading ? (<p>Fetching your store data...</p>) : (<p>You dont have a Store, Create one by clicking the plus sign</p>))}
                </div>

            )} />
        </List>)
}


export default CheckStore;
import {  Avatar, Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import * as React from 'react';
import SettingIcon from '../../assets/profileIcons/tierIcon.png';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabase/SupabaseConfig';
import { useRedirect } from 'react-admin';




export const RequestCard = ({ senderInfo, currentUser, contracts, senderContract, users, theme }) => {
    const redirect = useRedirect();
    

    const goToProfile = (contract) => (
        redirect(`/contract/${contract.id}/edit`)
    )

    const handleLastViewed = async (contract) => {
        if (currentUser && currentUser.role === 'vendor') {
            const { data, error } = await supabase
                .from('contract')
                .update({
                    vendor_last_viewed: new Date(),
                })
                .eq('id', contract.id);
    
            if (error) {
                console.error('Error updating contract:', error);
            } else {
                console.log('Contract updated:', data);
            
            }
        } else if (currentUser && currentUser.role === 'influencer') {
            const { data, error } = await supabase
                .from('contract')
                .update({
                    influencer_last_viewed: new Date(),
                })
                .eq('id', contract.id);
    
            if (error) {
                console.error('Error updating contract:', error);
            } else {
                console.log('Contract updated:', data);
            }
        }
    };

    return (
        <>

            <div>
                {contracts && contracts.map((contract) => {
                    const user = users && users.find(user => user.id === contract.created_for);
                    return (
                        <Card key={contract.id} sx={{
                            minWidth: '322px',
                            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.03)',
                            backgroundColor: theme === "light" ? "#222" : "rgba(68, 68, 68, 0.2)",
                            borderRadius: '20px',
                            color: '#fff',
                            padding: '16px 19px',
                            marginBottom: '20px'
                        }}>
                            <CardHeader sx={{
                                '& .MuiCardHeader-action': {
                                    margin: '0 !important',
                                    marginTop: '5px !important'
                                },
                    
                                padding: '0 !important',
                                '& .MuiCardHeader-avatar': {
                                    marginRight: '10px !important',
                       
                                }
                            }}
                                avatar={
                                    <div className='flex'>

                                        <Avatar sx={{
                                            height: 60,
                                            width: 60,
                                            position: 'relative',
                                            zIndex: '100'
                                        }}>

                                            <img src={senderInfo.photoURL} alt='user' />
                                        </Avatar>
                                        <Avatar sx={{
                                            height: 60,
                                            width: 60,
                                            margin: '0 0 0 -45px'
                                        }}>

                                            <img src={user?.photoURL} />
                                        </Avatar>
                                    </div>
                                }
                                action={
                        
                                    <img className='' src={SettingIcon} alt='setting' />
                                }
                                title={
                                    <span style={{ color: '#fff', fontWeight: '600', fontSize: '15px' }}>
                                        {senderInfo.displayName}
                                    </span>
                                }
                                subheader={
                                    <>
                                        
                                        <Typography variant="subtitle2" sx={{ color: '#fff', fontSize: '10px', fontWeight: '600', }}>
                                            10K followers
                                        </Typography>
                                    </>
                                }
                            />
                            <CardContent sx={{
                                fontSize: '14px', fontWeight: '500', paddingBottom: '5px', paddingTop: '6px'
                            }}>
                           
                            </CardContent>
                
                            <CardActions sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                columnGap: '20px',
                                alignItems: 'center',
                                paddingBottom: '0px',
                            }}>
                                <>
                                    {contract && contract.agreed_at === null && (
                                        <>
                                            <div className='' onClick={() => { handleLastViewed(contract);  goToProfile(contract)}}>
                                                
                                                    <Button variant='contained' color='secondary' sx={{
                                                        width: '120px',
                                                        borderRadius: '10px',
                                                        height: '42px',
                                                        bgcolor: '#fff',
                                                        fontWeight: '600',
                                                        color: '#222',
                                                        textTransform: 'capitalize'
                                                    }}>
                                                        Accept
                                                    </Button>
                                                
                                            </div>
                                            <div>
                                                <Button variant='outlined' color='secondary' sx={{
                                                    width: '120px',
                                                    borderRadius: '10px',
                                                    height: '42px',
                                                    fontWeight: '600',
                                                    textTransform: 'capitalize',
                                                    border: '2px solid #fff',
                                                }}>
                                                    Decline
                                                </Button>

                                            </div>
                                        </>
                                    )}
                                    {contract && contract.agreed_at !== null && (
                                        <div className='' onClick={() => { handleLastViewed(contract);  goToProfile(contract)}}>
                                                <Button variant='contained' color='secondary' sx={{
                                                    minWidth: '290px',
                                                    borderRadius: '10px',
                                                    height: '42px',
                                                    bgcolor: '#fff',
                                                    fontWeight: '600',
                                                    color: '#222',
                                                    textTransform: 'capitalize'
                                                }}>
                                     
                                                    View Contract
                                                </Button>
                                          
                                        </div>
                                    )}
                                </>
                            </CardActions>

                        </Card>
                    )
                })}
            </div>

            
                       
            {senderContract && senderContract.map((contract) => {
                const user = users && users.find(user => user.id === contract.created_for);
                let contractFound = false;

                if (currentUser.uid === contract.created_by) {
                    contractFound = true;
                    return (
                                
                        <Card key={contract.id} sx={{
                            minWidth: '322px',
                            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.03)',
                            backgroundColor: theme === "light" ? "#222" : "rgba(68, 68, 68, 0.2)",
                            borderRadius: '20px',
                            color: '#fff',
                            padding: '16px 19px',
                            marginBottom: '20px'
                        }}>
                            <CardHeader sx={{
                                '& .MuiCardHeader-action': {
                                    margin: '0 !important',
                                    marginTop: '5px !important'
                                },
                    
                                padding: '0 !important',
                                '& .MuiCardHeader-avatar': {
                                    marginRight: '20px !important',
                       
                                }
                            }}
                                avatar={
                                    <div className='flex'>
                                        <Avatar sx={{
                                            height: 60,
                                            width: 60,
                                            position: 'relative',
                                            zIndex: '100'
                                        }}>

                                            <img src={user?.photoURL} />
                                        </Avatar>
                                        <Avatar sx={{
                                            height: 60,
                                            width: 60,
                                            margin: '0 0 0 -45px'
                                        }}>

                                            <img src={currentUser.photoURL} />
                                        </Avatar>
                                    </div>
                                }
                                action={
                        
                                    <img className='' src={SettingIcon} alt='setting' />
                                }
                                title={
                                    <span style={{ color: '#fff', fontWeight: '600', fontSize: '15px' }}>
                                        {user?.displayName}
                                    </span>
                                }
                                subheader={
                                    <>
                                       
                                        <Typography variant="subtitle2" sx={{ color: '#fff', fontSize: '10px', fontWeight: '600', }}>
                                            10K followers
                                        </Typography>
                                    </>
                                }
                            />
                            <CardContent sx={{
                                fontSize: '14px', fontWeight: '500', paddingBottom: '5px', paddingTop: '6px'
                            }}>
                                {contract && contract.agreed_at !== null ? (
                                    'Contract Signed '
                                ) : (
                                    'Contract Agreement Required'
                                )}
                            </CardContent>
                
                            <CardActions sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingBottom: '0px',
                            }}>
                                <>
                                    {contract && contract.agreed_at === null && (
                                        <div className='' onClick={() => { handleLastViewed(contract);  goToProfile(contract)}}>
                                                <Button variant='contained' color='secondary' sx={{
                                                    minWidth: '290px',
                                                    borderRadius: '10px',
                                                    height: '42px',
                                                    bgcolor: '#fff',
                                                    fontWeight: '600',
                                                    color: '#222',
                                                    textTransform: 'capitalize'
                                                }}>
                                        
                                                    View Contract
                                                </Button>
                                         
                                        </div>
                                    )}
                                </>
                                {contract && contract.agreed_at !== null && (
                                    <div className='' onClick={() => { handleLastViewed(contract);  goToProfile(contract)}}>
                                            <Button variant='contained' color='secondary' sx={{
                                                minWidth: '290px',
                                                borderRadius: '10px',
                                                height: '42px',
                                                bgcolor: '#fff',
                                                fontWeight: '600',
                                                color: '#222',
                                                textTransform: 'capitalize'
                                            }}>
                                     
                                                View Contract
                                            </Button>
                                    </div>
                                )}
                            </CardActions>

                        </Card>
                    );
                }

                return null;
            })}

            {(!senderContract || !senderContract.some(contract => currentUser.uid === contract.created_by)) &&
                (!contracts || !contracts.some(contract => currentUser.uid === contract.created_for)) && (
                    <div className='my-[1rem] text-center'>No contract request</div>
                )}

        
        </>
    );
};
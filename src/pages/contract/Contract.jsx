import * as React from 'react'
import { ThemeContext } from '../../components/context/ThemeProvider';
import { AuthContext } from '../../components/context/AuthContext';
import { InfiniteList, WithListContext } from 'react-admin';
import { Avatar, Card, CardHeader, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabase/SupabaseConfig';
import { DFooter } from '../../components';


const Contract = () => {
    const { theme } = React.useContext(ThemeContext);
    const [users, setUsers] = React.useState([]);
    const { currentUser } = React.useContext(AuthContext);

    const fetchUsersData = async () => {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .order('id', { ascending: false })
        
        setUsers(data);
        if (error) {
            console.error("An error occurred while fetching the data:", error);
        }
        
    };

    React.useEffect(() => {
        fetchUsersData();
    }, [currentUser]);
    
    
    return (
        
        <>
        <div
 
      style={{ padding: '0 10px 1rem', backgroundColor: theme === 'light' ? '#fff' : '#222', color: theme === 'light' ? '#222' : '#fff', }}
    >
     

      <div className='pt-[1rem]'>
        <h1 className='font-[700] text-[22px] '>Contract agreements</h1>

        {/* profile  */}
        <div className=''>
         
          <p className='font-[400] text-[15px]  leading-[20px] mt-[10px]'>Manage your pending and signed contracts</p>
        </div>

        <InfiniteList title=' ' resource='contract' actions={false}
          sx={{
            '& .MuiToolbar-root': {
              minHeight: '0px !important'
            },
            '& .MuiPaper-root': {
              backgroundColor: theme === "light" ? "#fff !important" : "#222 !important",
              color: theme === "light" ? "#222 !important" : "#fff !important",
              padding: ''
            },
          }}
        >
          <div className='mt-[2.5rem] mb-[1rem]'>
            <p className='font-[500] text-[18px]'>Pending Contracts</p>
          </div>
          <WithListContext render={({ isLoading, data }) => (
            !isLoading ? (
              <>
                {data && data.map((contract, index) => {
                  const user = users && users.find(user => user.id === contract.created_for);
                  let contractFound = false;

                  if (
                    (contract.created_by === currentUser.uid && contract.agreed_at === null) ||
                    (contract.created_for === currentUser.uid && contract.agreed_at === null)
                  ) {
                    contractFound = true;
                    return (
                      <Card
                        key={index}
                        sx={{
                          border: '1px solid #dfdfdf',
                        
                          borderRadius: '8px',
                          
                          padding: '10px',
                          marginBottom: '20px',
                          
                        }}
                        className='tablet:max-w-md laptop:max-w-md'
                      >
                        <Link to={`/contract/${contract.id}/edit`}>

                          <CardHeader
                            sx={{
                              '& .MuiCardHeader-action': {
                                margin: 'auto 0 !important'
                              },
                              padding: '0 !important',
                              '& .MuiCardHeader-avatar': {
                                marginRight: '10px !important'
                              }
                            }}
                            avatar={
                              <Avatar sx={{ height: 60, width: 60 }}>
                                <img src={user?.photoURL} alt="user" />
                              </Avatar>
                            }
                            action={
                              <p className="text-[11px] font-[500] px-[8px] py-[2px] rounded-[8px] bg-[red] text-white">
                                Pending
                              </p>
                            }
                            title={
                              <Typography variant="h6" sx={{  fontWeight: '500', paddingBottom: '3px', fontSize: '15px' }}>
                                {user?.displayName}
                              </Typography>
                            }
                            subheader={
                              <Typography variant="subtitle2" sx={{  fontSize: '14px', fontWeight: '400' }}>
                                10K followers - Tier 3
                              </Typography>
                            }
                          />
                        </Link>
                      </Card>
                    );
                  }

                  return null;
                })
                }

                {!data || (data && !data.some(contract => (contract.created_by === currentUser.uid || contract.created_for === currentUser.uid) && contract.agreed_at === null)) && (
                  <div>No contract</div>
                )}

              </>
            ) : (
              <p>Loading...</p>
            ))}
          />
       
        </InfiniteList>
        


        <InfiniteList title=' ' resource='contract' actions={false}
          sx={{
            '& .MuiToolbar-root': {
              minHeight: '0px !important',
            },
            '& .MuiPaper-root': {
              backgroundColor: theme === "light" ? "#fff !important" : "#222 !important",
              color: theme === "light" ? "#222 !important" : "#fff !important",
              padding: ''
            },
          }}
        >
          <div className='mt-[2.5rem] mb-[1rem]'>
            <p className='font-[500] text-[18px]'>Signed Agreements</p>
          </div>
          <WithListContext render={({ isLoading, data }) => (
            !isLoading ? (
              <>
                {data && data.map((contract, index) => {
                  const user = users && users.find(user => user.id === contract.created_for);
                  let contractFound = false;

                  if (contract.created_by === currentUser.uid && contract.agreed_at !== null) {
                    contractFound = true;
                    return (
                      <Card key={index} sx={{
                        border: '1px solid #dfdfdf',
                        borderRadius: '8px',
                        padding: '10px',
                        marginBottom: '20px'
                      }}
                      className='tablet:max-w-md laptop:max-w-md'
                      >
                        <Link to={`/contract/${contract.id}/edit`}>
                          <CardHeader sx={{
                            '& .MuiCardHeader-action': {
                              margin: 'auto 0 !important',
              
                            },
          
                            padding: '0 !important',
                            '& .MuiCardHeader-avatar': {
                              marginRight: '10px !important',
             
                            }
                          }}
                            avatar={
                              <Avatar sx={{
                                height: 60,
                                width: 60
                              }}>

                                <img src={user?.photoURL} alt='user' />
                              </Avatar>
                            }
                            action={
              
                              <p className='text-[11px] font-[500] px-[8px] py-[2px] rounded-[8px] bg-[#00ff48] text-white '>
                                Signed
                              </p>
                            }
                            title={
                              <Typography variant="h6" sx={{  fontWeight: '500', paddingBottom: '3px', fontSize: '15px' }}>
                                {user?.displayName}
                              </Typography>
                            }
                            subheader={
                              <Typography variant="subtitle2" sx={{  fontSize: '14px', fontWeight: '400', }}>
                                10K followers - Tier 3
                              </Typography>
                            }
                          />
                        </Link>
                      </Card>
                    );
                  } else if (contract.created_for === currentUser.uid && contract.agreed_at !== null) {
                    contractFound = true;
                    return (
                      <Card key={index} sx={{
                        maxWidth: '100%',
                        border: '1px solid #dfdfdf',
                      
                        borderRadius: '8px',
                        
                        padding: '10px',
                        marginBottom: '20px'
                      }}>
                        <Link to={`/contract/${contract.id}/edit`}>
                          <CardHeader sx={{
                            '& .MuiCardHeader-action': {
                              margin: 'auto 0 !important',
              
                            },
          
                            padding: '0 !important',
                            '& .MuiCardHeader-avatar': {
                              marginRight: '10px !important',
             
                            }
                          }}
                            avatar={
                              <Avatar sx={{
                                height: 60,
                                width: 60
                              }}>

                                <img src={user?.photoURL} alt='user' />
                              </Avatar>
                            }
                            action={
              
                              <p className='text-[11px] font-[500] px-[8px] py-[2px] rounded-[8px] bg-[#00ff48] text-white '>
                                Signed
                              </p>
                            }
                            title={
                              <Typography variant="h6" sx={{  fontWeight: '500', paddingBottom: '3px', fontSize: '15px' }}>
                                {user?.displayName}
                              </Typography>
                            }
                            subheader={
                              <Typography variant="subtitle2" sx={{  fontSize: '14px', fontWeight: '400', }}>
                                10K followers - Tier 3
                              </Typography>
                            }
                          />
                        </Link>
                      </Card>
                    );
                  }

                  return null;
                })}

                {!data || (data && !data.some(contract => (contract.created_by === currentUser.uid || contract.created_for === currentUser.uid) && contract.agreed_at !== null)) && (
                  <div>No contract</div>
                )}

              </>
            ) : (
              <p>Loading...</p>
            ))}
          />
       
        </InfiniteList>

      </div>

            </div>
            <DFooter />
            
        </>
    );
};

export default Contract
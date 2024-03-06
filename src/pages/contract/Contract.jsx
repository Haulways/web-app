import * as React from 'react'
import { ThemeContext } from '../../components/context/ThemeProvider';
import { AuthContext } from '../../components/context/AuthContext';
import { InfiniteList, WithListContext, useGetList, useRefresh } from 'react-admin';
import { Avatar, Card, CardHeader, Fab, Typography } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase/SupabaseConfig';
import { DFooter } from '../../components';
import Add from '@mui/icons-material/Add';
import CreateContract from './CreateContract';



const Contract = () => {
  const { theme } = React.useContext(ThemeContext);
  const [users, setUsers] = React.useState([]);
  const { currentUser } = React.useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState("pending");
  const location = useLocation();
  const [sharedData, setSharedData] = React.useState(location?.state?.url);
  const navigate = useNavigate();
  const refresh = useRefresh();


  React.useEffect(() => {
    if (currentUser) {
      refresh()
    }
  }, [currentUser])


  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
              <p className='font-[500] text-[18px]'>Recent Contracts</p>
            </div>
            <WithListContext render={({ isLoading, data }) => (
              !isLoading ? (
                <>
                  {data && data.slice(0, 4).sort((a, b) => {
                    // Compare the vendor_last_updated and influencer_last_updated fields
                    const aVendorUpdated = new Date(a.vendor_last_updated);
                    const aInfluencerUpdated = new Date(a.influencer_last_updated);
                    const bVendorUpdated = new Date(b.vendor_last_updated);
                    const bInfluencerUpdated = new Date(b.influencer_last_updated);

                    // Compare the most recent timestamp between the two fields
                    return (bVendorUpdated > bInfluencerUpdated ? bVendorUpdated : bInfluencerUpdated) -
                      (aVendorUpdated > aInfluencerUpdated ? aVendorUpdated : aInfluencerUpdated);
                  }).map((contract, index) => {
                    const vendorUpdated = new Date(contract.vendor_last_updated);
                    const influencerUpdated = new Date(contract.influencer_last_updated);

                    // Determine the most recent update time
                    const lastUpdated = vendorUpdated > influencerUpdated ? vendorUpdated : influencerUpdated;

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
                                <>
                                <p className="text-[11px] font-[500] px-[8px] py-[2px] rounded-[8px] bg-[red] text-white">
                                  Pending
                                </p>
                                </>
                              }
                              title={
                                <Typography variant="h6" sx={{ fontWeight: '500', paddingBottom: '3px', fontSize: '15px' }}>
                                  {user?.displayName}
                                </Typography>
                              }
                              subheader={
                                <>
                                  <Follower user={user} theme={theme} />
                                  <span className='block text-[8px] text-[#d7d7d7]'>Last updated: {lastUpdated.toLocaleString()}
                                  </span>
                                </>
                              }
                            />
                          </Link>
                        </Card>
                      );
                    } else if (contract.created_for === currentUser.uid && contract.agreed_at !== null || contract.created_by === currentUser.uid && contract.agreed_at !== null) {
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
                                <Typography variant="h6" sx={{ fontWeight: '500', paddingBottom: '3px', fontSize: '15px' }}>
                                  {user?.displayName}
                                </Typography>
                              }
                              subheader={
                                <>
                                  <Follower user={user} theme={theme} />
                                  <span className='block text-[8px] text-[#d7d7d7]'>Last updated: {lastUpdated.toLocaleString()}
                                  </span>
                                </>
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
        


          <div>
            <ul className="flex  mx-auto max-w-[95vw] gap-x-2 mb-[2rem] overflow-x-scroll store__card font-[500]">
              <li
                className={`cursor-pointer min-w-fit py-[5px] px-[1rem] rounded-[30px] ${selectedTab === "pending"
                    ? theme === "light"
                      ? "text-[#fff] bg-[#222]"
                      : "text-[#222] bg-[#fff]"
                    : "text-zinc-400"
                  }`}
                onClick={() => {
                  handleTabClick("pending");
                }}
              >
                Pending Contracts
              </li>

              <li
                className={` cursor-pointer min-w-fit py-[5px] px-[1rem] rounded-[30px]  ${selectedTab === "signed"
                    ? theme === "light"
                      ? "text-[#fff] bg-[#222]"
                      : "text-[#222] bg-[#fff]"
                    : "text-zinc-400"
                  }`}
                onClick={() => {
                  handleTabClick("signed");
                }}
              >
                Signed Contracts
              </li>
             
            </ul>
          </div>

          <div className="mt-[2rem]">
            {selectedTab === "pending" ? (
              <Pending theme={theme} users={users} currentUser={currentUser} />
            ) : selectedTab === "signed" ? (
                <Signed theme={theme} users={users} currentUser={currentUser} />
            ) : null}
          </div>

        </div>

      </div>
      <DFooter />
      <Fab color="primary" aria-label="add" sx={{ right: '20px', position: 'fixed', bottom: '70px', }} onClick={handleOpen}>
        <Add />
      </Fab>
      <CreateContract open={open} handleClose={handleClose} />
    </>
  );
};

export default Contract

const Follower = ({ user, theme }) => {
  const { data: followers, total: totalFollowers, isLoading } = useGetList(
    'followers', { filter: { followed_id: user?.uid } }
  );
  const formatFollowers = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K+';
    } else if (count >= 100 && count <= 999) {
      return (count / 100).toFixed(1) + 'H';
    } else {
      return count;
    }
  }
  return (
    <Typography variant="subtitle2" sx={{ fontSize: '14px', fontWeight: '400', color: theme === "light" ? "#222 !important" : "#fff !important" }}>
      {formatFollowers(totalFollowers)} followers - Tier 3
    </Typography>
  )
}

const Pending = ({ theme, users, currentUser }) => {
  return (
    <>
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
      <div className='mb-[1rem]'>
        <p className='font-[500] text-[18px]'>Pending Contracts</p>
      </div>
      <WithListContext render={({ isLoading, data }) => (
        !isLoading ? (
          <>
            {data && data.sort((a, b) => {
              // Convert the timestamps to Date objects for comparison
              const aInfluencer = new Date(a.influencer_last_updated);
              const aVendor = new Date(a.vendor_last_updated);
              const bInfluencer = new Date(b.influencer_last_updated);
              const bVendor = new Date(b.vendor_last_updated);

              // Compare the most recent timestamp between the two fields
              return (bInfluencer > bVendor ? bInfluencer : bVendor) - (aInfluencer > aVendor ? aInfluencer : aVendor);
            }).map((contract, index) => {
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
                          <Typography variant="h6" sx={{ fontWeight: '500', paddingBottom: '3px', fontSize: '15px' }}>
                            {user?.displayName}
                          </Typography>
                        }
                        subheader={
                          <Follower user={user} theme={theme} />
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

    </InfiniteList >

    </>
  )
};

const Signed = ({ theme, users, currentUser }) => {
  return (
    <>
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
        <div className='mb-[1rem]'>
          <p className='font-[500] text-[18px]'>Signed Agreements</p>
        </div>
        <WithListContext render={({ isLoading, data }) => (
          !isLoading ? (
            <>
              {data && data.sort((a, b) => {
                // Convert the timestamps to Date objects for comparison
                const aInfluencer = new Date(a.influencer_last_updated);
                const aVendor = new Date(a.vendor_last_updated);
                const bInfluencer = new Date(b.influencer_last_updated);
                const bVendor = new Date(b.vendor_last_updated);

                // Compare the most recent timestamp between the two fields
                return (bInfluencer > bVendor ? bInfluencer : bVendor) - (aInfluencer > aVendor ? aInfluencer : aVendor);
              }).map((contract, index) => {
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
                            <Typography variant="h6" sx={{ fontWeight: '500', paddingBottom: '3px', fontSize: '15px' }}>
                              {user?.displayName}
                            </Typography>
                          }
                          subheader={
                            <Follower user={user} theme={theme} />
                          }
                        />
                      </Link>
                    </Card>
                  );
                } else if (contract.created_for === currentUser.uid && contract.agreed_at !== null) {
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
                            <Typography variant="h6" sx={{ fontWeight: '500', paddingBottom: '3px', fontSize: '15px' }}>
                              {user?.displayName}
                            </Typography>
                          }
                          subheader={
                            <Follower user={user} theme={theme} />
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
    </>
  )
};
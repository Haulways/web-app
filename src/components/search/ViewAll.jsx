import * as React from 'react';
import { Dialog, Grid, IconButton } from "@mui/material";
import { NormalSearchCards, NormalStoreCards } from './SearchCard';
import backIcon from "../../assets/hauls/backIcon.png";
import { InfiniteList, WithListContext } from 'react-admin';
import DFooter from '../dashboard/footer/DFooter';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeProvider';


export const ViewAllDialog = ({ openView, closeViewAll, title, subTitle, type }) => {
    const { theme } = useContext(ThemeContext);
    


    return (
        <>
            <Dialog
                open={openView}
                onClose={closeViewAll}
                PaperProps={{ style: { padding: '10px', backgroundColor: theme === "light" ? "#fff" : "#222", color: theme === "light" ? "#222" : "#fff", } }}
                fullScreen
            >
                <IconButton style={{ width: 'fit-content', padding: '0' }}
                    onClick={closeViewAll}
                    aria-label="close"
                    className='absolute top-[20px] left-[10px]'
                >
                    <img className='w-[11.63px] h-[17.34px] invert' style={{filter: theme === "light" ? "invert(1)" : "invert(0)" }} src={backIcon} alt='back' />
                </IconButton>

                <div className='py-[4rem]'>

                    <div className='mb-[1.5rem]'>
                        <h2 className='text-[18px]  font-[600]'>{title}</h2>
                        <p className='text-[14px]  font-[600]'>{subTitle} outfit</p>
                    </div>

                    <InfiniteList
                        resource='posts'
                        title=" "
                        actions={false}
                        sx={{
                            "& .MuiToolbar-root": {
                                minHeight: "0px !important",
                            },
                            "& .MuiBox-root": {
                                padding: "0 ",
                            },
                            '& .MuiPaper-root': {
                                backgroundColor: theme === "light" ? "#fff !important" : "#222 !important",
                                color: theme === "light" ? "#222 !important" : "#fff !important",
                              },
                        }}
                    >
                        <WithListContext render={({ isLoading, data }) => (
                    
                            !isLoading ? (
                                <>
                                    {data && !data.length && <span>No Posts</span>}
                                    {data && data.length > 0 && (
                                        <Grid container spacing='10px' rowGap={{ xs: 2 }} justifyContent="center" >

                                            {data && data.map((post) => {
                                                const mediaUrl = post.media[0]; // Get the URL of the 
                                                return (
                                                    <Grid key={post.id} item xs={6} sm={6} md={4}>
                                                        <NormalSearchCards post={post} mediaUrl={mediaUrl} title={title} subTitle={subTitle} type={type} />
                                                    </Grid>
                                                )
                                            })
                                            }
                                        </Grid>
                                    )}
                                </>
                            ) : (
                                <p className='font-[500]  flex items-center justify-center'>Loading...</p>
                            ))}
                        />
                                        
                    </InfiniteList>
                </div>

            </Dialog>
            <DFooter />

        </>
    );
};




export const StoreViewALl = ({ openView, closeViewAll, title, subTitle, name, price, products }) => {
    const { theme } = useContext(ThemeContext);
    
    


    return (
        <>
            <Dialog
                open={openView}
                onClose={closeViewAll}
                PaperProps={{ style: { padding: '10px', backgroundColor: theme === "light" ? "#fff" : "#222", color: theme === "light" ? "#222" : "#fff", } }}
                fullScreen
            >
                <IconButton style={{ width: 'fit-content', padding: '0' }}
                    onClick={closeViewAll}
                    aria-label="close"
                    className='absolute top-[20px] left-[10px]'
                >
                    <img className='w-[11.63px] h-[17.34px] invert' style={{filter: theme === "light" ? "invert(1)" : "invert(0)" }} src={backIcon} alt='back' />
                </IconButton>

                <div className='py-[4rem]'>

                    <div className='mb-[1.5rem]'>
                        <h2 className='text-[18px]  font-[600]'>{title}</h2>
                        <p className='text-[14px]  font-[500]'>{subTitle} </p>
                    </div>

                    
                                    
                                      
                            

                    <InfiniteList
                        resource='product'
                        title=" "
                        actions={false}
                        sx={{
                            "& .MuiToolbar-root": {
                                minHeight: "0px !important",
                            },
                            "& .MuiBox-root": {
                                padding: "0 ",
                            },
                            '& .MuiPaper-root': {
                                backgroundColor: theme === "light" ? "#fff !important" : "#222 !important",
                                color: theme === "light" ? "#222 !important" : "#fff !important",
                              },
                        }}
                    >
                        <WithListContext render={({ isLoading, data }) => (
            
                            !isLoading && (
                                <>
                                    {data && !data.length && <span>No Products</span>}
                                    {data && data.length > 0 && (
                                        <Grid container spacing='10px' rowGap={{ xs: 2 }}  >
                                            {data && data.map((product) => {
                                                // console.log(product);
                                                // console.log(product.variants[0].id);

                                                return (
                                                    <Grid key={product.id} item xs={4} sm={4} md={4}>
                                                        <NormalStoreCards title={title} subTitle={subTitle} price={price} name={product.handle} product={product} />
                                                    </Grid>
 
                                                )
                                            })
                                            }
                                        </Grid>

                                    )}
                                </>
                            ))}
                        />
                        
                    </InfiniteList>
                </div>

            </Dialog>
            {/* <DFooter /> */}
        </>
    );
};
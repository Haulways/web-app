import {  CircularProgress, Grid, useMediaQuery } from "@mui/material";
import { Create, EditGuesser, WithListContext, useGetList, useRecordContext, useStore} from "react-admin";
import { YoutubCards, CarouselCard, FacebookCard, BigCarouselCard } from "../../../components/card/Card";
import React, { useContext, useEffect, useState } from "react";
import { PostCreate } from "./_Post";
import Signlepost from "../Post";
import { TrendingCard } from "../../../components/card/Trending";
import { FavoriteCard } from "../../../components/card/Favorite";
import { ForYouCard } from "../../../components/card/ForYou";
import { SponsoredCard } from "../../../components/card/Sponsored";
import { supabase } from "../../../supabase/SupabaseConfig";
import { AuthContext } from "../../../components/context/AuthContext";
import { ThemeContext } from "../../../components/context/ThemeProvider";






export const PostListContent = () => {
    const [isMuted, setIsMuted] = useState(true);
    const { theme } = useContext(ThemeContext);


    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

     const { data: grwm } = useGetList('grwm');
     const { data: diy  } = useGetList('diy');
     const { data: lookbook  } = useGetList('lookbook');
     const { data: hauls  } = useGetList('hauls');
     const { data: users  } = useGetList('users');
    
    // console.log(grwm, diy, lookbook, hauls, users)


    
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    const isMedium = useMediaQuery((theme) => theme.breakpoints.down("md"));

   
 

    const gridItems = ({ data, users, huals, diy, lookbook, grwm }) => {
        const items = [
            
            {
                letter: 'A', component: (
                    <Grid item>
                        <TrendingCard data={data} />
                    </Grid>
                ),
            },
            
            {
                letter: 'B', component: (
                    <Grid item className="mx-auto tablet:max-w-2xl laptop:max-w-5xl laptop:flex flex-wrap justify-center gap-x-6 gap-y-4">
                        {data && data.map((post) => {
                    
                            return (
                                <React.Fragment key={post.id}>
                                    {isSmall || isMedium ? (
                           
                                        <YoutubCards post={post} url="posts" isMuted={isMuted} toggleMute={toggleMute} />
                           
                                    ) : (
                            
                                        <FacebookCard post={post} url="posts" isMuted={isMuted} toggleMute={toggleMute} />
                            
                                    )}
                        
                                </React.Fragment>
                            )
                        })}
                    </Grid>
                ),
            },
            {
                letter: 'C', component: (
                    <Grid item>
                        <ForYouCard />
                    </Grid>
                ),
            },
            {
                letter: 'D', component: (
                    <Grid item>
                        <SponsoredCard data={data} />
                    </Grid>
                ),
            },
            {
                letter: 'E', component: (
                    <Grid item>
                        <FavoriteCard users={users} />
                    </Grid>
                ),
            },
            {
                letter: 'F', component: (
                    <Grid item className="mx-auto tablet:max-w-2xl laptop:max-w-5xl laptop:flex flex-wrap justify-center gap-x-6 gap-y-4">
                        {huals && huals.map((post) => {
                    
                            return (
                                <React.Fragment key={post.id}>
                                    {isSmall || isMedium ? (
                           
                                        <YoutubCards post={post} url="hauls" isMuted={isMuted} toggleMute={toggleMute} />
                           
                                    ) : (
                            
                                        <FacebookCard post={post} url="hauls" isMuted={isMuted} toggleMute={toggleMute} />
                            
                                    )}
                        
                                </React.Fragment>
                            )
                        })}
                    </Grid>
                ),
            },
            {
                letter: 'G', component: (
                    <Grid item className="mx-auto flex flex-wrap gap-x-6 gap-y-4 tablet:max-w-3xl tablet:mx-auto laptop:max-w-6xl laptop:mx-auto">
                        {data && data.map((post) => {
                    
                            return (
                                <React.Fragment key={post.id}>
                                    {isSmall || isMedium ? (
                           
                                        <CarouselCard post={post} url="posts" isMuted={isMuted} toggleMute={toggleMute} />
              
                                    ) : (
               
                                        <BigCarouselCard post={post} url="posts" isMuted={isMuted} toggleMute={toggleMute} />
               
                                    )}
                                    
                                </React.Fragment>
                            )
                        })}
                    </Grid>
                ),
            },
            {
                letter: 'H', component: (
                    <Grid item className="mx-auto tablet:max-w-2xl laptop:max-w-5xl laptop:flex flex-wrap justify-center gap-x-6 gap-y-4">
                        {diy && diy.map((post) => {
                    
                            return (
                                <React.Fragment key={post.id}>
                                    {isSmall || isMedium ? (
                           
                                        <YoutubCards post={post} url="diy" isMuted={isMuted} toggleMute={toggleMute} />
                           
                                    ) : (
                            
                                        <FacebookCard post={post} url="diy" isMuted={isMuted} toggleMute={toggleMute} />
                            
                                    )}
                        
                                </React.Fragment>
                            )
                        })}
                    </Grid>
                ),
            },
            {
                letter: 'I', component: (
                    <Grid item className="mx-auto tablet:max-w-2xl laptop:max-w-5xl laptop:flex flex-wrap justify-center gap-x-6 gap-y-4">
                        {grwm && grwm.map((post) => {
                    
                            return (
                                <React.Fragment key={post.id}>
                                    {isSmall || isMedium ? (
                           
                                        <YoutubCards post={post} url="grwm" isMuted={isMuted} toggleMute={toggleMute} />
                           
                                    ) : (
                            
                                        <FacebookCard post={post} url="grwm" isMuted={isMuted} toggleMute={toggleMute} />
                            
                                    )}
                        
                                </React.Fragment>
                            )
                        })}
                    </Grid>
                ),
            },
            {
                letter: 'J', component: (
                    <Grid item className="mx-auto tablet:max-w-2xl laptop:max-w-5xl laptop:flex flex-wrap justify-center gap-x-6 gap-y-4">
                        {lookbook && lookbook.map((post) => {
                    
                            return (
                                <React.Fragment key={post.id}>
                                    {isSmall || isMedium ? (
                           
                                        <YoutubCards post={post} url="lookbook" isMuted={isMuted} toggleMute={toggleMute} />
                           
                                    ) : (
                            
                                        <FacebookCard post={post} url="lookbook" isMuted={isMuted} toggleMute={toggleMute} />
                            
                                    )}
                        
                                </React.Fragment>
                            )
                        })}
                    </Grid>
                ),
            },
        ];

        // Sort the items so that ones with data come first
        //     items.sort((a, b) => {
        //     const aHasData = a.letter === 'B' || a.letter === 'E' || a.letter === 'D' || a.letter === 'F';
        //     const bHasData = b.letter === 'B' || b.letter === 'E' || b.letter === 'D' || b.letter === 'F';
        //     return bHasData - aHasData;
        // });

        return items;
    };
    
    
   
    

    // Fisher-Yates shuffle function
    const shuffleArray = (array) => {
        let currentIndex, randomIndex, tempValue;

        // Separate items with and without data
        const itemsWithData = array.filter(item => item.letter === 'B' || item.letter === 'E' || item.letter === 'D' || item.letter === 'F');
        const itemsWithoutData = array.filter(item => item.letter !== 'B' && item.letter !== 'E' && item.letter !== 'D' && item.letter !== 'F');

        // Shuffle items with data
        currentIndex = itemsWithData.length;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            tempValue = itemsWithData[currentIndex];
            itemsWithData[currentIndex] = itemsWithData[randomIndex];
            itemsWithData[randomIndex] = tempValue;
        }

        // Shuffle items without data
        currentIndex = itemsWithoutData.length;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            tempValue = itemsWithoutData[currentIndex];
            itemsWithoutData[currentIndex] = itemsWithoutData[randomIndex];
            itemsWithoutData[randomIndex] = tempValue;
        }

        // Combine the shuffled arrays
        return [...itemsWithData, ...itemsWithoutData];
    };


    // let { data: users, error } = await supabase
    // .from('users')
    // .select('*')
    // .match({ email: currentUser.email })
    // .single();

    // let { data: users, error } = await supabase
    //         .from('users')
    //         .insert({id: currentUser.id, email: 'vic@haulway.co'  })
    //         .select()

    // let { data: users, error } = await supabase
    // .from('users')
    // .update({uid: currentUser.id})
    // .match({ email: currentUser.email })
    // .select()
    
    // const handleUsers = async () => {
    //     let { data: users, error } = await supabase
    //         .from('users')
    //         .update({ id: currentUser.id })
    //         .match({ email: currentUser.email })
    //         .select()
        
    //     console.log(users);
    // };
  

    return (
       
       
        <WithListContext render={({ isLoading, data }) => (
            
            !isLoading ? (
                <div className=" feed--page">
                    
                    <Grid container spacing={0} padding={0} className="gap-x-[0rem] justify-center gap-y-4 pt-[30px] pb-[50px]"  >

                        {gridItems({ data, users, hauls, diy, lookbook, grwm }).map((item, index) => (
                            <div key={index}>
                                {item.component}
                            </div>
                        ))}

                    </Grid>
                </div>
            )  : (
                <div className='spinner absolute top-0 bottom-0 left-0 right-0 my-0 mx-0'>
                    <CircularProgress sx={{filter : theme === "light" ? "invert(0)" : "invert(1)"}}/>
                </div>
            ))}
        />
    );
};


export const PostCreateContent = () => ( 
    <Create>
        <PostCreate/>
    </Create>
);

export const PostEditContent = () => (
    <EditGuesser />
);


export const PostShowContent = () => {
    return (
        
        <Signlepost />
    )
};

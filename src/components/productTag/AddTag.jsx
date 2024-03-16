import { CardMedia, Dialog, Grid, Skeleton, Slide, Stack } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { EditorVideoPlayer } from "../videoPlayer/VideoPlayer";
import { FaPlay, FaPause } from "react-icons/fa";
import { BsFillFilterCircleFill } from 'react-icons/bs';
import { PiCaretDownBold } from "react-icons/pi";
import backIcon from "../../assets/postImg-Icons/backIcon.png";
import tagIcon from "../../assets/editorIcons/tagbtn.png";
import tagRule from "../../assets/editorIcons/tagRule.png";
import { SearchBox } from "../search/SearchBox";
import { AuthContext, CreateButton, FilterButton, FilterForm, InfiniteList, List, ListActions, ListBase, Pagination, SelectInput, TextInput, TopToolbar, WithListContext, useDataProvider, useGetIdentity, useGetList } from "react-admin";
import { AdCard, TagCard, TagCard2, TaggedProductCard, TaggedProductCard2, TaggedVideoCard } from "../card/ShowCard";
import { useProducts } from "medusa-react";
import { useState } from "react";
import { supabase } from "../../supabase/SupabaseConfig";
import { ThemeContext } from "../context/ThemeProvider";
import AdContainer from "../createAds/AdContainer";



export const AddTag = ({ selectedfiles, activeFile, openTagProduct, handleCloseTagProduct, setShowTagProduct, showTagProduct, setTaggedData, taggedData, theme }) => {
    const { data: contracts } = useGetList("contract");
    const { data: nw_prods } = useGetList("product");
    const [videoUrl, setVideoUrl] = React.useState('');
    const [tags, setTags] = React.useState(false);

    const closeShowTag = () => {
        setShowTagProduct(false);
        setTags(true);
    }

    const handleCloseTags = () => {
        setTags(false);
        setShowTagProduct(true);
    }




    React.useEffect(() => {
        if (activeFile && activeFile instanceof Blob) {
            const fileUrl = window.URL.createObjectURL(activeFile);
            setVideoUrl(fileUrl);
        } else if (selectedfiles && selectedfiles.length > 0 && selectedfiles[0] instanceof Blob) {
            const fileUrl = window.URL.createObjectURL(selectedfiles[0]);
            setVideoUrl(fileUrl);
        }
    }, [selectedfiles, activeFile]);



    return (
        <>
            <Dialog
                open={openTagProduct}
                fullScreen
                onClose={handleCloseTagProduct}
                PaperProps={{ style: { backgroundColor: theme === "light" ? "#fff" : "#222", color: theme === "light" ? "#222" : "#fff", padding: '16px' } }}
            >
                <button className='absolute top-4 left-2 h-[35px] w-[35px]  invert' onClick={handleCloseTagProduct}>
                    <img src={backIcon} alt='back' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
                </button>

                <button className='bg-black text-white rounded-full  text-[14px] h-[34px] px-[1.1rem] font-[600] absolute top-4 right-4'
                    onClick={handleCloseTagProduct}
                    style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}
                >
                    Done
                </button>

                {showTagProduct && (
                    <TagProduct
                        videoUrl={videoUrl}
                        closeShowTag={closeShowTag}
                        taggedData={taggedData}
                        theme={theme}
                    />
                )}


                <Tags
                    tags={tags}
                    handleCloseTags={handleCloseTags}
                    taggedData={taggedData}
                    setTaggedData={setTaggedData}
                    theme={theme}
                    contracts={contracts}
                    nw_prods={nw_prods}
                />


            </Dialog>

        </>
    );
};


// Tagged products
const TagProduct = ({ videoUrl, closeShowTag, taggedData, theme }) => {
    const [isMuted, setIsMuted] = React.useState(true);
    const [isPlaying, setIsPlaying] = React.useState(false);




    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };
    return (
        <>
            <div className="tag--video--container feed--page">
                {videoUrl && (
                    <>
                        <EditorVideoPlayer url={videoUrl} isMuted={isMuted} isPlaying={isPlaying} />
                        <button className="absolute top-0 bottom-0 left-0 right-0  mx-auto my-auto invert w-[40px] h-[40px]" onClick={togglePlay} style={{ filter: theme === "light" ? "invert(0)" : "invert(0)" }}>

                            {isPlaying ?
                                <FaPause style={{ fontSize: 40 }} />
                                :
                                <FaPlay style={{ fontSize: 40 }} />
                            }

                        </button>
                    </>
                )}
            </div>

            <div className="flex flex-col items-center justify-center gap-y-[15px] feed--page">
                <p className="font-[500] text-[16px] ">Tag Product</p>
                <div className="flex flex-wrap items-center justify-center gap-[10px]">
                    <div className="flex flex-wrap gap-[10px]">
                        {taggedData && taggedData.map((product) => {

                            return (
                                <React.Fragment key={product.id}>
                                    <div className='w-[50px] h-[50px] overflow-hidden rounded-[6px]'>

                                        <img src={product.images[0].url} alt={product.title} className="w-full h-full object-cover" />

                                    </div>
                                </React.Fragment>
                            )
                        })}
                    </div>

                    <button onClick={closeShowTag}>
                        <img className="w-[50px] h-[50px]" src={tagIcon} alt="tag" />
                    </button>
                </div>
            </div>
        </>
    )
};



// Options for tagging

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



export const Tags = ({ tags, handleCloseTags, taggedData, setTaggedData, theme, contracts, nw_prods }) => {
    const { currentUser } = useContext(AuthContext);
    const [store_ids, setStore_ids] = useState(null);
    const [prod_ids, setProd_ids] = useState(null);
    const { data: identity, isLoading: identityLoading } = useGetIdentity();
    const { products, isLoading } = useProducts({ id: prod_ids, expand: 'variants,variants.prices,images' });
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 3;


    useEffect(() => {
        console.log(contracts, identity)
        if (contracts && identity && contracts.length) {
            let ids = contracts.filter(contrct => { return (identity.id === contrct.created_for || identity.id === contrct.created_for) }).map(res => {return res.products[0][0].metadata?.store.id})
            // console.log(ids);
            setStore_ids(ids)
        }
    }, [contracts, identity])

    useEffect(() => {
        console.log(store_ids, nw_prods)
        if (store_ids && nw_prods && nw_prods.length && store_ids.length) {
            let ids = nw_prods.filter(nw_prod => { return (store_ids.includes(nw_prod.store_id)) }).map(res => {return res.id})
            // console.log(ids);
            setProd_ids(ids)
        }
    }, [store_ids, nw_prods])

    useEffect(() => {
        if(products){
            console.log(products)
        }
    },[products])



    const TagFilters = [
        // <SearchBox placeholder='Search for tags' />


        <SelectInput label="Vendors" source="vendor" alwaysOn
            sx={{
                overflow: 'hidden',

                '& .css-19n9far-MuiInputBase-root-MuiFilledInput-root ': {
                    maxWidth: '154px',
                    borderRadius: '100px',
                    overflow: 'hidden',
                }
            }}
            choices={[
                { id: '1', name: 'Victor' }
            ]}
        />,

        <SelectInput label="Product" source="product" alwaysOn
            sx={{
                overflow: 'hidden',
                '& .css-19n9far-MuiInputBase-root-MuiFilledInput-root ': {
                    maxWidth: '154px',
                    borderRadius: '100px',
                    overflow: 'hidden'
                }
            }}
            choices={[
                { id: '1', name: 'Victor' }

            ]}
        />,

        <SelectInput label="Price tag" source="price" alwaysOn
            sx={{
                overflow: 'hidden',
                '& .css-19n9far-MuiInputBase-root-MuiFilledInput-root ': {
                    maxWidth: '154px',
                    borderRadius: '100px',
                    overflow: 'hidden'
                }
            }}
            choices={[
                { id: '1', name: 'Victor' }

            ]}
        />,

    ];

    const TagActions = () => (
        <TopToolbar className="store__card" sx={{
            backgroundColor: 'transparent !important',
            width: '310px',
            margin: '0 auto',

            flexDirection: 'column !important',

            '& .MuiToolbar-root .RaTopToolbar-root': {

            },
            "& .RaList-actions": {
                backgroundColor: 'transparent !important',

            }
        }}>
            <Stack direction='row' columnGap='30px' justifyContent='space-between' alignItems='center'
                sx={{
                    maxWidth: '100%'
                }}
            >

                <SearchBox placeholder='Search for tags' />

                <div>
                    <BsFillFilterCircleFill className="w-[35px] h-[35px] flex-shrink-0 object-cover bg-[#222]  fill-[#D9D9D9] rounded-full cursor-pointer" />
                </div>
            </Stack>

            <Stack direction='row' alignItems='center' className="store__card "
                sx={{
                    overflowX: 'scroll !important',
                    maxWidth: '330px',
                    margin: '0 auto',
                    justifyContent: 'center'
                    // '& label[data-shrink=false]+.MuiInputBase-formControl .css-1gzkxga-MuiSelect-select-MuiInputBase-input-MuiFilledInput-input': {
                    //     padding: '0px 15px 20px',
                    // }
                }}
            >

                <FilterForm
                    sx={{
                        flexWrap: 'nowrap',
                        '&  .css-oh5jlk-RaFilterForm-root': {
                            flexWrap: 'nowrap',
                        },
                        '& .css-19n9far-MuiInputBase-root-MuiFilledInput-root::before': {
                            borderBottom: 'none'
                        },
                        '& .MuiFormLabel-root': {
                            // Change the font size of the labels
                            fontSize: '15px',
                            fontWeight: '600'
                        },
                        '& .MuiInputBase-root': {
                            height: 'fit-content',
                        }

                    }}
                    filters={TagFilters} />

            </Stack>

        </TopToolbar>
    );



    return (
        <>
            <Dialog
                open={tags}
                TransitionComponent={Transition}
                onClose={handleCloseTags}
                fullScreen
                PaperProps={{ style: { backgroundColor: theme === "light" ? "#fff" : "#222", padding: '16px', maxHeight: '90vh', boxShadow: 'none', position: 'fixed', bottom: 0 } }}
                BackdropProps={{ invisible: true }}
            >
                <div className="h-full w-full ">
                    <div className="w-full mb-[24px] cursor-pointer" onDrag={handleCloseTags} onTouchMove={handleCloseTags}>
                        <img className="mx-auto" src={tagRule} alt='rule' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
                    </div>


                    <div className="flex items-center gap-x-[30px] flex-shrink-0">
                        <SearchBox placeholder='Search for tags' />
                        <BsFillFilterCircleFill className="w-[35px] h-[35px] flex-shrink-0 object-cover bg-[#222]  fill-[#D9D9D9] rounded-full cursor-pointer" style={{ backgroundColor: theme === "light" ? "#222" : "rgba(68, 68, 68, 0.2)", fill: theme === "light" ? "#d9d9d9" : "#d9d9d9" }} />
                    </div>
                    <div className="py-2"></div>

                    {/* filter tags 
                    <div className="mt-[25px] mb-[10px] store__card" >
                        <ul className="flex gap-x-[20px] items-center overflow-x-scroll store__card">
                            <li className="flex items-center gap-x-[50px] px-[17px] py-[10px] text-[14px] font-[500] rounded-full bg-[#d9d9d9] w-[154px] cursor-pointer" style={{ backgroundColor: theme === "light" ? "#d9d9d9" : "rgba(68, 68, 68, 0.4)", color: theme === "light" ? "#222" : "#fff" }}>
                                Vendor
                                <PiCaretDownBold className="flex-shrink-0" />
                            </li>
                            <li className="flex items-center gap-x-[50px] px-[17px] py-[10px] text-[14px] font-[500] rounded-full bg-[#d9d9d9] w-[154px] cursor-pointer" style={{ backgroundColor: theme === "light" ? "#d9d9d9" : "rgba(68, 68, 68, 0.4)", color: theme === "light" ? "#222" : "#fff" }}>
                                Product
                                <PiCaretDownBold className="flex-shrink-0" />
                            </li>
                            <li className="flex items-center gap-x-[50px] px-[17px] py-[10px] text-[14px] font-[500] rounded-full bg-[#d9d9d9] min-w-[164px] cursor-pointer" style={{ backgroundColor: theme === "light" ? "#d9d9d9" : "rgba(68, 68, 68, 0.4)", color: theme === "light" ? "#222" : "#fff" }}>
                                Price Tag
                                <PiCaretDownBold className="flex-shrink-0" />
                            </li>
                        </ul>
                    </div> */}




                    {/* <ListBase resource="posts" style={{ backgroundColor: '#F1F1F1' }}>

                
                        <List
                            // perPage={3}
                            // pagination={<Pagination rowsPerPageOptions={[3, 6, 9, 12]} />}
                            actions={<TagActions />}
                            sx={{
                           
                                "& .RaList-actions, .css-bhp9pd-MuiPaper-root-MuiCard-root": {
                                    backgroundColor: 'transparent !important',
                
                                }
                            }}
                        >
                           
                            <WithListContext render={({ isLoading, data }) => (
                                !isLoading && (
                                    <>
                                        <div className=" flex flex-col gap-y-[10px]">
                                            {data && data.map((post) => {
                                       
                                                return (
                                                    <React.Fragment key={post.id}>
                                                        <TagCard
                                                            post={post}
                                                            taggedData={taggedData}
                                                            setTaggedData={setTaggedData}
                                                        />
                                                    </React.Fragment>
                                                )
                                            })}
                                        </div>
                                    </>
                                ))} />
                        </List>
                    </ListBase> */}
                    {isLoading && <span>Loading...</span>}
                    {!products && <span>No Products</span>}
                    {products && (
                        <>
                            <ul className=" flex flex-col gap-y-[10px]">
                                {products.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((product) => (
                                    <li key={product.id}>
                                        <TagCard
                                            theme={theme}
                                            post={product}
                                            taggedData={taggedData}
                                            setTaggedData={setTaggedData}
                                        />
                                    </li>
                                ))}
                            </ul>
                            <Pagination
                                page={currentPage}
                                rowsPerPage={ITEMS_PER_PAGE}
                                count={products.length}
                                setPage={setCurrentPage}
                                sx={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}
                            />
                        </>
                    )}


                    <div className=' mt-[2rem] gap-x-4 flex overflow-x-scroll w-full store__card pb-[2rem]'>
                        {taggedData && taggedData.map((product) => (
                            <React.Fragment key={product.id}>
                                <TaggedProductCard product={product} theme={theme} />
                            </React.Fragment>
                        ))}
                    </div>

                </div>
            </Dialog>
        </>
    );
};

export const Tag2 = ({ tags, handleCloseTags, taggedData, setTaggedData, theme, broadcasterData }) => {

    const { products, isLoading } = useProducts();
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 3;

    const totalPages = Math.ceil(products?.length / ITEMS_PER_PAGE);

    const handleClick = (newPage) => {
        setCurrentPage(newPage);
    };


    const TagFilters = [
        // <SearchBox placeholder='Search for tags' />


        <SelectInput label="Vendors" source="vendor" alwaysOn
            sx={{
                overflow: 'hidden',

                '& .css-19n9far-MuiInputBase-root-MuiFilledInput-root ': {
                    maxWidth: '154px',
                    borderRadius: '100px',
                    overflow: 'hidden',
                }
            }}
            choices={[
                { id: '1', name: 'Victor' }
            ]}
        />,

        <SelectInput label="Product" source="product" alwaysOn
            sx={{
                overflow: 'hidden',
                '& .css-19n9far-MuiInputBase-root-MuiFilledInput-root ': {
                    maxWidth: '154px',
                    borderRadius: '100px',
                    overflow: 'hidden'
                }
            }}
            choices={[
                { id: '1', name: 'Victor' }

            ]}
        />,

        <SelectInput label="Price tag" source="price" alwaysOn
            sx={{
                overflow: 'hidden',
                '& .css-19n9far-MuiInputBase-root-MuiFilledInput-root ': {
                    maxWidth: '154px',
                    borderRadius: '100px',
                    overflow: 'hidden'
                }
            }}
            choices={[
                { id: '1', name: 'Victor' }

            ]}
        />,

    ];

    const TagActions = () => (
        <TopToolbar className="store__card" sx={{
            backgroundColor: 'transparent !important',
            width: '310px',
            margin: '0 auto',

            flexDirection: 'column !important',

            '& .MuiToolbar-root .RaTopToolbar-root': {

            },
            "& .RaList-actions": {
                backgroundColor: 'transparent !important',

            }
        }}>
            <Stack direction='row' columnGap='30px' justifyContent='space-between' alignItems='center'
                sx={{
                    maxWidth: '100%'
                }}
            >

                <SearchBox placeholder='Search for tags' />

                <div>
                    <BsFillFilterCircleFill className="w-[35px] h-[35px] flex-shrink-0 object-cover bg-[#222]  fill-[#D9D9D9] rounded-full cursor-pointer" />
                </div>
            </Stack>

            <Stack direction='row' alignItems='center' className="store__card "
                sx={{
                    overflowX: 'scroll !important',
                    maxWidth: '330px',
                    margin: '0 auto',
                    justifyContent: 'center'
                    // '& label[data-shrink=false]+.MuiInputBase-formControl .css-1gzkxga-MuiSelect-select-MuiInputBase-input-MuiFilledInput-input': {
                    //     padding: '0px 15px 20px',
                    // }
                }}
            >

                <FilterForm
                    sx={{
                        flexWrap: 'nowrap',
                        '&  .css-oh5jlk-RaFilterForm-root': {
                            flexWrap: 'nowrap',
                        },
                        '& .css-19n9far-MuiInputBase-root-MuiFilledInput-root::before': {
                            borderBottom: 'none'
                        },
                        '& .MuiFormLabel-root': {
                            // Change the font size of the labels
                            fontSize: '15px',
                            fontWeight: '600'
                        },
                        '& .MuiInputBase-root': {
                            height: 'fit-content',
                        }

                    }}
                    filters={TagFilters} />

            </Stack>

        </TopToolbar>
    );



    return (
        <>
            <Dialog
                open={tags}
                TransitionComponent={Transition}
                onClose={handleCloseTags}
                fullScreen
                PaperProps={{ style: { backgroundColor: theme === "light" ? "#fff" : "#222", padding: '16px', maxHeight: '90vh', boxShadow: 'none', position: 'fixed', bottom: 0 } }}
                BackdropProps={{ invisible: true }}
            >
                <div className="h-full w-full ">
                    <div className="w-full mb-[24px] cursor-pointer" onDrag={handleCloseTags} onTouchMove={handleCloseTags}>
                        <img className="mx-auto" src={tagRule} alt='rule' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
                    </div>


                    <div className="flex items-center gap-x-[30px] flex-shrink-0">
                        <SearchBox placeholder='Search for tags' />
                        <BsFillFilterCircleFill className="w-[35px] h-[35px] flex-shrink-0 object-cover bg-[#222]  fill-[#D9D9D9] rounded-full cursor-pointer" style={{ backgroundColor: theme === "light" ? "#222" : "rgba(68, 68, 68, 0.2)", fill: theme === "light" ? "#d9d9d9" : "#d9d9d9" }} />
                    </div>

                    {/* filter tags  */}
                    <div className="mt-[25px] mb-[10px] store__card" >
                        <ul className="flex gap-x-[20px] items-center overflow-x-scroll store__card">
                            <li className="flex items-center gap-x-[50px] px-[17px] py-[10px] text-[14px] font-[500] rounded-full bg-[#d9d9d9] w-[154px] cursor-pointer" style={{ backgroundColor: theme === "light" ? "#d9d9d9" : "rgba(68, 68, 68, 0.4)", color: theme === "light" ? "#222" : "#fff" }}>
                                Vendor
                                <PiCaretDownBold className="flex-shrink-0" />
                            </li>
                            <li className="flex items-center gap-x-[50px] px-[17px] py-[10px] text-[14px] font-[500] rounded-full bg-[#d9d9d9] w-[154px] cursor-pointer" style={{ backgroundColor: theme === "light" ? "#d9d9d9" : "rgba(68, 68, 68, 0.4)", color: theme === "light" ? "#222" : "#fff" }}>
                                Product
                                <PiCaretDownBold className="flex-shrink-0" />
                            </li>
                            <li className="flex items-center gap-x-[50px] px-[17px] py-[10px] text-[14px] font-[500] rounded-full bg-[#d9d9d9] min-w-[164px] cursor-pointer" style={{ backgroundColor: theme === "light" ? "#d9d9d9" : "rgba(68, 68, 68, 0.4)", color: theme === "light" ? "#222" : "#fff" }}>
                                Price Tag
                                <PiCaretDownBold className="flex-shrink-0" />
                            </li>
                        </ul>
                    </div>




                    {/* <ListBase resource="product" style={{ backgroundColor: '#F1F1F1' }}>

                
                        <List
                            perPage={3}
                            pagination={<Pagination  />}
                            actions={false}
                            sx={{
                           
                                "& .RaList-actions, .css-bhp9pd-MuiPaper-root-MuiCard-root": {
                                    backgroundColor: 'transparent !important',
                
                                },
                                "& .MuiToolbar-gutters": {
                                    color: '#fff'
                                }
                            }}
                        >
                           
                            <WithListContext render={({ isLoading, data }) => (
                                !isLoading && (
                                    <>
                                        <div className=" flex flex-col gap-y-[10px]">
                                            {data && data.map((post) => {
                                       
                                                return (
                                                    <React.Fragment key={post.id}>
                                                        <TagCard2
                                                            post={post}
                                                            broadcasterData={broadcasterData}
                                                            taggedData={taggedData}
                                                            setTaggedData={setTaggedData}
                                                        />
                                                    </React.Fragment>
                                                )
                                            })}
                                        </div>
                                    </>
                                ))} />
                        </List>
                    </ListBase> */}

                    {isLoading && <span>Loading...</span>}
                    {!products && <span>No Products</span>}
                    {products && (
                        <>
                            <ul className=" flex flex-col gap-y-[10px]">
                                {products.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((product) => (
                                    <li key={product.id}>
                                        <TagCard2
                                            theme={theme}
                                            post={product}
                                            taggedData={taggedData}
                                            broadcasterData={broadcasterData}
                                            setTaggedData={setTaggedData}
                                        />
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-[.5rem] mb-[1rem] float-right text-white">
                                <span>
                                    {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, products.length)} - {Math.min(currentPage * ITEMS_PER_PAGE, products.length)} of {products.length}
                                </span>
                                <button disabled={currentPage === 1} style={{ backgroundColor: currentPage === 1 ? 'transparent' : '' }} className="px-[10px]" onClick={() => handleClick(currentPage - 1)}>
                                    {'<'}
                                </button>
                                <button disabled={currentPage === totalPages} style={{ backgroundColor: currentPage === totalPages ? 'transparent' : '' }} onClick={() => handleClick(currentPage + 1)}>
                                    {'>'}
                                </button>
                            </div>
                        </>
                    )}

                    <div className=' mt-[2rem] gap-x-4 flex overflow-x-scroll w-full store__card pb-[2rem]'>
                        {taggedData && taggedData.map((product) => (
                            <React.Fragment key={product.id}>
                                <TaggedProductCard2 product={product} theme={theme} />
                            </React.Fragment>
                        ))}
                    </div>

                </div>
            </Dialog>
        </>
    );
};



export const VideoTags = ({ vtags, handleCloseVTags, taggedDataVideo, setTaggedDataVideo }) => {

    const { products, isLoading } = useProducts();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { theme } = useContext(ThemeContext);
    const [isReady, setIsReady] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 9;

    const totalPages = Math.ceil(posts?.length / ITEMS_PER_PAGE);



    const handleAddClick = (post) => {
        const isTagged = taggedDataVideo.some(item => item.id === post.id);
        if (!isTagged) {
            const product = post;
            const updatedTaggedData = [...taggedDataVideo, product];
            setTaggedDataVideo(updatedTaggedData); // Add this line
        } else {
            const product = taggedDataVideo.filter(item => item.id !== post.id);
            setTaggedDataVideo(product);
        }
    };

    const handleClick = (newPage) => {
        setCurrentPage(newPage);
    };
    const handleCanPlay = () => {
        setIsReady(true);
    };

    useEffect(() => {
        const getPost = async () => {
            const tables = ["posts", "hauls", "lookbook", "diy", "grwm"];
            let allData = [];
            setLoading(true);
            for (let table of tables) {
                let { data, error } = await supabase
                    .from(table)
                    .select("*");
                if (error && status !== 406) throw error;
                allData = [...allData, ...data];
            }

            const uniquePosts = Array.from(new Set(allData.map((post) => post.id)))
                .map((id) => {
                    return allData.find((post) => post.id === id);
                });
            setPosts(uniquePosts);
            setLoading(false)
        }

        if (posts.length === 0) {
            getPost();
        }
    }, [posts]);

    const TagFilters = [
        // <SearchBox placeholder='Search for tags' />


        <SelectInput label="Vendors" source="vendor" alwaysOn
            sx={{
                overflow: 'hidden',

                '& .css-19n9far-MuiInputBase-root-MuiFilledInput-root ': {
                    maxWidth: '154px',
                    borderRadius: '100px',
                    overflow: 'hidden',
                }
            }}
            choices={[
                { id: '1', name: 'Victor' }
            ]}
        />,

        <SelectInput label="Product" source="product" alwaysOn
            sx={{
                overflow: 'hidden',
                '& .css-19n9far-MuiInputBase-root-MuiFilledInput-root ': {
                    maxWidth: '154px',
                    borderRadius: '100px',
                    overflow: 'hidden'
                }
            }}
            choices={[
                { id: '1', name: 'Victor' }

            ]}
        />,

        <SelectInput label="Price tag" source="price" alwaysOn
            sx={{
                overflow: 'hidden',
                '& .css-19n9far-MuiInputBase-root-MuiFilledInput-root ': {
                    maxWidth: '154px',
                    borderRadius: '100px',
                    overflow: 'hidden'
                }
            }}
            choices={[
                { id: '1', name: 'Victor' }

            ]}
        />,

    ];

    const TagActions = () => (
        <TopToolbar className="store__card" sx={{
            backgroundColor: 'transparent !important',
            width: '310px',
            margin: '0 auto',

            flexDirection: 'column !important',

            '& .MuiToolbar-root .RaTopToolbar-root': {

            },
            "& .RaList-actions": {
                backgroundColor: 'transparent !important',

            }
        }}>
            <Stack direction='row' columnGap='30px' justifyContent='space-between' alignItems='center'
                sx={{
                    maxWidth: '100%'
                }}
            >

                <SearchBox placeholder='Search for tags' />

                <div>
                    <BsFillFilterCircleFill className="w-[35px] h-[35px] flex-shrink-0 object-cover bg-[#222]  fill-[#D9D9D9] rounded-full cursor-pointer" />
                </div>
            </Stack>

            <Stack direction='row' alignItems='center' className="store__card "
                sx={{
                    overflowX: 'scroll !important',
                    maxWidth: '330px',
                    margin: '0 auto',
                    justifyContent: 'center'
                    // '& label[data-shrink=false]+.MuiInputBase-formControl .css-1gzkxga-MuiSelect-select-MuiInputBase-input-MuiFilledInput-input': {
                    //     padding: '0px 15px 20px',
                    // }
                }}
            >

                <FilterForm
                    sx={{
                        flexWrap: 'nowrap',
                        '&  .css-oh5jlk-RaFilterForm-root': {
                            flexWrap: 'nowrap',
                        },
                        '& .css-19n9far-MuiInputBase-root-MuiFilledInput-root::before': {
                            borderBottom: 'none'
                        },
                        '& .MuiFormLabel-root': {
                            // Change the font size of the labels
                            fontSize: '15px',
                            fontWeight: '600'
                        },
                        '& .MuiInputBase-root': {
                            height: 'fit-content',
                        }

                    }}
                    filters={TagFilters} />

            </Stack>

        </TopToolbar>
    );




    return (
        <>
            <Dialog
                open={vtags}
                TransitionComponent={Transition}
                onClose={handleCloseVTags}
                fullScreen
                PaperProps={{ style: { backgroundColor: theme === "light" ? "#fff" : "#222", padding: '16px', maxHeight: '95vh', boxShadow: 'none', position: 'fixed', bottom: 0 } }}
                BackdropProps={{ invisible: true }}
            >
                <div className="h-full w-full ">
                    <div className="w-full mb-[24px] cursor-pointer" onDrag={handleCloseVTags} onTouchMove={handleCloseVTags}>
                        <img className="mx-auto" src={tagRule} alt='rule' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
                    </div>


                    <div className="flex items-center gap-x-[30px] flex-shrink-0">
                        <SearchBox placeholder='Search for tags' />
                        <BsFillFilterCircleFill className="w-[35px] h-[35px] flex-shrink-0 object-cover bg-[#222]  fill-[#D9D9D9] rounded-full cursor-pointer" style={{ backgroundColor: theme === "light" ? "#222" : "rgba(68, 68, 68, 0.2)", fill: theme === "light" ? "#d9d9d9" : "#d9d9d9" }} />
                    </div>

                    {/* filter tags  */}
                    <div className="mt-[25px]  store__card" >
                        <ul className="flex gap-x-[20px] items-center overflow-x-scroll store__card">
                            <li className="flex items-center justify-between px-[17px] py-[10px] text-[14px] font-[500] rounded-full bg-[#d9d9d9] min-w-[154px] cursor-pointer" style={{ backgroundColor: theme === "light" ? "#d9d9d9" : "rgba(68, 68, 68, 0.4)", color: theme === "light" ? "#222" : "#fff" }}>
                                Influencer
                                <PiCaretDownBold className="flex-shrink-0" />
                            </li>
                            <li className="flex items-center justify-between px-[17px] py-[10px] text-[14px] font-[500] rounded-full bg-[#d9d9d9] min-w-[154px] cursor-pointer" style={{ backgroundColor: theme === "light" ? "#d9d9d9" : "rgba(68, 68, 68, 0.4)", color: theme === "light" ? "#222" : "#fff" }}>
                                Video type
                                <PiCaretDownBold className="flex-shrink-0" />
                            </li>
                            <li className="flex items-center justify-between px-[17px] py-[10px] text-[14px] font-[500] rounded-full bg-[#d9d9d9] min-w-[160px] cursor-pointer" style={{ backgroundColor: theme === "light" ? "#d9d9d9" : "rgba(68, 68, 68, 0.4)", color: theme === "light" ? "#222" : "#fff" }}>
                                Price Tag
                                <PiCaretDownBold className="flex-shrink-0" />
                            </li>
                        </ul>
                    </div>





                    {loading && <span>Loading...</span>}
                    {!posts && <span>No video</span>}
                    {posts && (
                        <>
                            <Grid container className='pb-[1rem] gap-y-[20px] feed--page pt-[30px]' spacing='5px'>
                                {posts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((post) => {
                                    const mediaUrl = post.media[0]; // Get the URL of the single media fil
                                    return (
                                        <Grid item xs={4} key={post.id} className="min-w-[100px]  flex-shrink-0 " >
                                            <div className="min-w-[100px] h-[100px] laptop:w-[100%] laptop:h-[250px] rounded-[5.374px] overflow-hidden relative" onClick={() => handleAddClick(post)}>
                                                <>
                                                    {!isReady && <Skeleton variant="rectangular" width="100%" height='100%' />}
                                                    <CardMedia
                                                        component="video"
                                                        src={mediaUrl}
                                                        playsInline={true}
                                                        className="object-cover h-full w-full"
                                                        loop
                                                        autoPlay
                                                        muted={true}
                                                        controls={false}
                                                        poster={post.posterUrl ? post.posterUrl : null}
                                                        onCanPlay={handleCanPlay}
                                                        style={{ display: isReady ? 'block' : 'none' }}
                                                    />

                                                </>
                                                <div className='absolute top-[5.6px] right-[6.23px] w-[4px] h-[15px]' style={{ filter: "invert(1)" }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="15" viewBox="0 0 4 15" fill="none">
                                                        <path d="M2 11C2.53043 11 3.03914 11.1844 3.41421 11.5126C3.78929 11.8408 4 12.2859 4 12.75C4 13.2141 3.78929 13.6592 3.41421 13.9874C3.03914 14.3156 2.53043 14.5 2 14.5C1.46957 14.5 0.96086 14.3156 0.585787 13.9874C0.210714 13.6592 0 13.2141 0 12.75C0 12.2859 0.210714 11.8408 0.585787 11.5126C0.96086 11.1844 1.46957 11 2 11ZM2 5.75C2.53043 5.75 3.03914 5.93437 3.41421 6.26256C3.78929 6.59075 4 7.03587 4 7.5C4 7.96413 3.78929 8.40925 3.41421 8.73744C3.03914 9.06563 2.53043 9.25 2 9.25C1.46957 9.25 0.96086 9.06563 0.585787 8.73744C0.210714 8.40925 0 7.96413 0 7.5C0 7.03587 0.210714 6.59075 0.585787 6.26256C0.96086 5.93437 1.46957 5.75 2 5.75ZM2 0.5C2.53043 0.5 3.03914 0.684374 3.41421 1.01256C3.78929 1.34075 4 1.78587 4 2.25C4 2.71413 3.78929 3.15925 3.41421 3.48744C3.03914 3.81563 2.53043 4 2 4C1.46957 4 0.96086 3.81563 0.585787 3.48744C0.210714 3.15925 0 2.71413 0 2.25C0 1.78587 0.210714 1.34075 0.585787 1.01256C0.96086 0.684374 1.46957 0.5 2 0.5Z" fill="black" />
                                                    </svg>
                                                </div>
                                                <div className='absolute bottom-[6.34px] left-[5.93px] text-[6.374px] text-white'>
                                                    20k views
                                                </div>
                                            </div>
                                            <div className='mt-[5.6px] text-[8.6px]'>
                                                <p>Single style video</p>
                                                <p>$10.00</p>
                                            </div>



                                        </Grid>
                                    )
                                })}
                            </Grid>

                            <div className=" mb-[1rem] float-right" style={{ color: theme === "light" ? "#222" : "#fff" }}>
                                <button disabled={currentPage === 1} style={{ backgroundColor: currentPage === 1 ? 'transparent' : '' }} className="px-[10px]" onClick={() => handleClick(currentPage - 1)}>
                                    {'<'}
                                </button>
                                <span>
                                    {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, posts.length)} - {Math.min(currentPage * ITEMS_PER_PAGE, posts.length)} of {posts.length}
                                </span>
                                <button disabled={currentPage === totalPages} style={{ backgroundColor: currentPage === totalPages ? 'transparent' : '' }} className="px-[10px]" onClick={() => handleClick(currentPage + 1)}>
                                    {'>'}
                                </button>
                            </div>
                        </>
                    )}


                    <div className=' mt-[2rem] gap-x-4 flex overflow-x-scroll w-full store__card pb-[2rem]'>
                        {taggedDataVideo && taggedDataVideo.map((product) => (
                            <React.Fragment key={product.id}>
                                <TaggedVideoCard product={product} theme={theme} />
                            </React.Fragment>
                        ))}
                    </div>

                </div>
            </Dialog>
        </>
    );
};






const TransitionAd = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="none" ref={ref} {...props} />;
});

export const AdTags = ({ tags, handleCloseEditor, taggedData, setTaggedData, theme, collectionName }) => {
    const [openType, setOpenType] = useState(false);
    const [openSendPost, setOpenSendPost] = React.useState(false);

    const [selectedTab, setSelectedTab] = useState("posts");

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    }

    const handleSendPost = () => {
        setOpenSendPost(true)
    };


    const closeSendPost = () => { setOpenSendPost(false); handleCloseEditor() };


    return (
        <>
            <Dialog
                open={tags}
                TransitionComponent={Transition}
                onClose={handleCloseEditor}
                fullScreen
                PaperProps={{ style: { backgroundColor: theme === "light" ? "#fff" : "#222", padding: '16px', boxShadow: 'none', color: theme === 'light' ? '#222' : '#fff' } }}
                BackdropProps={{ invisible: true }}
            >
                <button className='absolute top-4 left-2 h-[35px] w-[35px]  invert' onClick={handleCloseEditor}>
                    <img src={backIcon} alt='back' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
                </button>

                <button className='bg-black text-white rounded-full  text-[14px] h-[34px] px-[1.1rem] font-[600] absolute top-4 right-4'
                    onClick={handleSendPost}
                    style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}
                >
                    Done
                </button>
                <div className="h-full w-full mt-[5rem]">



                    <div className="flex items-center justify-between gap-x-[30px] flex-shrink-0 relative ">
                        <h2 style={{ color: theme === "light" ? '#222' : "#fff" }}>Choose Ad type</h2>
                        <BsFillFilterCircleFill className="w-[35px] h-[35px] flex-shrink-0 object-cover rounded-full cursor-pointer" style={{ color: theme === 'light' ? '#222' : '#fff' }} onClick={() => setOpenType(!openType)} />
                        <TransitionAd in={openType}>
                            <div className="top-[3rem] right-4 py-[1.2rem] z-[1000] rounded-md absolute shadow-md drop-shadow-md" style={{ backgroundColor: theme === "light" ? "#fff" : "rgba(68, 68, 68)", color: theme === "light" ? '#222' : "#fff" }}>
                                <ul className="flex flex-col gap-y-2">
                                    <li className={` cursor-pointer py-[5px] px-[1rem] pr-[4rem]  ${selectedTab === "posts" ? " text-[#fff] bg-[#222]" : "text-zinc-400"}`} onClick={() => { handleTabClick("posts"); setOpenType(!openType) }} >
                                        Post Ad
                                    </li>
                                    <li className={` cursor-pointer py-[5px] px-[1rem] pr-[4rem]  ${selectedTab === "course" ? " text-[#fff] bg-[#222]" : "text-zinc-400"}`} onClick={() => { handleTabClick("course"); setOpenType(!openType) }} >
                                        Courses Ad
                                    </li>
                                    <li className={` cursor-pointer py-[5px] px-[1rem] pr-[4rem]  ${selectedTab === "shop" ? " text-[#fff] bg-[#222]" : "text-zinc-400"}`} onClick={() => { handleTabClick("shop"); setOpenType(!openType) }} >
                                        Shop Ad
                                    </li>
                                    <li className={` cursor-pointer py-[5px] px-[1rem] pr-[4rem]  ${selectedTab === "others" ? " text-[#fff] bg-[#222]" : "text-zinc-400"}`} onClick={() => { handleTabClick("others"); setOpenType(!openType) }} >
                                        Others
                                    </li>
                                </ul>
                            </div>
                        </TransitionAd>
                    </div>

                    <div className="mt-[2rem]">
                        {selectedTab === 'posts' ? (
                            <PostAds theme={theme} taggedData={taggedData} setTaggedData={setTaggedData} />
                        ) : selectedTab === 'course' ? (
                            <CourseAds theme={theme} />
                        ) : selectedTab === 'shop' ? (
                            <ShopAds theme={theme} />
                        ) : selectedTab === 'others' ? (
                            <OtherAds theme={theme} />
                        ) : (null)}
                    </div>




                </div>

                <AdContainer
                    openSendPost={openSendPost}
                    closeSendPost={closeSendPost}
                    collectionName={collectionName}
                    taggedData={taggedData}
                    theme={theme}
                    selectedTab={selectedTab}
                />
            </Dialog>
        </>
    );
};


const PostAds = ({ theme, taggedData, setTaggedData }) => {
    const [input, setInput] = React.useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 3;
    const [searchResults, setSearchResults] = React.useState([])

    const useFetchMultipleLists = (resources) => {
        const dataProvider = useDataProvider();
        const [data, setData] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        useEffect(() => {
            const fetchResources = async () => {
                try {
                    const dataPromises = resources.map((resource) =>
                        dataProvider.getList(resource, {
                            pagination: { page: 1, perPage: 1000 },
                            sort: { field: 'id', order: 'ASC' },
                            filter: {},
                        })
                    );

                    const results = await Promise.all(dataPromises);
                    const combinedData = results.reduce((acc, { data }) => [...acc, ...data], []);
                    setData(combinedData);
                } catch (e) {
                    setError(e);
                } finally {
                    setLoading(false);
                }
            };

            fetchResources();
        }, [dataProvider, resources]);

        return { data, loading, error };
    };

    const tables = ["posts", "hauls", "lookbook", "diy", "grwm"];
    const { data } = useFetchMultipleLists(tables);

    const totalPages = Math.ceil(data?.length / ITEMS_PER_PAGE);


    // Effect to perform search when input or data changes
    React.useEffect(() => {
        if (input.trim() !== '') {
            // Filter data based on input
            const filteredData = data.filter(post =>
                post.body.toLowerCase().includes(input.toLowerCase()) ||
                post.name.toLowerCase().includes(input.toLowerCase())
            );
            setSearchResults(filteredData);
        } else {
            // If there's no input, show all data
            setSearchResults(data);
        }
    }, [input, data]);


    const handleClick = (newPage) => {
        setCurrentPage(newPage);
    };




    const search = (
        <svg className="absolute w-[17px] h-[20px] top-[50%] left-[1rem] translate-y-[-50%]" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M9.579 6.31004e-07C8.07976 0.000801964 6.60162 0.353313 5.26339 1.0292C3.92515 1.70509 2.76414 2.6855 1.87367 3.89164C0.9832 5.09778 0.38811 6.496 0.13623 7.97393C-0.115651 9.45185 -0.0172969 10.9683 0.423386 12.4013C0.86407 13.8343 1.63479 15.1439 2.6736 16.2249C3.71242 17.3059 4.99035 18.1281 6.40468 18.6255C7.81902 19.1229 9.33031 19.2815 10.8171 19.0886C12.3039 18.8957 13.7247 18.3567 14.9653 17.515L20.8883 23.4332C21.0528 23.6097 21.2512 23.7513 21.4716 23.8496C21.692 23.9478 21.93 24.0006 22.1713 24.0048C22.4126 24.0091 22.6522 23.9647 22.876 23.8743C23.0998 23.784 23.303 23.6494 23.4737 23.4788C23.6443 23.3081 23.7788 23.1049 23.8692 22.8811C23.9596 22.6574 24.004 22.4177 23.9997 22.1764C23.9955 21.9351 23.9426 21.6972 23.8444 21.4767C23.7462 21.2563 23.6046 21.0579 23.428 20.8934L17.5099 14.9704C18.489 13.5294 19.0568 11.8487 19.1522 10.1092C19.2476 8.36962 18.8671 6.63695 18.0515 5.09746C17.236 3.55798 16.0162 2.26991 14.5234 1.37177C13.0306 0.473622 11.3212 -0.000631453 9.579 6.31004e-07ZM3.58892 9.58412C3.58892 7.99545 4.22002 6.47185 5.34337 5.3485C6.46673 4.22514 7.99033 3.59404 9.579 3.59404C11.1677 3.59404 12.6913 4.22514 13.8146 5.3485C14.938 6.47185 15.5691 7.99545 15.5691 9.58412C15.5691 11.1728 14.938 12.6964 13.8146 13.8197C12.6913 14.9431 11.1677 15.5742 9.579 15.5742C7.99033 15.5742 6.46673 14.9431 5.34337 13.8197C4.22002 12.6964 3.58892 11.1728 3.58892 9.58412Z" fill="#7A7A7A" />
        </svg>
    );

    return (
        <>
            <div className='general search--box' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}>
                <input
                    className='search--input'
                    type='search'
                    placeholder='Search for posts'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                {search}
            </div>
            {(searchResults && searchResults.length > 0) && (
                <>
                    <Grid container className='pb-[1rem] gap-y-[20px] feed--page pt-[30px]' spacing='5px'>
                        {searchResults.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((post) => {
                            const mediaUrl = post.media[0]; // Get the URL of the single media fil
                            return (
                                <AdCard
                                    theme={theme}
                                    post={post}
                                    taggedData={taggedData}
                                    mediaUrl={mediaUrl}
                                    setTaggedData={setTaggedData}
                                />
                            )
                        })}
                    </Grid>

                    <div className=" mb-[1rem] float-right" style={{ color: theme === "light" ? "#222" : "#fff" }}>
                        <button disabled={currentPage === 1} style={{ backgroundColor: currentPage === 1 ? 'transparent' : '' }} className="px-[10px]" onClick={() => handleClick(currentPage - 1)}>
                            {'<'}
                        </button>
                        <span>
                            {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, data.length)} - {Math.min(currentPage * ITEMS_PER_PAGE, data.length)} of {data.length}
                        </span>
                        <button disabled={currentPage === totalPages} style={{ backgroundColor: currentPage === totalPages ? 'transparent' : '' }} className="px-[10px]" onClick={() => handleClick(currentPage + 1)}>
                            {'>'}
                        </button>
                    </div>
                </>
            )}


            <div className=' mt-[2rem] gap-x-4 flex overflow-x-scroll w-full store__card pb-[2rem]'>
                {taggedData && (
                    <TaggedVideoCard product={taggedData} theme={theme} />
                )}
            </div>
        </>
    );
};

const ShopAds = () => {
    return (
        <>
            Shop ads
        </>
    )
};

const CourseAds = () => {
    return (
        <>
            Course ads
        </>
    )
};

const OtherAds = () => {
    return (
        <>
            Other ads
        </>
    )
};
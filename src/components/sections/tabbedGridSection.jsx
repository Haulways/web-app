import {
    // LongTextInput,
    Chip, Stack, Box, Grid, useMediaQuery, InputAdornment,
} from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion"
import ImageCard from "../cards/imageCard";
import ImageTile from "../cards/imageTile";
import CenteredTab from "../tabs/centeredTab";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { ArrowOutwardOutlined, Search, BubbleChart, Campaign, MonetizationOn, Lightbulb, Security, Grading, Bolt, TrendingUp } from "@mui/icons-material";
import { container, item } from "../framer_utils";



const TabbedGridSection = (props) => {
    const { data, classes } = props;
    const isLarge = useMediaQuery((theme) => theme.breakpoints.down("lg"));
    const isMedium = useMediaQuery((theme) => theme.breakpoints.down("md"));
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    const _data = data ? (data) : ({
        subtitle: 'Subtitle',
        title: 'Title',
        tabData: {

        }

    });
    return (<section className={`services section ${classes}`} id="services">
        <span className="section-subtitle">{_data?.subtitle}</span>
        <h2 className="section-title">{_data?.title}</h2>

        <CenteredTab
            children={[
                {
                    label: "All",
                    child:
                        <div className="services section" style={{ paddingTop: '5px' }}>
                            <motion.div
                                variants={container}
                                initial="hidden"
                                animate="visible"
                                className="home__img"
                                style={{ maxWidth: '100%' }}
                            >
                                <Grid
                                    className="services__container gap-2rem"
                                    gridTemplateColumns={'repeat(auto-fit, minmax(157px, 1fr));'}
                                    rowGap={4}
                                    width={'100%'}
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                    display={'grid'}
                                    margin={0}
                                    my={2}



                                >
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Learn'} subtitle={"Elevate your skills with Our Skill Centre for powerful content and engagement."} icon={Lightbulb} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Earn'} subtitle={"Monetize your expertise by tutoring with us, connecting with audience."} icon={MonetizationOn} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Promote'} subtitle={"Boost your brand: Contribute to Our Skill Centre for exposure."} icon={Campaign} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Grow'} subtitle={"Propel your growth with pro insights for unstoppable progress."} icon={TrendingUp} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Learn'} subtitle={"Elevate your skills with Our Skill Centre for powerful content and engagement."} icon={Lightbulb} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Earn'} subtitle={"Monetize your expertise by tutoring with us, connecting with audience."} icon={MonetizationOn} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Promote'} subtitle={"Boost your brand: Contribute to Our Skill Centre for exposure."} icon={Campaign} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Grow'} subtitle={"Propel your growth with pro insights for unstoppable progress."} icon={TrendingUp} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Learn'} subtitle={"Elevate your skills with Our Skill Centre for powerful content and engagement."} icon={Lightbulb} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Earn'} subtitle={"Monetize your expertise by tutoring with us, connecting with audience."} icon={MonetizationOn} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Promote'} subtitle={"Boost your brand: Contribute to Our Skill Centre for exposure."} icon={Campaign} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Grow'} subtitle={"Propel your growth with pro insights for unstoppable progress."} icon={TrendingUp} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Learn'} subtitle={"Elevate your skills with Our Skill Centre for powerful content and engagement."} icon={Lightbulb} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Earn'} subtitle={"Monetize your expertise by tutoring with us, connecting with audience."} icon={MonetizationOn} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Promote'} subtitle={"Boost your brand: Contribute to Our Skill Centre for exposure."} icon={Campaign} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Grow'} subtitle={"Propel your growth with pro insights for unstoppable progress."} icon={TrendingUp} />

                                </Grid>
                            </motion.div>
                        </div>
                },
                {
                    label: "Ecommerce",
                    child:
                        <div className="services section" style={{ paddingTop: '5px' }}>
                            <motion.div
                                variants={container}
                                initial="hidden"
                                animate="visible"
                                className="home__img"
                                style={{ maxWidth: '100%' }}
                            >
                                <Grid
                                    className="services__container gap-2rem"
                                    gridTemplateColumns={'repeat(auto-fit, minmax(157px, 1fr));'}
                                    rowGap={4}
                                    width={'100%'}
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                    display={'grid'}
                                    margin={0}
                                    my={2}



                                >
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Learn'} subtitle={"Elevate your skills with Our Skill Centre for powerful content and engagement."} icon={Lightbulb} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Earn'} subtitle={"Monetize your expertise by tutoring with us, connecting with audience."} icon={MonetizationOn} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Promote'} subtitle={"Boost your brand: Contribute to Our Skill Centre for exposure."} icon={Campaign} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Grow'} subtitle={"Propel your growth with pro insights for unstoppable progress."} icon={TrendingUp} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Learn'} subtitle={"Elevate your skills with Our Skill Centre for powerful content and engagement."} icon={Lightbulb} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Earn'} subtitle={"Monetize your expertise by tutoring with us, connecting with audience."} icon={MonetizationOn} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Promote'} subtitle={"Boost your brand: Contribute to Our Skill Centre for exposure."} icon={Campaign} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Grow'} subtitle={"Propel your growth with pro insights for unstoppable progress."} icon={TrendingUp} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Learn'} subtitle={"Elevate your skills with Our Skill Centre for powerful content and engagement."} icon={Lightbulb} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Earn'} subtitle={"Monetize your expertise by tutoring with us, connecting with audience."} icon={MonetizationOn} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Promote'} subtitle={"Boost your brand: Contribute to Our Skill Centre for exposure."} icon={Campaign} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Grow'} subtitle={"Propel your growth with pro insights for unstoppable progress."} icon={TrendingUp} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Learn'} subtitle={"Elevate your skills with Our Skill Centre for powerful content and engagement."} icon={Lightbulb} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Earn'} subtitle={"Monetize your expertise by tutoring with us, connecting with audience."} icon={MonetizationOn} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Promote'} subtitle={"Boost your brand: Contribute to Our Skill Centre for exposure."} icon={Campaign} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Grow'} subtitle={"Propel your growth with pro insights for unstoppable progress."} icon={TrendingUp} />

                                </Grid>
                            </motion.div>
                        </div>
                },
                {
                    label: "AgroTech",
                    child:
                        <div className="services section" style={{ paddingTop: '5px' }}>
                            <motion.div
                                variants={container}
                                initial="hidden"
                                animate="visible"
                                className="home__img"
                                style={{ maxWidth: '100%' }}
                            >
                                <Grid
                                    className="services__container gap-2rem"
                                    gridTemplateColumns={'repeat(auto-fit, minmax(157px, 1fr));'}
                                    rowGap={4}
                                    width={'100%'}
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                    display={'grid'}
                                    margin={0}
                                    my={2}



                                >
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Learn'} subtitle={"Elevate your skills with Our Skill Centre for powerful content and engagement."} icon={Lightbulb} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Earn'} subtitle={"Monetize your expertise by tutoring with us, connecting with audience."} icon={MonetizationOn} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Promote'} subtitle={"Boost your brand: Contribute to Our Skill Centre for exposure."} icon={Campaign} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Grow'} subtitle={"Propel your growth with pro insights for unstoppable progress."} icon={TrendingUp} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Learn'} subtitle={"Elevate your skills with Our Skill Centre for powerful content and engagement."} icon={Lightbulb} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Earn'} subtitle={"Monetize your expertise by tutoring with us, connecting with audience."} icon={MonetizationOn} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Promote'} subtitle={"Boost your brand: Contribute to Our Skill Centre for exposure."} icon={Campaign} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Grow'} subtitle={"Propel your growth with pro insights for unstoppable progress."} icon={TrendingUp} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Learn'} subtitle={"Elevate your skills with Our Skill Centre for powerful content and engagement."} icon={Lightbulb} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Earn'} subtitle={"Monetize your expertise by tutoring with us, connecting with audience."} icon={MonetizationOn} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Promote'} subtitle={"Boost your brand: Contribute to Our Skill Centre for exposure."} icon={Campaign} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Grow'} subtitle={"Propel your growth with pro insights for unstoppable progress."} icon={TrendingUp} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Learn'} subtitle={"Elevate your skills with Our Skill Centre for powerful content and engagement."} icon={Lightbulb} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Earn'} subtitle={"Monetize your expertise by tutoring with us, connecting with audience."} icon={MonetizationOn} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Promote'} subtitle={"Boost your brand: Contribute to Our Skill Centre for exposure."} icon={Campaign} />
                                    <ImageCard img_width={'165px'} img_height={'140px'} tran_color={'var(--container-color)'} notch={'false'} title={'Grow'} subtitle={"Propel your growth with pro insights for unstoppable progress."} icon={TrendingUp} />

                                </Grid>
                            </motion.div>
                        </div>
                }
            ]}
        />

    </section>)

}

export default TabbedGridSection;
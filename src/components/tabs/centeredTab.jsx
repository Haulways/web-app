import {
    // LongTextInput,
    Chip, Stack, Box, Grid, useMediaQuery, InputAdornment, Tab, Tabs, Typography
} from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import { ArrowOutwardOutlined, Search, } from "@mui/icons-material";
import PropTypes from 'prop-types';
import { container } from "../framer_utils";

import { motion } from "framer-motion"

const CenteredTab = (props) => {
    const { children } = props
    const _children = children ? (children) : ([{ label: "Item One", child: "Item One" }, { label: "Item Two", child: "Item Two" }, { label: "Item Three", child: "Item Three" }]);
    const [value, setValue] = useState(0);

    function CustomTabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                style={{ width: '100%' }}
                {...other}
            >
                {value === index && (
                    <Stack sx={{ px: 1, py: 0 }}>
                        {/* <Typography></Typography> */}
                        {children}
                    </Stack>
                )}
            </div>
        );
    }

    CustomTabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            
        >
            <Stack justifyContent={'center'} alignItems={'center'} sx={{ width: '100%', bgcolor: 'transparent' }}>
                <Tabs value={value} onChange={handleChange} centered className="card"
                    sx={{
                        width: 'max-content',
                        height: 'max-content',
                        padding: '5px',
                        borderRadius: '30px',
                        background: 'var(--container-color)',

                        "& .Mui-selected": {
                            background: "rgba(25, 118, 210, 0.05)",
                            borderRadius: '30px',
                            color: '#1976d2 !important'

                        },
                        "& .MuiTab-root": {
                            padding: '4px 12px',
                            minHeight: '36px',
                            textTransform: 'none',
                            color: 'var(--text-color)',
                            transition: 'all .2s ease-in-out'
                        },
                        "& .MuiTabs-indicator": {
                            background: "transparent",
                        }
                    }}>
                    {_children ? (
                        _children.map((chld, index) => {
                            return <Tab label={_children[index]?.label} />
                        })
                    ) : (null)}
                </Tabs>
                {_children ? (
                    _children.map((chld, index) => {
                        return <CustomTabPanel value={value} index={index}>
                            {chld.child}
                        </CustomTabPanel>
                    })
                ) : (null)}
            </Stack>
        </motion.div>
    );
}

export default CenteredTab;
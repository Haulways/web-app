import React from 'react'
import { SearchDialog } from '../../components/search/SearchDialog';
import { InfiniteList } from 'react-admin';

const Search = () => {
    return (
        <>
            <InfiniteList resource='posts' actions={false} title='Explore'
                sx={{
                    '& .MuiToolbar-root': {
                        minHeight: '0px !important'
                    }
                }}
            >
                <SearchDialog />
            </InfiniteList>
        </>
    );
};

export default Search
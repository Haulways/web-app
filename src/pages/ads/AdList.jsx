import { InfiniteList, Show } from 'react-admin';
import { AdActions } from './AdActions';
import { AdCreateContent, AdListContent, AdShowContent } from './AdContent';




export const AdList = () => {

    return (

        <InfiniteList title='Ads' resource='ads' actions={<AdActions />}
            sx={{
                '& .MuiToolbar-root': {
                    minHeight: '0px !important',
                    backgroundColor: 'transparent !important',
                    color: '#fff'
                },
                '& .RaList-content': {
                    backgroundColor: 'transparent !important',
                    color: '#fff'
                        
                },
                backgroundColor: 'transparent !important',
                color: '#fff'
            }}
        >
            <AdListContent />
        </InfiniteList>
    );
};


export const AdCreate = () => { 
    return (
        <AdCreateContent/>
    )
};

export const AdEdit = () => (
    <>
    </>
);

export const AdShow = () => {
   
    return (
        <Show title=' ' actions={false}>
            <AdShowContent/>
        </Show>
    );
};
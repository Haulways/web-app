import { InfiniteList, Show } from 'react-admin';
import { CoursesActions } from './CoursesActions';
import { CoursesCreateContent, CoursesListContent, CoursesShowContent } from './CoursesContent';



export const CoursesList = () => {

    return (

        <InfiniteList title=' ' resource='courses' actions={<CoursesActions />}
            sx={{
                '& .MuiToolbar-root': {
                    minHeight: '0px !important'
                }
            }}
        >
       <CoursesListContent/>
    </InfiniteList>
    )
 

};


export const CoursesCreate = () => { 
    return (
        <CoursesCreateContent/>
    )
};

export const CoursesEdit = () => (
    <>
    </>
);

export const CoursesShow = () => {
   
    return (
        <Show title=' ' actions={false}>
            <CoursesShowContent/>
        </Show>
    );
};
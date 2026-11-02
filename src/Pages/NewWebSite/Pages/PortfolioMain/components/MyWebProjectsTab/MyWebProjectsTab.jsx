//React
import { useMemo } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Grid,
    Skeleton,
    Typography
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { useUserContext } from '../../PortfolioMain'
import { writeFilterObject } from '../../../../../../Helpers/filterData'
import useFetchData from '../../../../../../Helpers/customHooks/useFetchData'
import { fetchUserWebProject } from '../../../../../../Services/UserServices/Services/webProjectsUsersService'
import WebProjectCard from '../../../../Components/WebProjectCard/WebProjectCard'

//Styled Components
const StyledMyWebProjectsTab = styled(Grid)(
    () => ({
        width: '100%',
    })
)


const MyWebProjectsTab = () => {

    //fetch the user
    const {user} = useUserContext()

    const filters = useMemo(() => {
        return [
            writeFilterObject('user_id', 'string', '=', user?.id)
        ]
    }, [user])

    const {
        loading,
        data: webProjects,
        lastDataRecord
    } = useFetchData(fetchUserWebProject, 'all', filters)

    console.log(webProjects)
    return (
        <StyledMyWebProjectsTab container spacing={2}>
            {
                !loading 
                ?
                    webProjects && webProjects?.length > 0
                    ?
                        webProjects.map((project, key) => {
                            return (
                                <Grid ref={webProjects.length === key + 1 ? lastDataRecord : null} key={key} item xxs={12} xs={6} sm={4} >
                                    <WebProjectCard
                                        project={project}
                                    />
                                </Grid>
                        )
                        })
                    :
                    <Grid xxs={12}>
                        <Typography color={'info.main'}>
                            There are no projects.
                        </Typography>
                    </Grid>
                : 
                <>
                    <Grid  item xxs={12} xs={6} sm={3} md={3} lg={2} height={200}>
                        <Skeleton width='100%' height='100%'   />
                    </Grid>
                    <Grid  item xxs={12} xs={6} sm={3} md={3} lg={2} height={200}>
                        <Skeleton width='100%' height='100%'   />
                    </Grid>
                    <Grid  item xxs={12} xs={6} sm={3} lg={2} height={200}>
                        <Skeleton width='100%' height='100%'   />
                    </Grid>
                    <Grid  item xxs={12} xs={6} sm={3} md={3} lg={2} height={200}>
                        <Skeleton width='100%' height='100%'   />
                    </Grid>
                    <Grid  item xxs={12} xs={6} sm={3} md={3} lg={2} height={200}>
                        <Skeleton width='100%' height='100%'   />
                    </Grid>
                    <Grid  item xxs={12} xs={6} sm={3} md={3} lg={2} height={200}>
                        <Skeleton width='100%' height='100%'   />
                    </Grid>

                </>
            }
        </StyledMyWebProjectsTab>
    );
};

MyWebProjectsTab.propTypes = {
    children: propTypes.array
}

export default MyWebProjectsTab;
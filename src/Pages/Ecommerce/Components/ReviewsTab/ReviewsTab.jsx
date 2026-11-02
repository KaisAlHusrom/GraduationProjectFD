//React
import { Fragment, useMemo } from 'react'

import config from '../../../../../Config.json'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
    Divider,
    Typography,
    Skeleton,
    Avatar,
    Stack,
    Rating,
    Card,
    CardHeader,
    CardContent
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import DateHelper from '../../../../Helpers/DateHelper'
import useFetchData from '../../../../Helpers/customHooks/useFetchData'
import { fetchUserProductsReviews } from '../../../../Services/UserServices/Services/productReviewUsersSevice'
import { writeFilterObject } from '../../../../Helpers/filterData'
import { useParams } from 'react-router-dom'
import { usersProfileImagesFolderName } from '../../../../Services/AdminServices/Services/usersService'
import { navigatePortfolio } from '../../../../Helpers/navigations'

//Styled Components
const StyledReviewsTab = styled(Box)(
    ({ theme }) => ({
    
    })
)


const ReviewsTab = () => {

    const {idx: productId} = useParams()
    const filters = useMemo(() => {
        return [
            writeFilterObject('product_id', 'string', '=', productId)
        ]
    }, [productId])
    const {data: reviews, loading, lastDataRecord} = useFetchData(fetchUserProductsReviews, 'all', filters)
    return (
        <StyledReviewsTab style={{ position: 'static', height: '65vh' }}>
                <Divider />
                <Typography variant="h5" sx={{ paddingTop: 1, paddingBottom: 1 }}>
                    Reviews 
                </Typography>
                <Stack direction='column' gap={2}>

                
                {
                    !loading
                    ?
                        reviews && reviews.length > 0 
                        ?
                            reviews.map((review, index) => {
                                const creatorImagePath = `${config.ServerImageRoute}/${usersProfileImagesFolderName}/${review.user.profile_image}`;
                                const full_name = review.user.first_name + " " + review.user.last_name
                                return (
                                    <Card elevation={2} sx={{borderRadius: 4}} key={index} ref={reviews.length === index + 1 ? lastDataRecord : null}>
                                        <CardHeader
                                        onClick={() => navigatePortfolio(review.user.id)}
                                        sx={{
                                            cursor: 'pointer',
                                            transition: '0.2s',
                                            "&:hover" : {
                                                backgroundColor: theme => theme.palette.action.hover,
                                            }
                                        }}
                                        avatar={
                                            <Avatar src={creatorImagePath} sx={{ width: 32, height: 32 }} /> 
                                        }
                                        title={full_name}
                                        subheader={DateHelper.timeAgo(review.created_at)}
                                        />
                                    
                                        <CardContent sx={{padding: theme => `0 ${theme.spacing(2)}`}} >
                                            <Typography variant="body1" sx={{ paddingTop: 1, paddingBottom: 1 }}>
                                            {review.comment.split('\n').map((line, index) => (
                                                <Fragment key={index}>
                                                    {line}
                                                    <br />
                                                </Fragment>
                                            ))}
                                            </Typography>
                                            <Stack spacing={1}>
                                                <Divider />
                                                <Stack direction={'column'} gap={1} width={'100%'}>
                                                    <Typography
                                                        variant='h7'
                                                    >
                                                        Quality
                                                    </Typography>
                                                    <Rating 
                                                        name="quality" 
                                                        value={review.design_quality_rate} 
                                                        size='medium' 
                                                        readOnly
                                                    />                            
                                                    </Stack>
                                                <Stack direction={'column'} gap={1} width={'100%'}>
                                                    <Typography
                                                        variant='h7'
                                                    >
                                                        Ease of use
                                                    </Typography>
                                                    <Rating 
                                                        name="quality" 
                                                        value={review.ease_of_use_rate} 
                                                        size='medium' 
                                                        readOnly
                                                    />                            
                                                </Stack>
                                                <Stack direction={'column'} gap={1} width={'100%'}>
                                                    <Typography
                                                        variant='h7'
                                                    >
                                                        Communication
                                                    </Typography>
                                                    <Rating 
                                                        name="quality" 
                                                        value={review.communication_rate} 
                                                        size='medium' 
                                                        readOnly
                                                    />                            
                                                </Stack>
                                            </Stack>
                                        </CardContent>
                                    

                                    
                                    </Card>
                                )
                            })
                        :null
                    : (
                        <>
                            <Skeleton component={'div'} width={'100%'} height={200} />
                            <Skeleton component={'div'} width={'100%'} height={200} />
                            <Skeleton component={'div'} width={'100%'} height={200} />
                        </>
                    )
                }
                </Stack>
        </StyledReviewsTab>
    );
};

ReviewsTab.propTypes = {
    children: propTypes.array
}

export default ReviewsTab;
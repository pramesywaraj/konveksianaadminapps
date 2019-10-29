import React from 'react';

import { makeStyles } from "@material-ui/core/styles";

import ReviewCard from './ReviewCard';

const useStyles = makeStyles({
    empty: {
        width: '100%',
        color: '#cfcfcf',
        textAlign: 'center'
    }
});

export default function ReviewList(props) {
    const reviewsObject = props.reviews;
    const classes = useStyles();

    return (
        <div>
            {reviewsObject.length > 0 ? reviewsObject.map(
                review => (
                    <ReviewCard 
                        key={review._id}
                        reviewData={review} 
                    />
                )
            )
            :
                <div className={classes.empty}>
                    <h3>Tidak ada review yang dapat ditampilkan.</h3>
                </div>
            }
        </div>
    )
}

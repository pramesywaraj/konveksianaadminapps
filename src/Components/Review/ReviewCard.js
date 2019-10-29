import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
// import Grid from "@material-ui/core/Grid";

import Rating from "@material-ui/lab/Rating";


const useStyles = makeStyles({
    card: {
        minWidth: 275,
        marginTop: 10
    },
    title: {
        fontSize: 20,
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    contentStart: {
        width: '100%'
    },
    contentEnd: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%'
    }
});

export default function ReviewCard(props) {
    const classes = useStyles();
    const review = props.reviewData;

    return (
        <Card className={classes.card}>
            <div className={classes.flexContainer}>
                <CardContent className={classes.contentStart}>
                    <Typography
                        className={classes.title}
                        color="textPrimary"
                        
                    >
                        {review.user.name}
                    </Typography>
                    <Typography
                        color="textSecondary"
                        
                    >
                        {review.description}
                    </Typography>
                </CardContent>
                <CardContent className={classes.contentEnd}>
                    <Rating value={review.rating > 5 ? 5 : review.rating} readOnly />
                </CardContent>
            </div>
        </Card>
    );
}

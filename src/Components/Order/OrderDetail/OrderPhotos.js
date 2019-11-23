import React from 'react';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(
    (theme) => ({
        root: {
            width: '100%',
            marginTop: theme.spacing(1),
            overflowX: 'auto',
        },

        imageContainer: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'space-evenly',
            padding: 30
        }

    })
)

export default function OrderPhotos() {
    const classes = styles();

    return (
        <Paper className={classes.root}>
            <div className={classes.imageContainer}>
                <img src='http://via.placeholder.com/200x200' />
            </div>
        </Paper>
    )
}

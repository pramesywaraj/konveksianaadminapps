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
        },
        image: {
            width: 200,
            height: 200
        }

    })
)

export default function OrderPhotos() {
    const classes = styles();

    return (
        <Paper className={classes.root}>
            <div className={classes.imageContainer}>
                <img 
                    className={classes.image}
                    alt="Gambar Tampak Desain Pengguna" 
                    src={require('../../../Assets/konveksiana-logo.svg')} 
                />
            </div>
        </Paper>
    )
}

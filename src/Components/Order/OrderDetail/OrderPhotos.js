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
            cursor: "pointer",
            display: "block",
            width: 200,
            height: 200
        }

    })
)

export default function OrderPhotos({photos}) {
    const classes = styles();

    return (
        <Paper className={classes.root}>
            <div className={classes.imageContainer}>
                {photos.length === 0 && 
                    (
                        <img
                            width="200"
                            height="200"
                            alt="Konveksiana"
                            src={require('../../../Assets/konveksiana-logo.svg')}
                        />
                    )
                }
                {photos.map((photo, index) => (
                    <img 
                        onClick={() => window.open(`https://endpoint.konveksiana.id/${photo}`, "_blank")}
                        key={index}
                        className={classes.image}
                        alt="Gambar Tampak Desain Pengguna" 
                        src={`https://endpoint.konveksiana.id/${photo}`} 
                    />
                ))}
            </div>
        </Paper>
    )
}

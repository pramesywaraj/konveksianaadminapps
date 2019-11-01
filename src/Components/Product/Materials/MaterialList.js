import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import AddIcon from '@material-ui/icons/Add';

import MaterialCard from './MaterialCard';

const styles = makeStyles(
    (theme) => ({
        paper: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
            overflow: 'hidden',
            height: 245,
            maxHeight: 250
        },

        contentLayout: {
            overflow: 'auto',
            height: 245,
            '&::-webkit-scrollbar': { 
                display: 'none'
            } 
        },

        marginTop10: {
            marginTop: 10
        }
    })
)

export default function MaterialList(props) {
    const classes = styles();


    return (
        <Paper className={[classes.paper, classes.marginTop10].join(' ')}>
            <Box display='flex' flexDirection='row-reverse'>
                <Button variant="contained" color="primary" >
                    <AddIcon />
                    Tambah Material
                </Button>
            </Box>
            {/* Material */}
            <div className={classes.contentLayout}>
                <MaterialCard />
            </div>
        </Paper>
    )
}

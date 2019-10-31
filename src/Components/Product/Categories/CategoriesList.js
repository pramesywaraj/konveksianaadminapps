import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import AddIcon from '@material-ui/icons/Add';
import CategoryCard from './CategoryCard';

const styles = makeStyles(
    (theme) => ({
        paper: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
            overflow: 'hidden',
            height: 500,
            maxHeight: 500
        },

        contentLayout: {
            overflow: 'auto',
            height: 500,
            '&::-webkit-scrollbar': { 
                display: 'none'
            } 
        }

        
    })
)

export default function CategoriesList(props) {
    const classes = styles();


    return (
        <Paper className={classes.paper}>
            <Box display='flex' flexDirection='row-reverse'>
                <Button variant="contained" color="primary" >
                    <AddIcon />
                    Tambah Kategori
                </Button>
            </Box>
            {/* Categories */}
            <div className={classes.contentLayout}>
                <CategoryCard />
            </div>
        </Paper>
    )
}
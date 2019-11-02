import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CategoryCard from './CategoryCard';
import Typography from '@material-ui/core/Typography';

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
        },
        progress: {
            margin: theme.spacing(2),
        },
        
    })
)

export default function CategoriesList(props) {
    const classes = styles();
    const [loading, setLoading] = useState(true);
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        setLoading(true)
        setCategoryData(props.categories);

        setTimeout(() => {
            setLoading(false);
        }, 2000)

    }, [props.categories]);

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
                {loading ? (
                    <CircularProgress className={classes.progress} />
                ) : (
                    categoryData.length > 0 ? categoryData.map(
                        (category) => (
                            <CategoryCard 
                                key={category._id}
                                name={category.name}
                                onClicked={() => props.onClickCard(category._id)}
                            />
                        )
                    )
                    :
                        <Typography>Tidak ada Category untuk ditampilkan.</Typography>
                    )
                }
                
                    

            </div>
        </Paper>
    )
}

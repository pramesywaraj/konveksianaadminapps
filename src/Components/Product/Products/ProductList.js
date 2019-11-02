import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import ProductCard from './ProductCard';

import {productService} from '../../../Services/productService';


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

        progress: {
            margin: theme.spacing(2),
        },
    })
)

export default function ProductList(props) {
    const classes = styles();
    const [loading, setLoading] = useState(false);
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        setLoading(true);

        productService.getProduct(props.categoryId)
            .then((res) => {
                setLoading(false);
                setProductData(res.data.product);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            })

    }, [props.categoryId])

    return (
        <Paper className={classes.paper}>
            <Box display='flex' flexDirection='row-reverse'>
                <Button variant="contained" color="primary" >
                    <AddIcon />
                    Tambah Produk
                </Button>
            </Box>
            {/* Categories */}
            <div className={classes.contentLayout}>
                {loading ? (
                    <CircularProgress className={classes.progress} />
                ) : (
                    productData ? (
                        productData.map((product) => (
                            <ProductCard key={product._id} />
                        ))
                    )
                    :
                       ( <p>Tidak ada produk untuk ditampilkan.</p>)
                )}
            </div>
        </Paper>
    )
}

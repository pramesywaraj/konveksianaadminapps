import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import ProductCard from './ProductCard';
import Typography from '@material-ui/core/Typography';

import {productService} from '../../../Services/productService';


const styles = makeStyles(
    (theme) => ({
        paper: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
            overflow: 'auto',
            height: 245,
            maxHeight: 250,
            '&::-webkit-scrollbar': { 
                display: 'none'
            } 
        },

        contentLayout: {
            overflow: 'scroll',
            height: 'inherit',
            '&::-webkit-scrollbar': { 
                display: 'none'
            } 
        },

        progress: {
            margin: theme.spacing(2),
        },

        marginTop20: {
            marginTop: 20
        }
    })
)

export default function ProductList(props) {
    const classes = styles();
    const [loading, setLoading] = useState(false);
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        setLoading(true);

        if(props.categoryId !== '') {
            productService.getProduct(props.categoryId)
            .then((res) => {
                if(res.data.product !== [] || res.data.product.length > 0) {
                    setLoading(false);
                    setProductData(res.data.product);
                }
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
        } else {
            setLoading(false);
        }
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
                    productData.length > 0 ? (
                        productData.map((product) => (
                            <ProductCard 
                                key={product._id} 
                                product={product}
                                onClicked={() => props.onSelectProduct(product._id)}    
                            />
                        ))
                    )
                    :
                       ( 
                            <Typography 
                                align='center'
                                className={classes.marginTop20}
                            >
                                Tidak ada produk untuk ditampilkan.
                            </Typography> 
                        )
                )}
            </div>
        </Paper>
    )
}

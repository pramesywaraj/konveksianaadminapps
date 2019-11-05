import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import MaterialCard from './MaterialCard';
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
        },

        marginTop10: {
            marginTop: 10
        }
    })
)

function Loading() {
    const classes = styles();
    return (
        <CircularProgress className={classes.progress} />
    )
}

function MaterialMap(props) {
    const classes = styles();
    let materials = props.materialData;

    if(materials.length > 0) {
        return (
            materials.map((material) => (
                <MaterialCard key={material._id} material={material}/>
            ))
            
        )
    } else {
        return (
            <Typography 
                align='center'
                className={classes.marginTop20}
            >
                Tidak ada material untuk ditampilkan.
            </Typography>
        )
    }
}

export default function MaterialList(props) {
    const classes = styles();
    const [loading, setLoading] = useState(false);
    const [materialData, setMaterialData] = useState([]);

    useEffect(() => {
        setLoading(true);
        let temp = [];

        productService.getMaterial(props.productId)
            .then((res) => {
                temp.push(res.data.material);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
        
        setMaterialData(temp);
        setLoading(false);

    }, [props.productId])

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
                {/* {loading ? (
                        <CircularProgress className={classes.progress} />
                    ) : (
                        materialData.length > 0 ? (
                            materialData.map((material) => (
                                <MaterialCard key={material._id} material={material}/>
                            ))
                        )
                        :
                        ( 
                                <Typography 
                                    align='center'
                                    className={classes.marginTop20}
                                >
                                    Tidak ada material untuk ditampilkan.
                                </Typography> )
                )} */}
                {loading ? (
                        <Loading />
                    ) : (
                        <MaterialMap materialData={materialData}/>
                    )
                }
            </div>
        </Paper>
    )
}

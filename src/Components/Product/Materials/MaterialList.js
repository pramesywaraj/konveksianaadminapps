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

        marginTop20: {
            marginTop: 20
        },

        marginTop10: {
            marginTop: 10
        }
    })
)

export default function MaterialList(props) {
    const classes = styles();
    const [loading, setLoading] = useState(false);
    const [materialData, setMaterialData] = useState([]);

    useEffect(() => {
        setLoading(true);

        productService.getMaterial(props.productId)
            .then((res) => {
                setLoading(false);
                setMaterialData(res.data.material);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            })

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
                {loading ? (
                        <CircularProgress className={classes.progress} />
                    ) : (
                        materialData ? (
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
                )}
            </div>
        </Paper>
    )
}

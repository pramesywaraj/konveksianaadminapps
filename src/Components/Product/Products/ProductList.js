import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import ProductCard from './ProductCard';
import Typography from '@material-ui/core/Typography';
import CustomModal from '../../OtherComponent/CustomModal';
import CustomSnackbar from '../../OtherComponent/CustomSnackbar';
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
            margin: '10% auto',
            display: 'table'
        },

        marginTop20: {
            marginTop: 20
        },

        submitButton: {
            margin: theme.spacing(1),
            float: 'right',
        },

        formField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: "100%"
        },
    })
)

const ProductModal = (props) => {
    const classes = styles();

    function submitHandler(e) {
        e.preventDefault();
    }
 
    return (
        <CustomModal 
            modal={props.modal}
            handleClose={props.onModalClose}
        >
            <form autoComplete="off" onSubmit={submitHandler}>
                <TextField
                    label="Nama"
                    name="name"
                    className={classes.formField}
                    value={props.newProduct.name}
                    margin="normal"
                    variant="outlined"
                    onChange={props.handleNewProductChange}
                />
                <Button 
                    variant="contained" 
                    size="medium" 
                    color="primary" 
                    className={classes.submitButton}
                    onClick={props.onSubmitNewProduct}
                >
                    Simpan
                </Button>
            </form>
        </CustomModal>
    )
}

export default function ProductList(props) {
    const classes = styles();
    const [loading, setLoading] = useState(false);
    const [dataUpdate, setUpdate] = useState(false); // Parameter for controlling useEffect when updating the data
    const [productData, setProductData] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        categoryId: ''
    }); 
    const [modal, setModalOpenClose] = useState(false);
    const [snackbar, setSnackbarState] = useState({
        open: false,
        message: '',
        isSuccess: false
    });

    const fetchData = () => {
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
    }

    // if categoryId change
    useEffect(() => {
        setLoading(true);
        console.log('Mounted');
        if(props.categoryId !== '') {
            fetchData();
        } else {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.categoryId]);

    // Effect working when update the data
    useEffect(() => {
        if(dataUpdate) {
            setLoading(true);
            fetchData();
            setUpdate(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataUpdate]);

    const handleNewProductChange = (e) => {
        setNewProduct({
            categoryId: props.categoryId,
            [e.target.name]: e.target.value
        })
    }

    const handleModalOpen = () => {
        if(props.categoryId === '' || props.categoryId === null || props.categoryId === undefined) {
            alert('Silahkan pilih Kategori terlebih dahulu sebelum membuat jenis produk baru!');
        } else {
            setModalOpenClose(true);
        }
    }

    const handleModalClose = () => {
        setModalOpenClose(false);
    }

    function snackBarOpenAction(isSuccess, message) {
        setSnackbarState({
            open: true,
            message: message,
            isSuccess: isSuccess
        });
    }
    
    const handleSnackbarClose = () => {
        setSnackbarState({
            ...snackbar,
            open: false,
            message: ''        
        })
    }

    const submitNewProduct = () => {
        if(newProduct.name === '' && newProduct.categoryId === '') {
            snackBarOpenAction(false, 'Silahkan mengisi form terlebih dahulu.');
            return;
        } else {
            productService.postNewProduct(newProduct)
                .then((res) => {
                    console.log(res);
                    if(res.status === 201) {
                        snackBarOpenAction(true, 'Berhasil membuat jenis Produk baru.');
                        handleModalClose();
                        setUpdate(true);
                    } else if(res.data.errors) {
                        snackBarOpenAction(false, 'Terjadi kesalahan ketika membuat data.');
                        handleModalClose();
                    }
                })
                .catch((err) => {
                    console.log(err);
                    snackBarOpenAction(false, 'Terjadi kesalahan ketika membuat data.');
                    handleModalClose();
                })
        }

        setNewProduct({
            name: '',
            categoryId: ''
        })
    }

    const handleDelete = (id, name) => {
        let confirm = window.confirm(`Apakah Anda yakin untuk menghapus jenis Produk ${name}?`);
        setLoading(true);

        if(confirm) {
            productService.deleteProduct(id)
                .then((res) => {
                    if(res.status === 201) {
                        // Manipulate the array when deleting the data
                        // let newProductData = productData.filter(category => category._id !== id);
                        // setProductData(newProductData);
                        setLoading(false);
                        snackBarOpenAction(true, `${name} berhasil dihapus.`);
                        setUpdate(true);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    snackBarOpenAction(false, 'Terjadi kesalahan saat menghapus data.');
                    setLoading(false);
                })
        }
        
    }


    return (
        <React.Fragment>

        <Paper className={classes.paper}>
            <Box display='flex' flexDirection='row-reverse'>
                <Button 
                variant="contained" 
                color="primary" 
                onClick={handleModalOpen}
                >
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
                        productData.map((product) => {
                            let selected = props.selected;
                            return (
                                <ProductCard 
                                    key={product._id} 
                                    id={product._id}
                                    selected={selected}
                                    product={product}
                                    onClicked={() => props.onSelectProduct(product._id)}
                                    onDelete={() => handleDelete(product._id, product.name)}    
                                />
                            )
                        }
                           
                        )
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
        <ProductModal 
            newProduct={newProduct}
            handleNewProductChange={handleNewProductChange}
            onSubmitNewProduct={submitNewProduct}
            modal={modal}
            onModalClose={handleModalClose}
        />
        <CustomSnackbar 
            snackbar={snackbar.open}
            close={handleSnackbarClose}
            isSuccess={snackbar.isSuccess}
            message={snackbar.message}
        />
        </React.Fragment>
    )
}

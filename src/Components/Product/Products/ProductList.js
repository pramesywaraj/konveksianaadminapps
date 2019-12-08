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
import axios from 'axios';
import config from '../../../Services/config';


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

const ProductModal = ({modal, onModalClose, onSubmitNewProduct, onSubmitEditProduct, handleNewProductChange, isEdit, newProduct}) => {
    const classes = styles();

    function submitHandler(e) {
        e.preventDefault();
    }
 
    return (
        <CustomModal 
            modal={modal}
            handleClose={onModalClose}
        >
            <form autoComplete="off" onSubmit={submitHandler}>
                <TextField
                    label="Nama"
                    name="name"
                    className={classes.formField}
                    value={newProduct.name}
                    margin="normal"
                    variant="outlined"
                    onChange={handleNewProductChange}
                />
                <Button 
                    variant="contained" 
                    size="medium" 
                    color="primary" 
                    className={classes.submitButton}
                    onClick={isEdit ? onSubmitEditProduct : onSubmitNewProduct}
                >
                    Simpan
                </Button>
            </form>
        </CustomModal>
    )
}

export default function ProductList(props) {
    const classes = styles();
    const [loading, setLoading] = useState(true);
    const [submittedNewProduct, setNewSubmittedProduct] = useState(null);
    const [deletedProductId, setDeletedProductId] = useState(null);
    const [editProduct, setEditProduct] = useState({
        status: false,
        id: ''
    });
    const [productData, setProductData] = useState({
        products: null
    });
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

      // if categoryId change
    useEffect(() => {
        if(props.categoryId === '') {
            setLoading(false);
            setProductData({
                products: null
            })
            return;
        } 

        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.categoryId]);

    // Effect working when adding new data
    useEffect(() => {
        if(submittedNewProduct !== null) {
            setProductData({
                products: productData.products.concat(submittedNewProduct)
            });

            setLoading(false);
        
            handleModalClose();
        
            setNewProduct({
                name: '',
                categoryId: ''
            });
        }

        return () => {
            setDeletedProductId(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submittedNewProduct, setNewSubmittedProduct]);

    // This effect is for deleting an object
    useEffect(() => {
        // Manipulate the array when deleting the data
        if(deletedProductId !== null) {
            let newProductData = productData.products.filter(product => product._id !== deletedProductId);
            setProductData({
                products: newProductData
            })
        }

        setLoading(false);

        return () => {
            setDeletedProductId(null);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deletedProductId, setDeletedProductId])

    const fetchData = async () => {
        await productService.getProduct(props.categoryId)
            .then((res) => {
                let sortedProduct = res.data.product;
                sortedProduct.sort((first, second) => {
                    let firstOrder = first.name.toUpperCase();
                    let secondOrder = second.name.toUpperCase();
                    if(firstOrder < secondOrder) {
                        return -1;
                    }

                    if(firstOrder > secondOrder) {
                        return 1;
                    }

                    return 0;
                })

                setProductData({
                    products: sortedProduct
                });
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                snackBarOpenAction(false, `Terjadi kesalahan dalam pengambilan data Produk.`);
                setLoading(false);
            });        
    }

    const handleNewProductChange = (e) => {
        e.preventDefault();
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

    const submitNewProduct = async () => {
        if(newProduct.name === '' && newProduct.categoryId === '') {
            snackBarOpenAction(false, 'Silahkan mengisi form terlebih dahulu.');
            return;
        }

        setLoading(true);

        await productService.postNewProduct(newProduct)
            .then((res) => {
                if(res.data.errors || res.status !== 201) {
                    snackBarOpenAction(false, 'Terjadi kesalahan ketika membuat data.');
                    handleModalClose();
                    return;
                }

                const submittedNewProduct = {  
                    _id: res.data.product._id,
                    name: newProduct.name,
                    material: [],
                    category: newProduct.categoryId
                }
                snackBarOpenAction(true, `Berhasil menambahkan Produk baru.`);
                setNewSubmittedProduct(submittedNewProduct);
            })
            .catch((err) => {
                console.log(err);
                snackBarOpenAction(false, 'Terjadi kesalahan ketika membuat data.');
                handleModalClose();
            })
    }

    const submitEditProduct = async () => {
        setLoading(true);
        try {
            // we do in immutable way
            let temp = newProduct;
            let editProductPayload = temp;

            const response = await axios.put(`${config.baseUrl}product/${editProduct.id}`, editProductPayload, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            });

            let changedObjectIndex = productData.products.findIndex(item => item._id === editProduct.id);
            productData.products[changedObjectIndex].name = editProductPayload.name;

            setEditProduct({
                status: false,
                id: ''
            });
    
            setNewProduct({
                ...newProduct,
                name: ''        
            });
            handleModalClose();
            snackBarOpenAction(true, `Berhasil mengubah produk.`);
        }
        catch (err) {
            console.log(err);
            snackBarOpenAction(false, `Telah terjadi kesalahan, gagal mengubah produk.`);
        }

        setLoading(false);
    }

    const handleEdit = (id, name) => {
        setEditProduct({
            status: true,
            id: id
        });

        setNewProduct({
            ...newProduct,
            name: name        
        });

        handleModalOpen();
    }

    const handleDelete = async (id, name) => {
        let confirm = window.confirm(`Apakah Anda yakin untuk menghapus jenis Produk ${name}?`);

        if(!confirm) return;

        setLoading(true);

        await productService.deleteProduct(id)
        .then((res) => {
            if(res.data.errors || res.status !== 201) {
                snackBarOpenAction(false, 'Terjadi kesalahan ketika menghapus data.');
                handleModalClose();
                return;
            }
            
            snackBarOpenAction(true, `${name} berhasil dihapus.`);
            setDeletedProductId(id);
        })
        .catch((err) => {
            console.log(err);
            snackBarOpenAction(false, 'Terjadi kesalahan saat menghapus data.');
            setLoading(false);
        })
        
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
                ) :
                    productData.products !== null && productData.products.length > 0 ? (
                        productData.products.map((product) => {
                            let selected = props.selected;
                            return (
                                <ProductCard 
                                    key={product._id} 
                                    id={product._id}
                                    selected={selected}
                                    product={product}
                                    onClicked={() => props.onSelectProduct(product._id)}
                                    onDelete={() => handleDelete(product._id, product.name)}
                                    onEdit={() => handleEdit(product._id, product.name) }
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
                }
            </div>
        </Paper>
        <ProductModal 
            newProduct={newProduct}
            handleNewProductChange={handleNewProductChange}
            isEdit={editProduct.status}
            onSubmitNewProduct={submitNewProduct}
            onSubmitEditProduct={submitEditProduct}
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

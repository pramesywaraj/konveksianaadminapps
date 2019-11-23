import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import MaterialCard from './MaterialCard';
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
            margin: theme.spacing(2),
        },

        marginTop20: {
            marginTop: 20
        },

        marginTop10: {
            marginTop: 10
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

const MaterialModal = (props) => {
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
                    value={props.newMaterial.name}
                    margin="normal"
                    variant="outlined"
                    onChange={props.handleNewMaterialChange}
                />
                <TextField
                    label="Harga Material Perkiraan"
                    name="priceMargin"
                    className={classes.formField}
                    value={props.newMaterial.priceMargin}
                    margin="normal"
                    type="number"
                    variant="outlined"
                    onChange={props.handleNewMaterialChange}
                />
                <Button 
                    variant="contained" 
                    size="medium" 
                    color="primary" 
                    className={classes.submitButton}
                    onClick={props.onSubmitNewMaterial}
                >
                    Simpan
                </Button>
            </form>
        </CustomModal>
    )
}

function Loading() {
    const classes = styles();
    return (
        <CircularProgress className={classes.progress} />
    )
}

function MaterialMap({materials, handleDelete}) {
    const classes = styles();

    if(materials !== null && materials.length > 0) {
        return (
            materials.map((material) => (
                <MaterialCard 
                    key={material._id} 
                    material={material} 
                    handleDelete={() => handleDelete(material._id, material.name)}
                />
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
    const [loading, setLoading] = useState(true);
    const [submittedNewMaterial, setSubmittedNewMaterial] = useState(null);
    const [deletedMaterialId, setDeletedMaterialId] = useState(null);
    const [materialData, setMaterialData] = useState({
        materials: null
    });
    const [newMaterial, setNewMaterial] = useState({
        name: '',
        priceMargin: '',
        productId: ''
    }); 
    const [modal, setModalOpenClose] = useState(false);
    const [snackbar, setSnackbarState] = useState({
        open: false,
        message: '',
        isSuccess: false
    });

    useEffect(() => {
        if(props.productId !== '') {
            fetchData();
        } else {
            setLoading(false);
        }
        // This comment was made for prevent warning to showed up
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.productId]);

    // Effect working when update the data
    useEffect(() => {
        if(submittedNewMaterial !== null) {
            setMaterialData({
                materials: materialData.materials.concat(submittedNewMaterial)
            });

            setLoading(false);
        
            handleModalClose();
        
            setNewMaterial({
                name: '',
                priceMargin: '',
                productId: ''
            });
        }

        return () => {
            setSubmittedNewMaterial(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submittedNewMaterial, setSubmittedNewMaterial]);

    useEffect(() => {
        if(deletedMaterialId !== null) {
            let newMaterialData = materialData.materials.filter(material => material._id !== deletedMaterialId);
            setMaterialData({
                materials: newMaterialData
            })
            setLoading(false);
        }

        return () => {
            setDeletedMaterialId(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deletedMaterialId, setDeletedMaterialId]);

    const fetchData = async () => {
        await productService.getMaterial(props.productId)
        .then((res) => {
            if(res.status !== 200) {
                snackBarOpenAction(false, 'Terjadi kesalahan ketika memuat data.');
                return;
            }

            setMaterialData({
                materials: res.data.material
            });
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            snackBarOpenAction(false, 'Terjadi kesalahan ketika memuat data.');
            setLoading(false);
        });
    }

    const submitNewMaterial = async () => {
        if(newMaterial.name === '' && newMaterial.productId === '' && newMaterial.priceMargin === '') {
            snackBarOpenAction(false, 'Silahkan mengisi form terlebih dahulu.');
            return;
        }

        await productService.postNewMaterial(newMaterial)
            .then((res) => {
                if(res.data.errors || res.status !== 201) {
                    snackBarOpenAction(false, 'Terjadi kesalahan ketika membuat data.');
                    handleModalClose();
                    return;
                }

                const submittedNewMaterial = {  
                    _id: res.data.material._id,
                    name: newMaterial.name,
                    priceMargin: newMaterial.priceMargin,
                    product: newMaterial.productId
                }
                snackBarOpenAction(true, `Berhasil menambahkan Produk baru.`);
                setSubmittedNewMaterial(submittedNewMaterial);
            })
            .catch((err) => {
                console.log(err);
                snackBarOpenAction(false, 'Terjadi kesalahan ketika membuat data.');
                handleModalClose();
            })
    }

    const handleDelete = async (id, name) => {
        let confirm = window.confirm(`Apakah Anda yakin untuk menghapus jenis Material ${name}?`);

        if(!confirm) return;
        
        setLoading(true);
        await productService.deleteMaterial(id)
            .then((res) => {
                if(res.data.errors || res.status !== 201) {
                    snackBarOpenAction(false, 'Terjadi kesalahan ketika menghapus data.');
                    handleModalClose();
                    return;
                }
                snackBarOpenAction(true, `${name} berhasil dihapus.`);
                setDeletedMaterialId(id);
            })
            .catch((err) => {
                console.log(err);
                snackBarOpenAction(false, 'Terjadi kesalahan saat menghapus data.');
                setLoading(false);
            })
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

    const handleModalOpen = () => {
        if(props.productId === '' || props.productId === null || props.productId === undefined) {
            alert('Silahkan pilih Kategori terlebih dahulu sebelum membuat jenis produk baru!');
        } else {
            setModalOpenClose(true);
        }
    }

    const handleNewMaterialChange = (e) => {
        setNewMaterial({
            ...newMaterial,
            productId: props.productId,
            [e.target.name]: e.target.value
        })
    }

    return (
        <React.Fragment>
            <Paper className={[classes.paper, classes.marginTop10].join(' ')}>
                <Box display='flex' flexDirection='row-reverse'>
                    <Button variant="contained" color="primary" onClick={handleModalOpen}>
                        <AddIcon />
                        Tambah Material
                    </Button>
                </Box>
                {/* Material */}
                <div className={classes.contentLayout}>
                    {loading ? (
                            <Loading />
                        ) : (
                            <MaterialMap 
                                materials={materialData.materials}
                                handleDelete={handleDelete}
                            />
                        )
                    }
                </div>
            </Paper>
            <MaterialModal 
                newMaterial={newMaterial}
                handleNewMaterialChange={handleNewMaterialChange}
                onSubmitNewMaterial={submitNewMaterial}  
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

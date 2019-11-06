import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CategoryCard from './CategoryCard';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CustomModal from '../../OtherComponent/CustomModal';
import CustomSnackbar from '../../OtherComponent/CustomSnackbar';
import { productService } from '../../../Services/productService';

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

        formField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: "100%"
        },
    
        button: {
            margin: theme.spacing(1),
        },

        submitButton: {
            margin: theme.spacing(1),
            float: 'right',
        },
    
        
    })
)

const CategoryModal = (props) => {
    const classes = styles();
 
    return (
        <CustomModal 
            modal={props.modal}
            handleClose={props.onModalClose}
        >
            <form autoComplete="off" >
                <TextField
                    label="Nama"
                    name="name"
                    className={classes.formField}
                    value={props.newCategory.name}
                    margin="normal"
                    variant="outlined"
                    onChange={props.handleNewCategoryChange}
                />
                <Button 
                    variant="contained" 
                    size="medium" 
                    color="primary" 
                    className={classes.submitButton}
                    onClick={props.onSubmitNewCategory}
                >
                    Simpan
                </Button>
            </form>
        </CustomModal>
    )
}

export default function CategoriesList(props) {
    const classes = styles();
    const [loading, setLoading] = useState(true);
    const [categoryData, setCategoryData] = useState([]);
    const [modal, setModalOpenClose] = useState(false);
    const [snackbar, setSnackbarState] = useState({
        open: false,
        message: '',
        isSuccess: false
    });
    
    // state for the form 
    const [newCategory, setCategory] = useState({
        name: '',
    });

    const handleNewCategoryChange = (e) => setCategory({
        [e.target.name]: e.target.value
    });

    const handleModalOpen = (message) => {
        setModalOpenClose(true);
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
            open: false,
            message: '',
            isSuccess: false
        })
    }

    const submitNewCategory = () => {
        if(newCategory.name === '' || newCategory.name === null || newCategory.name === undefined) {
            snackBarOpenAction(false, 'Silahkan mengisi form terlebih dahulu.');
        } else {
            productService.postNewCategory(newCategory)
                .then((res) => {
                    if(res.status === 201) {
                        snackBarOpenAction(true, 'Berhasil membuat jenis Kategori baru.');
                        handleModalClose();
                    }
                })
                .catch((err) => {
                    console.log(err);
                    snackBarOpenAction(false, 'Terjadi kesalahan ketika membuat data.');
                })
        }
    }

    useEffect(() => {
        setLoading(true)
        setCategoryData(props.categories);

        setTimeout(() => {
            setLoading(false);
        }, 2000)

    }, [props.categories]);

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
            <CategoryModal 
                newCategory={newCategory}
                handleNewCategoryChange={handleNewCategoryChange}
                onSubmitNewCategory={submitNewCategory}
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

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
import axios from 'axios';
import config from '../../../Services/config';
import CategoriesStepModal from './CategoriesStepModal';

const styles = makeStyles(
    (theme) => ({
        paper: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
            position: 'relative',
            overflowY: 'hidden',
            height: 500,
            '&::-webkit-scrollbar': { 
                display: 'none'
            } 
        },

        contentLayout: {
            overflow: 'auto',
            height: 450,
            paddingBottom: 20,
            '&::-webkit-scrollbar': { 
                display: 'none'
            } 
        },

        progress: {
            margin: "20% auto",
            display: 'table'
        },

        formField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: "100%"
        },
    
        button: {
            margin: 'theme.spacing(1)',
        },

        submitButton: {
            margin: theme.spacing(1),
            float: 'right',
        },

        marginTop20: {
            marginTop: 20
        },
    
        
    })
)

const CategoryModal = ({modal, newCategory, onModalClose, handleNewCategoryChange, onSubmitNewCategory, onSubmitEditCategory, isEdit}) => {
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
                    value={newCategory.name}
                    margin="normal"
                    variant="outlined"
                    onChange={handleNewCategoryChange}
                />
                <Button 
                    variant="contained" 
                    size="medium" 
                    color="primary" 
                    className={classes.submitButton}
                    onClick={isEdit ? onSubmitEditCategory : onSubmitNewCategory}
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
    const [stepDialog, setDialogOpenClose] = useState(false);
    const [selectedCategory, setOpenedCategory] = useState('');
    const [editing, setEditing] = useState({
        status: false,
        id: ''
    });
    const [snackbar, setSnackbarState] = useState({
        open: false,
        message: '',
        isSuccess: false
    });
    
    // state for the form 
    const [newCategory, setCategory] = useState({
        name: '',
    });

    const handleNewCategoryChange = (e) => {
        e.preventDefault();
        setCategory({
            [e.target.name]: e.target.value
        })
    };

    const handleDialogOpen = (id) => {
        setDialogOpenClose(true);
        setOpenedCategory(id);
    }

    const handleDialogClose = () => {
        setDialogOpenClose(false);
    }

    const handleModalOpen = () => {
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
            ...snackbar,
            open: false,
            message: ''        
        })
    }

    const submitNewCategory = async () => {
        if(newCategory.name === '' || newCategory.name === null || newCategory.name === undefined) {
            snackBarOpenAction(false, 'Silahkan mengisi form terlebih dahulu.');
        }

        await productService.postNewCategory(newCategory)
            .then((res) => {
                if(res.status === 201) {
                    snackBarOpenAction(true, 'Berhasil membuat jenis Kategori baru.');
                    setCategory({
                        name: ''
                    });
                    handleModalClose();
                }
            })
            .catch((err) => {
                console.log(err);
                snackBarOpenAction(false, 'Terjadi kesalahan ketika membuat data.');
            })
    }

    const submitEditCategory = async () => {
        setLoading(true);

        try {
            let temp = newCategory;
            let editCategoryPayload = temp;

            const response = await axios.put(`${config.baseUrl}category/${editing.id}`, editCategoryPayload, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });

            let changedObjectIndex = categoryData.findIndex(item => item._id === editing.id);
            categoryData[changedObjectIndex].name = editCategoryPayload.name;

            setCategory({
                name: ''
            });

            setEditing({
                status: false,
                id: ''
            });

            handleModalClose();
            snackBarOpenAction(true, 'Berhasil mengubah kategori.');
        }
        catch (err) {
            console.log(err);
            snackBarOpenAction(false, 'Terjadi kesalahan saat menyunting data.');
        }

        setLoading(false);
    }

    const handleDelete = async (id, name) => {
        let confirm = window.confirm(`Apakah Anda yakin untuk menghapus Kategori ${name}?`);
        setLoading(true);

        if(confirm) {
            await productService.deleteCategory(id)
                .then((res) => {
                    if(res.status === 201) {
                        let newCategoryData = categoryData.filter(category => category._id !== id);
                        setCategoryData(newCategoryData);
                        snackBarOpenAction(true, `${name} berhasil dihapus.`);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    snackBarOpenAction(false, 'Terjadi kesalahan saat menghapus data.');
                })
        }

        setLoading(false);
    }

    const handleEdit = (name, id) => {
        setCategory({
            name: name
        });

        setEditing({
            status: true,
            id: id
        });
        
        handleModalOpen();
    }

    useEffect(() => {
        const checkCategories = () => {
            if(props.categories.length > 0) {
                setCategoryData(props.categories);
                setLoading(false);
            }
            
        }
        checkCategories();
        
    }, [props.categories]);

    return (
        <React.Fragment>
            <Paper id="for-step-modal" className={classes.paper}>
                {stepDialog ? (
                    <CategoriesStepModal 
                        closeDialog={handleDialogClose} 
                        open={stepDialog}
                        categoryId={selectedCategory}
                        snackbarOpen={snackBarOpenAction}
                    />
                ) : ''
                }
                
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
                            (category) => {
                                let selected = props.selected;
                                return (
                                    <CategoryCard 
                                        key={category._id}
                                        id={category._id}
                                        selected={selected}
                                        name={category.name}
                                        onClicked={() => {
                                                props.onClickCard(category._id); 
                                                handleDialogOpen(category._id);
                                            } 
                                        }
                                        onDelete={() => handleDelete(category._id, category.name)}
                                        onEdit={() => handleEdit(category.name, category._id)}
                                    />
                                )
                            }
                            
                            
                        )
                        :
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
            <CategoryModal 
                newCategory={newCategory}
                handleNewCategoryChange={handleNewCategoryChange}
                onSubmitNewCategory={submitNewCategory}
                onSubmitEditCategory={submitEditCategory}
                isEdit={editing.status}
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

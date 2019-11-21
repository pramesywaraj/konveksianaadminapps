import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { productService } from "../../../Services/productService";

const styles = makeStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2)
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    },
    paper: {
        height: '100%'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'baseline',
    },
    flexContainerColumn: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto'
    },
    tableContainer: {
        display: 'table',
        width: '100%',
        padding: 10,
    },
    progress: {
        margin: '10% auto',
        display: 'table'
    },
    marginTop20: {
        marginTop: 20
    },
}));

const Step = (props) => {
    const classes = styles();
    const { step, onDeleteHandle } = props;

    return (
        <div className={classes.tableContainer}>
            <div style={{display: 'table-cell', textAlign: 'start', fontSize: '14px'}}>
                <p>{step.name}</p>
            </div>
            <div style={{display: 'table-cell', textAlign: 'end'}}>
                <IconButton  
                    aria-label="close"
                    color="secondary"
                    onClick={onDeleteHandle}
                >
                    <CloseIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default function CategoriesStepModal(props) {
    const [steps, setSteps] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dataUpdate, setUpdate] = useState(false); // Parameter for controlling useEffect when updating the data
    const [lastQueueNumber, setNextQueueNumber] = useState(0);
    const [newStep, setNewStep] = useState({
        'name': '',
        'queue': '',
        'categoryId': '',
    });

    const classes = styles();
    const { open, closeDialog, categoryId, snackbarOpen } = props;

    useEffect(() => {
        setLoading(true);
        if(categoryId === '') {
            setLoading(false);
        } else {
            fetchCategorySteps();
        }


        return () => {
            console.log('Unmount')
            setSteps([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryId]);

    useEffect(() => {
        // last steps object to get queue number...
        const lastQueueNumberArray = () => {
            let length = steps.length;
            let nextQueue = 0;
    
            if(steps[length-2] !== undefined) {
                let singleObj = steps[length-2];
                nextQueue = singleObj.queue + 1;
            }
    
            setNextQueueNumber(nextQueue);
        };

        lastQueueNumberArray();

    }, [steps])

    useEffect(() => {
        if(dataUpdate) {
            setLoading(true);
            fetchCategorySteps();
            setUpdate(false);
        } else {
            return;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataUpdate]);

    const fetchCategorySteps = () => {
        productService.getCategoriesSteps(categoryId)
            .then((res) => {
                if(res.status === 200) {
                    setLoading(false);
                    setSteps(res.data.step);
                }
            })
            .catch((err) => {
                console.log(err);
                snackbarOpen(false, 'Terjadi kesalahan saat memuat data.');
                setLoading(false);
            })
    }

    const submitNewStep = () => {
        setLoading(true);
        if(newStep.name === '' && newStep.queue === '' && newStep.categoryId === '') {
            snackbarOpen(false, `Ada field yang belum terisi.`);
            return;
        } else {
            productService.postNewStep(newStep)
                .then((res) => {
                    if(res.status === 201) {
                        snackbarOpen(true, 'Berhasil membuat tahap baru.');
                        setUpdate(true);
                    } else if(res.data.errors) {
                        snackbarOpen(false, 'Terjadi kesalahan ketika membuat data.');
                    }
                })
                .catch((err) => {
                    console.log(err);
                    snackbarOpen(false, 'Terjadi kesalahan ketika membuat data.');
                })
        }

        setNewStep({
            ...newStep,
            name: ''
        })
    }

    const deleteCategoryStep = (id) => {
        if(window.confirm('Apakah Anda yakin?')) {
            setLoading(true);
            productService.deleteCategoryStep(id)
                .then((res) => {
                    if(res.status === 201) {
                        setLoading(false);
                        snackbarOpen(true, `Tahapan berhasil dihapus.`);
                        setUpdate(true);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    snackbarOpen(false, 'Terjadi kesalahan saat menghapus.');
                    setLoading(false);
                })
        }
    }

    const handleChange = (e) => {
        setNewStep({
            categoryId: props.categoryId,
            queue: lastQueueNumber,
            [e.target.name]: e.target.value
        })
    }
    
    return (
        <Dialog
            scroll='paper'
            classes={
                {
                    paper: classes.paper
                }
            }
            fullWidth={true}
            open={open}
            container={() => document.getElementById("for-step-modal")}
            style={{ position: "absolute" }}
            BackdropProps={{ style: { position: "absolute" } }}
            aria-labelledby="categories-step-dialog"
        >
            <MuiDialogTitle disableTypography className={classes.root}>
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={() => closeDialog()}
                >
                    <CloseIcon />
                </IconButton>
            </MuiDialogTitle>
            <MuiDialogContent>
                <div className={classes.flexContainer}>
                    <TextField
                        id="outlined-basic"
                        name="name"
                        className={classes.textField}
                        label="Nama langkah"
                        margin="normal"
                        variant="outlined"
                        value={newStep.name}
                        fullWidth
                        onChange={handleChange}
                    />
                    <Button color="primary" onClick={submitNewStep}>
                        Tambah
                    </Button>
                </div>
                <div>
                    {loading ? <CircularProgress className={classes.progress} /> 
                        : 
                        <div className={classes.flexContainerColumn}>
                            {
                                
                                steps.length > 0 ? (
                                    steps.map((step) => {
                                        return (
                                            <Step key={step._id} step={step} onDeleteHandle={() => deleteCategoryStep(step._id)} />
                                        )
                                    })
                                ) : (
                                    <Typography 
                                        align='center'
                                        className={classes.marginTop20}
                                    >
                                        Belum ada tahapan yang ditambahkan.
                                    </Typography>
                                )
                            }
                        </div>
                    }
                </div>
            </MuiDialogContent>
        </Dialog>
    );
}

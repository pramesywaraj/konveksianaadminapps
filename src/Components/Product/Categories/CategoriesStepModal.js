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
// import { productService } from "../../../Services/productService";
import axios from 'axios';
import config from '../../../Services/config';

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
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        steps: null
    });
    const [submittedStep, setSubmittedStep] = useState(null);
    const [deletedStepId, setDeletedStepId] = useState(null);
    const [lastQueueNumber, setNextQueueNumber] = useState(0);
    const [newStep, setNewStep] = useState({
        'name': '',
        'queue': '',
        'categoryId': '',
    });

    const classes = styles();
    const { open, closeDialog, categoryId, snackbarOpen } = props;

    useEffect(() => {
        fetchCategorySteps();

        console.log(data.steps)
        return () => {
            setNewStep({
                'name': '',
                'queue': '',
                'categoryId': '',
            });

            setData({
                steps: null
            })

            setSubmittedStep(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // last steps object to get queue number...
        const lastQueueNumberArray = () => {
            let nextQueue = 0;
            if(data.steps !== null && data.steps !== []) {
                let length = data.steps.length;
                if(data.steps[length-2] !== undefined) {
                    let singleObj = data.steps[length-2];
                    nextQueue = singleObj.queue + 1;
                }
                setNextQueueNumber(nextQueue);
            }
           
        };

        lastQueueNumberArray();

    }, [data.steps])

    useEffect(() => {
        if(submittedStep !== null) {
            setData({steps: data.steps.concat(submittedStep)});
            setLoading(false);

            setNewStep({
                'name': '',
                'queue': '',
                'categoryId': '',
            });
        }

        return () => {
            setSubmittedStep(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submittedStep, setSubmittedStep]);

    useEffect(() => {
        if(deletedStepId !== null) {
            let stepArray = data.steps;
            let newAarray = stepArray.filter(step => step._id !== deletedStepId);
            setData({
                steps: newAarray
            })
            setLoading(false);
        }

        return () => {
            setDeletedStepId(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deletedStepId, setDeletedStepId]);

    const fetchCategorySteps = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${config.baseUrl}step/categoryStep/${categoryId}`, 
                {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}
            );

            setData({
                steps: response.data.step
            });
            setLoading(false);
        }
        catch (err) {
            console.log(err);
            snackbarOpen(false, 'Terjadi kesalahan saat memuat data.');
        }
    }

    const submitNewStep = async () => {
        if(newStep.name === '' && newStep.queue === '' && newStep.categoryId === '') {
            snackbarOpen(false, `Ada field yang belum terisi.`);
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(
                `${config.baseUrl}step`, newStep,
                {headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }}
            );
            
            const submittedNewStep = await {
                _id: response.data.step._id,
                name: newStep.name,
                queue: newStep.queue,
                category: newStep.categoryId
            }

            setSubmittedStep(submittedNewStep);
            snackbarOpen(true, 'Berhasil membuat tahap baru.');
        }
        catch (err) {
            console.log(err);
            snackbarOpen(false, 'Terjadi kesalahan saat memuat data.');
        }
    }

    const deleteCategoryStep = async (id) => {
        if(!window.confirm('Apakah Anda yakin?')) {
            return;
        }

        try {
            const response = await axios.delete(
                `${config.baseUrl}step/${id}`, 
                {headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }}
            );

            setDeletedStepId(id);
            snackbarOpen(true, `Tahapan berhasil dihapus.`);
        }
        catch (err) {
            console.log(err);
            snackbarOpen(false, 'Terjadi kesalahan saat memuat data.');
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
                    {loading ? (<CircularProgress className={classes.progress} /> )
                        : 
                        <div className={classes.flexContainerColumn}>
                            {
                                
                                data.steps.length > 0 && data.steps !== null ? (
                                    data.steps.map((step) => {
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

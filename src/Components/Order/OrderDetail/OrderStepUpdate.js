import React, { useEffect, useState, useRef } from 'react';
import config from "../../../Services/config";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from '@material-ui/core/MenuItem';

const styles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    stepSelect: {
        margin: theme.spacing(1),
        flexGrow: 2
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'baseline',
        margin: "10px 0"
    },
    flexContainerColumn: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto'
    },
    updateButton: {
        color: 'white',
        backgroundColor: "rgb(3,172,14)",
        "&:hover": {
            backgroundColor: "rgb(5,137,12)"
        }
    },
    marginTop: {
        marginTop: 20
    }
}));

export default function OrderStepUpdate({steps, categoryId, addStepToOrder}) {
    const classes = styles();
    const [selectedStep, setSelectedStep] = useState('');
    const [availableStep, setAvailableStep] = useState([]);

    useEffect(() => {
        console.log(steps);
    }, [])

    const handleChange = event => {
        setSelectedStep(event.target.value);
    };

    const submitAddStepOrder = async () => {
        delete selectedStep.category;
        await addStepToOrder(selectedStep);
    }

    useEffect(() => {
        const fetchAvailableStep = async () => {
            try {
                const response = await axios.get(`${config.baseUrl}step/categorystep/${categoryId}`, {
                    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
                });
                setAvailableStep(response.data.step);
            } catch (err) {
                console.log(err);
            }
        }

        if(categoryId !== '') fetchAvailableStep();
    }, [])


    return (
        <Paper className={[classes.paper, classes.marginTop].join(' ')}>
            <Typography
                variant="h6"
                component="div"
                align="left"
            >
                Perbarui Langkah Pengerjaan
            </Typography>
            <div className={classes.flexContainer}>
                <TextField
                    select
                    className={classes.stepSelect}
                    variant="outlined"
                    label="Langkah"
                    value={selectedStep}
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {availableStep.map(step => (
                        <MenuItem 
                            key={step._id} 
                            value={step}
                        >
                            {step.name}
                        </MenuItem>
                    ))}
                </TextField>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={submitAddStepOrder}
                >
                    Perbarui
                </Button>
            </div>
            <div className={classes.flexContainerColumn}>
                {steps.length > 0 && (
                    steps.map((step, index) => (
                        <Typography
                            key={step._id}
                            variant="body1"
                            component="div"
                            align="left"
                        >
                            {index + 1}. {step.step.name}
                        </Typography>
                    ))
                )}
            </div>
        </Paper>
    )
}

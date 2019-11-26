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

export default function OrderStepUpdate({steps, categoryId}) {
    const classes = styles();
    const [age, setAge] = useState('');
    const [availableStep, setAvailableStep] = useState([]);

    const inputLabel = useRef(null);

    const handleChange = event => {
        setAge(event.target.value);
    };

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
                    value={age}
                    onChange={handleChange}
                    inputProps={{ name: "age", id: "outlined-age-simple" }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {availableStep.map(step => (
                        <MenuItem value={step._id}>{step.name}</MenuItem>
                    ))}
                </TextField>
                <Button variant="contained" color="primary">
                    Perbarui
                </Button>
            </div>
            <div className={classes.flexContainerColumn}>
                {steps.map((step, index) => (
                    <Typography
                    variant="body1"
                    component="div"
                    align="left"
                    >
                        {index}. {step.name}
                    </Typography>
                ))}
            </div>
        </Paper>
    )
}

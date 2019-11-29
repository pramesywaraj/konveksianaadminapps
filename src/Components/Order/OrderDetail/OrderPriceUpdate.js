import React, { useEffect, useState, useRef } from 'react'
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

export default function OrderPriceUpdate({}) {
    const classes = styles();
    const [paymentAmount, setPaymentAmount] = useState('');

    const handleChange = event => {
        setPaymentAmount(event.target.value);
    };


    return (
        <Paper className={[classes.paper, classes.marginTop].join(' ')}>
            <Typography
                variant="h6"
                component="div"
                align="left"
            >
                Angsuran Pembayaran
            </Typography>
            <div className={classes.flexContainer}>
                <TextField
                    className={classes.stepSelect}
                    variant="outlined"
                    label="Jumlah Nominal"
                    value={paymentAmount}
                    onChange={handleChange}
                    type="number"
                />
                <Button variant="contained" color="primary">
                    Perbarui
                </Button>
            </div>
            <div className={classes.flexContainerColumn}>
                <Typography
                    variant="body1"
                    component="div"
                    align="left"
                >
                    1. Rp.20000 --- Desember 2019
                </Typography>
            </div>
        </Paper>
    )
}

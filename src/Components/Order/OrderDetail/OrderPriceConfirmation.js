import React, { useEffect, useState } from 'react'
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'baseline',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    buttonSection: {
        padding: 20,
        textAlign: 'center',
        "& button": {
            width: 175,
            margin: "0 10px"
        }
    },
    acceptButton: {
        color: 'white',
        backgroundColor: "rgb(3,172,14)",
        "&:hover": {
            backgroundColor: "rgb(5,137,12)"
        }
    }
}));

export default function OrderPriceConfirmation({confirmOrder, rejectOrder}) {
    const classes = styles();
    const [price, setPrice] = useState(0);

    const handleChange = (e) => {
        e.preventDefault();
        setPrice(e.target.value);
    }

    const handleOnAccept = () => {
        confirmOrder(price);
    }

    return (
        <Paper className={classes.paper}>
            <Typography
                variant="h6"
                component="div"
                align="center"
            >
                Kesepakatan Harga
            </Typography>
            <div className={classes.flexContainer}>
                <TextField
                    value={price}
                    onChange={handleChange}
                    name="price"
                    className={classes.textField}
                    label="Harga"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    type="number"
                />
            </div>
            <div className={classes.buttonSection}>
                <Button 
                    variant="contained" 
                    className={classes.acceptButton}
                    onClick={handleOnAccept}
                >
                    Terima
                </Button>
                <Button 
                    variant="contained"
                    onClick={() => rejectOrder()}
                >
                    Tolak
                </Button>
            </div>
        </Paper>
    )
}

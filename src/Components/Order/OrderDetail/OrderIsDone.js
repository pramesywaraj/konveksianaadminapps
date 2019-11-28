import React, { useEffect, useState } from 'react'
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';

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
        display: 'flex',
        justifyContent: 'center',
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
    },

    buttonWrapper: {
        position: 'relative'
    },
    buttonProgress: {
        color: "rgb(3,172,14)",
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

export default function OrderIsDone({}) {
    const classes = styles();
    const [data, setData] = useState({
        "shippingPrice": '',
        "weight": '' 
    });
    const [loadingProccess, setLoadingProccess] = useState(false);

    const handleChange = (e) => {
        e.preventDefault();
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const handleOnSubmit = () => {
        setLoadingProccess(true);
        console.log(data);
    }

    return (
        <Paper className={classes.paper}>
            <Typography
                variant="h6"
                component="div"
                align="center"
            >
                Ongkos Kirim dan Berat Akir
            </Typography>
            <div className={classes.flexContainer}>
                <TextField
                    value={data.shippingPrice}
                    onChange={handleChange}
                    name="shippingPrice"
                    className={classes.textField}
                    label="Ongkos Kirim"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    type="number"
                />
                <TextField
                    value={data.weight}
                    onChange={handleChange}
                    name="weight"
                    className={classes.textField}
                    label="Berat (Gram)"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    type="number"
                />
            </div>
            <div className={classes.buttonSection}>
                <div className={classes.buttonWrapper}>
                    <Button 
                        variant="contained" 
                        className={classes.acceptButton}
                        onClick={handleOnSubmit}
                        disabled={loadingProccess}
                    >
                        Terima
                    </Button>
                    {loadingProccess && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
                <div className={classes.buttonWrapper}>
                    <Button 
                        variant="contained"
                        onClick={() => console.log('tes')}
                    >
                        Tolak
                    </Button>
                </div>
            </div>
        </Paper>
    )
}

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from "../../../Services/config";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from '@material-ui/core/MenuItem';
import Moment from 'react-moment';

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
    },
    paymentHistoryTable: {
        width: '100%',
        padding: "20px 0",
        '& .placeholder': {
            width: "25%"
        }
    },
    totalAmountSection: {
        backgroundColor: 'rgb(175,175,175)',
        textAlign: 'center',
        padding: 10
    }
}));

export default function OrderPriceUpdate({orderId, snackbarOpen}) {
    const classes = styles();
    const [paymentAmount, setPaymentAmount] = useState('');
    const [totalAmount, setTotalamount] = useState('');
    const [data, setData] = useState({
        paymentHistory: ''
    });

    useEffect(() => {
        if(orderId === undefined || orderId === '' || orderId === null) return;

        fetchPriceUpdateHistory();

    }, []);

    const fetchPriceUpdateHistory = async () => {
        try {
            let auth = {Authorization: "Bearer " + localStorage.getItem("token")};

            const [paymentHistory, paymentAmount] = await Promise.all([
                await axios.get(`${config.baseUrl}payment-step/get-history/${orderId}`, {headers: auth}),
                await axios.get(`${config.baseUrl}payment-step/get-total-amount//${orderId}`, {headers: auth})
            ]);

            console.log(paymentHistory, paymentAmount);

            await setData({
                paymentHistory: paymentHistory.data.paymentStep
            });

            await setTotalamount(paymentAmount.data.amount);
        }
        catch (err) {
            console.log("there is an error in OrderPriceUpdate", err);
            snackbarOpen(false, '', 'Terjadi kesalahan saat mengambil data Riwayat Pembayaran');
        }
    }

    const submitNewPayment = async() => {

    }

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
            <div>
                <table className={classes.paymentHistoryTable}>
                    <tbody>
                    {
                        data.paymentHistory.length > 0 && data.paymentHistory !== '' ? (
                            <React.Fragment>
                            {data.paymentHistory.map((payment, index) => (
                                <tr key={payment._id}>
                                    <td>{index + 1}</td>
                                    <td>Rp.{payment.amount}</td>
                                    <td>
                                        <Moment format="D MMM YYYY">
                                            {payment.date}
                                        </Moment>
                                    </td>
                                    <td>
                                        {payment.description}
                                    </td>
                                </tr>
                            ))}
                            <tr className={classes.totalAmountSection}>
                                <td colSpan={2}>Total yang telah dibayarkan: </td>
                                <td colSpan={2}>Rp. {totalAmount}</td>
                            </tr>
                            </React.Fragment>
                        )
                        :
                        <tr></tr>
                    }
                        
                    </tbody>
                </table>
            </div> 
        </Paper>
    )
}

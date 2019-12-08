import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from "../../../Services/config";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Moment from 'react-moment';

const styles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    input: {
        marginTop: theme.spacing(1),
        display: 'block',
    },
    container: {
        width: '100%',
        margin: "10px 0"
    },
    flexContainerColumn: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto'
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
        padding: 10,
        color: 'white'
    },
    buttonProgress: {
        color: "rgb(3,172,14)",
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    buttonWrapper: {
        position: 'relative',
        textAlign: 'center',
        margin: 10,
        "& button": {
            width: "50%"
        }
    },
}));

export default function OrderPriceUpdate({orderId, snackbarOpen}) {
    const classes = styles();
    const [totalAmount, setTotalamount] = useState('');
    const [loadingProcess, setLoadingProcess] = useState(false);
    const [data, setData] = useState({
        paymentHistory: ''
    });
    const [newPayment, setNewPayment] = useState({
        "orderId": orderId,
        "amount": "",
        "method": "Transfer",
        "description": ""
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
                await axios.get(`${config.baseUrl}payment-step/get-total-amount/${orderId}`, {headers: auth})
            ]);

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

    const submitNewPayment = async () => {
        if(newPayment.amount === '' || newPayment.description === '') {
            snackbarOpen('', true, 'Ada form yang belum terisi. Silahkan isi terlebih dahulu :)');
            return;
        }

        setLoadingProcess(true);
        try {
            let auth = {Authorization: "Bearer " + localStorage.getItem("token")};
            const response = await axios.post(`${config.baseUrl}payment-step/`, newPayment, {headers: auth});

            await setData({
                paymentHistory: response.data.paymentStep
            });

            setNewPayment({
                ...newPayment,
                "amount": "",
                "description": ""

            })
            snackbarOpen(true, '', 'Angsuran berhasil ditambahkan.');

        }
        catch (err) {
            console.log(err);
            snackbarOpen(false, '', 'Terjadi kesalahan saat melakukan input pembayaran baru.');
        }

        setLoadingProcess(false);
    }

    const handleChange = event => {
        setNewPayment({
            ...newPayment,
            [event.target.name]: event.target.value
        });
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
            <div className={classes.container}>
                <TextField
                    fullWidth={true}
                    name="amount"
                    className={classes.input}
                    variant="outlined"
                    label="Jumlah Nominal"
                    value={newPayment.amount}
                    onChange={handleChange}
                    type="number"
                />
                <TextField
                    fullWidth={true}
                    name="description"
                    className={classes.input}
                    variant="outlined"
                    label="Keterangan"
                    value={newPayment.description}
                    onChange={handleChange}
                    type="text"
                />
                <div className={classes.buttonWrapper}>
                    <Button 
                        color="primary"
                        variant="contained" 
                        onClick={submitNewPayment}
                        disabled={loadingProcess}
                    >
                        Perbarui
                    </Button>
                    {loadingProcess && 
                        <CircularProgress 
                            size={24} 
                            className={classes.buttonProgress} 
                        />
                    }
                </div>
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

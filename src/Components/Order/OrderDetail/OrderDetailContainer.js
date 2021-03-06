import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import config from "../../../Services/config";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';
import OrderPhotos from "./OrderPhotos";
import OrderDescription from "./OrderDescription";
import OrderPriceConfirmation from "./OrderPriceConfirmation";
import OrderStepUpdate from "./OrderStepUpdate";
import OrderPriceUpdate from "./OrderPriceUpdate";
import OrderIsDone from "./OrderIsDone";
import CustomSnackbar from "../../OtherComponent/CustomSnackbar";
import { history } from '../../../Helpers/history';


const styles = makeStyles(theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(1),
        overflowX: "auto",
    },

    gridWrapper: {
        flexGrow: 1,
        paddingTop: theme.spacing(2),
    },

    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

    centerProgress: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 300
    }

}));

export default function OrderDetailContainer() {
    const { orderId } = useParams();
    const classes = styles();

    const [orderData, setOrderData] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        isSuccess: '',
        isWarning: ''
    });

    useEffect(() => {
        if (orderId !== "") {
            fetchOrder();
        }

    }, []);

    useEffect(() => {
        fetchOrder();
        
    }, [setOrderData]);


    const fetchOrder = async () => {
        try {
            const response = await axios.get(`${config.baseUrl}order/id/${orderId}`, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            });

            setOrderData(response.data.order);
        } catch (err) {
            console.log(err);
            snackBarOpenAction(false, '', 'Terjadi kesalahan pada saat pengambilan data pada server.');
        }
    };

    const confirmOrder = async (price) => {
        let payload = {
            "_id": orderId,
            "productPrice": price
        };

        try {
            const response = await axios.post(`${config.baseUrl}order/set/onprogress`, payload, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            });

            setOrderData({
                ...orderData,
                productPrice: price,
                status: {
                    ...orderData.status,
                    isPending: false,
                    isOnProcess: true
                }
            })

            snackBarOpenAction(true, '', 'Harga telah disepakati.');
        } catch (err) {
            console.log(err);
            snackBarOpenAction(false, '', 'Terjadi kesalahan pada saat melakukan konfirmasi pesanan.');
        }
    }

    const rejectOrder = async () => {
        try {
            const response = await axios.get(`${config.baseUrl}order/reject/${orderId}`, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            });

            setOrderData({
                ...orderData,
                status: {
                    ...orderData.status,
                    isPending: false,
                    isReject: true
                }
            })

            snackBarOpenAction(true, '', 'Pesanan telah ditolak.');

            setTimeout(() => {
                history.goBack();
            }, 1500)
            
        } catch (err) {
            console.log(err);
            snackBarOpenAction(true, '', 'Terdapat kesalahan. Tidak dapat menolak pesanan.');
        }
    }

    const changeProductPrice = async (price) => {
        let payload = {
            "_id": orderId,
            "productPrice": price
        };

        try {
            const response = await axios.post(`${config.baseUrl}order/update/product-price`, payload, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            });

            setOrderData({
                ...orderData,
                productPrice: price
            })

            snackBarOpenAction(true, '', 'Harga telah diubah.');
        } catch (err) {
            console.log(err);
            snackBarOpenAction(false, '', 'Terjadi kesalahan pada saat melakukan penggantian harga pesanan.');
        }
    }

    const addStepToOrder = async (step) => {
        let payload = {
            "orderId": orderId,
            "stepId": step._id
        };

        try {
            const response = await axios.post(`${config.baseUrl}order-step`, payload, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            });

            let newStep = {
                _id: response.data.orderStep._id,
                step: {
                    _id: step._id,
                    queue: step.queue,
                    name: step.name
                }
            }

            setOrderData({
                ...orderData,
                orderStep: orderData.orderStep.concat(newStep)
            })

            snackBarOpenAction(true, '', 'Langkah telah ditambahkan.');
        } catch (err) {
            console.log(err);
            snackBarOpenAction(false, '', 'Terjadi kesalahan pada saat melakukan penggantian harga pesanan.');
        }
    }

    const confirmIsDone = async () => {
        try {
            const response = await axios.get(`${config.baseUrl}order/set/done/${orderId}`, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            });

            setOrderData({
                ...orderData,
                status: {
                    ...orderData.status,
                    isDone: true
                }
            })

            snackBarOpenAction(true, '', 'Pesanan telah selesai.');
        } catch (err) {
            console.log(err);
            snackBarOpenAction(false, '', 'Terjadi kesalahan pada saat melakukan konfirmasi penyelesaian.');
        }   
    }

    const changeShippingPriceAndWeight = async (data) => {
        let payload = {
            _id: orderId,
            shippingPrice: data.shippingPrice,
            weight: data.weight
        }
        try {
            const response = await axios.post(`${config.baseUrl}order/update/shipping-weight/`, payload, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            });

            setOrderData({
                ...orderData,
                shippingPrice: data.shippingPrice,
                weight: data.weight
            })

            snackBarOpenAction(true, '', 'Ongkos Kirim dan Berat berhasil diubah.');
        } catch (err) {
            console.log(err);
            snackBarOpenAction(false, '', 'Terjadi kesalahan pada saat melakukan perubahan Ongkos Kirim dan Berat.');
        }   
    } 

    function snackBarOpenAction(isSuccess, isWarning, message) {
        setSnackbar({
            open: true,
            message: message,
            isSuccess: isSuccess,
            isWarning: isWarning
        });
    }
    
    const handleSnackbarClose = () => {
        setSnackbar({
            open: false,
            message: '',
            isSuccess: '',
            isWarning: ''        
        })
    }

    if(orderData !== null) return (
        <div>
            <OrderPhotos photos={orderData.photoUrls}/>
            <div className={classes.gridWrapper}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <OrderDescription 
                            user={{
                                name: orderData.user.name,
                                city: orderData.city,
                                address: orderData.detailAddress,
                                phone: orderData.phoneNumber
                            }}
                            goods={{
                                baseId: orderData.baseId,
                                courier: orderData.courier,
                                category: orderData.material !== null ? orderData.material.product.category.name : '---',
                                product: orderData.material !== null ? orderData.material.product.name : '---',
                                material: orderData.material !== null ? orderData.material.name : '---',
                                color: orderData.color,
                                quantity: orderData.quantity,
                                description: orderData.description,
                                weightPrediction: orderData.weightPrediction,
                                shippingPricePrediction: orderData.shippingPricePrediction,
                                productPricePrediction: orderData.productPricePrediction   
                            }}
                            otherAttribute={{
                                productPrice: orderData.productPrice,
                                weight: orderData.weight,
                                shippingPrice: orderData.shippingPrice
                            }}
                            status={orderData.status}
                            handleChangeProductPrice={changeProductPrice}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        {orderData.status.isPending && (
                            <OrderPriceConfirmation 
                                confirmOrder={confirmOrder}
                                rejectOrder={rejectOrder}
                                snackbarOpen={snackBarOpenAction}
                            />
                        )}

                        {orderData.status.isOnProcess && (
                            <React.Fragment>
                                <OrderStepUpdate 
                                    steps={orderData.orderStep}
                                    categoryId={orderData.material.product.category._id}
                                    addStepToOrder={addStepToOrder}
                                    snackbarOpen={snackBarOpenAction}
                                    confirmIsDone={confirmIsDone}
                                />
                                <OrderPriceUpdate 
                                    orderId={orderId}
                                    snackbarOpen={snackBarOpenAction}
                                />
                            </React.Fragment>
                        )}

                        {orderData.status.isDone && (
                            <OrderIsDone 
                                snackbarOpen={snackBarOpenAction}
                                changeShippingPriceAndWeight={changeShippingPriceAndWeight}
                            />
                        )}
                        
                    </Grid>
                </Grid>
            </div>
            {snackbar.open && (
                <CustomSnackbar 
                    snackbar={snackbar.open}
                    message={snackbar.message}
                    isWarning={snackbar.isWarning}
                    isSuccess={snackbar.isSuccess}
                    close={handleSnackbarClose}
                />
            )}
            
        </div>
    );

    return (
        <div className={classes.centerProgress}>
            <CircularProgress />
        </div>
    )
}

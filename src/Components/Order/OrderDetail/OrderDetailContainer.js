import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import config from "../../../Services/config";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CircularProgress from '@material-ui/core/CircularProgress';
import OrderPhotos from "./OrderPhotos";
import OrderDescription from "./OrderDescription";
import OrderPriceConfirmation from "./OrderPriceConfirmation";
import OrderStepUpdate from "./OrderStepUpdate";
import OrderPriceUpdate from "./OrderPriceUpdate";


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

    useEffect(() => {
        if (orderId !== "") {
            fetchOrder();
        }

        return () => {
            setOrderData(null);
        }
    }, []);

    useEffect(() => {
        console.log(orderData);
    }, [orderData]); 

    const fetchOrder = async () => {
        try {
            const response = await axios.get(`${config.baseUrl}order/id/${orderId}`, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            });
            setOrderData(response.data.order);
        } catch (err) {
            console.log(err);
        }
    };

    if(orderData !== null) return (
        <div>
            <OrderPhotos />
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
                                category: orderData.material.product.category.name,
                                product: orderData.material.product.name,
                                material: orderData.material.name,
                                color: orderData.color,
                                quantity: orderData.quantity,
                                description: orderData.description
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OrderPriceConfirmation />
                        <OrderStepUpdate />
                        <OrderPriceUpdate />
                    </Grid>
                </Grid>
            </div>
        </div>
    );

    return (
        <div className={classes.centerProgress}>
            <CircularProgress />
        </div>
    )
}

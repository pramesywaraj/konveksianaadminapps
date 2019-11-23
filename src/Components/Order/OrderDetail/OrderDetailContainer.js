import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import config from "../../../Services/config";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import OrderPhotos from "../OrderDetail/OrderPhotos";

const styles = makeStyles(theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(1),
        overflowX: "auto"
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
}));

export default function OrderDetailContainer() {
    const { orderId } = useParams();
    const classes = styles();

    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        if (orderId !== "") {
            fetchOrder();
        }
    }, [orderId]);

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

    return (
        <div>
            <OrderPhotos />
            <div className={classes.gridWrapper}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>xs=6</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>xs=6</Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

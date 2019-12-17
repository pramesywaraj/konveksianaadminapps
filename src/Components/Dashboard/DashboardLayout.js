import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { history } from '../../Helpers/history';
import config from '../../Services/config';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { TotalUser } from './DashboardElements/TotalUser';
import { TotalOrders } from './DashboardElements/TotalOrders';
import { OrderPending } from './DashboardElements/OrderPending';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    },
    centerProgress: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 300
    }
}));

export default function DashboardLayout() {
    const classes = useStyles();
    const [data, setData] = useState({
        users: '',
        orders: '',
        pendingOrders: ''
    })

    useEffect(() => {
        fetchData();

        return () => {
            
        }
    }, [])

    const fetchData = async () => {
        try {
            let auth = {Authorization: "Bearer " + localStorage.getItem("token")};

            const [users, orders, pendingOrders] = await Promise.all([
                await axios.get(`${config.baseUrl}dashboard/getUserCount/`, {headers: auth}),
                await axios.get(`${config.baseUrl}dashboard/getOrderCount/`, {headers: auth}),
                await axios.get(`${config.baseUrl}dashboard/getPendingOrder/`, {headers: auth})       
            ]);

            setData({
                users: users.data.count,
                orders: orders.data.count,
                pendingOrders: pendingOrders.data.count,
            })

        }
        catch (err) {
            console.log(err);
        }
    }

    const goToUserList = () => {
        history.push('/users');
    }

    if(data.users !== '' || data.orders !== '' || data.pendingOrders !== '') return (
        <div className={classes.root}>
            <Grid
                container
                spacing={3}
            >
                <Grid
                    item
                    lg={4}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <TotalUser 
                        userCount={data.users}
                        goToUserList={goToUserList}    
                    />
                </Grid>
                <Grid
                    item
                    lg={4}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <TotalOrders orderCount={data.orders} />
                </Grid>
                <Grid
                    item
                    lg={4}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <OrderPending pendingCount={data.pendingOrders}/>
                </Grid>
            </Grid>
        </div>
    )

    return (
        <div className={classes.centerProgress}>
            <CircularProgress />
        </div>
    )
}

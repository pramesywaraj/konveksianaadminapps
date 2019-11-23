import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
// import CustomSnackbar from '../../OtherComponent/CustomSnackbar';
import Moment from 'react-moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { history } from '../../Helpers/history';

const styles = makeStyles(
    (theme) => ({
        root: {
            width: '100%',
            marginTop: theme.spacing(1),
            overflowX: 'auto',
        },
        table: {
            minWidth: 650,
        },
        table_row_clickable: {
            cursor: 'pointer'
        },
        progress: {
            margin: '10% auto',
            display: 'table'
        },
        
        noOrder: {
            padding: theme.spacing(3, 2),
            width: '100%',
            textAlign: 'center'
        },

    })
)

const OrderList = (props) => {
    const classes = styles();
    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setOrders(props.orders);
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }, [props.orders])

    return(
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Pelanggan</TableCell>
                        <TableCell align="right">Tanggal Masuk</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {loading ? 
                    <TableRow>
                        <CircularProgress />
                    </TableRow>
                : 
                    orders !== null && orders !== [] ? (orders.map(order => (
                        <TableRow 
                            key={order._id} 
                            className={classes.table_row_clickable}
                            onClick={() => history.push(`/orders/${order._id}`)}
                        >
                            <TableCell component="th" scope="row">
                                {order.user.name}
                            </TableCell>
                            <TableCell align="right">
                                <Moment format="D MMM YYYY">
                                    {order.createdAt}
                                </Moment>
                            </TableCell>
                        </TableRow>
                    )))
                    :
                    ' '
                }
                </TableBody>
            </Table>
        </Paper>
    )
}

export default OrderList;

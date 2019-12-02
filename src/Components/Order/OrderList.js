import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import StatusBadge from '../OtherComponent/StatusBadge';
import Moment from 'react-moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { history } from '../../Helpers/history';

const styles = makeStyles(
    (theme) => ({
        root: {
            width: '100%',
            marginTop: theme.spacing(1),
            overflowX: 'auto',
            padding: 20,
            maxHeight: 600
        },
        table: {
            minWidth: 650,
        },
        table_row_clickable: {
            cursor: 'pointer'
        },
        progress: {
            position: "absolute",
            top: "50%",
            left: "50%",
        },
        noOrder: {
            padding: theme.spacing(3, 2),
            width: '100%',
            textAlign: 'center'
        },

        tableWrapper: {
            textAlign: 'center',
            height: 500,
            maxHeight: 500,
            position: "relative"
        },
        orderDone: {
            display: "inline-block",
            minWidth: "1em",
            padding: ".3em",
            borderRadius: "4px",
            textAlign: "center",
            background: "rgb(3,172,14)",
            color: "white"
        },

        orderRejected: {
            display: "inline-block",
            minWidth: "1em",
            padding: ".3em",
            borderRadius: "4px",
            textAlign: "center",
            background: "rgb(226,0,0)",
            color: "white"
        }
    })
)

const OrderList = (props) => {
    const classes = styles();
    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setOrders(props.orders);
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }, [props.orders, orders])

    return(
        <Paper className={classes.root}>
            <Typography 
                variant="h4" 
                component="div" 
                align="left"
            >
                Daftar Pesanan
            </Typography>
            <div className={classes.tableWrapper}>
                {
                    loading ? <CircularProgress className={classes.progress} /> 
                        : (
                            <OrderTable
                                orders={orders}
                            />
                        ) 
                }
            </div>
        </Paper>
    )
}

function OrderTable({orders}) {
    const classes = styles();
    
    if(orders !== null && orders.length > 0)
    return (
        <Table stickyheader="true" className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Pelanggan</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Tanggal Masuk</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {(orders.map(order => (
                    <TableRow 
                        hover
                        key={order._id} 
                        className={classes.table_row_clickable}
                        onClick={() => history.push(`/orders/${order._id}`)}
                    >
                        <TableCell component="th" scope="row">
                            {order.user.name}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {
                                (order.status.isDone) ? (<StatusBadge type="done">Pesanan Selesai</StatusBadge>) 
                                : (order.status.isOnProcess) ? (<StatusBadge type="ongoing">Pesanan dalam Proses</StatusBadge>) 
                                : (order.status.isPending) ? (<StatusBadge type="pending">Pending</StatusBadge>) 
                                : (order.status.isReject) ? (<StatusBadge type="reject">Pesanan Ditolak</StatusBadge>) 
                                : "" 
                            }
                        </TableCell>
                        <TableCell align="right">
                            <Moment format="D MMM YYYY">
                                {order.createdAt}
                            </Moment>
                        </TableCell>
                    </TableRow>
                )))
                }
            </TableBody>
        </Table>
    )

    return (
        <Typography 
                align='center'
                className={classes.marginTop20}
            >
                Tidak ada produk untuk ditampilkan.
        </Typography> 
    )

}

export default OrderList;

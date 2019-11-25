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
    return (
        <Table className={classes.table}>
            <TableHead stickyHeader>
                <TableRow>
                    <TableCell>Pelanggan</TableCell>
                    <TableCell align="right">Tanggal Masuk</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {orders !== null && orders !== [] ? (orders.map(order => (
                    <TableRow 
                        hover
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
                (
                    <Typography 
                            align='center'
                            className={classes.marginTop20}
                        >
                            Tidak ada produk untuk ditampilkan.
                    </Typography> 
                )
                }
            </TableBody>
        </Table>
    )

}

export default OrderList;

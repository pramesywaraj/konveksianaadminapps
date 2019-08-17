import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';

import { orderAction } from '../../Actions/orderActions';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    table_row_clickable: {
        cursor: 'pointer'
    }
});

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}
  
const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];


class Order extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(orderAction.getAllOrder());
    }


    render() {
        const { classes } = this.props;
        const { orders } = this.props.orders;
        return(
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Pelanggan</TableCell>
                            <TableCell align="right">Kategori</TableCell>
                            <TableCell align="right">Tanggal Masuk</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map(order => (
                            <TableRow key={order._id} className={classes.table_row_clickable}>
                                <TableCell component="th" scope="row">
                                    {order.user.name}
                                </TableCell>
                                <TableCell align="right">{order.category.name}</TableCell>
                                <TableCell align="right">
                                    <Moment format="D MMM YYYY">
                                        {order.createdAt}
                                    </Moment>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

Order.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        orders : state.order
    };
}

const connectedOrderPage = withRouter(connect(mapStateToProps, null, null, 
    {
        pure: false
    }
)(withStyles(styles)(Order)));

export { connectedOrderPage as Order };
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { orderAction } from '../../Actions/orderActions';
import Paper from '@material-ui/core/Paper';
import OrderList from './OrderList';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(1),
        overflowX: 'auto',
    },
    
    progress: {
        margin: '10% auto',
        display: 'table'
    },
});

class Order extends Component {

    async componentDidMount() {
        const { dispatch } = this.props;
        await dispatch(orderAction.getAllOrder());
    }


    render() {
        const { classes } = this.props;
        const { orders } = this.props.orders;

        return(
            <div>
                <OrderList 
                    orders={orders}
                />
            </div>
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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
    root : {
        flexGrow: 1
    }
});


class Order extends Component {
    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <p>Order</p>
            </div>
        )
    }
}

Order.propTypes = {
    classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return state;
}

const connectedOrderPage = withRouter(connect(mapStateToProps, null, null, 
    {
        pure: false
    }
)(withStyles(styles)(Order)));

export { connectedOrderPage as Order };
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import ReviewList from './ReviewList';

import { reviewActions } from '../../Actions/reviewActions';

// import PropTypes from 'prop-types';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(1),
        flexGrow: 1
    },
});

class Review extends Component {
    constructor(props) {
        super();
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(reviewActions.getReviewAction());
    }

    render() {
        const { classes, reviewProps } = this.props;
        const { reviews } = reviewProps;

        return (
            <div className={classes.root}>
                <ReviewList />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        reviewProps: state.review
    };
}

const connectedReviewPage = withRouter(connect(mapStateToProps, null, null, 
    {
        pure: false
    }
)(withStyles(styles)(Review)));

export { connectedReviewPage as Review };

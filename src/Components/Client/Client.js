import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ClientCard from './ClientCard';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(1),
        flexGrow: 1
    },
    
    button: {
        margin: theme.spacing(1),
        float: 'right'
    },
});

class Client extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root} >
                <Button variant="contained" color="primary" className={classes.button}>
                    <AddIcon />
                    Tambahkan Client Baru
                </Button>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <ClientCard></ClientCard>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

Client.propTypes = {
    classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return state;
}

const connectedHomePage = withRouter(connect(mapStateToProps, null, null, 
    {
        pure: false
    }
)(withStyles(styles)(Client)));

export { connectedHomePage as Client };

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { clientActions } from '../../Actions/clientActions';

import ClientCard from './ClientCard';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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

    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    paper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '20px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
});

class Client extends Component {
    
    render() {
        const handleOpen = () => {
            const { dispatch } = this.props;
            dispatch(clientActions.openModal());
        }

        const handleClose = () => {
            const { dispatch } = this.props;
            dispatch(clientActions.closeModal());
        }

        const { classes } = this.props;
        const { modal } = this.props;

        return (
            <div className={classes.root} >
                <Button variant="contained" color="primary" className={classes.button} onClick={handleOpen}>
                    <AddIcon />
                    Tambahkan Client Baru
                </Button>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <ClientCard />
                    </Grid>
                </Grid>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={modal}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                >
                    <Fade in={modal}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Transition modal</h2>
                        <p id="transition-modal-description">react-transiton-group animates me.</p>
                    </div>
                    </Fade>
                </Modal>
            </div>
        )
    }
}

Client.propTypes = {
    classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        modal: state.client.modal
    };
}

const connectedHomePage = withRouter(connect(mapStateToProps, null, null, 
    {
        pure: false
    }
)(withStyles(styles)(Client)));

export { connectedHomePage as Client };

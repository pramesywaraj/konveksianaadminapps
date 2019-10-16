import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { clientActions } from '../../Actions/clientActions';

import NewClientForm from './NewClientForm';

import ClientCard from './ClientCard';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(1),
        flexGrow: 1
    },
    
    button: {
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
        width: '50%'
    },

    progress: {
        textAlign: 'center',
    },

    centerProgress: {
        display: 'inline-block'
    },

    noClient: {
        width: '100%',
        color: '#cfcfcf',
        textAlign: 'center'
    }
});

class Client extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(clientActions.getAllClients());
    }

    handleChange = prop => event => {
        const { dispatch } = this.props;
        dispatch(clientActions.onChangeProps(prop, event));
        // this.setState({ [prop]: event.target.value });
    }

    submitNewClient = () => {
        const { dispatch } = this.props;
        let data = {
            'name': this.props.client.name,
            'urlWeb': this.props.client.urlWeb,
            'clientImage': this.props.client.clientImage
        }

        if(data.name && data.urlWeb && data.clientImage) {
            dispatch(clientActions.createNewClient(data));
        } else {
            alert('Please fill the form correctly!');
        }

    }


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
        const { modal, loading, clients, success, fail } = this.props.client;

        return (
            <div className={classes.root}>
                {!loading ? 
                    (
                        <div>
                            <Button variant="contained" color="primary" className={classes.button} onClick={handleOpen}>
                                <AddIcon />
                                Tambahkan Client Baru
                            </Button>
                            <Grid container spacing={3}>
                                {clients.length > 0 ? clients.map(
                                    client => (
                                        <Grid item xs={4} key={client._id}>
                                            <ClientCard clientProps={client}/>
                                        </Grid>
                                    )
                                )
                                :
                                    <div className={classes.noClient}>
                                        <h3>Tidak ada client yang dapat ditampilkan.</h3>
                                    </div>
                                }
                                
                            </Grid>

                            <Modal
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
                                    <NewClientForm 
                                        newClientProps={this.props.client} 
                                        onFormFieldChange={this.handleChange} 
                                        onSubmitNewClient={this.submitNewClient} 
                                    />
                                </Fade>
                            </Modal>
                        </div>
                    )
                    :

                    (<div className={classes.progress}>
                        <div>
                            <CircularProgress />
                        </div>
                    </div>)             
                }
            </div>
        )
    }
}

Client.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        client: state.client
    };
}

const connectedHomePage = withRouter(connect(mapStateToProps, null, null, 
    {
        pure: false
    }
)(withStyles(styles)(Client)));

export { connectedHomePage as Client };

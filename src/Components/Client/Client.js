import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { clientActions } from '../../Actions/clientActions';

import NewClientForm from './NewClientForm';
import CustomSnackbar from '../OtherComponent/CustomSnackbar';

import ClientCard from './ClientCard';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CustomModal from '../OtherComponent/CustomModal';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(1),
        flexGrow: 1
    },
    
    buttonMarginBottom20: {
        marginBottom: '20px'
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

    // constructor(props) {
    //     super();
    // }

    
    componentDidMount() {
        this.fetchClientData();
    }

    fetchClientData() {
        const { dispatch } = this.props;
        dispatch(clientActions.getAllClients());
    }

    handleChange = prop => event => {
        const { dispatch } = this.props;
        dispatch(clientActions.onChangeProps(prop, event));
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
            alert('Mohon untuk mengisi seluruh form!');
        }

    }

    deleteClient = (id) => {
        const { dispatch } = this.props;
        dispatch(clientActions.deleteClient(id));
    }

    clientChangeStatusHandle = (id) => {
        const { dispatch } = this.props;
        dispatch(clientActions.changeClientStatus(id));
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

        const handleCloseSnackbar = () => {
            const { dispatch } = this.props;
            dispatch(clientActions.closeSnackbar());
        }

        const { classes, client } = this.props;
        const { loading, modal, clients, isSuccess, message, snackbar } = client;

        return (
            <div className={classes.root}>
                {!loading ? 
                    (
                        <div>
                            <div className={classes.buttonMarginBottom20}>
                                <Box display='flex' flexDirection='row-reverse'>
                                    <Button variant="contained" color="primary" className={classes.button} onClick={handleOpen}>
                                        <AddIcon />
                                        Tambahkan Client Baru
                                    </Button>
                                </Box>
                            </div>
                            
                            
                            <Grid container spacing={3}>
                                {clients.length > 0 ? clients.map(
                                    client => (
                                        <Grid item xs={4} key={client._id}>
                                            <ClientCard clientProps={client} onDelete={this.deleteClient} onChangeStatusHandle={this.clientChangeStatusHandle}/>
                                        </Grid>
                                    )
                                )
                                :
                                    <div className={classes.noClient}>
                                        <h3>Tidak ada client yang dapat ditampilkan.</h3>
                                    </div>
                                }
                                
                            </Grid>
                            <CustomModal 
                                modal={modal}
                                handleClose={handleClose}
                            >
                                <NewClientForm 
                                    newClientProps={client} 
                                    onFormFieldChange={this.handleChange} 
                                    onSubmitNewClient={this.submitNewClient} 
                                />
                            </CustomModal>
                        </div>
                    )
                    :

                    (<div className={classes.progress}>
                        <div>
                            <CircularProgress />
                        </div>
                    </div>)             
                }

                <CustomSnackbar 
                    snackbar={snackbar} 
                    isSuccess={isSuccess}
                    message={message}
                    close={handleCloseSnackbar}
                />                        
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
        pure: true
    }
)(withStyles(styles)(Client)));

export { connectedHomePage as Client };

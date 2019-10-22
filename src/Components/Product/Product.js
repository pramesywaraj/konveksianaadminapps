import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import AddIcon from '@material-ui/icons/Add';


class Product extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <Box display='flex' flexDirection='row-reverse'>
                                <Button variant="contained" color="primary" >
                                    <AddIcon />
                                    Tambah Kategori
                                </Button>
                            </Box>
                            
                            <h2>How to make undefine</h2>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>

                        </Paper>
                        <Paper className={[classes.paper, classes.marginTop10].join(' ')}>
                            
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(1),
    },

    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary
    },

    marginTop10: {
        marginTop: '10px'
    },

    addButton: {
        float: 'right'
    }
});


Product.propTypes = {
    classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return state;
}

const connectedHomePage = withRouter(connect(mapStateToProps, null, null, 
    {
        pure: false
    }
)(withStyles(styles)(Product)));

export { connectedHomePage as Product };

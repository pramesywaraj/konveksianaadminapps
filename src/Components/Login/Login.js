import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { history } from '../../Helpers/history';
import { userActions } from '../../Actions/userActions';


import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';


function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      <Link color="primary" href="https://codepanda.id/">
        Codepanda.id
      </Link>
      {' team.'}
    </Typography>
  );
}

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  buttonProgress: {
    color: '#4caf50',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class Login extends Component {
    constructor(props) {
        super(props);

        if(localStorage.getItem('auth')) {
            history.push('/dashboard');
        }

        this.state = {
            email: '',
            password: '',
            showPassword: false,
            loading: false
        }
    }

    componentWillReceiveProps(newProps){
        this.setState({ loading: newProps.loading });
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    }

    handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            this.login();
        }
    } 

    login = (e) => {
        this.setState({ loading : true });
        const { email, password } = this.state;
        const { dispatch } = this.props;
        if(email && password) {
            dispatch(userActions.login(email, password));
        } else {
            alert('Anda belum mengisi email atau password. Silahkan masukkan email atau password Anda terlebih dahulu.');
            this.setState({ loading: false });
        }
    }

    render() {
        const { classes } = this.props;
        const { loading } = this.state;
        return (
            <Container component="main" maxWidth="xs">
                {loading ? <LinearProgress variant="query" /> : ''}
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        K
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Konveksiana Admin Apps
                    </Typography>
                    {/* <form className={classes.form} noValidate> */}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Alamat Email Admin"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={this.state.email}
                            onChange={this.handleChange('email')}
                            onKeyPress={(e) => this.handleKeyPress(e)} 
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={this.state.value}
                            onChange={this.handleChange('password')}
                            onKeyPress={(e) => this.handleKeyPress(e)} 
                        />
                        {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={loading}
                            onClick={(e) => {this.login()}} 
                        >
                            Login
                        </Button>
                    {/* </form> */}
                </div>
                <Box m={5}>
                    <MadeWithLove />
                </Box>
            </Container>
        );
    }
  
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    const { loggingIn, loading } = state.authentication;
    return {
        loggingIn,
        loading
    };
}

const connectedLoginPage = withRouter(connect(mapStateToProps, null, null, {
    pure: false
}) (withStyles(styles)(Login)));

export { connectedLoginPage as Login };
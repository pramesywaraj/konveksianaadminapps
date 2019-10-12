import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
// import LayersIcon from '@material-ui/icons/Layers';
import { userActions } from '../../Actions/userActions';
import { connect } from 'react-redux';
// import AssignmentIcon from '@material-ui/icons/Assignment';

import { NavLink as RouterLink } from 'react-router-dom';

function ListItemNavLink(props) {
    const { icon, primary, to } = props;
  
    const renderLink = React.useMemo(
      () =>
        React.forwardRef((itemProps, ref) => (
          // with react-router-dom@^5.0.0 use `ref` instead of `innerRef`
          <RouterLink to={to} {...itemProps} innerRef={ref} />
        )),
      [to],
    );
  
    return (
        <ListItem button component={renderLink}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={primary} />
        </ListItem>
    );
}

ListItemNavLink.propTypes = {
    icon: PropTypes.node.isRequired,
    primary: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired,
};

class SidemenuItems extends Component {

    constructor(props){
        super(props);
        this.state = {
            selected: ''
        };
    }

    logout = () => {
        const { dispatch } = this.props;
        dispatch(userActions.logout());
    }

    render() {
        const { selected } = this.state;
        return (
            <div>
                <ListItemNavLink to='/dashboard' primary='Dashboard' icon={<DashboardIcon />} />
                <ListItemNavLink to='/orders' primary='Orders' icon={<ShoppingCartIcon />} />
                <ListItemNavLink to='/products' primary='Products' icon={<ShoppingBasketIcon />} />
                <ListItemNavLink to='/clients' primary='Clients' icon={<BusinessCenterIcon />} />
            
                <ListItem style={{color: 'red'}} button onClick={this.logout}>
                    <ListItemIcon>
                        <ExitToAppIcon style={{color: 'red'}} />
                    </ListItemIcon>
                    <ListItemText primary="Keluar" />
                </ListItem>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
       state
    };
}
export default connect(mapStateToProps)(SidemenuItems);
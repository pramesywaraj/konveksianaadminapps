import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Layout from './Layout/Layout';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props, ref) => (
        localStorage.getItem('auth') 
            ? 
            <Layout>
                <Component {...props} ref={ref} /> 
            </Layout>
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )} 
    />
)
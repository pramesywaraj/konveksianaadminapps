import React from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCartRounded';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%'
    },
    content: {
        alignItems: 'center',
        display: 'flex'
    },
    title: {
        fontWeight: 700
    },
    avatar: {
        backgroundColor: 'rgb(1, 102, 196)',
        height: 56,
        width: 56
    },
    icon: {
        height: 32, 
        width: 32
    },
    difference: {
        marginTop: theme.spacing(2),
        display: 'flex',
        alignItems: 'center'
    }
}));

export const TotalOrders = props => {
    const { className, orderCount } = props;

    const classes = useStyles();

    return (
        <Card
            className={clsx(classes.root, className)}
        >
            <CardContent>
                <Grid
                    container
                    justify="space-between"
                >
                    <Grid item>
                        <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                            variant="body2"
                        >
                            TOTAL PESANAN
                        </Typography>
                        <Typography variant="h4">
                            {orderCount} <span style={{fontSize: '.5em'}}>pesanan.</span>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <AddShoppingCartIcon className={classes.icon} />
                        </Avatar>
                    </Grid>
                </Grid>
                <div className={classes.difference}>
                    
                </div>
            </CardContent>
        </Card>
    );
};
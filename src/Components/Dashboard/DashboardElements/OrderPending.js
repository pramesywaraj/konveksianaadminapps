import React from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import AvTimerIcon from '@material-ui/icons/AvTimerRounded';

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
        backgroundColor: '#e53935',
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

export const OrderPending = props => {
    const { className, pendingCount } = props;

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
                            PESANAN TERTUNDA
                        </Typography>
                        <Typography variant="h4">
                            {pendingCount} <span style={{fontSize: '.3em'}}>pesanan tertunda.</span>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <AvTimerIcon className={classes.icon} />
                        </Avatar>
                    </Grid>
                </Grid>
                <div className={classes.difference}>
                    
                </div>
            </CardContent>
        </Card>
    );
};
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const styles = makeStyles(
    (theme) => ({
        badge: {
            display: "inline-block",
            minWidth: "1em",
            padding: ".3em",
            borderRadius: "4px",
            textAlign: "center"
        },
        orderDone: {
            background: "rgb(3,172,14)",
            color: "white"
        },
        orderRejected: {
            background: "rgb(226,0,0)",
            color: "white"
        },
        orderPending: {
            background: "rgb(255,199,0)",
            color: "black"
        },
        orderOngoing: {
            background: "#3f51b5",
            color: 'white'
        }
    })
)


export default function StatusBadge({type, children}) {
    const classes = styles();

    return (
        <span 
            className={clsx({
                [classes.badge]: true,
                [classes.orderDone]: type === 'done',
                [classes.orderRejected]: type === 'reject',
                [classes.orderPending]: type === 'pending',
                [classes.orderOngoing]: type === 'ongoing',
            })}
        >
            {children}
        </span>
    )
}

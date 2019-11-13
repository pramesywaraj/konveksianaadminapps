import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';

const styles = makeStyles(theme => ({
    // modal: {
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    // },

    // paper: {
    //     backgroundColor: theme.palette.background.paper,
    //     borderRadius: '15px',
    //     boxShadow: theme.shadows[5],
    //     padding: theme.spacing(5, 10),
    //     width: '50%'
    // },

    // root: {
    //     top: '121px',
    //     left: 0,
    //     right: 0,
    //     bottom: 0,
    //     zIndex: '-1',
    //     position: 'fixed',
    //     touchAction: 'none',
    //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // }
}));

export default function CategoriesStepModal(props) {
    const classes = styles();
    return (
        <Dialog
            open={true}
            container={() => document.getElementById('for-step-modal')}
            style={{position: 'absolute'}}
            BackdropProps={{ style: { position: 'absolute' } }}
        >
           Hahahah
        </Dialog>
    )
}

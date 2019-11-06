import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const styles = makeStyles(theme => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    paper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '15px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(5, 10),
        width: '50%'
    },
}));

const CustomModal = (props) => {
    const classes = styles();
    return (
        <div>
            <Modal
                className={classes.modal}
                open={props.modal}
                onClose={props.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.modal}>
                    <div className={classes.paper}>
                        {props.children}
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};

export default CustomModal;

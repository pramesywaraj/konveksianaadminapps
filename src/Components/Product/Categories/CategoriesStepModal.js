import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = makeStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2)
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    },
    paper: {
        height: '100%'
    }

}));

export default function CategoriesStepModal(props) {
    const classes = styles();
    return (
        <Dialog
            scroll='paper'
            classes={
                {
                    paper: classes.paper
                }
            }
            fullWidth={true}
            open={true}
            container={() => document.getElementById("for-step-modal")}
            style={{ position: "absolute" }}
            BackdropProps={{ style: { position: "absolute" } }}
            aria-labelledby="categories-step-dialog"
        >
            <MuiDialogTitle disableTypography className={classes.root}>
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                >
                    <CloseIcon />
                </IconButton>
            </MuiDialogTitle>
            <MuiDialogContent>
                <Typography variant="h6">Ini Isinya</Typography>

            </MuiDialogContent>
        </Dialog>
    );
}

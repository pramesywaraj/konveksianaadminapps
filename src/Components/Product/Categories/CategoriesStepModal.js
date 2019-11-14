import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
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
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'baseline',
    },
    tableContainer: {
        display: 'table',
        width: '100%',
        padding: 10,
    }

}));

export default function CategoriesStepModal(props) {
    const classes = styles();
    const { open, closeDialog, steps } = props;
    return (
        <Dialog
            scroll='paper'
            classes={
                {
                    paper: classes.paper
                }
            }
            fullWidth={true}
            open={open}
            container={() => document.getElementById("for-step-modal")}
            style={{ position: "absolute" }}
            BackdropProps={{ style: { position: "absolute" } }}
            aria-labelledby="categories-step-dialog"
        >
            <MuiDialogTitle disableTypography className={classes.root}>
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={() => closeDialog()}
                >
                    <CloseIcon />
                </IconButton>
            </MuiDialogTitle>
            <MuiDialogContent>
                <div className={classes.flexContainer}>
                    <TextField
                        id="outlined-basic"
                        className={classes.textField}
                        label="Nama langkah"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                    />
                    <Button color="primary">
                        Tambah
                    </Button>
                </div>
                <div>
                    <div className={classes.tableContainer}>
                        <div style={{display: 'table-cell', textAlign: 'start', fontSize: '14px'}}>
                            <p>Step 1</p>
                        </div>
                        <div style={{display: 'table-cell', textAlign: 'end'}}>
                            <IconButton  
                                aria-label="close"
                                color="secondary"
                            >
                                <CloseIcon />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </MuiDialogContent>
        </Dialog>
    );
}

import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = makeStyles((theme) => ({
    card: {
        width: '100%',
        marginTop: 20,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)'
        }
    },

    contentContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '10px 15px !important'
    },

    ripple: {
        backgroundPosition: "center",
        transition: "background 0.5s",
        "&:active": {
            backgroundColor: '#e0e0e0',
            backgroundSize: '100%',
            transition: "background 0s"
        }
    },

    flexGrow2: {
        flexGrow: 2
    }
}));

export default function MaterialCard(props) {
    const classes = styles();

    return (
        <Card className={classes.card} elevation={2}>
            <CardContent className={[classes.contentContainer, classes.ripple].join(' ')}>
                <div className={classes.flexGrow2}>
                    <Typography variant="body1">
                        {props.name}
                    </Typography>
                </div>
                <div>
                    <Button color="secondary" className={classes.button}>
                        Hapus
                    </Button>
                </div>
            </CardContent>
            
        </Card>
    )
}

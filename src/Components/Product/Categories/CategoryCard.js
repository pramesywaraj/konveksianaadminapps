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
            backgroundColor: '#c9c9c5'
        }
    },

    contentContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 15px !important'
    }
}));

export default function CategoryCard(props) {
    const classes = styles();

    return (
        <Card className={classes.card}>
            <CardContent className={classes.contentContainer}>
                <div>
                    <Typography variant="body1">
                        Jaket
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

import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = makeStyles((theme) => ({
    card: {
        width: '100%',
        display: 'flex',
        marginTop: 20,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)'
        }
    },

    contentContainer: {
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
    },

    marginAuto: {
        margin: 'auto'
    },

    body1Font: {
        fontSize: 14
    },

    selected: {
        backgroundColor: 'rgba(0, 0, 0, 0.08)'
    },
    
    editButton: {
        color: 'green'
    }
}));

export default function ProductCard(props) {
    const classes = styles();
    let CardClass = [classes.contentContainer, classes.ripple, classes.body1Font];

    if(props.id === props.selected) {
        CardClass.push(classes.selected);
    }

    return (
        <Card 
            className={classes.card} 
            elevation={2}
        >
            <div 
                className={classes.flexGrow2} 
            >
                <CardContent 
                    className={CardClass.join(' ')} 
                    onClick={props.onClicked}
                >
                    <p>
                        {props.product.name}
                    </p>
                </CardContent>
            </div>
            <div className={classes.marginAuto}>
                <CardContent className={classes.contentContainer}>
                    <Button 
                        onClick={props.onEdit} 
                        className={classes.editButton}
                    >
                        Edit
                    </Button>
                    <Button 
                        onClick={props.onDelete} 
                        color="secondary"
                    >
                        Hapus
                    </Button>
                </CardContent>
            </div>
            
        </Card>
    )
}

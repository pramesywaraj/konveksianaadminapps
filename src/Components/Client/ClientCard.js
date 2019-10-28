import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// import config from './config';

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
    },

    buttonFloatRight: {
        float: "right",
    },

    buttonDelete: {
        color: "red",
    },
});

const ImgMediaCard = props => {
    const classes = useStyles();
	const baseUrl = "https://endpoint.konveksiana.id/";
	const [status, setStatus] = useState(props.clientProps.status);

    const deleteHandler = () => {
		let answer = window.confirm('Apakah Anda yakin untuk menghapus Client ini?');
		if(answer) {
			props.onDelete(props.clientProps._id);
		}
	};

	const statusOnChange = () => {
		setStatus(!status);
		props.onChangeStatusHandle(props.clientProps._id);
	}

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Kindly refresh the page if you want to know this image :)"
                    height="140"
                    image={baseUrl + props.clientProps.urlImage}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.clientProps.name}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {props.clientProps.urlWeb}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.buttonFloatRight}>
                <FormControlLabel
                    value="top"
                    control={
                        <Switch
                            color="primary"
                            checked={status}
							onChange={statusOnChange}
                        />
                    }
                    label="Sembunyikan"
                    labelPlacement="start"
                />
                <Button
                    className={classes.buttonDelete}
                    size="small"
                    onClick={deleteHandler}
                >
                    Hapus
                </Button>
            </CardActions>
        </Card>
    );
};

export default ImgMediaCard;

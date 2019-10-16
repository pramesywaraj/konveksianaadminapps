import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// import config from './config';

const useStyles = makeStyles({
	card: {
		maxWidth: 345,
	},

	buttonFloatRight: {
		float: 'right'
	},

	buttonDelete: {
		color: 'red'
	}
});

const ImgMediaCard = props => {
  const classes = useStyles();
//   const baseUrl = "endpoint.konveksiana.id/";

  return (
    <Card className={classes.card}>
		<CardActionArea>
			<CardMedia
				component="img"
				alt="Contemplative Reptile"
				height="140"
				image="endpoint.konveksiana.id/uploads/clients/1565793496000r.jpg"
				title="Contemplative Reptile"
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="h2">
					{props.clientProps.name}
				</Typography>
				<Typography variant="body2" color="textSecondary" component="p">
					{props.clientProps.urlWeb}
				</Typography>
			</CardContent>
		</CardActionArea>
		<CardActions className={classes.buttonFloatRight}>
			<FormControlLabel
				value="top"
				control={<Switch color="primary" value={props.clientProps.status}/>}
				label="Sembunyikan"
				labelPlacement="start"
			/>
			<Button className={classes.buttonDelete} size="small">
				Hapus
			</Button>
		</CardActions>
    </Card>
  );
}

export default ImgMediaCard;
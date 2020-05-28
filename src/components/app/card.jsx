import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    backgroundColor: "white",
  },
  media: {
    height: 300,
  },
});

class CardComp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {    
    const { classes } = this.props;
    return (
        <Card className={classes.root}>
            <CardActionArea>
            <CardMedia
                className={classes.media}
                image={this.props.image}
                title={this.props.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                {this.props.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                id: {this.props.id}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                STATUS: {this.props.status}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                SPECIES: {this.props.species}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                GENDER: {this.props.gender}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                ORIGIN: {this.props.origin.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                LAST LOCATION: {this.props.location.name}
                </Typography>
            </CardContent>
            </CardActionArea>
        </Card>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CardComp);
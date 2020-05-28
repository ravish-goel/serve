import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from './card';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    backgroundColor: "white",
  },
  media: {
    height: 300,
  },
});

class GridComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {characterArray: []};
  }

  render() {    
    const { classes } = this.props;
    return (
      <Grid container spacing={1}>
          {this.props.characterArray.map((character)=>{
            return (
              <Grid item xs={6} sm={6} md={3} lg={3}>
                  <Card {...character}></Card>
              </Grid>
            )
          })
        }
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(GridComp);
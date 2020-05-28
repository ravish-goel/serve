import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function Filter({name, options, applyFilter}) {
  const classes = useStyles();
  //const [state, setState] = React.useState(options)

  const handleChange = (event) => {
    applyFilter(name, {[event.target.name]: event.target.checked});
    //setState({ ...state, [event.target.name]: event.target.checked });
  };
  
  return (
    <div className={classes.root}>
      <Typography variant="h6" gutterBottom>{name}</Typography>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup>
        {
            Object.keys(options).map(key => 
                <FormControlLabel
                    control={<Checkbox checked={options[key]} onChange={handleChange} name={key} />}
                    label={key}
                />
            )
        }
        </FormGroup>
      </FormControl>
    </div>
  );
}

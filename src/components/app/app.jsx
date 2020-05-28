import React from "react";
import gql from 'graphql-tag';
import fetch from 'node-fetch';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { withStyles } from "@material-ui/core/styles";
import Grid from './grid';
import { url, fillArrayWithTrueValues } from '../../../utils';
import Filter from './filter';
import Sort from './sort';
import Search from './search';
import _ from 'lodash';

const styles = theme => ({
  root: {
    backgroundColor: "white",
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
  },
  searchAndSortBox: {
    padding: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      flexDirection: 'row'
    },
  },
  media: {
    height: 300,
  },
  spacedOut: {
    padding: 24,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      padding: 48,
      width: 'fit-content'
    },
  }
});

const client = new ApolloClient({
  link: createHttpLink({
    uri: `${url}/graphql`,
    fetch: fetch,
  }),
  cache: new InMemoryCache(),
})


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {characterArray: [],
      gender: {"Male": false, "Female": false},
      species: {"Human": false, "Alien": false, "Animal": false, "Mytholog": false},
      origin: {"Earth (Replacement Dimension)": false, "unknown": false, "Nuptia 4": false},
      sort: "ASCENDING",
      name: ""
    };
  }

  makeQuery = () => {
    var vars = {};
    var that = this;
    var genderArray = [];
    fillArrayWithTrueValues(genderArray, that.state.gender);
    if(genderArray.length){
      vars["gender"] = genderArray;
    }
    var speciesArray = [];
    fillArrayWithTrueValues(speciesArray, that.state.species)
    if(speciesArray.length){
      vars["species"] = speciesArray;
    }
    var originArray = [];
    fillArrayWithTrueValues(originArray, that.state.origin)
    if(originArray.length){
      vars["origin"] = originArray;
    }
    vars["sort"] = this.state.sort;
    vars["name"] = this.state.name;
    this.execQuery(vars);
  }

  execQuery = (vars) => {
    client.query({
      query: gql`
        query fullData($gender:JSON, $origin:JSON, $species:JSON, $name:String, $sort:Order){
          getAll(input: {gender: $gender, origin: $origin, species: $species, name: $name, sort: $sort}) {
            id
            name
            status
            species
            type
            gender
            origin
            location
            image
            url,
            created,
          }
        }
      `,
      variables: vars
    })
      .then(data => {
        console.log(data)
        this.setState((oldState)=>{
          return {
            characterArray: data.data.getAll
          }
        })
      })
      .catch(error => console.error(error));
  }

  applySearch = (value) =>{
    this.setState((oldState)=>{
      return {
        name: value
      }
    })
  }

  applySort = (option) => {
    this.setState((oldState)=>{
      return {
        sort: option
      }
    })
  }

  applyFilter = (name, option) => {
    this.setState((oldState)=>{
      return { 
        [name]: {
          ...oldState[name],
          ...option
        }
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if(!_.isEqual(prevState.gender, this.state.gender) ||
      !_.isEqual(prevState.origin, this.state.origin) ||
      !_.isEqual(prevState.species, this.state.species) ||
      prevState.sort !== this.state.sort ||
      prevState.name !== this.state.name
    ){
      this.makeQuery();
    }
  }

  componentDidMount() {
    this.makeQuery();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.filterBox}>
          <Filter applyFilter={this.applyFilter} name="gender" options={this.state.gender}></Filter>
          <Filter applyFilter={this.applyFilter} name="species" options={this.state.species}></Filter>
          <Filter applyFilter={this.applyFilter} name="origin" options={this.state.origin}></Filter>
        </div>
        <div>
          <div className={classes.searchAndSortBox}>
            <div className={classes.spacedOut}>
              <Sort  value={this.state.sort} options={['ASCENDING', 'DESCENDING']} applySort={this.applySort}></Sort>
            </div>
            <div className={classes.spacedOut}>
              <Search applySearch={this.applySearch} className={classes.spacedOut}></Search>
            </div>
          </div>
          <Grid characterArray={this.state.characterArray}></Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
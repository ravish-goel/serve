const { ApolloServer, gql } = require('apollo-server-express');
const fetch = require('node-fetch');
const GraphQLJSONObject = require('graphql-type-json').GraphQLJSONObject;
const GraphQLJSON = require('graphql-type-json').GraphQLJSON;
var JSONResponse = [];
const getData = async (url)=>{
    var res = await fetch(url);
    var data = await res.json();
    JSONResponse = [...JSONResponse, ...data.results]
    if(data.info.next){
        await getData(data.info.next);
    }
    return "Data Fetched"
}

getData('https://rickandmortyapi.com/api/character/').then((msg)=>{
    console.log(msg)
})

const typeDefs = gql`
  scalar JSON
  scalar JSONObject
  enum Order {
    ASCENDING
    DESCENDING
  }

  type Character {
    id: Int,
    name: String,
    status: String,
    species: String,
    type: String,
    gender: String,
    origin: JSONObject,
    location: JSONObject,
    image: String,
    episode: JSON,
    url: String,
    created: String,
  }

  input CharacterInput {
    species: JSON,
    gender: JSON,
    origin: JSON,
    name: String,
    sort: Order
  }

  type Query {
    getAll(input: CharacterInput): [Character]
  }
`;

const resolvers = {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
  Query: {
    /*getAll: () => {
        return JSONResponse;
    },*/
    getAll: (_,{input}) => {
        if(input){
            if(input.sort === 'ASCENDING'){
                JSONResponse = JSONResponse.sort((a, b)=>{
                    return Number(a.id) - Number(b.id);
                })
            }
            else if(input.sort === 'DESCENDING'){
                JSONResponse = JSONResponse.sort((a, b)=>{
                    return Number(b.id) - Number(a.id);
                })
            }
            return JSONResponse.filter((character)=>{
                var filter = true;
                if(input.gender){
                    filter = filter && input.gender.includes(character.gender);
                }
                if(input.species){
                    filter = filter && input.species.includes(character.species);
                }
                if(input.origin){
                    filter = filter && input.origin.includes(character.origin.name);
                }
                if(input.name){
                    filter = filter && character.name.toLowerCase().indexOf(input.name.toLowerCase()) > -1;
                }
                return filter
            });
        }
        else{
            return JSONResponse;
        }
    }
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
module.exports = server;

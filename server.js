const bodyParser = require('body-parser');
const express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
    quoteOfTheDay: () => {
        return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
    },
    random: () => {
        return Math.random();
    },
    rollDice: function (args) {
        var output = [];
        for (var i=0; i < args.numDice; ++i){
            output.push(1 + Math.floor(Math.random() * (args.numSides || 6)));
        }
        return output;
    },
};

app
    .prepare()
    .then(() => {
        const server = express()

        server.use('/graphql', bodyParser.json(), graphqlHTTP({
            schema: schema,
            rootValue: root,
            graphiql: true,
          }))

        server.get('/p/:id', (req, res) => {
            const actualPage = '/post'
            const queryParams = {title: req.params.id}
            app.render(req, res, actualPage, queryParams)
        })

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(3000, err=> {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch(ex => {
        console.error(ex.stack)
        process.exit(1)
    })

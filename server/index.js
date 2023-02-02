const express = require('express');

const { graphqlHTTP } = require('express-graphql');

require('dotenv').config();

const cors = require('cors');

const connectDB = require('./utils/connectDb');

const schema = require('./schema/schema');


connectDB()

const port = process.env.PORT || 8000 ;

const app = express();

app.use(cors());

app.listen(port , console.log(`server running on port ${port}`));

app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );
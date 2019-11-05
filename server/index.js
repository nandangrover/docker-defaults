const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/RootSchema');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

// To connect to our local mongodb instance running in our machine
// Install mongoDB using brew/apt
// Starting up local mongoDB: sudo docker exec -i -t <mongo image instance> bash
// Login using mongoDB compass
const db = require('./config/keys').mongoURI;

// Allow cross origin request
app.use(cors());

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDb connected ...')
  })
  .catch(err => console.log(err));

// Base api for all our graphql calls.
// Example Query : { quizes { id, authorName, quizType questions { id, question, options { option } } } }
app.use('/api/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
// if you're not using docker-compose for local development, this will default to 8080
// to prevent non-root permission problems with 80. Dockerfile is set to make this 80
// because containers don't have that issue :)

app.listen(PORT, () => console.log(`Now listening to port ${PORT}`))
const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const { QuizRootQueryFields, QuizMutationFields } = require('./QuizSchema/schema');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...QuizRootQueryFields,
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...QuizMutationFields,
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
const graphql = require('graphql');
const Quiz = require('../../models/QuizModel/quiz');
const Question = require('../../models/QuizModel/question');
const Option = require('../../models/QuizModel/option');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLInt } = graphql;



/**
 * Defining the quizType schema which is the root structure for our quiz app
 */
const QuizType = new GraphQLObjectType({
  name: 'Quiz',
  fields: () => ({
    id: { type: GraphQLID },
    authorName: { type: GraphQLString},
    quizType: { type: GraphQLString},
    shortDesc: { type: GraphQLString},
    date: { type: GraphQLID },
    questions: {
      type: new GraphQLList(QuestionType),
      resolve: (parent, args) => Question.find({ quizId: parent.id })
    },
  })
});

/**
 * Questions inside the quiz app which consists of a quiz id,
 * corelating it to the quiz it belongs to.
 */
const QuestionType = new GraphQLObjectType({
  name: 'Question',
  fields: () => ({
    id: { type: GraphQLID },
    quizId: { type: GraphQLID },
    question: { type: GraphQLString },
    date: { type: GraphQLID },
    time: { type: GraphQLInt },
    options: {
      type: new GraphQLList(OptionType),
      resolve: (parent, args) => Option.find({ questionId: parent.id })
    },
    quiz: {
      type: QuizType,
      resolve: (parent, args) => Quiz.findById(parent.quizId)
    },
  })
});

/**
 * Options inside the quiz app which consists of a question id,
 * corelating it to the question it belongs to.
 */
const OptionType = new GraphQLObjectType({
  name: 'Option',
  fields: () => ({
    id: { type: GraphQLID },
    questionId: { type: GraphQLID },
    option: { type: GraphQLString},
    date: { type: GraphQLID },
    question: {
      type: QuestionType,
      resolve: (parent, args) => Question.findById(parent.questionId)
    },
  })
});

/**
 * Root query fields which can be used to query our graphql api for data,
 * inside the quiz, questions and options schema
 */
const QuizRootQueryFields = {
  quiz: {
    type: QuizType,
    args: { id: { type: GraphQLID }},
    resolve: (parent, args) => Quiz.findById(args.id),
  },
  question: {
    type: QuestionType,
    args: {id: { type: GraphQLID }},
    resolve: (parent, args) => Question.findById(args.id),
  },
  option: {
    type: OptionType,
    args: {id: { type: GraphQLID }},
    resolve: (parent, args) => Question.findById(args.id),
  },
  quizes: {
    type: new GraphQLList(QuizType),
    resolve: (parent, args) => Quiz.find({}),
  },
  questions: {
    type: new GraphQLList(OptionType),
    resolve: (parent, args) => Option.find({}),
  }
};

/**
 * Mutations to insert data inside of our Quiz database
 */
const QuizMutationFields = {

  addQuiz: {
    type: QuizType,
    args: {
      authorName: { type: new GraphQLNonNull(GraphQLString) },
      quizType: { type: new GraphQLNonNull(GraphQLString) },
      shortDesc: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: (parent, args) => {
      let quiz = new Quiz({
        authorName: args.authorName,
        quizType: args.quizType,
        shortDesc: args.shortDesc,
      });
      return quiz.save();
    }
  },

  deleteQuiz: {
    type: QuizType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: async (parent, args) => {
      // This part acts weird as I get a cursor object from mongo which is actually as promise,
      // Don't really know why I am getting such an object here but this works
      // Anyone who gets what's happening here feel free to share the knowledge
      const questions = await Question.find({ quizId: args.id }).exec();
      
      // We are handling promises so for-of to the rescue
      for (const question of questions) {
        Question.findByIdAndRemove(question.id).exec();
        const options = await Option.find({ questionId: question.id }).exec();
        options.forEach(({ id }) => Option.findByIdAndRemove(id).exec());
      }

      // Delete them quizzes
      Quiz.findByIdAndRemove(args.id).exec();
      return { id: args.id };
    }
  },

  addQuestion: {
    type: QuestionType,
    args: {
      question: { type: new GraphQLNonNull(GraphQLString) },
      time: { type: new GraphQLNonNull(GraphQLInt) },
      quizId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: (parent, args) => {
      let question = new Question({
        question: args.question,
        time: args.time,
        quizId: args.quizId
      });
      return question.save();
    }
  },

  deleteQuestion: {
    type: QuestionType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: async (parent, args) => {
      Question.findByIdAndRemove(args.id).exec(); 
      return { id: args.id };
    }
  },

  addOption: {
    type: OptionType,
    args: {
      option: { type: new GraphQLNonNull(GraphQLString) },
      questionId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: (parent, args) => {
      let option = new Option({
        option: args.option,
        questionId: args.questionId
      });
      return option.save();
    }
  },

  deleteOption: {
    type: OptionType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: async (parent, args) => {
      Option.findByIdAndRemove(args.id).exec(); 
      return { id: args.id };
    }
  },
}

module.exports = { QuizType, QuestionType, OptionType, QuizRootQueryFields, QuizMutationFields };
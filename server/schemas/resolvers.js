const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find()
        },
        me: async (parent, args, context) => {
            if(!context.user){
                throw new AuthenticationError('Error, no user logged in!')
            }
            return User.findOne({ _id: context.user._id })
        },
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, profile }
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No user found with this email!')
            }

            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw){
                throw new AuthenticationError('Wrong Password!')
            }
            const token = signToken(user);
            return { token, user}
        },
        saveBook: async (parent, {book}, context) => {
            if(!context.user){
                throw new AuthenticationError('Error, no user logged in!')
            }
            return User.findOneAndUpdate(
                { _id: context.user._id },
                {
                    $addToSet: { savedBooks: book},
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
        },
        removeBook: async (parent, { bookId }, context) => {
            if(!context.user){
                throw new AuthenticationError('Error, no user logged in!')
            }
            return User.findOneAndUpdate(
                { _id: context.user._id},
                { $pull: { savedBooks: {bookId} }},
                { new: true }
            );
        },
    },
};

module.exports = resolvers;
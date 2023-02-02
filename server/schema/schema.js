const Blog = require('../models/Blog');
const User = require('../models/User');


const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType,
  } = require('graphql');


  const BlogType = new GraphQLObjectType({
    name: 'Blog',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      description: { type: GraphQLString },
      user: {
        type: UserType,
        resolve(parent, args) {
          return User.findById(parent.userId);
        },
      },
      image : { type: GraphQLString },
    }),
  });


  const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
    }),
  });


  const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      blogs: {
        type: new GraphQLList(BlogType),
        resolve(parent, args) {
          return Blog.find();
        },
      },
      blog: {
        type: BlogType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          return Blog.findById(args.id);
        },
      },
      users: {
        type: new GraphQLList(UserType),
        resolve(parent, args) {
          return User.find();
        },
      },
      user: {
        type: UserType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          return User.findById(args.id);
        },
      },
    },
  });
  
  // Mutations
  const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      // Add a client
      addUser: {
        type: UserType,
        args: {
          name: { type: GraphQLNonNull(GraphQLString) },
          email: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve(parent, args) {
          const user = new User({
            name: args.name,
            email: args.email,
          });
  
          return user.save();
        },
      },
      // Delete a client
      deleteUser: {
        type: UserType,
        args: {
          id: { type: GraphQLNonNull(GraphQLID) },
        },
        resolve(parent, args) {
          Blog.find({ clientId: args.id }).then((blogs) => {
            blogs.forEach((blog) => {
              blog.remove();
            });
          });
  
          return User.findByIdAndRemove(args.id);
        },
      },
      // Add a project
      addBlog: {
        type: BlogType,
        args: {
          name: { type: GraphQLNonNull(GraphQLString) },
          description: { type: GraphQLNonNull(GraphQLString) },
          image : { type: GraphQLNonNull(GraphQLString) }
        },
        resolve(parent, args) {
          const blog = new Blog({
            name: args.name,
            description: args.description,
            image : args.image
          });
  
          return blog.save();
        },
      },
      // Delete a project
      deleteBlog: {
        type: BlogType,
        args: {
          id: { type: GraphQLNonNull(GraphQLID) },
        },
        resolve(parent, args) {
          return Blog.findByIdAndRemove(args.id);
        },
      },
      // Update a project
      updateBlog: {
        type: BlogType,
        args: {
          id: { type: GraphQLNonNull(GraphQLID) },
          name: { type: GraphQLString },
          description: { type: GraphQLString },
          image : { type: GraphQLNonNull(GraphQLString) }
        },
        resolve(parent, args) {
          return Blog.findByIdAndUpdate(
            args.id,
            {
              $set: {
                name: args.name,
                description: args.description,
                image: args.image,
              },
            },
            { new: true }
          );
        },
      },
    },
  });


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
  });
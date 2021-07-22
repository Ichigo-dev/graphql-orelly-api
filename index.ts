import { ApolloServer } from 'apollo-server';

const typeDefs: string = `
  type Query {
    totalPhotos: Int!
  }

    type Mutation {
      postPhoto(name: String! description: String): String!
    }
`;

type PhotoType = {
  name: string,
  description: string,
};

var photos: PhotoType[] = []

const resolvers = {
  Query: {
    totalPhotos: (): number => photos.length
  },
  Mutation: {
    postPhoto(parent: any, args: PhotoType) {
      photos.push(args);
      return JSON.stringify(args);
    }
  }
}

const server: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers
})

server
  .listen()
  .then(({url}) => console.log(`GraphQL Service running on ${url}`))

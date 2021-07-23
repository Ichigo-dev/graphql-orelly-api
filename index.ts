import { ApolloServer } from 'apollo-server';

const typeDefs: string = `
  type Photo {
    id: ID!
    url: String!
    name: String!
    description: String
  }

  type Query {
    totalPhotos: Int!
    allPhotos: [Photo!]!
  }

    type Mutation {
      newPhoto(name: String! description: String): Photo!
    }
`;

type PhotoType = {
  name: string,
  description: string,
};

var _id: number = 0
var photos: PhotoType[] = []

const resolvers = {
  Query: {
    totalPhotos: (): number => photos.length,
    allPhotos: (): PhotoType[] => photos
  },
  Mutation: {
    newPhoto(parent: any, args: PhotoType) {
      var tmp_photo = {
        id: _id++,
        ...args
      };
      photos.push(tmp_photo);
      return tmp_photo;
    }
  },
  Photo: {
    url: (parent: any) => `http://yoursite.com/img/${parent.id}`
  }
}

const server: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers
})

server
  .listen()
  .then(({url}) => console.log(`GraphQL Service running on ${url}`))

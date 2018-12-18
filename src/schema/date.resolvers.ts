import { GraphQLScalarType, Kind } from 'graphql';

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date-time value',
    parseValue: value => new Date(value),
    serialize: value => value.getTime(),
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return new Date(ast.value)
        }
        return null;
    },
});

export default dateScalar;
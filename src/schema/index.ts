import { readFileSync } from "fs";

const typeDefs = readFileSync('./src/schema/schema.graphql', { encoding: 'utf-8' });

export default typeDefs;
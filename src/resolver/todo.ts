import { todoList } from "@@db";
import { Resolvers } from "@@types";

export const resolvers: Resolvers = {
  Query: {
    list: () => todoList,
  },
}
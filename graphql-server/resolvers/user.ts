import { User } from '../interface/User';
import { LoginUser } from '../interface/User';

export const userResolves = {
    Query: {
        getUsers: async(_, __, { dataSources }: any) => {
            return await dataSources.UserAPI.getUsers();
        },
        getUser: async(_, { uuid }: User, { dataSources }: any) => {
            return await dataSources.UserAPI.getUser(uuid);
        },
    },
    Mutation: {
        loginUser: async(_,
            {userId, password}: LoginUser, 
            { dataSources }: any) => {
            return await dataSources.UserAPI.loginUser(userId, password)
        },
        createUser: async(_,
            { userId, password, confirmPassword }: LoginUser, 
            { dataSources }: any) => {
                return await dataSources.UserAPI.createUser(userId, password, confirmPassword)
        },
        updateUser: async(_, 
            {uuid, userId, password}: User, 
            { dataSources }: any) => {
                return await dataSources.UserAPI.updateUser(uuid, userId, password)
        },
        deleteUser: async(_,
            { uuid }: User,
            { dataSources }: any) => {
                return await dataSources.UserAPI.deleteUser(uuid)
            }
    }
}
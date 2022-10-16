import jwt from 'jsonwebtoken';
import { users, SECRET_TOKEN_ACCESS } from "../data/user.mjs"


const Queries = {
    user(_, __, { headers }) {
        const refresh = headers.authorization.split(' ')[1]
        const { data } = jwt.verify(refresh, SECRET_TOKEN_ACCESS)

        return users.find(item => item.id == data)
    },
    users(_, __, { headers }) {
        const refresh = headers.authorization.split(' ')[1]
        const { data } = jwt.verify(refresh, SECRET_TOKEN_ACCESS)

        return users
    }
}


export default Queries
import jwt from 'jsonwebtoken';
import { users, SECRET_TOKEN_ACCESS, SECRET_TOKEN_REFRESH } from '../data/user.mjs'


const Mutations = {
    signin(_, { email, password }, { headers }) {
        const userData = users.find((user) => user.email == email && user.password == password)

        if(!userData) {
            throw new Error('Пользователь не найден')
        }

        return {
            access: jwt.sign({ data: userData.id }, SECRET_TOKEN_ACCESS, { expiresIn: '1h' }),
            refresh: jwt.sign({ data: userData.id }, SECRET_TOKEN_REFRESH, { expiresIn: '1d' }),
        }
    },
    signup(_, { email, password }) {
        let userId = users.push({ 
            id: users.length,
            email,
            password
        })

        return {
            access: jwt.sign({ data: userId - 1 }, SECRET_TOKEN_ACCESS, { expiresIn: '1h' }),
            refresh: jwt.sign({ data: userId - 1 }, SECRET_TOKEN_REFRESH, { expiresIn: '2d' }),
        }        
    },
    refresh(_ , __, { headers }) {
        const refresh = headers.authorization.split(' ')[1]
        const { data } = jwt.verify(refresh, SECRET_TOKEN_REFRESH)

        return {
            access: jwt.sign({ data }, SECRET_TOKEN_ACCESS, { expiresIn: '1h' }),
            refresh: jwt.sign({ data }, SECRET_TOKEN_REFRESH, { expiresIn: '2d' }),
        }              
    }

}


export default Mutations
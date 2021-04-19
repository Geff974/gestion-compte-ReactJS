import { USER_AUTH, USER_UNAUTH, USER_INFO } from './type';

export const userAuth = () => {
    return {
        type: USER_AUTH
    }
}

export const userUnAuth = () => {
    return {
        type: USER_UNAUTH
    }
}

export const userInfo = (user) => {
    return {
        type: USER_INFO,
        user: {
            id: user.id,
            username: user.username,
            email: user.email
        }
    }
}

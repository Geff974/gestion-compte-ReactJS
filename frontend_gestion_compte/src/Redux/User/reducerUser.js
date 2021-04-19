import { USER_UNAUTH, USER_INFO } from './type';

const initialState = {
    isAuth: false,
    user: {
        id: null,
        username: '',
        email: ''
    }
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_UNAUTH:
            return {
                ...state,
                isAuth: true
            }

        case USER_INFO:
            return {
                ...state,
                user: {
                    id: action.user.id,
                    username: action.user.username,
                    email: action.user.email
                },
                isAuth: true
            }

        default:
            return state;
    }
}

export default userReducer;
import { USER_UNAUTH, USER_INFO } from './type';

const initialState = {
    isAuth: false,
    info: {
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
                isAuth: false,
                info: initialState.info
            }

        case USER_INFO:
            return {
                ...state,
                isAuth: true,
                info: {
                    id: action.user.id,
                    username: action.user.username,
                    email: action.user.email
                }
            }

        default:
            return state;
    }
}

export default userReducer;
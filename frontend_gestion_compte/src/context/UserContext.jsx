import React from 'react';

export default React.createContext({
    auth: false,
    user: {
        id: 0,
        username: '',
        email: ''
    },
    setAuth: (auth) => { },
    setUser: (user) => { }
})
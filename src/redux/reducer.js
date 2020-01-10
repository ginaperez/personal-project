const initialState = {
    user: null,
    cart: [],
    loading: false,
    registerMessage: "",
    loginMessage: ""
};

export const SET_USER = "SET_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const ADD_TO_CART = "ADD_TO_CART";
export const SET_REGISTER_MESSAGE = "SET_REGISTER_MESSAGE";
export const SET_LOGIN_MESSAGE = "SET_LOGIN_MESSAGE";

export default function reducer(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case SET_USER:
            return { 
                ...state,
                user: payload 
            };
        case LOGOUT_USER: 
            return {
                ...state,
                user: null
            }
        case SET_REGISTER_MESSAGE:
            return { 
                ...state,
                registerMessage: payload 
            };
        case SET_LOGIN_MESSAGE:
            return {
                ...state,
                loginMessage: payload
            }
        default:
            return state;
    }
}

export function setUser(user) {
    return {
        type: SET_USER,
        payload: user
    };
};

export function setRegisterMessage(message) {
    return {
        type: SET_REGISTER_MESSAGE,
        payload: message
    };
};

export function setLoginMessage(message) {
    return {
        type: SET_LOGIN_MESSAGE,
        payload: message
    };
};

export function logOutUser() {
    return {
        type: LOGOUT_USER,
        payload: null
    }
};

export function addToCart(arr) {
    return {
        type: ADD_TO_CART,
        payload: arr
    }
};

const initialState = {
    user: null,
    cart: [],
    loading: false,
    registerMessage: "",
    loginMessage: "",
    popupMessage: ""
};

export const SET_USER = "SET_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const ADD_TO_CART = "ADD_TO_CART";
export const SET_REGISTER_MESSAGE = "SET_REGISTER_MESSAGE";
export const SET_LOGIN_MESSAGE = "SET_LOGIN_MESSAGE";
export const SHOW_POPUP = "SHOW_POPUP";
export const HIDE_POPUP = "HIDE_POPUP";

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
        case SHOW_POPUP:
            return {
                ...state,
                popupMessage: payload
            }
        case HIDE_POPUP:
            return {
                ...state,
                popupMessage: payload
            }
        default:
            return state;
    }
}

export function hidePopup() {
    return {
        type: HIDE_POPUP,
        payload: ""
    }
}

export function showPopup(message) {
    return {
        type: SHOW_POPUP,
        payload: message
    }
};

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

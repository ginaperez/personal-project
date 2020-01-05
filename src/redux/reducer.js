const initialState = {
    user: null,
    cart: [],
    loading: false
};

export const SET_USER = "SET_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const ADD_TO_CART = "ADD_TO_CART";
export const GET_CART = "GET_CART";

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
        case GET_CART:
            return {
                ...state,
                cart: payload,
                loading: false
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
}

export function logOutUser() {
    return {
        type: LOGOUT_USER,
        payload: null
    }
};

export function getCart(arr) {
    return {
        type: GET_CART,
        payload: arr
    }
};

export function addToCart(arr) {
    return {
        type: ADD_TO_CART,
        payload: arr
    }
};

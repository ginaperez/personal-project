// // CART REDUCER

// const ADD_TO_CART = 'ADD_TO_CART';
// const GET_CART = 'GET_CART';

// const initialState = {
//     cart: [],
//     loading: false
// }

// export default function(state = initialState, action) {
//     let { type, payload } = action

//     switch(type) {
//         case GET_CART + '_PENDING':
//             return {
//                 ...state,
//                 loading: true
//             }
//         case GET_CART + '_FULFILLED':
//             return {
//                 ...state,
//                 cart: payload,
//                 loading: false
//             }
//         case GET_CART + '_REJECTED':
//             return {
//                 ...state,
//                 loading: false
//             }

//         case ADD_TO_CART + '_PENDING':
//             return {
//                 ...state,
//                 loading: true
//             }
//         case ADD_TO_CART + '_FULFILLED':
//             return {
//                 ...state,
//                 cart: payload,
//                 loading: false
//             }
//         case ADD_TO_CART + '_REJECTED':
//             return {
//                 ...state,
//                 loading: false
//             }
//         default:
//             return state;
//     }
// }

// export function getCart(arr) {
//     return {
//         type: GET_CART,
//         payload: arr
//     }
// }

// export function addToCart(arr) {
//     return {
//         type: ADD_TO_CART,
//         payload: arr
//     }
// }


import firebase from '../firebase';

const initialState ={
    currentUser: null,
    isloading: false,
    currUser: {} 
}


const GET_INFO = "GET_INFO"
const SET_USER = "SET_USER";



export const getInfo = () => {
    return {
        type: GET_INFO,
        payload: console.log('he;;o')
    }
}

export const setUser = () => {
    return {
        type: SET_USER,
        payload: {
            currentUser: firebase.auth().currentUser
        }
    }
}



function reducer (state = initialState, action) {
    switch (action.type){
        case `${SET_USER}_FULFILLED`:
        return {
            currentUser: action.payload.currentUser,
            isloading: false
            // ...state
        };
        default:
        return state;
    }
}


export default reducer;
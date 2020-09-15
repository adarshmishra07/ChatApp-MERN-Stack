import axios from "axios";
import { GET_ERRORS ,SET_CURRENT_USER} from "./types";
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import { clearProfile } from "./profileAction";
//Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post('http://localhost:5000/auth/register', userData)
    .then((res) => {
      history.push("/login");
    })
    .catch((e) =>
      dispatch({
        type: GET_ERRORS,
        payload: e.response.data,
      })
    );
};

//Login User

export const loginUser = (userData) => (dispatch) => {
  axios
    .post('http://localhost:5000/auth/login', userData)
    .then((res) => {
        //Save to LocalStorage
        const {token} = res.data
        //Set token to ls
        localStorage.setItem('jwtToken',token);
        // Set token to auth Header
        setAuthToken(token);

        //decode tokem
        const decoded = jwt_decode(token)
        //setting current user
        dispatch(setCurrentUser(decoded))
    })
    .catch((e) =>
      dispatch({
        type: GET_ERRORS,
        payload: e.response.data,
      })
    );
};

//Set Current User (loggedin)

export const setCurrentUser = (decoded)=>{
    return {
        type : SET_CURRENT_USER,
        payload : decoded
    }
}


//LogOut

export const logoutUser = ()=>dispatch=>{
    //remove token from ls
    localStorage.removeItem('jwtToken')
    //remove auth header
    setAuthToken(false)
    //set current user to null
    dispatch(setCurrentUser({}))
    dispatch(clearProfile())

}


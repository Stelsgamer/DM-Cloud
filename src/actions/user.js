
import api from '../http/index'
import { setUser } from '../reducers/userReducer'
import axios from "axios";
import {setLoader} from "../reducers/appReducer";

export const registration = (email, password) => {

    return async dispatch => {
        try {
            const response = await api.post(
                "auth/registration",
                { email, password }
            )

            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.accessToken)
        } catch (e) {
            alert(e.response?.data?.message)
        }
    }
}




export const login = (email, password) => {

    return async dispatch => {
        try {
            const response = await api.post(
                "auth/login",
                { email, password }
            )
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.accessToken)


        } catch (e) {
            alert(e.response?.data?.message)
        }
    
    }


}

export const checkAuth = () => {
    return async dispatch => {
        try{
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/auth/refresh`,
                {withCredentials: true})
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.accessToken)

        }catch(e) {
            alert(e.response?.data?.message)
        }finally {
            dispatch(setLoader(false))
        }
    }


}


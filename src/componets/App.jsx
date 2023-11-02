import React, { useEffect } from "react";

import {BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Navbar from "./navbar/Navbar";
import Registration from "./registration/Registration";
import Login from "./login/Login";
import { useDispatch, useSelector } from "react-redux";
import Disk from "./disk/Disk";
import {checkAuth} from "../actions/user";
import {setLoader} from "../reducers/appReducer";

function App() {
  const isAuth = useSelector(state => state.user.isAuth)
  const isActivated = useSelector(state => state.user.currentUser.isActivated)
  const dispatch = useDispatch()


    useEffect( ()=> {
      if (localStorage.getItem('token')){
          dispatch(checkAuth())
      }else{
          dispatch(setLoader(false))
      }
  }, [])



    if(!isActivated && isAuth){
        return (
            <div>Активируйся</div>
        )
    }

    return (
        <BrowserRouter>
          <div className="app bg-[#ebf0ff] min-h-screen">
            <Navbar/>
            {!isAuth ?
                <Routes>
                  <Route path="/registration" element={<Registration/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="*" element={<Navigate to="/login"/>}/>
                </Routes>
                :
                <Routes>
                  <Route path="/login" element={<Navigate to="/"/>}/>
                  <Route path="/registration" element={<Navigate to="/"/>}/>
                  <Route path="*" element={<Disk/>}/>
                </Routes>

            }

          </div>
        </BrowserRouter>
    );


}

export default App;

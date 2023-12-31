import React, { useState } from 'react';
import logo from '../../assets/img/logo.svg'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/userReducer';
import { clearStack, setCurrentDir, setInfo } from '../../reducers/fileReducer';
import { getFiles, searchFiles } from '../../actions/file';
import { setLoader } from "../../reducers/appReducer";


function Navbar() {

    const isAuth = useSelector(state => state.user.isAuth)
    const currentDir = useSelector(state => state.files.currentDir)
    const [searchName, setSearchName] = useState('')
    const dispatch = useDispatch()
    const [searchTimeout, setSearchTimeout] = useState(false)



    const goHome = () => {
        dispatch(clearStack())
        dispatch(setInfo(""))
        dispatch(setCurrentDir(null))
    }

    const setSearchChangeHandler = (e) => {
        setSearchName(e.target.value)
        if (searchTimeout !== false) {
            clearTimeout(searchTimeout)
        }
        dispatch(setLoader(true))
        if (e.target.value !== '') {
            setSearchTimeout(setTimeout(() => {
                dispatch(searchFiles(e.target.value))
            },500, e.target.value))
        }else{
            dispatch(getFiles(currentDir))
        }

    }

    return (
        

        <header>
            <div className="flex items-center h-16 justify-between mx-8">


                <nav className='font-bold text-xl'><NavLink onClick={() => {goHome()}} to={"/"} className="flex items-center"><img src={logo} alt="Logo" className='h-12 mr-4' />DM Cloud</NavLink></nav>

                <div className="space-x-8 my-auto flex items-center">
                    {!isAuth && <nav className='font-semibold text-lg'><NavLink to={"/login"}>Войти</NavLink></nav>}
                    {!isAuth && <nav className='font-semibold text-lg'><NavLink to={"/registration"}>Регистрация</NavLink></nav>}
                    {isAuth && <div><input type="text"
                                           value={searchName}
                                           onChange={(e) => setSearchChangeHandler(e)}
                                           placeholder="Найти в диске"
                                           className="p-2 rounded-lg"
                    /></div>}
                    {isAuth && <nav className='font-semibold text-lg cursor-pointer' onClick={() => { dispatch(logout()) }}>Выход</nav>}

                </div>

            </div>


            
            
        </header>
    );
  }
  
export default Navbar;
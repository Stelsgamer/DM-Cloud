import React, { useState } from 'react';
import Input from '../../utils/input/Input';
import { registration } from '../../actions/user';
import { useDispatch } from 'react-redux';

function Registration() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()


    return (
        <div className='w-full bg-white mx-auto grid mt-20 grid-cols-1 px-12 md:max-w-xl rounded-xl py-6'>
            <div className='mx-auto text-2xl mb-3 font-semibold text-slate-500'>Регистрация</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Email"/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Пароль"/>
            <button onClick={() => dispatch(registration(email, password))} className='ml-auto mt-3 px-8 py-2 rounded-lg bg-slate-500 text-white hover:bg-slate-400 focus:bg-slate-400 '>Зарегистрироваться</button>
        </div>
    );
  }
  
export default Registration;
import React from 'react';
import { sendActivateEmail} from "../../actions/user";

function Activate() {
    return (
        <div className='w-full bg-white mx-auto grid mt-20 grid-cols-1 px-12 md:max-w-xl rounded-xl py-6'>
                <div className='text-2xl mb-3 font-semibold text-slate-500'>Подтвердите вашу почту</div>
                <div>На ваш почтовый адрес было выслано письмо с подтверждением регстрации в системе</div>
                <button onClick={() => sendActivateEmail()} className='ml-auto mt-3 px-8 py-2 rounded-lg bg-slate-500 text-white hover:bg-slate-400 focus:bg-slate-400 '>Отправить email заново</button>
        </div>
    );
}

export default Activate;
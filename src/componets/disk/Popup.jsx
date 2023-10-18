import React, { useState } from 'react';
import Button from '../../utils/button/Button';
import Input from '../../utils/input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupDisplay } from '../../reducers/fileReducer';
import { createDir } from '../../actions/file';

const Popup = () => {
    const [dirName, setDirName] = useState('Новая папка')
    const popupDisplay = useSelector(state => state.files.popupDisplay)
    const dispatch = useDispatch()
    const currentDir = useSelector((state) => state.files.currentDir)


    function createHandler() {
        if (dirName === '') 
            return alert('Имя папки не должно быть пустым')
        if (dirName.length > 50)
            return alert('Имя папки не должно быть более 50 символов')
        

        dispatch(createDir(currentDir, dirName.replace(/[^a-zа-яё\s?,.-_)]/gi, '')))
        setDirName('')
        dispatch(setPopupDisplay('none'))
    }

    return (
        <div onClick={() => dispatch(setPopupDisplay('none'))} style={{display: popupDisplay}} className='w-full h-screen absolute justify-center top-0 left-0 bg-black/10'>
            <div className='w-1/4 my-auto' onClick={(event => event.stopPropagation())}>
                <div className="bg-white px-6 py-3 rounded-lg">
                    <div className="flex justify-between py-3">
                        <div className="text-3xl">Создать новую папку</div>
                        <Button content="X" onClick={() => dispatch(setPopupDisplay('none'))} />
                    </div>
                    <Input type="text" placeholder="Введите название папки" className="py-2 mt-4 w-full" value={dirName} setValue={setDirName}/>
                    <div className="w-full flex justify-end py-2">
                        <Button className="border-b-2 hover:border-slate-500" onClick={() => createHandler()} content="Создать"/>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Popup;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, uploadFile } from '../../actions/file';
import FileList from './fileList/FileList';
import Popup from './Popup';
import plusIcon from './../../assets/img/bx-plus.svg' 
import uploadIcon from './../../assets/img/bx-upload.svg' 

import upload from '../../assets/img/upload.svg'
import { setPopupDisplay } from '../../reducers/fileReducer';
import Uploader from './uploader/Uploader';
import Info from './fileList/file/Info';

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const [dragEnter, setDragEnter] = useState(false)

    const sort = useSelector(state => state.files.sort.type)
    useEffect(() => {
        dispatch(getFiles(currentDir, sort))
    }, [currentDir, sort])

    function showPopupHandler() {
        dispatch(setPopupDisplay('flex'))
    }

    function fileUploadHandler (event) {
        const files = [...event.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }

    function dragEnterHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }

    function dragLeaveHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }

    function dropHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false)
    }

    return (
        <div onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler} className='w-full flex pb-3 mt-1 pl-5 pr-1 drop-shadow-md'>
            
            {/* Перетаскивание файлов в окно браузера */}
            {dragEnter &&
                <div onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler} className="fixed -top-20 left-0 z-10 h-full w-full">
                    <div className="h-full border-slate-500 bg-white/30 border-2 flex justify-center items-center border-dashed">
                        <div>
                            <img src={upload} alt="upload" className='mx-auto' />
                            <div className="text-3xl">Загрузить сюда</div>
                        </div>
                    </div>
                </div>
            }
            



            <div className="bg-slate-50 w-80 h-screen rounded-l-2xl px-5 pt-6">

                <div className='flex items-center'>
                    <label htmlFor='disk__upload' className='cursor-pointer bg-yellow-400 opacity-80 hover:opacity-100 transition duration-200 shadow-lg w-full px-4 text-center relative py-1.5 rounded-lg'>
                        Загрузить
                        <img className='absolute top-2 left-3' src={uploadIcon} alt="^" /> 
                    </label>
                    <input multiple={true} onChange={(event) => fileUploadHandler(event)} type="file" className='hidden' id="disk__upload"/>
                </div>
                
                <button onClick={()=> showPopupHandler()} className="mt-3 w-full bg-white hover:bg-white/80 transition duration-200 drop-shadow-lg px-4 py-1.5 rounded-lg relative">
                    Создать
                    <img className='absolute top-2 left-3' src={plusIcon} alt="+" />
                </button>

            </div>


            <div className="w-full">
                <Info/>
                <FileList/>
                <Popup/>
                <Uploader/>
            </div>
        </div>

    );
}

export default Disk;
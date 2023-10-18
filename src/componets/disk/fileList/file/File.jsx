import React, { useState } from 'react';
import dirLogo from '../../../../assets/img/dir.svg'
import EmptydirLogo from '../../../../assets/img/emptyDir.svg'
import fileLogo from '../../../../assets/img/file.svg'
import { useDispatch, useSelector } from 'react-redux';
import { pushToStack, setCurrentDir, setInfo } from '../../../../reducers/fileReducer';
import { deleteFile, downloadFile } from '../../../../actions/file';
import sizeFormat from '../../../../utils/sizeFormat';


const File = ({file}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const [clickTimeout, setClickTimeout] = useState(false)
    const [year, month, day] = file.date.slice(0,10).split('-')

    const clickHandler = (e) => {
        

            switch (e.detail) {
            case 1:
                if(clickTimeout === false){
                    setClickTimeout(setTimeout(() => {
                        setClickTimeout(false)
                        dispatch(setInfo(file))
                    },200))
                }
                break;
            case 2:
                clearTimeout(clickTimeout)
                if(file.type === 'dir') {
                    dispatch(pushToStack({currentDir, name: file.name}))
                    dispatch(setInfo(''))
                    dispatch(setCurrentDir(file._id))
                }

                break;
            default:
                
                if(file.type === 'dir') {
                    dispatch(pushToStack({currentDir, name: file.name}))
                    dispatch(setInfo(''))
                    dispatch(setCurrentDir(file._id))
                }
                break;
            }
        
    }


    function downloadClickHandler(e) {
        e.stopPropagation()
        downloadFile(file)
    }

    function deleteClickHandler(e) {
        e.stopPropagation()
        dispatch(deleteFile(file))
    }




    return (
        <div onClick={(e) => clickHandler(e)} className='grid grid-cols-6 mt-6 group mx-12 py-1 items-center hover:shadow-lg hover:bg-stone-100'>
            <img className="justify-self-center" draggable="false" src={file.type === 'dir' ? file.size === 0 ? EmptydirLogo:dirLogo : fileLogo} alt=''/>
            <div className='col-start-2 select-none truncate'>{file.name}</div>
            <div className='col-start-5 select-none group-hover:col-start-3 justify-self-center'>{day+'.'+month+'.'+year}</div>
            <div className='col-start-6 select-none group-hover:col-start-4 justify-self-center'>{sizeFormat(file.size)}</div>
            {file.type !== 'dir' && <button onClick={(e) => downloadClickHandler(e)} className='hidden select-none group-hover:block col-start-5'>download</button>}
            <button onClick={(e) => deleteClickHandler(e)} className='hidden select-none group-hover:block col-start-6'>delete</button>
        </div>
    );
}

export default File;

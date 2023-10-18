import React from 'react';
import { useDispatch } from 'react-redux';
import { removeUploadFile } from '../../../reducers/uploadReducer';

const UploadFile = ({file}) => {

    const dispatch = useDispatch()
    return (
        <div className='grid grid-cols-5 mt-3'>
            <div className='col-span-2 truncate'>{file.name}</div>
            <div> - {file.progress}%</div>
            <button onClick={() => dispatch(removeUploadFile(file.id))} className='col-span-2 justify-self-end'>Х</button>
            
            <div className='col-span-full rounded-3xl bg-slate-100'>
                <div className='bg-green-200 h-1 rounded-3xl' style={{width: file.progress + "%"}} />
            </div>
        </div>
    );
}

export default UploadFile;

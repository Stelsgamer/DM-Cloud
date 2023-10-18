import React from 'react';
import UploadFile from './UploadFile';
import { useDispatch, useSelector } from 'react-redux';
import { hideUploader } from '../../../reducers/uploadReducer';
import closeImg from '../../../assets/img/bx-x.svg'

const Uploader = () => {
    const files = useSelector(state => state.upload.files)
    const isVisible = useSelector( state => state.upload.isVisible)
    const dispatch = useDispatch()

    return ( isVisible &&
        <div className='fixed bg-white right-6 bottom-0 drop-shadow-xl w-96 h-96 rounded-t-md overflow-y-auto'>
            <div className="flex justify-between items-center bg-neutral-700 px-5 py-3 mb-3">
                <div className='text-sm font-bold text-white'>Загрузки</div>
                <button onClick={() => dispatch(hideUploader())}><img src={closeImg} alt="X"/></button>
            </div>
            
            {files.map(file => 
                <UploadFile key={file.id} file={file}/>
            )}
        </div>
    );
}

export default Uploader;

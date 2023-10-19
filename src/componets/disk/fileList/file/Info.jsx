import React from "react";
import { useDispatch, useSelector } from "react-redux";
import infoImg from '../../../../assets/img/bx-info-circle.svg'
import closeImg from '../../../../assets/img/bx-x.svg'
import { setInfo } from "../../../../reducers/fileReducer";
import {deleteFile, downloadFile} from "../../../../actions/file";
import deleteImg from "../../../../assets/img/bxs-trash-alt.svg"
import downloadImg from "../../../../assets/img/bxs-download.svg"

const Info = () => {

    const info = useSelector(state => state.files.info)
    const dispatch = useDispatch()

    function deleteClickHandler(e) {
        e.stopPropagation()
        dispatch(deleteFile(info))
        dispatch(setInfo(''))
    }

    function downloadClickHandler(e) {
        e.stopPropagation()
        dispatch(downloadFile(info))
    }

    const closeHandler = () => {
        dispatch(setInfo(''))
    } 



    return ( 
        <div className="absolute -top-[72px] left-0 w-full" style={info !== '' ? {display: "flex"} : {display: 'none'}}>
            <div className="mx-5 rounded-b-xl w-full py-4 text-white bg-zinc-800">
                <div className="flex justify-between items-center my-auto mx-6">
                    <div className="flex">
                        <img src={infoImg} draggable="false" alt="i" />
                        <div className="ml-3 text-lg font-semibold">{info.name}</div>
                    </div>
                    <div className="flex space-x-6 text-white/80">
                        <button onClick={(e) => downloadClickHandler(e)} className='select-none hover:text-white flex'><img className="w-4 mr-1" src={downloadImg} alt=""/> Скачать</button>
                        <button onClick={(e) => deleteClickHandler(e)} className='select-none hover:text-white flex items-center'><img className="w-4 mr-1" src={deleteImg} alt=""/> Удалить</button>
                        <button onClick={() => closeHandler()}><img src={closeImg} draggable="false" className="text-white" alt="x" /></button>
                    </div>

                </div>
            </div>
        </div>
     );
}
 
export default Info;
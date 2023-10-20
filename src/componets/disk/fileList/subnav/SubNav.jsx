import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setCurrentDir, setInfo, setSort} from '../../../../reducers/fileReducer';
import backImg from '../../../../assets/img/bx-left-arrow-alt.svg'
import sortUpImg from '../../../../assets/img/bx-sort-up.svg'
import sortDownImg from '../../../../assets/img/bx-sort-down.svg'
import sortListOpenImg from '../../../../assets/img/bx-chevron-down.svg'
import sortListCloseImg from '../../../../assets/img/bx-chevron-up.svg'
import checkImg from '../../../../assets/img/bx-check.svg'
import dotsImg from '../../../../assets/img/bx-dots-vertical-rounded.svg'
import downloadImg from '../../../../assets/img/bxs-download.svg'
import renameImg from '../../../../assets/img/bx-rename.svg'
import {downloadFile} from "../../../../actions/file";

function SubNav() {
    const dispatch = useDispatch()
    const dirStack = useSelector((state) => state.files.dirStack)
    const currentDir = useSelector((state) => state.files.currentDir)
    const sort = useSelector(state => state.files.sort)
    const fileInfo = dirStack[dirStack.length-1]
    const [sortList, setSortList] = useState("none")
    const wrapRef = useRef(null)
    const actionRef = useRef(null)
    const [actionList, setActionList] = useState("none")

    function backClickHandler() {
        const back = dirStack.pop()
        dispatch(setInfo(""))
        dispatch(setCurrentDir(back.currentDir))
    }

    function selectSort(sort) {
        setSortList("none")
        dispatch(setSort(sort))
    }

    const clickHandler = ( event ) => {
        event.stopPropagation()
        if(wrapRef.current && !wrapRef.current.contains(event.target)){
            setSortList("none")
        }else if(actionRef.current && !actionRef.current.contains(event.target)){
            setActionList("none")
        }

    }

    useEffect(() => {
        document.addEventListener("mousedown", clickHandler);
        return() =>{
            document.removeEventListener("mousedown", clickHandler)
        }
    })

    function downloadClickHandler(e) {
        e.stopPropagation()
        setActionList("none")
        dispatch(downloadFile({"_id": currentDir, "name": fileInfo.name}))
    }

    function deleteClickHandler(e) {
        e.stopPropagation()
        alert("рекурсивное удаление папки (сделать)")
    }

    


    return (
        <div className="mb-5">
            <div className="flex">
                {currentDir &&
                    <div className="flex items-center ml-3">
                        <button className='h-8' onClick={() => backClickHandler()}><img className='h-8' src={backImg} alt="<-" /></button>
                        <div className='text-2xl ml-3 font-semibold'>{fileInfo.name}</div>
                        <button onClick={() =>{actionList === 'block' ? setActionList("none") : setActionList("block")} }><img src={dotsImg} alt=":"/></button>
                    </div>
                }
                {currentDir &&


                    <div style={{display: actionList}}  className="absolute top-20 bg-white text-sm mt-2 left-96 border py-2 rounded-xl">
                        <div ref={actionRef}>
                            <div onClick={(e) => downloadClickHandler(e)} className="flex py-2 px-4 cursor-pointer hover:bg-black/5">
                                <img className="w-5 mr-2" src={downloadImg} alt=""/>
                                <div>Скачать</div>
                            </div>
                            <div className="flex py-2 px-4 cursor-pointer hover:bg-black/5">
                                <img className="w-5 mr-2" src={renameImg} alt=""/>
                                <div>Переименовать</div>
                            </div>
                            <div onClick={(e) => deleteClickHandler(e)} className="flex py-2 px-4 cursor-pointer hover:bg-black/5">
                                <svg className="w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z"></path></svg>
                                <div>Удалить</div>
                            </div>

                        </div>

                    </div>
                }




                <div className="absolute right-10 top-5 flex">
                    <div ref={wrapRef}>
                        <div onClick={() =>{sortList === 'block' ? setSortList("none") : setSortList("block")} } className="p-1 cursor-pointer hover:bg-black/5 duration-300 transition rounded-md px-2 shadow-md">
                            <div className='flex justify-between select-none'>
                                <div className='flex'>
                                    <img className="mr-1" draggable="false" src={sortUpImg} alt="=>" />
                                    По {sort.name}
                                </div>

                                {sortList === 'none'?
                                    <img className="mr-1" draggable="false" src={sortListOpenImg} alt="" />
                                    :
                                    <img className="mr-1" draggable="false" src={sortListCloseImg} alt="" />
                                }
                            </div>
                        </div>
                        <div className='py-2 bg-white shadow-lg border-b border-x border-black/5 border-s mt-2 rounded-xl' style={{display: sortList}}>
                            <div onClick={() => selectSort({type: 'name', name: "названию"})}
                                 style={sort.type === "name" ? {background: "rgb(0 0 0 / 0.05)"} : {background: "white"}}
                                 className="cursor-pointer flex hover:bg-black/5 p-2">
                                {
                                    sort.type === "name"
                                    &&
                                    <img src={checkImg} style={{display: 'hidden'}} alt="" />
                                }
                                Названию
                            </div>
                            <div onClick={() => selectSort({type: 'type', name: "типу"})}
                                 style={sort.type === "type" ? {background: "rgb(0 0 0 / 0.05)"} : {background: "white"}}
                                 className="cursor-pointer flex hover:bg-black/5 p-2">
                                {
                                    sort.type === "type"
                                    &&
                                    <img src={checkImg} style={{display: 'hidden'}} alt="" />
                                }
                                Типу
                            </div>
                            <div onClick={() => selectSort({type: 'date', name: "дате изменения"})}
                                 style={sort.type === "date" ? {background: "rgb(0 0 0 / 0.05)"} : {background: "white"}}
                                 className="cursor-pointer flex hover:bg-black/5 p-2">
                                {
                                    sort.type === "date"
                                    &&
                                    <img src={checkImg} style={{display: 'hidden'}} alt="" />
                                }
                                Дате изменения
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    );
}

export default SubNav;
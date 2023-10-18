import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDir, setSort } from '../../../../reducers/fileReducer';
import backImg from '../../../../assets/img/bx-left-arrow-alt.svg'
import sortUpImg from '../../../../assets/img/bx-sort-up.svg'
import sortDownImg from '../../../../assets/img/bx-sort-down.svg'
import sortListOpenImg from '../../../../assets/img/bx-chevron-down.svg'
import sortListCloseImg from '../../../../assets/img/bx-chevron-up.svg'
import checkImg from '../../../../assets/img/bx-check.svg'



function SubNav() {
    const dispatch = useDispatch()
    const dirStack = useSelector((state) => state.files.dirStack)
    const currentDir = useSelector((state) => state.files.currentDir)
    const sort = useSelector(state => state.files.sort)
    const fileInfo = dirStack[dirStack.length-1]
    const [sortList, setSortList] = useState("none")
    const wrapRef = useRef(null)

    function backClickHandler() {
        const back = dirStack.pop()
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
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", clickHandler);
        return() =>{
            document.removeEventListener("mousedown", clickHandler)
        }
    })

    


    return (
        <div>
            <div className="flex">
                {currentDir &&
                    <div className="flex items-center ml-3">
                        <button className='h-8' onClick={() => backClickHandler()}><img className='h-8' src={backImg} alt="<-" /></button>
                        <div className='text-2xl ml-3 font-semibold'>{fileInfo.name}</div>
                        <div>:(открыть действия)</div>
                    </div>
                }



                <div className="absolute right-10 top-5 flex">
                    <div ref={wrapRef}>
                        <div onClick={() =>{sortList === 'block' ? setSortList("none") : setSortList("block")} } className="p-1 cursor-pointer hover:bg-black/5 duration-300 transition rounded-md px-2 shadow-md">
                            <div className='flex justify-between w-52 select-none'>
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
                            <div onClick={() => selectSort({type: 'name', name: "названию"})} className="cursor-pointer flex hover:bg-black/5 p-2">
                                {
                                    sort.type === "name"
                                    &&
                                    <img src={checkImg} style={{display: 'hidden'}} alt="" />
                                }
                                Названию
                            </div>
                            <div onClick={() => selectSort({type: 'type', name: "типу"})} className="cursor-pointer flex hover:bg-black/5 p-2">
                                {
                                    sort.type === "type"
                                    &&
                                    <img src={checkImg} style={{display: 'hidden'}} alt="" />
                                }
                                Типу
                            </div>
                            <div onClick={() => selectSort({type: 'date', name: "дате изменения"})} className="cursor-pointer flex hover:bg-black/5 p-2">
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
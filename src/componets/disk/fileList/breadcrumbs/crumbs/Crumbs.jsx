import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import {clearStack, setCurrentDir, setInfo} from '../../../../../reducers/fileReducer';
import chevron from '../../../../../assets/img/bx-chevron-right.svg'

function Crumbs(props) {

    const dispatch = useDispatch()
    const dirStack = useSelector((state) => state.files.dirStack)


    function openDirHandler(event) {
        event.preventDefault()

        if(props.currentDir === null){
                dispatch(clearStack())
                dispatch(setInfo(""))
                dispatch(setCurrentDir(null))
            return
        }

        let steps = dirStack.length - props.pos

        if (dirStack.length !== 1){
            steps--
        }

        if(steps > 0){
            for (let i = 0; i < steps; i++) {
                dirStack.pop()
            }
            dispatch(setCurrentDir(props.currentDir))
        }
    }

    return (
        <div>
            <div className="cursor-pointer font-thin flex items-center text-md text-gray-500 hover:text-black transition duration-75" onClick={(event)=> openDirHandler(event)}>
                {props.name}
                <img src={chevron} alt=">" />
            </div>
        </div>
    );
}

export default Crumbs;
import React from "react";
import { useSelector } from "react-redux";

import Crumbs from "./crumbs/Crumbs";


const Breadcrumbs = () => {
    const dirStack = useSelector((state) => state.files.dirStack)
    const lastCrumb = dirStack.pop()

    return ( 




        dirStack.length >= 1 ?
            <div className=' pl-12 pt-6'>
                <div className="flex">
                    <Crumbs name="Файлы" currentDir={null} pos={0} key={0}/>
                    {dirStack.map((crumb, i) => <Crumbs name={crumb.name} currentDir={crumb.currentDir} pos={i} key={i}/>)}
                    <Crumbs name{...lastCrumb.name} />
                </div>
            </div>
            :
            <div className='text-2xl font-semibold pl-12 pt-6'>
                Файлы
            </div>
     );
}
 
export default Breadcrumbs;
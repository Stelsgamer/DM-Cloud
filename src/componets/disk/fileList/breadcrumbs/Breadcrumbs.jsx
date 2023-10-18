import React from "react";
import { useSelector } from "react-redux";

import Crumbs from "./crumbs/Crumbs";


const Breadcrumbs = () => {
    const dirStack = useSelector((state) => state.files.dirStack)

    return ( 
                    
        dirStack.length >= 1 ?
            <div className=' pl-12 pt-6'>
                {/* {breadcrumps.join(" > ")} */}
                <div className="flex">
                    {dirStack.map((crumb, i) => <Crumbs name={crumb.name} currentDir={crumb.currentDir} pos={i} key={i}/>)} 
                </div>
            </div>
            :
            <div className='text-2xl font-semibold pl-12 pt-6'>
                Файлы
            </div>
     );
}
 
export default Breadcrumbs;
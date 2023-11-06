import React from "react";
import { useSelector } from "react-redux";
import File from "./file/File";
import Breadcrumbs from "./breadcrumbs/Breadcrumbs";
import SubNav from "./subnav/SubNav";

const FileList = () => {
  const files = useSelector((state) => state.files.files);
  const loader = useSelector(state => state.app.loader)


  return (
    <div className="bg-white h-full overflow-y-auto rounded-r-2xl">
      <Breadcrumbs />
      <SubNav />
      {
        loader === true ? 
        <div className='w-full flex justify-center'>
            <svg className='animate-spin w-10 h-10 fill-yellow-400' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"></path>
                </svg>
        </div>
        :
        files.map((file) => (
          <File file={file} key={file._id} />
        ))
      }

    </div>
  );
};

export default FileList;

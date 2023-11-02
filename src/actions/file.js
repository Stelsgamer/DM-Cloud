import { addFile, deleteFileAction, setFiles } from "../reducers/fileReducer";
import { addUploadFile, changeUploadFile, showUploader } from "../reducers/uploadReducer";
import { setLoader } from "../reducers/appReducer";
import { logout } from "../reducers/userReducer";
import api from "../http/index"

export function getFiles(dirId, sort) {
    return async dispatch => {
        try {
            dispatch(setLoader(true))
            let url = `${process.env.REACT_APP_API_URL}/files`
            if(dirId) {
                url = `${process.env.REACT_APP_API_URL}/files?parent=${dirId}`
            }
            if(sort) {
                url = `${process.env.REACT_APP_API_URL}/files?sort=${sort}`
            }
            if(dirId && sort) {
                url = `${process.env.REACT_APP_API_URL}/files?sort=${sort}&parent=${dirId}`
            }
            const response = await api.get(url, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(setFiles(response.data))
        } catch (e) {
            console.log(e.response?.data?.message)
        } finally {
            dispatch(setLoader(false))
        }
    }
}


export function createDir(dirId, name) {
    return async dispatch => {
        try {
            const response = await api.post(`${process.env.REACT_APP_API_URL}/files`,{
                name,
                parent: dirId,
                type: 'dir'
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(addFile(response.data))
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
}


export function uploadFile(file, dirId) {
    return async dispatch => {
        try {

            const formData = new FormData()
            formData.append('file', file)
            formData.append('fileName', file.name)


            if(dirId) {
                formData.append('parent', dirId)
            }

            const uploadFile = {name: file.name, progress: 0, id: Date.now()+Math.random()}
            dispatch(showUploader())
            dispatch(addUploadFile(uploadFile))

            const response = await api.post(`${process.env.REACT_APP_API_URL}/files/upload`, formData, {
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.event.lengthComputable ? progressEvent.total : progressEvent.event.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    if (totalLength) {
                        uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        dispatch(changeUploadFile(uploadFile))
                    }
                }
            });
            dispatch(addFile(response.data))
        } catch (e) {
            alert(e)
        }
    }
}


export function deleteFile(file) {
    return async dispatch => {
        try {
            
            await api.delete(`${process.env.REACT_APP_API_URL}/files?id=${file._id}`)

            dispatch(deleteFileAction(file._id))
        } catch (e) {
            if (e.response.status === 401){
                dispatch(logout())
            }
            alert(e?.response?.data?.message)
        }
    }
}


export function downloadFile(file) {
    return async dispatch => {
        const response = await api.get(`${process.env.REACT_APP_API_URL}/files/download?id=${file._id}`,
            {responseType: 'blob'}
        )

        const href = window.URL.createObjectURL(response.data);
        const anchorElement = document.createElement('a');

        anchorElement.href = href;
        anchorElement.download = file.name;

        document.body.appendChild(anchorElement);
        anchorElement.click();

        document.body.removeChild(anchorElement);
        window.URL.revokeObjectURL(href);
    }
}

export function searchFiles(search) {
    return async dispatch => {
        try {
            const response = await api.get(`${process.env.REACT_APP_API_URL}/files/search?search=${search}`)
            dispatch(setFiles(response.data))

        } catch (e) {
            dispatch(setLoader(false))
            console.error("Ошибка в поиске")
        }
    }
}
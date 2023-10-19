import axios from "axios";
import { addFile, deleteFileAction, setFiles } from "../reducers/fileReducer";
import { addUploadFile, changeUploadFile, showUploader } from "../reducers/uploadReducer";
import { hideLoader, showLoader } from "../reducers/appReducer";
import { logout } from "../reducers/userReducer";
import { useDispatch } from "react-redux";


export function getFiles(dirId, sort) {
    return async dispatch => {
        try {
            dispatch(showLoader())
            let url = `http://localhost:5000/api/files`
            if(dirId) {
                url = `http://localhost:5000/api/files?parent=${dirId}`
            }
            if(sort) {
                url = `http://localhost:5000/api/files?sort=${sort}`
            }
            if(dirId && sort) {
                url = `http://localhost:5000/api/files?sort=${sort}&parent=${dirId}`
            }
            const response = await axios.get(url, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(setFiles(response.data))
        } catch (e) {
            if (e.response.status === 401){
                dispatch(logout())
            }
            console.log(e.response.data.message)
        } finally {
            dispatch(hideLoader())
        }
    }
}


export function createDir(dirId, name) {
    return async dispatch => {
        try {
            const response = await axios.post(`http://localhost:5000/api/files`,{
                name,
                parent: dirId,
                type: 'dir'
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(addFile(response.data))
        } catch (e) {
            if (e.response.status === 401){
                dispatch(logout())
            }
            alert(e.response.data.message)
        }
    }
}


export function uploadFile(file, dirId) {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)

            if(dirId) {
                formData.append('parent', dirId)
            }

            const uploadFile = {name: file.name, progreess: 0, id: Date.now()+Math.random()}
            dispatch(showUploader())
            dispatch(addUploadFile(uploadFile))

            const response = await axios.post(`http://localhost:5000/api/files/upload`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
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
            if (e.response.status === 401){
                dispatch(logout())
            }
            alert(e)
        }
    }
}


export function deleteFile(file) {
    return async dispatch => {
        try {
            
            await axios.delete(`http://localhost:5000/api/files?id=${file._id}`,{
                headers: 
                {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            
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
        const response = await fetch(`http://localhost:5000/api/files/download?id=${file._id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if(response.status === 200) {
            const blob = await response.blob()
            const downloadUrl = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = downloadUrl
            link.download = file.name
            document.body.appendChild(link)
            link.click()
            link.remove()
        }else if( response.status === 401) {
            dispatch(logout())
        }
    }

}

export function searchFiles(search) {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:5000/api/files/search?search=${search}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(setFiles(response.data))

        } catch (e) {
            if (e.response.status === 401){
                dispatch(logout())
            }
            alert("Ошибка в поиске")

        }finally {
            dispatch(hideLoader())
        }

    }




}
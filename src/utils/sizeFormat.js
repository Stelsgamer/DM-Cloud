export default (size) => {
    if(size > 1024*1024*1024) {
        return (size/(1024*1024*1024)).toFixed(2)+" Гб"
    }

    if(size > 1024*1024) {
        return (size/(1024*1024)).toFixed(1)+" Мб"
    }

    if(size > 1024) {
        return (size/(1024)).toFixed(0)+" Кб"
    }

    return size+" B"
}



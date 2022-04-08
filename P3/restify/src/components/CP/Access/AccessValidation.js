// https://stackoverflow.com/questions/54199264/how-can-i-use-a-function-from-another-file-in-react

function loadLocalAccess(access, setAccess) {
    if (access !== "" || access.length < 10){
        const temp = localStorage.getItem('access')
        setAccess(temp)
        return false
    }
    return true
}

export default loadLocalAccess
// https://stackoverflow.com/questions/54199264/how-can-i-use-a-function-from-another-file-in-react

export const nameValid = (firstName, lastName, setNameError, setNameTypeError) => {
    //^([A-Za-z]+[' .-]?)*$
    let first = firstName.match(/^([A-Za-z][A-Za-z' .-]*)$/g)
    let last = lastName.match(/^[A-Za-z][A-Za-z' .-]*$/g)
    let count = 0;
    let error = "Names can only contain letters, spaces and '-."
    // 1 -> first error, 2 -> last error, 3 -> both error,   0 -> no error
    if (first === null && firstName !== "")
    {
        setNameError(error)
        count = count + 1
    }
    if (last === null && lastName !== "")
    {
        setNameError(error)
        count = count + 2
    }
    if (count !== 0){
        setNameTypeError(count)
        return false
    }
    setNameError("")
    setNameTypeError(0)
    return true
}


export const userValid = (username, setUserError) => {
    let output = true
    if(username.match(/^([A-Za-z][A-Za-z0-9_.-]*){4,}$/g) === null && username !== "") {
        setUserError("Username must start with a letter. Can contain numbers and (-._). (Minimum Length: 4)")
        output = false
    }
    else {
        setUserError("")
    }
    return output
}

export const emailValid = (email, setEmailError) => {
    let output = true
    // https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
    if (email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g) == null && email !== "") {
        setEmailError("Please provide a valid email address")
        output = false
    }
    else
    {
        setEmailError("")
    }
    return output
}


export const phoneValid = (phone, setPhoneError) => {
    let output = true
    if (phone.match(/^[+][1][(][0-9]{3}[)][-][0-9]{3}[-][0-9]{4}$/g) == null && phone !== ""){
        setPhoneError("Please provide a valid phone number in format +1(###)-###-####")
        output = false
    }
    else
    {
        setPhoneError("")
    }
    return output
}

export const pass1Valid = (password, setPasswordError) =>{
    let output = true
    if(password.length < 8 && password !== "") {
        setPasswordError("Password must at least be a length of 8")
        output = false
    }
    else {
        setPasswordError("")
    }
    return output
}

export const pass2Valid = (password, password2, setPassword2Error) =>{
    let output = true
    if(password !== password2 && password2 !== "") {
        setPassword2Error("Passwords do not match!")
        output = false
    }
    else {
        setPassword2Error("")
    }
    return output
}


export const basicLengthValidation = (username, password) => {
    return username !== "" && password !== "";
}

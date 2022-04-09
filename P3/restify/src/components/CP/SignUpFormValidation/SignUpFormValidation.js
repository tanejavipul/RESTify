// https://stackoverflow.com/questions/54199264/how-can-i-use-a-function-from-another-file-in-react

export const nameValid = (firstName, lastName, setFirstNameError, setLastNameError) => {
    let output = true
    if(firstName.length < 4 && lastName.length < 4 && firstName !== "" && lastName !== "" ) {
        setFirstNameError("First and last name should be at least a length of 4")
        setLastNameError(" ")
        output = false
    }
    else if (firstName.length < 4 && firstName !== "")
    {
        setFirstNameError("First name should be at least a length of 4")
        setLastNameError("")
        output = false
    }
    else if (lastName.length < 4 && lastName !== "")
    {
        setLastNameError("Last name should be at least a length of 4")
        setFirstNameError("")
        output = false
    }
    else {
        setFirstNameError("")
        setLastNameError("")
    }

    return output
}


export const userValid = (username, setUserError) => {
    let output = true
    if(username.length < 4 && username !== "") {
        setUserError("Username must be at least a length of 4 with only have characters and numbers")
        output = false
    }
    else {
        setUserError("")
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

export const basicLengthValidation = (username, password, firstName, lastName, email) => {
    return username !== "" && password !== "" && firstName !== "" && lastName !== "" && email !== "";
}

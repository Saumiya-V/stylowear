export const checkValidation = ({email,password}:{email:string,password:string})=>{

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

    const isEmailValid = emailRegex.test(email)
    const isPwdValid = pwdRegex.test(password)

    if(!isEmailValid) return "Invalid Email"
    if(!isPwdValid) return "Invalid Password"



}
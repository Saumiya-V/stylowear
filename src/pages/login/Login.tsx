import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { checkValidation } from "@/utils/checkValidation"
import { useRef, useState } from "react"
import { auth } from "../../utils/firebase";
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "@tanstack/react-router"
import { useAuth } from "@/context/authContext/AuthContext"


const Login = () => {
  const [isSignInForm,setIsSignInForm] = useState(true)
  const [error,setError]=useState<string|null>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const pwdRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const { login } = useAuth() 

  const handleData = async () => {
    const email = emailRef.current?.value || ""
    const password = pwdRef.current?.value || ""


    const message = checkValidation({ email, password })
    setError(message ?? null)
    if (message) return

    try {
      if (isSignInForm) {
        await login(email, password)
        const updatedRole =  localStorage.getItem("role")
        if(updatedRole === "admin"){
          navigate({ to: "/inventory" }) 
        }
        else{
          navigate({to:'/cart'})
        }
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        console.log(userCredential.user)
        navigate({ to: "/login" })
      }
    } catch (err: any) {
      setError(err.message || "Login failed")
    }
  }

  return (
    <div className="relative">
      <img src="images.jpg" className='w-full opacity-60 object-cover absolute' />
       <Card className="w-full max-w-sm relative mx-auto top-50 ">
      <CardHeader >
        <CardTitle>{isSignInForm?"Login to your account":"Create an account"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleData();
        }}>
          <div className="flex flex-col gap-6">
            {!isSignInForm &&  <div className="grid gap-2">
              <Label htmlFor="email">User Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Name"
                required
              />
            </div>}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                ref={emailRef}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" ref={pwdRef} required />
            </div>
          </div>
            {error?<span className="text-red-500 mt-4 mb-2">{error}</span>:null}
            <Button type="submit" className="w-full mt-5">
         {isSignInForm?"Login":"Sign Up"}
        </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <p className="text-sm">{isSignInForm?"Don't have an account?":"Already have an account? "}<a className="font-semibold" onClick={()=>setIsSignInForm(!isSignInForm)} href="#">{!isSignInForm?"Sign In":"Sign Up Now"}</a></p>
      </CardFooter>
    </Card>
    </div>
  )

}

export default Login;

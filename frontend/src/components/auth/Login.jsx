import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: ''
  })
  const { loading, user } = useSelector(store => store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const changeEventHandler = e => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitHandler = async e => {
    e.preventDefault()
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate('/')
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || 'Login failed')
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [])

  return (
    <div className="bg-[#0F172A] min-h-screen text-[#F8FAFC]">
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4">
        <form
          onSubmit={submitHandler}
          className="w-full sm:w-2/3 md:w-1/2 lg:w-2/5 border border-[#334155] bg-[#1E293B] text-[#F8FAFC] rounded-md p-6 my-10 shadow-lg"
        >
          <h1 className="font-bold text-2xl mb-6 text-center">Login</h1>

          <div className="my-4">
            <Label className="text-[#CBD5E1]">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="xyz@gmail.com"
              className="mt-1 bg-[#1E293B] border border-[#334155] text-[#F8FAFC] placeholder:text-[#64748B] focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="my-4">
            <Label className="text-[#CBD5E1]">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="********"
              className="mt-1 bg-[#1E293B] border border-[#334155] text-[#F8FAFC] placeholder:text-[#64748B] focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <RadioGroup className="flex items-center gap-6 my-5">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="student"
                checked={input.role === 'student'}
                onChange={changeEventHandler}
                className="cursor-pointer accent-blue-600"
              />
              <Label htmlFor="student" className="text-[#CBD5E1]">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === 'recruiter'}
                onChange={changeEventHandler}
                className="cursor-pointer accent-blue-600"
              />
              <Label htmlFor="recruiter" className="text-[#CBD5E1]">Recruiter</Label>
            </div>
          </RadioGroup>

          {loading ? (
            <Button className="w-full my-4 bg-[#3B82F6] hover:bg-[#2563EB]" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white">
              Login
            </Button>
          )}

          <span className="text-sm text-[#94A3B8] block text-center mt-3">
            Do not have an account?{' '}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  )
}

export default Login

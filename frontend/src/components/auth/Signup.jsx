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
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    file: ''
  })

  const { loading, user } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const changeEventHandler = e => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = e => {
    setInput({ ...input, file: e.target.files?.[0] })
  }
const submitHandler = async e => {
  e.preventDefault();

  // 🔸 1. Front‑end validation (add or remove fields as you need)
  const required = [
    { key: 'fullname', label: 'Full Name' },
    { key: 'email', label: 'Email' },
    { key: 'phoneNumber', label: 'Phone Number' },
    { key: 'password', label: 'Password' },
    { key: 'role', label: 'Role' },
    { key: 'file', label: 'Profile photo' },
  ];

  for (const field of required) {
    if (!input[field.key]) {
      toast.error(`${field.label} is required`);
      return; // ⛔ stop — no loader, no API call
    }
  }

  // 🔸 2. Build FormData (only runs if validation passed)
  const formData = new FormData();
  formData.append('fullname', input.fullname);
  formData.append('email', input.email);
  formData.append('phoneNumber', input.phoneNumber);
  formData.append('password', input.password);
  formData.append('role', input.role);
  formData.append('file', input.file); // we know it's present

  try {
    dispatch(setLoading(true));

    const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
    });

    if (res.data.success) {
      toast.success(res.data.message);
      navigate('/login');
    }
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || 'Signup failed');
  } finally {
    dispatch(setLoading(false)); // ✅ spinner always stops
  }
};


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
          <h1 className="font-bold text-2xl mb-6 text-center">Sign Up</h1>

          <div className="my-3">
            <Label className="text-[#CBD5E1]">Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Your Name"
              className="mt-1 bg-[#1E293B] border border-[#334155] text-[#F8FAFC] placeholder:text-[#64748B] focus-visible:ring-0"
            />
          </div>

          <div className="my-3">
            <Label className="text-[#CBD5E1]">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="xyz@gmail.com"
              className="mt-1 bg-[#1E293B] border border-[#334155] text-[#F8FAFC] placeholder:text-[#64748B] focus-visible:ring-0"
            />
          </div>

          <div className="my-3">
            <Label className="text-[#CBD5E1]">Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="8080808080"
              className="mt-1 bg-[#1E293B] border border-[#334155] text-[#F8FAFC] placeholder:text-[#64748B] focus-visible:ring-0"
            />
          </div>

          <div className="my-3">
            <Label className="text-[#CBD5E1]">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="********"
              className="mt-1 bg-[#1E293B] border border-[#334155] text-[#F8FAFC] placeholder:text-[#64748B] focus-visible:ring-0"
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

          <div className="flex items-center gap-4 my-4">
            <Label className="text-[#CBD5E1]">Profile</Label>
            <Input
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
              className="cursor-pointer text-black"
            />
          </div>

          {loading ? (
            <Button className="w-full my-4 bg-[#3B82F6]" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white">
              Signup
            </Button>
          )}

          <span className="text-sm text-[#94A3B8] block text-center mt-3">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  )
}

export default Signup

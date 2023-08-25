import React,{useState, useContext} from 'react'
import Loginimg from "../assets/login2.jpg"
import { Link } from "react-router-dom";
import {AuthContext} from '../hooks/AuthProvider';






const validateField = (fieldName, value) => {
  const validationPatterns = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^.{5,}$/, // Requires at least 5 characters
  };

  return validationPatterns[fieldName].test(value);
};

function useValidation(initialState) {
 
  const {login} = useContext(AuthContext)
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: !validateField(name, value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    Object.keys(formData).forEach((fieldName) => {
      newErrors[fieldName] = !validateField(fieldName, formData[fieldName]);
    });

    setErrors(newErrors);
    console.log(errors)

    if (Object.values(newErrors).every((error) => !error)) {
      console.log('Form submitted:', formData);
      login(formData)
   
    }
  };

  return { formData, errors, handleChange, handleSubmit };
}
const Login = () => {
  const { formData, errors, handleChange, handleSubmit } = useValidation({
    email: '',
    password: '',
  });
  console.log(formData)

  return (
  <>
  <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full bg-gray-100'>
  <div className='text-3xl  font-bold text-center py-6 absolute top-0 text-primaryColor left-10 sm:text-white'>Ivory pay</div>
<div className='hidden sm:block'>
<img  src={Loginimg} className='w-full h-full object-cover' alt='login image'/>
</div>
<div className=' flex flex-col justify-center w-11/12 sm:w-full mx-auto'>
  <form className='max-w-[400px] w-full mx-auto bg-white p-4  ' >
    <h2 className='text-2xl  font-bold text-center py-6'>Welcome back</h2>
    <div className='flex flex-col py-2'>
      <label htmlFor="">email</label>
      <input className='border py-2'   type="text"
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email}/>
                {errors.email && <div className="text-red-600">email is not valid</div>}
    </div>
    <div className='flex flex-col py-2'>
      <label htmlFor="">password</label>
      <input className='border py-2'  type="text"
            id="password"
            name="password"
            onChange={handleChange}
            value={formData.password}/>
                {errors.password && <div className="text-red-600">password is not valid</div>}
    </div>
    <button className='border w-full my-5 py-2 bg-primaryColor text-white hover:bg-indigo-500'
      onClick={(e) => {
        e.preventDefault(); 
        handleSubmit(e);   
      }}
    >Sign In</button>
    <div className='grid  grid-cols-2  mt-5 '>
    {/* <p className='text-gray-400'> Don't have an account?  </p>
    <Link   to="signup"   className='font-bold'>
 Sign up
        </Link> */}
      {/* <p className='inline-block text-right rounded'>Create an account</p> */}
    </div>
  </form>
</div>
  </div>
  </>
  )
}

export default Login
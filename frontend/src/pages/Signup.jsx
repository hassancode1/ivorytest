import React,{useState} from 'react'
import Loginimg from "../assets/login1.jpg"
import { Link, useParams, useLocation } from "react-router-dom";
import useAcceptInvite from '../hooks/useAcceptInvite';


const validateField = (fieldName, value) => {
  const validationPatterns = {
    firstName: /^[a-zA-Z\s]+$/,
    lastName: /^[a-zA-Z\s]+$/,
    password: /^.{5,}$/, // Requires at least 5 characters
  };

  return validationPatterns[fieldName].test(value);
};

function useValidation(initialState) {
  const location = useLocation();

    const id = new URLSearchParams(location.search).get('id');
    const email = new URLSearchParams(location.search).get('email');
    console.log("testingg",email)
  const {acceptInvite} = useAcceptInvite()
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
     
      const data={
       firstName: formData.firstName,
       lastName: formData.lastName,
       password: formData.password,
      }
      console.log('Form submitted:', data);
      acceptInvite(data)
    }
  };

  return { formData, errors, handleChange, handleSubmit };
}
const Signup = () => {
 
 
  const { formData, errors, handleChange, handleSubmit } = useValidation({
    firstName: '',
    lastName: '',
    password: '',
  });

  return (
  <>
  
  <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full bg-gray-100'>
<div className=' flex flex-col justify-center w-11/12 sm:w-full mx-auto'>
<div className='text-3xl  font-bold text-center py-6 absolute top-0 text-primaryColor left-10'>Ivory pay</div>
  <form className='max-w-[400px] w-full mx-auto bg-white p-4  mt-16' >
    <h2 className='text-2xl  font-bold text-center py-6'>Accept Invite</h2>
    <div className='flex flex-col py-2'>
      <label htmlFor="">first name</label>
      <input className='border py-2'  type="text"
            id="firstName"
            name="firstName"
            onChange={handleChange}
            value={formData.firstName}/>
                {errors.firstName && <div className="text-red-600">first name is required</div>}
    </div>
    <div className='flex flex-col py-2'>
      <label htmlFor="">last name</label>
      <input className='border py-2'  type="text"
            id="lastName"
            name="lastName"
            onChange={handleChange}
            value={formData.lastName}/>
                {errors.lastName && <div className="text-red-600">last name is required</div>}
    </div>
    <div className='flex flex-col py-2'>
      <label htmlFor="">password</label>
      <input className='border py-2'  type="text"
            id="password"
            name="password"
            onChange={handleChange}
            value={formData.password}/>
                {errors.password && <div className="text-red-600">password must be greater than 5 characters</div>}
    </div>
    <button className='border w-full my-5 py-2 bg-primaryColor text-white hover:bg-indigo-500'
   onClick={(e) => {
    e.preventDefault(); 
    handleSubmit(e);   
  }}

    >Accept</button>
    <div className='grid  grid-cols-2 place-items-center mx-auto mt-5'>
    <p className='text-gray-400'> Already have an account? </p>
    <Link   to="/login" className='font-bold'>
Login here
        </Link>
  </div>
  </form>
 
</div>
<div className='hidden sm:block'>
<img  src={Loginimg} className='w-full h-full object-cover' alt='login image'/>
</div>
  </div>
  </>
  )
}

export default Signup

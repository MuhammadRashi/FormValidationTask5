import React, { useState } from 'react'

import './Form.css'


export const Form1 = () => {

    // Use state declaration
    const [fields, setFields] = useState({

        name: '',
        email: '',
        gender: '',
        skills: [],
        dob: '',
        country: '',
    })

    const [errorFields, setErrorFields] = useState({

        name: false,
        email: false,
        gender: false,
        skills: false,
        dob: false,
        country: false,
    })

    const [isSubmitted,setIsSubmitted] = useState(false)


    //on blur handle change function
    const handleChange = (event) => {

        setFields(prevousData => ({
            ...prevousData,
            [event.target.name]: event.target.value
        }))
        // console.log({ fields });
        isFormValid(event)
    }
    const handleCheckBox = (event) => {

        let newSkills = [...fields.skills]
        if (event.target.checked) {
            newSkills.push(event.target.value)
        } else {
            // filter skills without value
            newSkills = newSkills.filter((skill) => skill !== event.target.value)
        }
        // all checked box values push to state
        setFields(prevousData => ({
            ...prevousData,
            skills: newSkills
        }))

        if (newSkills.length === 0) {
            setErrorFields(prevousData => ({
                ...prevousData,
                skills: true
            }))
        }
        else{
            setErrorFields(prevousData=>({
                ...prevousData,
                skills:false
            }))
        }
        // console.log(newSkills, "===new skill")
        // console.log(event.target.value);
    }

    // Validation

    const isFormValid = (event) => {
        const { name, value } = event.target
        let error = false

        if (name === 'name' && value == '') {
            error = true 
        }
        else if (name === 'email' && (value == '' || !value.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/))) {
            error = true
        }
        else if (name === 'gender' && value == '') {
            error = true
        }
        else if (name === 'dob' && value == '') {
            error = true
        }
        else if (name === 'country' && value == '') {
            error = true
        }
        else {
            false
        }

        setErrorFields((prevousData) => ({
            ...prevousData,
            [name]: error
        }))



    };


    const isValidOnSubmit=(event)=>{
        let err=false;
        event.preventDefault() 
        
        

        const errors = {
            name: false,
            email: false,
            gender: false,
            skills: false,
            dob: false,
            country: false,
        }
    
        if (fields.name === "") {
          errors.name = true;
        }
        if (fields.email === "") {
          errors.email = true;
        }
        if (fields.gender === "") {
          errors.gender = true;
        }
        if (fields.dob === "") {
            errors.dob = true;
          }
          if (fields.skills.length === 0) {
            errors.skills = true;
          }
        if (fields.country === "") {
          errors.country = true;
        }
    
         if (Object.values(errors).every((error) => error === false)) {
            setIsSubmitted(true)
          }
          setErrorFields(errors);

        

    }


    return (
        <form>
            <h1>Form 1</h1>
            <p className='caption'>onBlur Validation</p>
            {/* Name */}
            <div className="form-control">
                <label htmlFor="name" className='heading-label'>Name</label>
                <input type="text" name="name" id="name" placeholder='Enter Name' onChange={handleChange} onBlur={handleChange} />
                {errorFields.name && <p className='error-msg'>Enter a valid name</p>}
            </div>
            {/*Email  */}
            <div className="form-control">
                <label htmlFor="email" className='heading-label'>Email</label>
                <input type="email" name="email" id="email" placeholder='Enter Email Address' onBlur={handleChange} />
                {errorFields.email && <p className='error-msg'>Enter a valid email</p>}
            </div>
            {/* Gender Radio button */}
            <div className="form-control">
                <label className='heading-label'>Gender</label>
                <div>
                    <input type="radio" name="gender" id="male" value="male" onBlur={handleChange} />
                    <label htmlFor="male">Male</label>

                    <input type="radio" name="gender" id="female" value="female" onBlur={handleChange} />
                    <label htmlFor="female">Female</label>

                </div>
                {errorFields.gender && <p className='error-msg'>Gender is required</p>}
            </div>

            {/* Skills Check box */}
            <div className="form-control">
                <label className='heading-label'>Skills</label>
                <div>
                    <input type="checkbox" value="javascript" name="skills" id="javascript" onBlur={handleCheckBox} />
                    <label htmlFor="javascript">Javascript</label>
                    <input type="checkbox" value="html" name="skills" id="html" onBlur={handleCheckBox} />
                    <label htmlFor="html">HTML</label>
                    <input type="checkbox" value="css" name="skills" id="css" onBlur={handleCheckBox} />
                    <label htmlFor="css">CSS</label>
                    <input type="checkbox" value="php" name="skills" id="php" onBlur={handleChange} />
                    <label htmlFor="php">PHP</label>
                </div>
                {errorFields.skills && <p className='error-msg'>Skills is required</p>}
            </div>

            {/* DOB Date  */}

            <div className="form-control">
                <label htmlFor="dob" className='heading-label'>Date Of Birth</label>
                <input type="date" name="dob" id="dob" onBlur={handleChange} />
                {errorFields.dob && <p className='error-msg'>Date of BIrth is required</p>}
            </div>

            {/* Country Select */}
            <div className="form-control">
                <label htmlFor="country" className="heading-label">Country</label>
                <select name="country" id="country" onBlur={handleChange}>
                    <option value="">Select..</option>
                    <option value="uae">UAE</option>
                    <option value="india">India</option>
                    <option value="qatar">Qatar</option>
                </select>
                {errorFields.country && <p className='error-msg'>Country is required</p>}
            </div>
            {/* Form Submit */}
            <div className="form-control">
                <button onClick={isValidOnSubmit} >Submit</button>
            </div>

        </form>
    )
}

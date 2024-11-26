import React, { useEffect, useState } from 'react';  

const Form = ({getFormData,  handleBooking}) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        fee : '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'First name is required.';
        if (!formData.lastName) newErrors.lastName = 'Last name is required.';
        if (!formData.email) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid.';
        }
        if (!formData.mobile) {
            newErrors.mobile = 'Mobile number is required.';
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            newErrors.mobile = 'Mobile number must be 10 digits.';
        }
        if (!formData.fee) {
            newErrors.fee = 'fee is required.';
        } else if (formData.fee <=0 ) {
            newErrors.fee = 'fee must be greater than zero';
        }
        return newErrors;
    }; 

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) { 
            handleBooking(); 
            setErrors({});
        } else {
            setErrors(validationErrors);
        }
    };

    useEffect(() =>{
        getFormData(formData)
    },[formData])

    return (
        <div className="  p-6 bg-white h-full ml-5 mt-5 w-[500px]"> 
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Mobile Number</label>
                    <input
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${errors.mobile ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                    />
                    {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Fee</label>
                    <input
                        type="text"
                        name="fee"
                        value={formData.fee}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${errors.fee ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                    />
                    {errors.fee && <p className="text-red-500 text-sm">{errors.fee}</p>}
                </div>
                {/* <div>
                    <p className='font-bold text-[20px]'>Fee : 500</p>
                </div>  */}
                <button type="submit" className="w-full mt-3 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition">
                    Book now
                </button>
            </form>
        </div>
    );
};

export default Form;

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployeeById, createEmployee, updateEmployee, getCountry } from '../Component/api';

function EditUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    country: '',
    state: '',
    district: ''
  });
  const [country, setCountry] = useState([]);

  useEffect(() => {
    if (id) fetchEmployee();
    fetchCountry();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const { data } = await getEmployeeById(id);
      setEmployee(data);
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  };

  const fetchCountry = async () => {
    try {
      const { data } = await getCountry();
      setCountry(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateEmployee(id, employee);
      } else {
        await createEmployee(employee);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  return (
  <div className=" flex justify-center items-center w-full">
    <Card className="w-[60%] mt-14 border-black rounded-lg shadow-lg shadow-black">
      <CardHeader
        variant="gradient"
        color="gray"
        className="mb-4 grid h-28 place-items-center bg-stone-800 rounded-t-lg"
      >
        <Typography variant="h3" color="white" className=" rounded-t-lg">
        {id ? 'Edit Employee' : 'Add Employee'}
        </Typography>
      </CardHeader>
      <form onSubmit={handleSubmit} className='w-full pb-5'>
      <CardBody className="flex flex-col justify-center items-center gap-5 px-16">
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={handleChange}
          placeholder="Name"
          required
        className= 'w-full p-2 border border-gray-300 rounded block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name '/>
        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className='w-full p-2 border border-gray-300 rounded block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name '/>
        <input
          type="text"
          name="mobile"
          value={employee.mobile}
          onChange={handleChange}
          placeholder="Mobile"
          required
          className='w-full p-2 border border-gray-300 rounded block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name '/>
          <div className="flex justify-between items-center w-[60%]">
            <Typography className=" font-medium text-lg">Country:</Typography>
        <select name="country" value={country.country} onChange={handleChange} required className='block appearance-none  bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'>
          <option value="">Select Country</option>
          {country.map((country) => (
            <option key={country.id} value={country.country}>
              {country.country}
            </option>
          ))}
        </select>
        </div>
        <input
          type="text"
          name="state"
          value={employee.state}
          onChange={handleChange}
          placeholder="State"
          required
          className='w-full p-2 border border-gray-300 rounded block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name '/>
        <input
          type="text"
          name="district"
          value={employee.district}
          onChange={handleChange}
          placeholder="District"
          required
          className='w-full p-2 border border-gray-300 rounded block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name '/>
        <button type="submit" className='bg-transparent hover:bg-stone-800 font-semibold hover:text-white py-2 px-10 border border-stone-800 hover:border-transparent rounded'>{id ? 'Update' : 'Add'}</button>

      </CardBody>
      </form>

    </Card>
    </div>
  );
}

export default EditUpdate;

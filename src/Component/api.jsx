// async function getData() {
//     const url = "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee";
//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error("error");
//       }
  
//       const json = await response.json();
//       console.log(json);
//     } catch (error) {
//       console.error(error.message);
//     }
//   }
import axios from 'axios';

const API_URL = 'https://669b3f09276e45187d34eb4e.mockapi.io/api/v1'; 

export const getAllEmployee = () => axios.get(`${API_URL}/employee`);
export const getEmployeeById = (id) => axios.get(`${API_URL}/employee/${id}`);
export const createEmployee = (employee) => axios.post(`${API_URL}/employee`, employee);
export const updateEmployee = (id, employee) => axios.put(`${API_URL}/employee/${id}`, employee);
export const deleteEmployee = (id) => axios.delete(`${API_URL}/employee/${id}`);
export const getCountry = () => axios.get(`${API_URL}/country`);

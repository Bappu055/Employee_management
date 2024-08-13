import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllEmployee, deleteEmployee } from "../Component/api";
import DeleteConf from "./DeleteConf";
import EmployeeDetails from "./EmployeeDetails";

function Home() {
  const [employee, setEmployee] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowClick, setRowClick] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (searchId) {
      const results = employee.filter(
        (value) =>
          value.name.toLowerCase().includes(searchId.toLowerCase()) ||
          value.id === searchId
      );
      setSearchResults(results);
    }
  }, [searchId, employee]);

  useEffect(() => {
    fetchEmployee();
  }, [currentPage]);

  const fetchEmployee = async () => {
    try {
      const { data } = await getAllEmployee();
      setEmployee(data);
      setTotalPages(data.length);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleDelete = (id) => {
    setSelectedEmployeeId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteEmployee(selectedEmployeeId);
      setShowDeleteModal(false);
      fetchEmployee();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedEmployeeId(null);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const rowsToDisplay = searchId
    ? searchResults
    : employee?.slice((currentPage - 1) * 10, currentPage * 10);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Employee Management</h1>

      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="mr-4 p-2 border border-gray-300 rounded"
        />
        <button
          onChange={(event) => searchId(event.target.value)}
          className="mr-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
        <button
          onClick={() => navigate("/add")}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Add New Employee
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Avatar
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mobile
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Country
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rowsToDisplay?.map((employee) => (
              <tr
                key={employee.id}
                className="hover:bg-gray-100"
                onClick={() => setRowClick(employee.id)}
              >
                <td className="px-6 py-4 border-b border-gray-200">
                  <img
                    src={employee.avatar}
                    alt={employee.name}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {employee.id}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {employee.name}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {employee.email}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {employee.mobile}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {employee.country}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/edit/${employee.id}`);
                    }}
                    className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(employee.id);
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!rowsToDisplay.length && employee.length!=0 && (
          <div className="font-semibold text-center w-full my-2 border-2 p-4">
            No Data TO Display
          </div>
        )}
          {!employee.length && (
              <div className="">
                <div
                  aria-label="Loading..."
                  role="status"
                  class="flex items-center justify-center my-5 space-x-2"
                >
                  <svg
                    class="h-10 w-10 animate-spin stroke-gray-500"
                    viewBox="0 0 256 256"
                  >
                    <line
                      x1="128"
                      y1="32"
                      x2="128"
                      y2="64"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="195.9"
                      y1="60.1"
                      x2="173.3"
                      y2="82.7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="224"
                      y1="128"
                      x2="192"
                      y2="128"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="195.9"
                      y1="195.9"
                      x2="173.3"
                      y2="173.3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="128"
                      y1="224"
                      x2="128"
                      y2="192"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="60.1"
                      y1="195.9"
                      x2="82.7"
                      y2="173.3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="32"
                      y1="128"
                      x2="64"
                      y2="128"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="60.1"
                      y1="60.1"
                      x2="82.7"
                      y2="82.7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                  </svg>
                  <span class="text-xl font-medium text-gray-500">
                    Loading...
                  </span>
                </div>
              </div>
            )}
      </div>

      {employee.length>0 && <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePageChange(null, currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l"
        >
          Previous
        </button>
        <div className=" font-bold px-3 py-1 m-1 rounded-3xl bg-neutral-400">
          {currentPage}
        </div>
        <button
          onClick={() => handlePageChange(null, currentPage + 1)}
          disabled={currentPage === Math.ceil(employee.length / 10)}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r"
        >
          Next
        </button>
      </div>}

      {showDeleteModal && (
        <DeleteConf
          onDelete={confirmDelete}
          onCancel={cancelDelete}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}

      {rowClick && <EmployeeDetails id={rowClick} setRowClick={setRowClick} />}
    </div>
  );
}

export default Home;

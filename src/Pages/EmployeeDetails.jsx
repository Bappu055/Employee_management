import React, { useEffect, useState } from "react";
import {  Link } from "react-router-dom";
import { getEmployeeById } from "../Component/api";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

function EmployeeDetails(props) {
  const { id, setRowClick } = props;
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const { data } = await getEmployeeById(id);
      setEmployee(data);
    } catch (error) {
      console.error("Error fetching employee:", error);
    }
  };  

  return(
    <div>
    <Dialog open={true} onClose={() => {}} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"></div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    Employee Details
                  </DialogTitle>
                  <div className="mt-2">
                  <p className=''>Name: {employee?.name}</p>
                  <p>Email: {employee?.email}</p>
                  <p>Mobile: {employee?.mobile}</p>
                  <p>Country: {employee?.country}</p>
                  <p>State: {employee?.state}</p>
                  <p>District: {employee?.district}</p>
                  <Link to={`/edit/${employee?.id}`}>Edit</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => {
                  setRowClick(null)
                }}
                className="inline-flex w-full justify-center rounded-md bg-red-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
</div>
  )
   
}

export default EmployeeDetails;

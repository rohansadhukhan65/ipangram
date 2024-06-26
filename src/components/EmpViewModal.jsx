import React from 'react';

const EmpViewModal = ({ isOpen, onClose , data }) => {
  // Conditional rendering of the modal based on isOpen prop
  if (!isOpen) return null;
 
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto border-[2px] border-gray-900">
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mt-4">
             <div>
              <p className='text-lg font-semibold'>Name</p>
              <p>{data.name ?? 'N/A'}</p>
             </div>
             <div>
              <p className='text-lg font-semibold'>Location</p>
              <p>{data.location ?? 'N/A'}</p>
             </div>
             <div>
              <p className='text-lg font-semibold'>Department</p>
              <p>{data.department ?? 'N/A'}</p>
             </div>
             <div>
              <p className='text-lg font-semibold'>Email</p>
              <p>{data.email ?? 'N/A'}</p>
             </div>
          </div>

          {/* <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none"
            >
              Close
            </button>
            <button className="ml-2 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">
              Save Changes
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default EmpViewModal;

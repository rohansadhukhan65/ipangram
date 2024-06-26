import React, { useContext, useEffect, useState } from "react";
import AuthWrapper from "../components/AuthWrapper";
import { AppContext } from "../Context";
import { Apihelper } from "../../services/ApiHelpers";
import Modal from "../components/Modal";
import EmpViewModal from "../components/EmpViewModal";

const Dashboard = () => {
  const { emp, setEmp, authData } = useContext(AppContext);
  const [EmpDatamodalOpen, setEmpDataModalOpen] = useState(false);
  const [viewData, setViewData] = useState({});
  const [filterName, setFilterName] = useState('dsc');
  const [filterLocation, setFilterLocation] = useState('dsc');

  const modalEmpDataViewhandler = () => setEmpDataModalOpen((p) => !p);

  const closeModal = () => {
    setEmpDataModalOpen(false);
  };


  const fetchData = async () => {
    try {
      const response = await Apihelper.get("/api/fetch-emp");
      const { emp } = await response.json();
      setEmp(emp);
    } catch (error) {
      console.log(error);
    }
  };

  // Name Filter .....
  useEffect(() => {
    if (filterName) {
      const filterData = async () => {
        try {
          const response = await Apihelper.get(
            `/api/fetch-emp?filterName=${filterName}`
          );
          const { emp } = await response.json();
          setEmp(emp);
        } catch (error) {
          console.log(error);
        }
      };
      filterData();
    }
  }, [filterName]);

    // Location Filter .....
    useEffect(() => {
      if (filterLocation) {
        const filterData = async () => {
          try {
            const response = await Apihelper.get(
              `/api/fetch-emp?filterLocation=${filterLocation}`
            );
            const { emp } = await response.json();
            setEmp(emp);
          } catch (error) {
            console.log(error);
          }
        };
        filterData();
      }
    }, [filterLocation]);

  useEffect(() => {

    fetchData();
  }, []);
  return (
    <AuthWrapper>
      <div className="flex flex-col justify-start items-start overflow-x-auto py-5 px-10">
        <div className="flex items-center justify-start mb-10">
          Filters :{" "}
          <span
            onClick={() => setFilterName((p) => (p === "asc" ? "dsc" : "asc"))}
            className="border px-3 rounded-full mx-2 cursor-pointer shadow-md text-lg"
          >
            Name in {filterName === 'asc'?'Asending':'Desending'} order
          </span>{" "}
          <span onClick={() => setFilterLocation((p) => (p === "asc" ? "dsc" : "asc"))} className="border px-3 rounded-full mx-2 cursor-pointer shadow-md">
            Location
          </span>{" "}
          <span onClick={fetchData} className="border bg-gray-200 px-3 rounded-full mx-2 cursor-pointer">
            Clear
          </span>
        </div>
        <table className="w-full min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th>Name</th>
              <th>location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {emp.map((item) => (
              <tr key={item.email}>
                <td className="mx-5 text-center">{item.name}</td>
                <td className="mx-5 text-center">{item.location}</td>
                <td className="mx-5 text-center">
                  {item.email === authData.email && (
                    <button
                      onClick={() => {
                        modalEmpDataViewhandler();
                        setViewData(item);
                      }}
                      className="px-3 py-1 border mx-1 rounded shadow-md bg-yellow-500"
                    >
                      View
                    </button>
                  )}
                  {authData.role === "manager" && (
                    <>
                      <button
                        onClick={() => {
                          modalEmpDataViewhandler();
                          setViewData(item);
                        }}
                        className="px-3 py-1 border mx-1 rounded shadow-md bg-yellow-500"
                      >
                        View
                      </button>

                      <button
                        onClick={() => {}}
                        className="px-3 py-1 border mx-1 rounded shadow-md bg-cyan-500"
                      >
                        Edit
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <EmpViewModal
          isOpen={EmpDatamodalOpen}
          onClose={closeModal}
          data={viewData}
        />
      </div>
    </AuthWrapper>
  );
};

export default Dashboard;

import React, { useState } from "react";
import SignupForm from "../components/SignupForm";

const Signup = () => {
  const [position , setPosition] = useState(null)
  return (
    <div className="flex justify-center items-center h-[100dvh]">
      <div className="shadow-md border rounded-md p-5 md:p-10 flex flex-col justify-center items-center">
        <h1 className="text-2xl mb-5">Sign Up</h1>
        <div className="flex gap-x10">
          <button onClick={()=> setPosition('manager')} className={`border mx-5 px-3 py-1 rounded ${position === 'manager'?'bg-yellow-500':''}`}>Manager</button>
          <button onClick={()=> setPosition('employee')} className={`border mx-5 px-3 py-1 rounded ${position === 'employee'?'bg-yellow-500':''}`}>Employee</button>
        </div>
        <SignupForm position={position}/>
      </div>
    </div>
  );
};

export default Signup;

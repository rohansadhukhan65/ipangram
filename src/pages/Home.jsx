import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Apihelper } from "../../services/ApiHelpers";

const Home = () => {
  const navigate = useNavigate();

  const [lognCred, setLoginCred] = useState({
    email: null,
    password: null,
  });

  const loginHandler = useCallback(async () => {
    try {
      if (!lognCred.email) {
        return alert("Enter Email !");
      }
      if (!lognCred.password) {
        return alert("Enter Password !");
      }
      const response = await Apihelper.post("/api/login", lognCred);
      const { token, role , email} = await response.json();

      // Store token in local storage
      if (response.ok) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("email", email);
        navigate('/dashboard')
      } else {
        return alert("Wrong Credentials !");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-[100dvh]">
      <div className="shadow-md border rounded-md p-5 md:p-10 flex flex-col justify-center items-center">
        <h1 className="text-2xl mb-5">Sign In</h1>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="">Name</label>
          <input
            onChange={(e) => {
              lognCred.email = e.target.value;
              setLoginCred(lognCred);
            }}
            autoComplete="false"
            type="email"
            name="user-email"
            id="user-email"
            className="border outline-none rounded-md px-3 py-1"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="">Password</label>
          <input
            autoComplete="false"
            onChange={(e) => {
              lognCred.password = e.target.value;
              setLoginCred(lognCred);
            }}
            type="password"
            name="user-password"
            id="user-password"
            className="border outline-none rounded-md px-3 py-1"
          />
        </div>

        <div className="mt-5">
          <button
            className="px-10 py-3 bg-yellow-500 rounded-md "
            type="button"
            onClick={loginHandler}
          >
            Login
          </button>
        </div>

        <div className="mt-6">
          <p>
            Don't have account ?{" "}
            <span
              className="text-xl font-semibold cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

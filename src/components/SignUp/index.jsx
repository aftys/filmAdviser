import { Link } from "react-router-dom";

import { signInWithGoogle, registerWithEmailAndPassword } from "../../firebase";
import React, { useState } from "react";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  return (
    <>
      <div className="bg-blueGray-50 w-screen h-screen flex justify-center items-center">
        <div className="w-full lg:w-4/12 px-4 mx-auto pt-6 ">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-[#171717] border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center mb-3">
                <h6 className="text-blueGray-500 text-sm font-Stevens ">
                  Sign Up with
                </h6>
              </div>
              <div className="btn-wrapper text-center">
                {/* <button
                  className="bg-white active:bg-blueGray-50 text-blueGray-700  px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                  type="button"
                >
                  <img
                    alt="..."
                    className="w-5 mr-1"
                    src="https://demos.creative-tim.com/notus-js/assets/img/github.svg"
                  />
                  Github
                </button> */}
                <button
                  className="bg-white active:bg-blueGray-50 text-blueGray-700 px-4 py-2 text-black rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                  type="button"
                  onClick={signInWithGoogle}
                >
                  <img
                    alt="..."
                    class="w-5 mr-1"
                    src="https://demos.creative-tim.com/notus-js/assets/img/google.svg"
                  />
                  Google{" "}
                  
                </button>
              </div>
              <hr class="mt-6 border-b-1 border-blueGray-300" />
            </div>
            <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div class="text-blueGray-400 text-center mb-3 font-Stevens text-xl">
                <small>sign in with credentials</small>
              </div>
              <form className="flex flex-col items-center">
                <div class="relative w-full mb-3">
                  <input
                    type="name"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="font-Stevens text-black text-xs border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div className="relative w-full mb-3">
                  <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="font-Stevens text-black text-xs border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div className="relative w-full mb-3">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="font-Stevens text-black text-xs border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div>
                  <label className="flex cursor-pointer justify-end  ">
                    <span classNameName="font-Stevens text-xs">
                      already have account ?{" "}
                      <Link
                        to="/SignIn"
                        classNameName=" hover:underline"
                      >
                        <span className="text-blue-600">SIGN IN</span>
                      </Link>{" "}
                    </span>
                  </label>
                </div>
                <div className="text-center mt-6 w-1/2 flex justify-center">
                  <button
                    className="bg-blue-600 text-white active:bg-blueGray-600  text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150 font-Collingar"
                    // type="submit"
                    type="button"
                    onClick={() => {
                      registerWithEmailAndPassword(name, email, password);
                    }}
                  >
                    {" "}
                    Sign Up{" "}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
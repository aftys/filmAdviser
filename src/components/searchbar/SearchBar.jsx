// import "./SearchBar.css"
// import React, { useEffect, useState } from "react"
// import {TbSearch} from "react-icons/tb"

// const SearchBar = ({HandleSub,setMovieName}) => {

//     return (
//         <>
//             <div class="box">

//                 <form onSubmit={HandleSub} >
//                     <input type="text" class="input" name="txt" onChange={(e)=>{setMovieName(e.target.value)}}/>
//                     {/* <TbSearch class="icon"/> */}
//                 </form>

//             </div>
//         </>
//     )
// }

// export default SearchBar

import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
import { FaSearch } from 'react-icons/fa';


export const SearchBar = ({ HandleSub, setMovieName }) => {
    const [show, setShow] = useState(false)

    const handleInputChange = (event) => {
        setMovieName(event.target.value);
    };

    return (


        <form onSubmit={HandleSub} className="z-40 h-12 flex  column-reverse items-center bg-blue-500 rounded-full px-4 py-2">
                {show && <input
                    // initial={{ width: 0 }}
                    // animate={{ width: "140px" }}
                    // transition={{ type: "easeIn" }}
                    // exit={{ width: 0 }}
                    type="text"
                    placeholder="Search"
                    onChange={handleInputChange}
                    className="flex-grow mr-2   w-[140px]  bg-transparent outline-none"
                />}
            <FaSearch onClick={() => setShow(!show)} className="text-white " />
        </form>
    );
};


export default SearchBar
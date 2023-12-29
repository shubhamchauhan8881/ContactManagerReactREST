import { useState, useEffect } from "react";
import {Link} from "react-router-dom";

export default function Search() {
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState([]);
    const [hasFocus, setHasFocus] = useState(false);

    useEffect(() =>{
        if(searchQuery.length >= 3){
            fetch(`http://localhost:8000/api/v1/contacts/search/${searchQuery}/`, {'method': 'POST',})
            .then((response) => response.json())
            .then((data) => {setSearchResults(data);});
            
        }

    },[searchQuery] );

    return (
        <div className="relative flex gap-x-1">
            {hasFocus && searchQuery &&
                <div className="searchres absolute bg-white text-black top-9 rounded-md z-10 p-2 left-0 right-0">
                    <ul>
                        {searchResults["message"]==="ok"? <Link to={`../show/${searchResults["data"][0].id}`} ><li className="text-xs">{searchResults["data"][0].fname + " " +searchResults["data"][0].lname}</li> </Link>: <li className="text-xs">No results.</li> }
                    </ul>
                </div>
            }

            <input type='search' onFocus={()=>setHasFocus(true)} onBlur={()=>setHasFocus(false)} value={searchQuery} onChange={ (e)=>setSearchQuery(e.target.value) } className="c py-1 px-2 bg-transparent border-2 rounded-lg text-white w-full" placeholder="Search contacts..."/>
            <Link to="create"><button className="border-[1px] h-full border-emerald-400 hover:bg-emerald-400 text-sm px-2 rounded-md">New</button></Link>
        </div>
    )
  }
  
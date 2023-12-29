import { useParams } from "react-router-dom";
import ico from "../user.png";
import { useState,useEffect } from "react";
import NaContact from "./NaContact"
import {Link } from "react-router-dom"


export default function ShowContact() {
  const nav = useParams();
  const [IsFav,setIsFav] = useState();
  const [contctDetails, setContctDetails] = useState();
  
  useEffect(() =>{
    fetch(`http://localhost:8000/api/v1/contacts/${nav.id}/`, {"method": "GET"})
    .then((response) => response.json())
    .then((data) => {setContctDetails(data); setIsFav(data['data'].is_fav); });    
  },[setContctDetails,nav]);

  const marAsFav = (pk) => {
    fetch(`http://localhost:8000/api/v1/contacts/mark-fav/${contctDetails['data'].id}/`, {"method": "POST"})
    setIsFav(!IsFav);
  }
  return (
    <div>
        <p className="text-lg font-bold py-1">Contact Details</p>
        <div>
          {contctDetails ? (
              <div className="card mt-2 p-3 rounded-md">
                <div className="flex gap-x-2 items-top">
                  <div className="lft">
                    <img src={ico} className="rounded-s-md h-36 object-fit w-36 object-top" alt=""/>
                  </div>

                  <div className="rght flex-1 relative">
                    <div className="absolute top-0 right-2 cursor-pointer bg-white px-2 py-1 rounded-full flex gap-x-2">
                      <svg role="button" onClick={ marAsFav } width="18px" height="18px" viewBox="-2.4 -2.4 28.80 28.80" fill={(IsFav? "yellow":"none")}   transform="matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.048"></g><g id="SVGRepo_iconCarrier"> <path d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                      
                      <Link to="../">
                        <svg width="18px" height="18px" viewBox="0 0 24 24"  >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                          <g id="SVGRepo_iconCarrier">
                            <path d="M3 6.52381C3 6.12932 3.32671 5.80952 3.72973 5.80952H8.51787C8.52437 4.9683 8.61554 3.81504 9.45037 3.01668C10.1074 2.38839 11.0081 2 12 2C12.9919 2 13.8926 2.38839 14.5496 3.01668C15.3844 3.81504 15.4756 4.9683 15.4821 5.80952H20.2703C20.6733 5.80952 21 6.12932 21 6.52381C21 6.9183 20.6733 7.2381 20.2703 7.2381H3.72973C3.32671 7.2381 3 6.9183 3 6.52381Z" fill="#1C274C"></path>
                            <path d="M11.6066 22H12.3935C15.101 22 16.4547 22 17.3349 21.1368C18.2151 20.2736 18.3052 18.8576 18.4853 16.0257L18.7448 11.9452C18.8425 10.4086 18.8913 9.64037 18.4498 9.15352C18.0082 8.66667 17.2625 8.66667 15.7712 8.66667H8.22884C6.7375 8.66667 5.99183 8.66667 5.55026 9.15352C5.1087 9.64037 5.15756 10.4086 5.25528 11.9452L5.51479 16.0257C5.69489 18.8576 5.78494 20.2736 6.66513 21.1368C7.54532 22 8.89906 22 11.6066 22Z" fill="#1C274C"></path>
                          </g>
                        </svg>
                      </Link>

                    </div>
                    <p className="font-bold text-2xl">{contctDetails['data'].fname} {contctDetails['data'].lname}<span className="text-sm opacity-80">({contctDetails['data'].email})</span></p>
                    <p className="text-xs opacity-80">{contctDetails['data'].date_created}</p>
                    <p className="text-md mt-1">Contact: {contctDetails['data'].phone}</p>
                    <p className="text-xs mt-1">Address: {contctDetails['data'].address}</p>
                    <div className="">
                      <Link to={`../edit/?id=${nav.id}&fname=${contctDetails['data'].fname}&lname=${contctDetails['data'].lname}&phone=${contctDetails['data'].phone}&email=${contctDetails['data'].email}&address=${contctDetails['data'].address}`}><button className="text-sm px-3 py-1 c hover:bg-white hover:text-blue-500 rounded-md me-2 mt-3">Edit</button> </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : <NaContact /> }
        </div>
    </div>
  )
}

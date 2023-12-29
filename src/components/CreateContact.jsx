import { useState } from "react"
import {useSearchParams} from "react-router-dom";


function Form({edit,fields}){
    const [formData,setFormData] = useState(fields);
    const [imagePath,setImagePath] = useState();
    const [errorList,setErrorList] = useState();

    const submitform = () =>{
        fetch(`http://localhost:8000/api/v1/contacts/new/`,
        {
            'method': (edit)?"PATCH":'POST',
            'headers': { 'Accept': 'application/json', 'Content-Type': 'application/json'},
            'body': JSON.stringify(formData)
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.message === "error") {

                let a = [];
                for(let key in data.error_message){
                    a.push(key.toUpperCase() + " : " + data.error_message[key][0]+"\t");
                }
                setErrorList([a]);
            }else{
                alert(edit?"Contact was updated successfully!":"New Contact was added secussfully!!")
            }

        });
    }

    const chooseImage = () => {
        var input = document.createElement('input');
        input.type = 'file';
        input.click();
    
        input.addEventListener("change", (e) =>{
            setImagePath(e.target.files[0]); //file object, path to the image
        });
    };

    return(
        <div>
        <p className="text-lg font-bold border-b-[1px] py-1">{edit ? "Edit Contact": "Add New Contact"}</p>
        <div>
            <form>

                <div className="p-2 inline-block">
                    
                    <svg onClick={chooseImage} role="button" fill="#ddd" version="1.1" id="Capa_1" width="80px" height="80px" viewBox="0 0 311.541 311.541">
                        <g>
                            <g>
                                <path d="M155.771,26.331C69.74,26.331,0,96.071,0,182.102c0,37.488,13.25,71.883,35.314,98.761
                                    c3.404-27.256,30.627-50.308,68.8-61.225c13.946,12.994,31.96,20.878,51.656,20.878c19.233,0,36.894-7.487,50.698-19.936
                                    c38.503,11.871,65.141,36.27,66.017,64.63c24.284-27.472,39.056-63.555,39.056-103.108
                                    C311.541,96.071,241.801,26.331,155.771,26.331z M155.771,222.069c-9.944,0-19.314-2.732-27.634-7.464
                                    c-20.05-11.409-33.855-34.756-33.855-61.711c0-38.143,27.583-69.176,61.489-69.176c33.909,0,61.489,31.033,61.489,69.176
                                    c0,27.369-14.237,51.004-34.786,62.215C174.379,219.523,165.346,222.069,155.771,222.069z"/>
                            </g>
                        </g>
                    </svg>
                    <p className="text-xs opacity-80">{imagePath ? imagePath.name : "Upload Photo"}</p>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                    <label htmlFor="fname">
                        <p>First Name</p>
                        <input type="text" required name="fname" className="w-full" value={formData['fname']} onChange={(e) => setFormData({...formData, 'fname':e.target.value})} />
                    </label>

                    <label htmlFor="lname">
                        <p>Last Name</p>
                        <input type="text" required name="lname" className="w-full" value={formData['lname']} onChange={(e) => setFormData({...formData, 'lname':e.target.value})}/>
                    </label>

                    <label htmlFor="lname">
                        <p>Phone</p>
                        <input type="text" required name="lname" className="w-full" value={formData['phone']} onChange={(e) => setFormData({...formData, 'phone':e.target.value})}/>
                    </label>
                    
                    <label htmlFor="email">
                        <p>Email</p>
                        <input type="text" name="email" className="w-full" value={formData['email']} onChange={(e) => setFormData({...formData, 'email':e.target.value})}/>
                    </label>

                    <label htmlFor="address">
                        <p>Address</p>
                        <textarea name="address" className="w-full" value={formData['address']} onChange={(e) => setFormData({...formData, 'address':e.target.value})}/>
                    </label>
                    {errorList && (
                        <label htmlFor="error">
                            <div className="bg-rose-600 p-2 rounded-md flex flex-col">
                                <h3>Errors:</h3>
                                { errorList.map((error,index) =><p key={index}>{error}</p>)  }
                            </div>
                        </label>
                    ) }
                    
                </div>
            
                <div className="mt-3">
                    <button type="button" className="border-[1px] border-emerald-400 hover:bg-emerald-400 px-5 py-2 rounded-md" onClick={submitform}>{edit? 'Update Contact': 'Add Contact' }</button>
                </div>
            </form>
        </div>
    </div>
    )
}

function EditForm(){
    const [searchParam, setSearchParams] = useSearchParams()
    const fields={
        "id":searchParam.get("id"),
        "fname":searchParam.get("fname"),
        "lname":searchParam.get("lname"),
        "phone":searchParam.get("phone"),
        "email":searchParam.get("email"),
        "address":searchParam.get("address"),
    };
    setSearchParams({"id":"x"})
    return(
        <Form edit={true} fields={fields} />
    )
}


function NewForm(){
    const fields =
    {
        "fname":"",
        "lname":"",
        "phone":"",
        "email":"",
        "address":"",
    }
    return(
        <Form edit={false} fields={fields} />
    )
}

export default function CreateContact({edit}) {
    return (
        <>
            {edit ? <EditForm /> : <NewForm />}
        </>
    )};

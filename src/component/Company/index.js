// import React, { useState } from 'react'
import React, { useEffect, useState } from "react";
import "./company.css";
import { AddCompany, getAllCompany } from "../../config/firebase";

export default function Company() {
  const [name, setName] = useState("");
  const [since, setSince] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const [address, setAddress] = useState("");


  // useEffect(() => {
  //   const q = query(collection(db, "company"), where(`userId`, "==", `${auth.currentUser.uid}`));
  //   const companies = onSnapshot( q, (snapshot) => {
  //       setData([]);
  //       snapshot.docs.forEach((doc) => {
  //         setData((prev) => [...prev, { id: doc.id, data: doc.data() }]);
  //       });
  //       setIsUpdate(true)
  //     });
  //   return () => {
  //     companies()
  //   }
  // }, [])




  function AddCompanyToFirebase() {
    if (name === "" || since === "" || address === "" || openingTime === "" || closingTime === "" ) {
      alert("Please Fill The Form");
    } else {
      AddCompany({ name,since,open,close,address});
      setSince("");
      setAddress("");
      setName("");
      setOpeningTime("")
      setClosingTime("")
      setShow(false)
    }
  }

  const onTimeChange = function (time) {
    let timeSplit = time.split(':'),
      hours,
      minutes,
      meridian;
    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
      meridian = 'PM';
      hours -= 12;
    } else if (hours < 12) {
      meridian = 'AM';
      if (hours === 0) {
        hours = 12;
      }
    } else {
      meridian = 'PM';
    }
    return(hours + ':' + minutes + ' ' + meridian);
  }
  let open = onTimeChange(openingTime)
  let close = onTimeChange(closingTime)

  // const fetch = async () => {
  //   const data = await getAllCompany();
  //   let temp = [...data];
  //   console.log("temp", temp);
  //   setData(temp);
  //   console.log("dd  ==", data);
  // };
  // useEffect(() => {
  //   fetch();
  // }, []);

  const userName = function (e) {
    setName(e.target.value);
  };
  const sinceAdd = function (e) {
    setSince(e.target.value);
  };
  // const timingAdd = function (e) {
  //   setTiming(e.target.value);
  // };
  const openTime = function (e) {
   setOpeningTime(e.target.value);
  };
  const closeTime = function (e) {
    setClosingTime(e.target.value);
  };
  const addressAdd = function (e) {
    setAddress(e.target.value);
  };

  return (
    <>
      <div>
        <button onClick={()=>setShow(true)}>CREATE COMPANY +</button>
      </div>
      <div style={{display:"flex",justifyContent: 'center',alignItems: 'center'}}>
        <table>
          {
            data.length < 0 ? "":
            <tr>
            <th>Company Name</th>
            <th>Since</th>
            <th>Address</th>
          </tr>
          }
        
          
            {data.map((item)=>{
              return <>
               
              <tr >
              <td>{item.name}</td>
              <td>{item.since}</td>
              <td>{item.address}</td>
              </tr>
              </>
            })}            
         
        </table>
      </div>
      
{show && 
  <div className="container">
        <div className="form-box">
            <h1>ADD COMPANY DETAIL</h1>
            
                
                <div className="form-container">
                        <div className="form-controls">
                        <label for="company-name">Company Name</label>
                        <input  id="company-name" name="company-name" placeholder="Enter Company Name.."  value={name} onChange={userName}/>
                    </div>
                    <div className="form-controls">
                        <label for="since">Since</label>
                        <input type="number" id="since" name="since" placeholder="Since.." onChange={sinceAdd} value={since} />
                    </div>
                    <div className="form-controls">
                        <label for="opening-time">Opening Time</label>
                        <input type="time" id="opening-time" name="opening-time" value={openingTime}  onChange={openTime}/>
                    </div>
                    
                    <div className="form-controls">
                        <label for="closing-time">Closing Time</label>
                        <input type="time" id="closing-time" name="closing-time" value={closingTime} onChange={closeTime}/>
                    </div>
                
                    <div className="textarea-controls">
                        <label for="address">Address</label>
                        <textarea name="address" id="address" cols="30" rows="3" value={address} onChange={addressAdd} placeholder="Enter Company Address..."></textarea>
                    </div>
                   
                    <div className="form-controls">
                        <label for="images">Certificates Images</label>
                        <input type="file" id="images" name="images"/>
                     </div>
                </div>
                <div className="button-container">
                    <button type="submit" onClick={AddCompanyToFirebase}>ADD COMPANY</button>
                </div>
            
        </div>
        
    </div>
//  <div>
//  <div className="black">
//    <label htmlFor=""> Name of company:</label>
//    <input
//      type="text"
//      value={name}
//      placeholder=" Name of company"
//      onChange={userName}
//    />
//    <br />
//    <label htmlFor=""> Since:</label>
//    <input
//      type="number"
//      value={since}
//      placeholder=" Enter Company Age"
//      onChange={sinceAdd}
//    />
//    <br />
//    {/* <label htmlFor=""> Timings:</label>
//    <input
//      type="text"
//      value={timing}
//      placeholder="enter Timning"
//      onChange={timingAdd}
//    /> */}
//    <label htmlFor=""> Opening Time</label>
//    <input
//      type="time"
//      value={openingTime}
//      onChange={openTime}
//    />
//    <br />
//    <label htmlFor=""> Closing Time</label>
//    <input
//      type="time"
//      value={closingTime}
//      onChange={closeTime}
//    />
//    <br />
//    <label htmlFor=""> Address:</label>
//    <input
//      type="text"
//      value={address}
//      placeholder=" Enter Address"
//      onChange={addressAdd}
//    />
//    <br />
//    <br />
//    <button onClick={AddCompanyToFirebase}>Add Company</button>
//    {/* <button onClick={()=>onTimeChange(openingTime)} >call</button> */}
//  </div>
// </div>
}
     
    </>
  );
}

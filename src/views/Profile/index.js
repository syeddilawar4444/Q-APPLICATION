// import React, { useState } from 'react'
import React, { useEffect, useState } from "react";
import "./company.css";
import { AddCompany, getAllCompany, db, auth } from "../../config/firebase";
import { where, collection, onSnapshot, query } from "firebase/firestore";

export default function Company() {
  const [name, setName] = useState("");
  const [since, setSince] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const [address, setAddress] = useState("");
  const [Isupdate, setIsUpdate] = useState(false)


  useEffect(() => {
    const q = query(collection(db, "Company"), where(`userId`, "==", `${auth.currentUser.uid}`));
    const companies = onSnapshot(q, (snapshot) => {
      setData([]);
      snapshot.docs.forEach((doc) => {
        setData((prev) => [...prev, { id: doc.id, data: doc.data() }]);
      });
      setIsUpdate(true)
    });
    return () => {
      companies()
    }
  }, [])




  function AddCompanyToFirebase() {
    if (name === "" || since === "" || address === "" || openingTime === "" || closingTime === "") {
      alert("Please Fill The Form");
    } else {
      AddCompany({ name, since, open, close, address });
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
    return (hours + ':' + minutes + ' ' + meridian);
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
        <button onClick={() => setShow(true)}>CREATE COMPANY +</button>
      </div>
      {data.map((item,key) =>{
        return (
          <div key ={key} className="show-company">

          <div className="company-header">
            <div className="compnay-name">
              Company Name :{item.data.company}
            </div>
            <div className="compnay-button">
              <button>Add Token</button>
              <button>Delete</button>
              <button>Disable</button>
  
            </div>
          </div>
          <div className="company-footer">
            <span>All Tokens : 17 </span>
            <span>Each Token Time : 10 minutes</span>
            <span>Sold Tokens : 0</span>
          </div>
        </div>
        )
      }
      
      
      )
      }   

      {show &&
        <div className="container">
          <div className="form-box">
            <h1 onClick={()=>console.log(data)}>REGISTED COMPANY </h1>


            <div className="form-container">
              <div className="form-controls">
                <label htmlFor="company-name">Company Name</label>
                <input id="company-name" name="company-name" placeholder="Enter Company Name.." value={name} onChange={userName} />
              </div>
              <div className="form-controls">
                <label htmlFor="since">Since</label>
                <input type="number" id="since" name="since" placeholder="Since.." onChange={sinceAdd} value={since} />
              </div>
              <div className="form-controls">
                <label htmlFor="opening-time">Opening Time</label>
                <input type="time" id="opening-time" name="opening-time" value={openingTime} onChange={openTime} />
              </div>

              <div className="form-controls">
                <label htmlFor="closing-time">Closing Time</label>
                <input type="time" id="closing-time" name="closing-time" value={closingTime} onChange={closeTime} />
              </div>

              <div className="textarea-controls">
                <label htmlFor="address">Address</label>
                <textarea name="address" id="address" cols="30" rows="3" value={address} onChange={addressAdd} placeholder="Enter Company Address..."></textarea>
              </div>

              <div className="form-controls">
                <label htmlFor="images">Certificates Images</label>
                <input type="file" id="images" name="images" />
              </div>
            </div>
            <div className="button-container">
              <button type="submit" onClick={AddCompanyToFirebase}>ADD COMPANY</button>
            </div>

          </div>

        </div>
      }

    </>
  );
}

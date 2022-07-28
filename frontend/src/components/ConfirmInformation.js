import React from 'react'
import { useState } from 'react'
import { useUserContext } from "../context/userContext";

export default function ConfirmInformation() {
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [otherUser, setOtherUser] = useState('')

  const { user } = useUserContext();
  //User ID
  const user_id = user.uid;

  const handleSubmit = (e) => {
    //prevent default submission
    e.preventDefault()
}

  return (
    <form onSubmit={handleSubmit} id='form-confirmation'>
      <h1>Enter your information</h1>
      <label >Full Name:</label>
      <input  placeholder='first name' className="name-input" value={first_name} onChange={(e) => setFirstName(e.target.value)}></input>
      <input  placeholder='last name' className="name-input" value={last_name} onChange={(e) => setLastName(e.target.value)}></input>
      <label >Address:</label>
      <input  id="address-input" value={address} onChange={(e) => setAddress(e.target.value)}></input>
      <button className="loginButton">Submit</button>
    </form>
  )
}

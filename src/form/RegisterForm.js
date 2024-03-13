import React, { useState } from 'react';
import './RegisterForm.css'; // Import CSS file

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    mobileNumber: '',
    emailAddress: ''
  });

  const [formSubmissions, setFormSubmissions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedIndex !== null) {
      
      const updatedSubmissions = [...formSubmissions];
      updatedSubmissions[selectedIndex] = formData;
      setFormSubmissions(updatedSubmissions);
      setSelectedIndex(null); 
    } else {
      
      setFormSubmissions([...formSubmissions, formData]);
    }
  
    setFormData({
      name: '',
      age: '',
      gender: '',
      mobileNumber: '',
      emailAddress: ''
    });
    setIsSubmitted(true);
  };

  const handleUpdate = (index) => {
   
    const selectedSubmission = formSubmissions[index];
    setFormData(selectedSubmission);
    setSelectedIndex(index);
  };

  const handleDelete = (index) => {
   
    console.log('Delete action for index:', index);
    setFormSubmissions(prevSubmissions => prevSubmissions.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2 > User Registeration Form </h2>
    <center>  <img src='https://banner2.cleanpng.com/20180329/zue/kisspng-computer-icons-user-profile-person-5abd85306ff7f7.0592226715223698404586.jpg' style={{width:"150px",borderRadius:"100px"}} /></center>
        <div className="form-group">
          <label>Name:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input 
            type="number" 
            name="age" 
            value={formData.age} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select 
            name="gender" 
            value={formData.gender} 
            onChange={handleChange} 
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Mobile Number:</label>
          <input 
            type="tel" 
            name="mobileNumber" 
            value={formData.mobileNumber} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Email Address:</label>
          <input 
            type="email" 
            name="emailAddress" 
            value={formData.emailAddress} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit">{selectedIndex !== null ? 'Update' : 'Submit'}</button>
      </form>
      {isSubmitted && (
        <div className="submissions">
          <h2>Form Submissions</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Mobile Number</th>
                <th>Email Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {formSubmissions.map((submission, index) => (
                <tr key={index}>
                  <td>{submission.name}</td>
                  <td>{submission.age}</td>
                  <td>{submission.gender}</td>
                  <td>{submission.mobileNumber}</td>
                  <td>{submission.emailAddress}</td>
                  <td>
                    <button onClick={() => handleUpdate(index)}>Update</button>
                    <button onClick={() => handleDelete(index)} style={{backgroundColor:"red"}}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;

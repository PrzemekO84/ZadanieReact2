import React, { useState } from 'react';
import './App2.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const change = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        validationErrors[key] = 'This field is required';
      }
    });

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      validationErrors.email = 'Invalid email address';
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{14,}$/;
    if (!passwordPattern.test(formData.password)) {
      validationErrors.password =
        'Password must be at least 14 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    }

    if (formData.password !== formData.repeatPassword) {
      validationErrors.repeatPassword = 'Passwords do not match';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage('');
    } else {
      setErrors({});
      setSuccessMessage('Registration successful!');
    }
  };

  return (
    <div id="registerContainer">
      <h1>User Registration</h1>
      {successMessage && <p>{successMessage}</p>}
      <div id="formContainer">
      <form onSubmit={submit}>
      <div class="form">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={change}
          />
          {errors.firstName && <p>{errors.firstName}</p>}
        </div>
        <div class="form">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={change}
          />
          {errors.lastName && <p>{errors.lastName}</p>}
        </div>
        <div class="form">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={change}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div class="form">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={change}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div class="form">
          <label htmlFor="repeatPassword">Repeat Password:</label>
          <input
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={change}
          />
          {errors.repeatPassword && <p>{errors.repeatPassword}</p>}
        </div>
        <button type="submit">Register</button>
      </form>
      </div>
    </div>
  );
};

export default RegistrationForm;

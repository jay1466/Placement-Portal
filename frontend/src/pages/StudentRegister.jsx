import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import '../pages/Login.css'; // Reuse login styles for split screen

function StudentRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    branch: 'CSE',
    cgpa: '',
    phone: '',
    graduationYear: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError('');

    try {
      await authService.registerStudent(formData);
      alert("Registration Successful!");
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data || 'Registration Failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container animate-fade-in">
      <div className="login-left">
        <div className="login-brand">
          <h1>Student Portal</h1>
          <p>Join the platform to unlock premium placement opportunities.</p>
        </div>
        <div className="login-graphics">
          <div className="graphic-circle"></div>
          <div className="graphic-circle small"></div>
        </div>
      </div>
      
      <div className="login-right" style={{ padding: '1rem' }}>
        <Card className="login-card" style={{ maxWidth: '600px', width: '100%' }}>
          <h2 className="login-title">Create Account</h2>
          <p className="login-subtitle">Fill in your details to register as a student.</p>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleRegister} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
            <Input label="Full Name" name="username" value={formData.username} onChange={handleChange} required placeholder="Enter Full Name" />
            <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="college@adit.ac.in" />
            <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Create password" />
            <Input label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required placeholder="Confirm password" />
            
            <div className="premium-input-group">
              <label className="premium-label">Branch</label>
              <select name="branch" className="premium-input" value={formData.branch} onChange={handleChange}>
                <option>CSE</option>
                <option>ECE</option>
                <option>EEE</option>
                <option>IT</option>
                <option>MECH</option>
                <option>CIVIL</option>
              </select>
            </div>
            
            <Input label="CGPA" type="number" name="cgpa" value={formData.cgpa} onChange={handleChange} placeholder="e.g. 8.5" />
            <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone" />
            <Input label="Graduation Year" type="number" name="graduationYear" value={formData.graduationYear} onChange={handleChange} placeholder="e.g. 2024" />
            
            <div style={{ gridColumn: 'span 2', marginTop: '1rem' }}>
              <Button type="submit" fullWidth disabled={loading}>
                {loading ? 'Registering...' : 'Register as Student'}
              </Button>
            </div>
          </form>

          <div className="login-footer">
            <p>Already have an account?</p>
            <div className="register-links">
              <Link to="/login">Sign In Instead</Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default StudentRegister;
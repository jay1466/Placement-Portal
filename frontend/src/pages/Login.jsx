import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Force Password Reset State
  const [needsReset, setNeedsReset] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login({ email, password });
      
      if (response.message === "Password reset required") {
        setNeedsReset(true);
        setLoading(false);
        return;
      }

      const token = response.token || response.jwt || response;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      if (response.id) localStorage.setItem('userId', response.id);

      // Navigate based on role
      if (role === 'student') navigate('/student-dashboard');
      else if (role === 'recruiter') navigate('/recruiter-dashboard');
      else navigate('/admin-dashboard');

    } catch (err) {
      setError(err.response?.data?.message || err.response?.data || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await authService.forcePasswordReset({ email, oldPassword: password, newPassword });
      alert("Password updated successfully. Please login again.");
      setNeedsReset(false);
      setPassword('');
      setNewPassword('');
    } catch (err) {
      setError(err.response?.data || 'Failed to update password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container animate-fade-in">
      <div className="login-left">
        <div className="login-brand">
          <h1>Placement Portal</h1>
          <p>Your gateway to premium career opportunities.</p>
        </div>
        <div className="login-graphics">
          <div className="graphic-circle"></div>
          <div className="graphic-circle small"></div>
        </div>
      </div>
      
      <div className="login-right">
        <Card className="login-card">
          <h2 className="login-title">{needsReset ? 'Update Password' : 'Welcome Back'}</h2>
          <p className="login-subtitle">
            {needsReset ? 'For security reasons, please change your temporary password.' : 'Please enter your details to sign in.'}
          </p>

          {error && <div className="login-error">{error}</div>}

          {!needsReset ? (
            <form onSubmit={handleLogin}>
              <div className="role-selector">
                <button type="button" className={`role-btn ${role === 'student' ? 'active' : ''}`} onClick={() => setRole('student')}>Student</button>
                <button type="button" className={`role-btn ${role === 'recruiter' ? 'active' : ''}`} onClick={() => setRole('recruiter')}>Recruiter</button>
                <button type="button" className={`role-btn ${role === 'admin' ? 'active' : ''}`} onClick={() => setRole('admin')}>Admin</button>
              </div>

              <Input 
                label="Email Address" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder="Enter your email" 
              />
              <Input 
                label="Password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                placeholder="Enter your password" 
              />
              
              <Button type="submit" fullWidth disabled={loading} className="mt-4">
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handlePasswordReset}>
               <Input 
                label="New Password" 
                type="password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                required 
                placeholder="Enter new strong password" 
              />
              <Button type="submit" fullWidth disabled={loading} className="mt-4" variant="success">
                {loading ? 'Updating...' : 'Update Password'}
              </Button>
              <Button type="button" fullWidth variant="secondary" className="mt-2" onClick={() => setNeedsReset(false)}>
                Cancel
              </Button>
            </form>
          )}

          <div className="login-footer">
            <p>Don't have an account?</p>
            <div className="register-links">
              <Link to="/student-register">Student Register</Link>
              <span>•</span>
              <Link to="/recruiter-register">Recruiter Register</Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Login;
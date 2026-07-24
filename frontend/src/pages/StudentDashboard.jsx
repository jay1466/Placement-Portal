import React, { useEffect, useState } from 'react';
import studentService from '../services/studentService';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import '../pages/AdminDashboard.css'; // Reusing layout CSS
import './StudentDashboard.css';

function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Fake student data for demo purposes (In real app, fetch from backend)
  const studentId = 1; // HARDCODED for now

  // Profile State
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    cgpa: '',
    backlogs: '0',
    tenthPercentage: '',
    twelfthPercentage: '',
    githubUrl: '',
    linkedinUrl: ''
  });
  
  const [profileMsg, setProfileMsg] = useState('');

  // Documents State
  const [docType, setDocType] = useState('resume');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMsg, setUploadMsg] = useState('');

  // Applications State
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (activeTab === 'applications') {
      loadApplications();
    }
  }, [activeTab]);

  const loadApplications = async () => {
    try {
      const data = await studentService.getApplications(studentId);
      setApplications(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      // Create the complex DTO expected by backend
      const request = {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        cgpa: parseFloat(profileData.cgpa),
        backlogs: parseInt(profileData.backlogs),
        tenthPercentage: parseFloat(profileData.tenthPercentage),
        twelfthPercentage: parseFloat(profileData.twelfthPercentage),
        githubUrl: profileData.githubUrl,
        linkedinUrl: profileData.linkedinUrl,
        skills: [], // Simplify for now
        projects: [] // Simplify for now
      };
      
      await studentService.updateProfile(studentId, request);
      setProfileMsg("Profile updated successfully!");
    } catch (err) {
      setProfileMsg(err.response?.data || "Failed to update profile");
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    
    try {
      await studentService.uploadDocument(studentId, docType, selectedFile);
      setUploadMsg("File uploaded successfully to Cloudinary!");
      setSelectedFile(null);
    } catch (err) {
      setUploadMsg(err.response?.data || "Failed to upload file");
    }
  };

  const renderOverview = () => (
    <div className="animate-fade-in">
      <Card title="Profile Completeness">
        <div className="progress-container">
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: '40%' }}></div>
          </div>
          <p className="progress-text">40% Complete - Update your profile to unlock placement drives!</p>
        </div>
      </Card>
      
      <div className="mt-4">
        <Card title="Quick Stats">
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-value text-blue">{applications.length}</div>
              <div className="metric-label">Applications</div>
            </div>
            <div className="metric-card">
              <div className="metric-value text-orange">0</div>
              <div className="metric-label">Interviews</div>
            </div>
            <div className="metric-card">
              <div className="metric-value text-green">0</div>
              <div className="metric-label">Offers</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderProfileForm = () => (
    <div className="animate-fade-in pb-4">
      <Card title="Update Profile">
        {profileMsg && <div className="alert-message">{profileMsg}</div>}
        <form onSubmit={handleProfileUpdate} className="profile-grid">
          <Input label="First Name" value={profileData.firstName} onChange={(e) => setProfileData({...profileData, firstName: e.target.value})} required />
          <Input label="Last Name" value={profileData.lastName} onChange={(e) => setProfileData({...profileData, lastName: e.target.value})} required />
          
          <Input label="CGPA" type="number" value={profileData.cgpa} onChange={(e) => setProfileData({...profileData, cgpa: e.target.value})} required placeholder="e.g. 8.5" />
          <Input label="Active Backlogs" type="number" value={profileData.backlogs} onChange={(e) => setProfileData({...profileData, backlogs: e.target.value})} required />
          
          <Input label="10th Percentage" type="number" value={profileData.tenthPercentage} onChange={(e) => setProfileData({...profileData, tenthPercentage: e.target.value})} placeholder="e.g. 90" />
          <Input label="12th Percentage" type="number" value={profileData.twelfthPercentage} onChange={(e) => setProfileData({...profileData, twelfthPercentage: e.target.value})} placeholder="e.g. 85" />
          
          <Input label="GitHub URL" type="url" value={profileData.githubUrl} onChange={(e) => setProfileData({...profileData, githubUrl: e.target.value})} placeholder="https://github.com/..." />
          <Input label="LinkedIn URL" type="url" value={profileData.linkedinUrl} onChange={(e) => setProfileData({...profileData, linkedinUrl: e.target.value})} placeholder="https://linkedin.com/..." />
          
          <div className="full-width mt-4">
            <Button type="submit" variant="primary">Save Profile</Button>
          </div>
        </form>
      </Card>
    </div>
  );

  const renderDocuments = () => (
    <div className="animate-fade-in" style={{ maxWidth: '600px' }}>
      <Card title="Document Vault">
        <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
          Upload your resume and marksheets. Documents are securely hosted on Cloudinary.
        </p>
        {uploadMsg && <div className="alert-message">{uploadMsg}</div>}
        <form onSubmit={handleFileUpload}>
          <div className="premium-input-group">
            <label className="premium-label">Document Type</label>
            <select className="premium-input" value={docType} onChange={(e) => setDocType(e.target.value)}>
              <option value="resume">Resume (PDF)</option>
              <option value="passportPhoto">Passport Photo (IMG)</option>
              <option value="tenthMarksheet">10th Marksheet</option>
              <option value="twelfthMarksheet">12th Marksheet</option>
            </select>
          </div>
          
          <div className="file-upload-zone mt-4">
            <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
          </div>
          
          <Button type="submit" className="mt-4" fullWidth disabled={!selectedFile}>Upload to Cloudinary</Button>
        </form>
      </Card>
    </div>
  );

  const renderApplications = () => (
    <div className="animate-fade-in">
      <Card title="My Applications">
        {applications.length === 0 ? (
          <p className="text-muted">You haven't applied to any drives yet.</p>
        ) : (
          <div className="approvals-list">
            {applications.map(app => (
              <div key={app.id} className="approval-item">
                <div className="approval-info">
                  <h4>Drive ID: {app.placementDrive.id}</h4>
                  <p>Applied On: {new Date(app.appliedOn).toLocaleDateString()}</p>
                </div>
                <div className="status-badge status-{app.status.toLowerCase()}">
                  {app.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">Student Portal</div>
        <nav className="sidebar-nav">
          <button className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
          <button className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>My Profile</button>
          <button className={`nav-item ${activeTab === 'documents' ? 'active' : ''}`} onClick={() => setActiveTab('documents')}>Document Vault</button>
          <button className={`nav-item ${activeTab === 'applications' ? 'active' : ''}`} onClick={() => setActiveTab('applications')}>My Applications</button>
        </nav>
      </aside>
      
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h2>Student Dashboard</h2>
          <Button variant="secondary" onClick={() => { localStorage.clear(); window.location.href = '/login'; }}>Logout</Button>
        </header>
        
        <div className="dashboard-content">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'profile' && renderProfileForm()}
          {activeTab === 'documents' && renderDocuments()}
          {activeTab === 'applications' && renderApplications()}
        </div>
      </main>
    </div>
  );
}

export default StudentDashboard;
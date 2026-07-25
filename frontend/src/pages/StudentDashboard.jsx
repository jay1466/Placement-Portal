import React, { useEffect, useState } from 'react';
import studentService from '../services/studentService';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useNavigate } from 'react-router-dom';

function StudentDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const studentId = localStorage.getItem('userId');
  
  const [applications, setApplications] = useState([]);
  const [drives, setDrives] = useState([]);
  const [applyMsg, setApplyMsg] = useState('');

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

  useEffect(() => {
    if (!studentId) {
      navigate('/login');
    }
  }, [studentId, navigate]);

  useEffect(() => {
    if (activeTab === 'applications') loadApplications();
    if (activeTab === 'drives') loadDrives();
  }, [activeTab]);

  const loadApplications = async () => {
    try {
      const data = await studentService.getApplications(studentId);
      setApplications(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadDrives = async () => {
    try {
      const data = await studentService.getAllDrives();
      setDrives(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleApply = async (driveId) => {
    try {
      setApplyMsg('');
      await studentService.applyForDrive(studentId, driveId);
      setApplyMsg('Successfully applied to the drive!');
      loadApplications();
    } catch (err) {
      setApplyMsg(err.response?.data || "Failed to apply. Ensure your profile is complete and eligible.");
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const request = {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        cgpa: parseFloat(profileData.cgpa),
        backlogs: parseInt(profileData.backlogs),
        tenthPercentage: parseFloat(profileData.tenthPercentage),
        twelfthPercentage: parseFloat(profileData.twelfthPercentage),
        githubUrl: profileData.githubUrl,
        linkedinUrl: profileData.linkedinUrl,
        skills: [],
        projects: []
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
      <Card title="Welcome to Placement Portal">
        <p style={{marginBottom: '1rem'}}>Track your placement journey, manage your profile, and apply to companies.</p>
        <div className="metrics-grid">
          <Card>
            <h3 style={{color: 'var(--info)'}}>{applications.length}</h3>
            <p>Total Applications</p>
          </Card>
          <Card>
            <h3 style={{color: 'var(--success)'}}>{applications.filter(a => a.status === 'SELECTED').length}</h3>
            <p>Offers Received</p>
          </Card>
        </div>
      </Card>
    </div>
  );

  const renderDrives = () => (
    <div className="animate-fade-in">
      <Card title="Active Placement Drives">
        {applyMsg && <p style={{color: 'var(--success)', marginBottom: '1rem'}}>{applyMsg}</p>}
        {drives.length === 0 ? <p>No active placement drives currently.</p> : (
          <div className="data-grid">
            {drives.map(drive => (
              <div key={drive.id} style={{border: '1px solid var(--border-light)', padding: '1rem', borderRadius: 'var(--radius-md)'}}>
                <h4 style={{color: 'var(--brand-primary)', marginBottom: '0.5rem'}}>{drive.company?.companyName || 'Company'}</h4>
                <p><strong>Job Role:</strong> {drive.jobRole}</p>
                <p><strong>CTC:</strong> {drive.ctc}</p>
                <p><strong>Location:</strong> {drive.location}</p>
                <p style={{fontSize: '0.875rem', marginTop: '0.5rem', color: 'var(--text-secondary)'}}>Min CGPA: {drive.minCgpaRequired} | Max Backlogs: {drive.maxBacklogsAllowed}</p>
                <Button variant="primary" onClick={() => handleApply(drive.id)} className="mt-4">Apply Now</Button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );

  const renderApplications = () => (
    <div className="animate-fade-in">
      <Card title="My Applications">
        {applications.length === 0 ? <p>You haven't applied to any drives yet.</p> : (
          <div className="data-grid">
            {applications.map(app => (
              <div key={app.id} style={{border: '1px solid var(--border-light)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                  <h4>{app.placementDrive?.company?.companyName || `Drive #${app.placementDrive?.id}`}</h4>
                  <p>Applied on: {new Date(app.appliedOn).toLocaleDateString()}</p>
                </div>
                <span style={{
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '999px', 
                  fontSize: '0.75rem', 
                  fontWeight: '600',
                  backgroundColor: app.status === 'SELECTED' ? 'var(--success-bg)' : app.status === 'REJECTED' ? 'var(--danger-bg)' : 'var(--warning-bg)',
                  color: app.status === 'SELECTED' ? 'var(--success)' : app.status === 'REJECTED' ? 'var(--danger)' : 'var(--warning)'
                }}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );

  const renderProfileForm = () => (
    <div className="animate-fade-in">
      <Card title="Update Profile">
        {profileMsg && <p style={{color: 'var(--success)', marginBottom: '1rem'}}>{profileMsg}</p>}
        <form onSubmit={handleProfileUpdate}>
          <div className="metrics-grid">
            <Input label="First Name" value={profileData.firstName} onChange={(e) => setProfileData({...profileData, firstName: e.target.value})} required />
            <Input label="Last Name" value={profileData.lastName} onChange={(e) => setProfileData({...profileData, lastName: e.target.value})} required />
            <Input label="CGPA" type="number" step="0.01" value={profileData.cgpa} onChange={(e) => setProfileData({...profileData, cgpa: e.target.value})} required />
            <Input label="Active Backlogs" type="number" value={profileData.backlogs} onChange={(e) => setProfileData({...profileData, backlogs: e.target.value})} required />
            <Input label="10th Percentage" type="number" step="0.01" value={profileData.tenthPercentage} onChange={(e) => setProfileData({...profileData, tenthPercentage: e.target.value})} />
            <Input label="12th Percentage" type="number" step="0.01" value={profileData.twelfthPercentage} onChange={(e) => setProfileData({...profileData, twelfthPercentage: e.target.value})} />
            <Input label="GitHub URL" type="url" value={profileData.githubUrl} onChange={(e) => setProfileData({...profileData, githubUrl: e.target.value})} />
            <Input label="LinkedIn URL" type="url" value={profileData.linkedinUrl} onChange={(e) => setProfileData({...profileData, linkedinUrl: e.target.value})} />
          </div>
          <Button type="submit" variant="primary">Save Profile</Button>
        </form>
      </Card>
    </div>
  );

  const renderDocuments = () => (
    <div className="animate-fade-in">
      <Card title="Document Vault">
        {uploadMsg && <p style={{color: 'var(--success)', marginBottom: '1rem'}}>{uploadMsg}</p>}
        <form onSubmit={handleFileUpload} style={{maxWidth: '400px'}}>
          <div className="premium-input-group">
            <label className="premium-label">Document Type</label>
            <select className="premium-input" value={docType} onChange={(e) => setDocType(e.target.value)}>
              <option value="resume">Resume (PDF)</option>
              <option value="passportPhoto">Passport Photo</option>
              <option value="tenthMarksheet">10th Marksheet</option>
              <option value="twelfthMarksheet">12th Marksheet</option>
            </select>
          </div>
          <div style={{margin: '1rem 0'}}>
            <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
          </div>
          <Button type="submit" variant="secondary" disabled={!selectedFile}>Upload Document</Button>
        </form>
      </Card>
    </div>
  );

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">Student Portal</div>
        <nav className="sidebar-nav">
          <div className={`sidebar-nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</div>
          <div className={`sidebar-nav-item ${activeTab === 'drives' ? 'active' : ''}`} onClick={() => setActiveTab('drives')}>Available Drives</div>
          <div className={`sidebar-nav-item ${activeTab === 'applications' ? 'active' : ''}`} onClick={() => setActiveTab('applications')}>My Applications</div>
          <div className={`sidebar-nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>Update Profile</div>
          <div className={`sidebar-nav-item ${activeTab === 'documents' ? 'active' : ''}`} onClick={() => setActiveTab('documents')}>Document Vault</div>
        </nav>
        <div className="sidebar-footer">
          <Button variant="danger" fullWidth onClick={() => { localStorage.clear(); navigate('/login'); }}>Logout</Button>
        </div>
      </aside>
      
      <main className="dashboard-main">
        <div style={{marginBottom: '2rem'}}>
          <h1 style={{fontSize: '1.5rem'}}>Student Dashboard</h1>
        </div>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'drives' && renderDrives()}
        {activeTab === 'applications' && renderApplications()}
        {activeTab === 'profile' && renderProfileForm()}
        {activeTab === 'documents' && renderDocuments()}
      </main>
    </div>
  );
}

export default StudentDashboard;
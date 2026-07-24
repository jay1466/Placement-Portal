import React, { useEffect, useState } from 'react';
import recruiterService from '../services/recruiterService';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import '../pages/AdminDashboard.css'; // Reusing layout CSS

function RecruiterDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Fake logged in recruiter company ID for demo purposes
  const companyId = 1;

  // Overview Data
  const [drives, setDrives] = useState([]);
  const [selectedDriveId, setSelectedDriveId] = useState('');
  const [applicants, setApplicants] = useState([]);

  // Create Drive State
  const [driveData, setDriveData] = useState({
    jobTitle: '',
    jobDescription: '',
    packageCtc: '',
    bondYears: '0',
    minCgpa: '6.0',
    maxBacklogs: '0'
  });
  const [driveMsg, setDriveMsg] = useState('');

  useEffect(() => {
    loadDrives();
  }, []);

  const loadDrives = async () => {
    try {
      const data = await recruiterService.getCompanyDrives(companyId);
      setDrives(data);
    } catch (err) {
      console.error("Failed to load drives", err);
    }
  };

  const loadApplicants = async (driveId) => {
    setSelectedDriveId(driveId);
    try {
      const data = await recruiterService.getDriveApplications(driveId);
      setApplicants(data);
    } catch (err) {
      console.error("Failed to load applicants", err);
    }
  };

  const handleCreateDrive = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...driveData,
        company: { id: companyId },
        packageCtc: parseFloat(driveData.packageCtc),
        bondYears: parseInt(driveData.bondYears)
      };
      await recruiterService.createDrive(payload);
      setDriveMsg("Placement drive created successfully!");
      setDriveData({
        jobTitle: '',
        jobDescription: '',
        packageCtc: '',
        bondYears: '0',
        minCgpa: '6.0',
        maxBacklogs: '0'
      });
      loadDrives();
    } catch (err) {
      setDriveMsg(err.response?.data || "Failed to create drive");
    }
  };

  const updateApplicationStatus = async (appId, newStatus) => {
    try {
      await recruiterService.updateApplicationStatus(appId, newStatus);
      loadApplicants(selectedDriveId);
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const renderOverview = () => (
    <div className="animate-fade-in">
      <div className="metrics-grid mb-4">
        <Card className="metric-card">
          <div className="metric-value text-blue">{drives.length}</div>
          <div className="metric-label">Active Drives</div>
        </Card>
      </div>

      <Card title="Your Placement Drives">
        {drives.length === 0 ? (
          <p className="text-muted">You haven't created any placement drives yet.</p>
        ) : (
          <div className="approvals-list">
            {drives.map(d => (
              <div key={d.id} className="approval-item">
                <div className="approval-info">
                  <h4>{d.jobTitle}</h4>
                  <p>CTC: ₹{d.packageCtc} LPA | Bond: {d.bondYears} years</p>
                </div>
                <Button variant="primary" onClick={() => { setActiveTab('ats'); loadApplicants(d.id); }}>
                  View Applicants
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );

  const renderCreateDrive = () => (
    <div className="animate-fade-in" style={{ maxWidth: '600px' }}>
      <Card title="Create New Placement Drive">
        <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
          Define the job role and set the strict eligibility criteria. The portal will automatically filter out ineligible students.
        </p>
        {driveMsg && <div className="alert-message">{driveMsg}</div>}
        <form onSubmit={handleCreateDrive} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
          <div className="full-width">
            <Input label="Job Title" value={driveData.jobTitle} onChange={(e) => setDriveData({...driveData, jobTitle: e.target.value})} required placeholder="e.g. Software Engineer" />
          </div>
          <div className="full-width">
            <div className="premium-input-group">
              <label className="premium-label">Job Description</label>
              <textarea 
                className="premium-input" 
                rows="3" 
                value={driveData.jobDescription} 
                onChange={(e) => setDriveData({...driveData, jobDescription: e.target.value})} 
                required 
              />
            </div>
          </div>
          <Input label="Package (CTC in LPA)" type="number" step="0.1" value={driveData.packageCtc} onChange={(e) => setDriveData({...driveData, packageCtc: e.target.value})} required placeholder="e.g. 12.5" />
          <Input label="Bond Years" type="number" value={driveData.bondYears} onChange={(e) => setDriveData({...driveData, bondYears: e.target.value})} required />
          
          <h4 className="full-width mt-4 mb-2" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Eligibility Criteria</h4>
          <Input label="Minimum CGPA" type="number" step="0.1" value={driveData.minCgpa} onChange={(e) => setDriveData({...driveData, minCgpa: e.target.value})} required />
          <Input label="Maximum Allowed Backlogs" type="number" value={driveData.maxBacklogs} onChange={(e) => setDriveData({...driveData, maxBacklogs: e.target.value})} required />
          
          <div className="full-width mt-4">
            <Button type="submit" variant="primary" fullWidth>Publish Drive</Button>
          </div>
        </form>
      </Card>
    </div>
  );

  const renderATS = () => (
    <div className="animate-fade-in full-height-tab">
      {!selectedDriveId ? (
        <Card>
          <p className="text-center text-muted">Please select a drive from the Overview tab to view its applicants.</p>
        </Card>
      ) : (
        <div className="ats-board">
          {['APPLIED', 'SHORTLISTED', 'INTERVIEW_SCHEDULED', 'SELECTED'].map(status => (
            <div key={status} className="ats-column">
              <div className="ats-column-header">
                <h3>{status.replace('_', ' ')}</h3>
                <span className="badge">{applicants.filter(a => a.status === status).length}</span>
              </div>
              <div className="ats-column-body">
                {applicants.filter(a => a.status === status).map(app => (
                  <div key={app.id} className="ats-card">
                    <h4>{app.student.username}</h4>
                    <p className="ats-cgpa">CGPA: {app.student.cgpa}</p>
                    <div className="ats-actions">
                      {status === 'APPLIED' && <Button variant="primary" onClick={() => updateApplicationStatus(app.id, 'SHORTLISTED')}>Shortlist</Button>}
                      {status === 'SHORTLISTED' && <Button variant="primary" onClick={() => updateApplicationStatus(app.id, 'INTERVIEW_SCHEDULED')}>Interview</Button>}
                      {status === 'INTERVIEW_SCHEDULED' && <Button variant="success" onClick={() => updateApplicationStatus(app.id, 'SELECTED')}>Select</Button>}
                      {status !== 'REJECTED' && status !== 'SELECTED' && <Button variant="danger" onClick={() => updateApplicationStatus(app.id, 'REJECTED')}>Reject</Button>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', WebkitBackgroundClip: 'text' }}>Recruiter Portal</div>
        <nav className="sidebar-nav">
          <button className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
          <button className={`nav-item ${activeTab === 'create-drive' ? 'active' : ''}`} onClick={() => setActiveTab('create-drive')}>Create Drive</button>
          <button className={`nav-item ${activeTab === 'ats' ? 'active' : ''}`} onClick={() => setActiveTab('ats')}>Applicant Tracking</button>
        </nav>
      </aside>
      
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h2>Recruiter Dashboard</h2>
          <Button variant="secondary" onClick={() => { localStorage.clear(); window.location.href = '/login'; }}>Logout</Button>
        </header>
        
        <div className="dashboard-content" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'create-drive' && renderCreateDrive()}
          {activeTab === 'ats' && renderATS()}
        </div>
      </main>
    </div>
  );
}

export default RecruiterDashboard;
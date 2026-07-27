import React, { useEffect, useState } from 'react';
import recruiterService from '../services/recruiterService';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useNavigate } from 'react-router-dom';

function RecruiterDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  const recruiterId = localStorage.getItem('userId');
  const companyId = localStorage.getItem('companyId');

  const [drives, setDrives] = useState([]);
  const [selectedDriveId, setSelectedDriveId] = useState('');
  const [applicants, setApplicants] = useState([]);
  const [driveMsg, setDriveMsg] = useState('');

  const [driveData, setDriveData] = useState({
    jobTitle: '',
    jobDescription: '',
    jobRole: '',
    location: '',
    packageCtc: '',
    bondYears: '0',
    minCgpa: '6.0',
    maxBacklogs: '0'
  });

  useEffect(() => {
    if (!recruiterId) navigate('/login');
    if (companyId && companyId !== 'null') {
      loadDrives();
    }
  }, [companyId, recruiterId, navigate]);

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
    if (!companyId || companyId === 'null') {
      setDriveMsg("You must be assigned to a company before creating drives.");
      return;
    }

    try {
      const payload = {
        jobTitle: driveData.jobTitle,
        jobDescription: driveData.jobDescription,
        jobRole: driveData.jobRole,
        location: driveData.location,
        company: { id: parseInt(companyId) },
        ctc: driveData.packageCtc,
        bondYears: parseInt(driveData.bondYears),
        minCgpaRequired: parseFloat(driveData.minCgpa),
        maxBacklogsAllowed: parseInt(driveData.maxBacklogs),
        active: true
      };
      await recruiterService.createDrive(payload);
      setDriveMsg("Placement drive created successfully!");
      setDriveData({
        jobTitle: '', jobDescription: '', jobRole: '', location: '',
        packageCtc: '', bondYears: '0', minCgpa: '6.0', maxBacklogs: '0'
      });
      loadDrives();
      setActiveTab('overview');
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

  if (!companyId || companyId === 'null') {
    return (
      <div className="dashboard-container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Card title="Account Pending Activation">
          <p>Your recruiter account needs to be associated with a verified Company by the Placement Cell Admin before you can access the dashboard.</p>
          <Button variant="primary" onClick={() => { localStorage.clear(); navigate('/login'); }} className="mt-4">Logout</Button>
        </Card>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="animate-fade-in">
      <div className="metrics-grid mb-4">
        <Card>
          <h3 style={{color: 'var(--brand-primary)'}}>{drives.length}</h3>
          <p>Active Drives</p>
        </Card>
        <Card>
          <h3 style={{color: 'var(--success)'}}>
            {drives.reduce((total, d) => total + (d.applications ? d.applications.length : 0), 0) || applicants.length || 0}
          </h3>
          <p>Total Applicants</p>
        </Card>
      </div>

      <Card title="Your Placement Drives">
        {drives.length === 0 ? (
          <p className="text-muted">You haven't created any placement drives yet.</p>
        ) : (
          <div className="data-grid">
            {drives.map(d => (
              <div key={d.id} style={{border: '1px solid var(--border-light)', padding: '1rem', borderRadius: 'var(--radius-md)'}}>
                <h4 style={{color: 'var(--text-primary)', marginBottom: '0.5rem'}}>{d.jobTitle} - {d.jobRole}</h4>
                <p><strong>CTC:</strong> {d.ctc} | <strong>Location:</strong> {d.location}</p>
                <div style={{marginTop: '1rem'}}>
                  <Button variant="primary" onClick={() => { setActiveTab('ats'); loadApplicants(d.id); }}>
                    View Applicants
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );

  const renderCreateDrive = () => (
    <div className="animate-fade-in" style={{ maxWidth: '800px' }}>
      <Card title="Create New Placement Drive">
        <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
          Define the job role and set the strict eligibility criteria. 
        </p>
        {driveMsg && <p style={{color: driveMsg.includes('success') ? 'var(--success)' : 'var(--danger)', marginBottom: '1rem'}}>{driveMsg}</p>}
        
        <form onSubmit={handleCreateDrive}>
          <div className="metrics-grid" style={{gridTemplateColumns: '1fr 1fr'}}>
            <Input label="Job Title" value={driveData.jobTitle} onChange={(e) => setDriveData({...driveData, jobTitle: e.target.value})} required placeholder="e.g. 2025 Campus Recruitment" />
            <Input label="Job Role" value={driveData.jobRole} onChange={(e) => setDriveData({...driveData, jobRole: e.target.value})} required placeholder="e.g. Software Engineer" />
            <Input label="Location" value={driveData.location} onChange={(e) => setDriveData({...driveData, location: e.target.value})} required placeholder="e.g. Bangalore" />
            <Input label="Package (CTC)" value={driveData.packageCtc} onChange={(e) => setDriveData({...driveData, packageCtc: e.target.value})} required placeholder="e.g. 12.5 LPA" />
            <Input label="Bond Years" type="number" value={driveData.bondYears} onChange={(e) => setDriveData({...driveData, bondYears: e.target.value})} required />
          </div>
          
          <div className="premium-input-group mt-2">
            <label className="premium-label">Job Description</label>
            <textarea className="premium-input" rows="4" value={driveData.jobDescription} onChange={(e) => setDriveData({...driveData, jobDescription: e.target.value})} required />
          </div>
          
          <h4 className="mt-4 mb-2" style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>Eligibility Criteria</h4>
          <div className="metrics-grid" style={{gridTemplateColumns: '1fr 1fr'}}>
            <Input label="Minimum CGPA" type="number" step="0.1" value={driveData.minCgpa} onChange={(e) => setDriveData({...driveData, minCgpa: e.target.value})} required />
            <Input label="Maximum Allowed Backlogs" type="number" value={driveData.maxBacklogs} onChange={(e) => setDriveData({...driveData, maxBacklogs: e.target.value})} required />
          </div>
          
          <div className="mt-4">
            <Button type="submit" variant="primary">Publish Drive</Button>
          </div>
        </form>
      </Card>
    </div>
  );

  const renderATS = () => (
    <div className="animate-fade-in" style={{height: '100%'}}>
      {!selectedDriveId ? (
        <Card>
          <p className="text-center text-muted">Please select a drive from the Overview tab to view its applicants.</p>
        </Card>
      ) : (
        <div style={{display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', height: '600px'}}>
          {['APPLIED', 'SHORTLISTED', 'INTERVIEW_SCHEDULED', 'SELECTED'].map(status => (
            <div key={status} style={{
              flex: '0 0 300px', 
              backgroundColor: 'var(--bg-secondary)', 
              borderRadius: 'var(--radius-lg)',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
                <h3 style={{fontSize: '1rem', color: 'var(--text-primary)'}}>{status.replace('_', ' ')}</h3>
                <span style={{backgroundColor: 'var(--brand-light)', color: 'var(--brand-primary)', padding: '0.1rem 0.5rem', borderRadius: '1rem', fontSize: '0.875rem', fontWeight: '600'}}>
                  {applicants.filter(a => a.status === status).length}
                </span>
              </div>
              <div style={{flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
                {applicants.filter(a => a.status === status).map(app => (
                  <div key={app.id} style={{backgroundColor: 'var(--bg-primary)', padding: '1rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)'}}>
                    <h4 style={{marginBottom: '0.25rem'}}>{app.student?.user?.email || `Student #${app.student?.id}`}</h4>
                    <p style={{fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.75rem'}}>CGPA: {app.student?.cgpa || 'N/A'}</p>
                    <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
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
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">Recruiter Portal</div>
        <nav className="sidebar-nav">
          <div className={`sidebar-nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</div>
          <div className={`sidebar-nav-item ${activeTab === 'create-drive' ? 'active' : ''}`} onClick={() => setActiveTab('create-drive')}>Create Drive</div>
          <div className={`sidebar-nav-item ${activeTab === 'ats' ? 'active' : ''}`} onClick={() => setActiveTab('ats')}>Applicant Tracking</div>
        </nav>
        <div className="sidebar-footer">
          <Button variant="danger" fullWidth onClick={() => { localStorage.clear(); navigate('/login'); }}>Logout</Button>
        </div>
      </aside>
      
      <main className="dashboard-main">
        <div style={{marginBottom: '2rem'}}>
          <h1 style={{fontSize: '1.5rem'}}>Recruiter Dashboard</h1>
        </div>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'create-drive' && renderCreateDrive()}
        {activeTab === 'ats' && renderATS()}
      </main>
    </div>
  );
}

export default RecruiterDashboard;
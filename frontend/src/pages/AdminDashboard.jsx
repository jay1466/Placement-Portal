import React, { useEffect, useState } from 'react';
import adminService from '../services/adminService';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [metrics, setMetrics] = useState({
    totalStudents: 0,
    totalCompanies: 0,
    totalPlacementDrives: 0,
    totalPlacedStudents: 0,
    branchWisePlacements: {}
  });
  
  const [recruiterData, setRecruiterData] = useState({ username: '', email: '' });
  const [recruiterMsg, setRecruiterMsg] = useState('');
  
  const [pendingCompanies, setPendingCompanies] = useState([]);
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [drives, setDrives] = useState([]);

  useEffect(() => {
    if (activeTab === 'overview') loadMetrics();
    if (activeTab === 'companies') {
      loadPendingCompanies();
      loadCompanies();
    }
    if (activeTab === 'students') loadStudents();
    if (activeTab === 'drives') loadDrives();
  }, [activeTab]);

  const loadMetrics = async () => {
    try {
      const data = await adminService.getDashboardMetrics();
      setMetrics(data);
    } catch (err) {
      console.error("Failed to load metrics", err);
    }
  };

  const loadPendingCompanies = async () => {
    try {
      const data = await adminService.getPendingCompanies();
      setPendingCompanies(data);
    } catch (err) {
      console.error("Failed to load pending companies", err);
    }
  };

  const loadStudents = async () => {
    try {
      const data = await adminService.getAllStudents();
      setStudents(data);
    } catch (err) {
      console.error("Failed to load students", err);
    }
  };

  const loadCompanies = async () => {
    try {
      const data = await adminService.getAllCompanies();
      setCompanies(data);
    } catch (err) {
      console.error("Failed to load companies", err);
    }
  };

  const loadDrives = async () => {
    try {
      const data = await adminService.getAllDrives();
      setDrives(data);
    } catch (err) {
      console.error("Failed to load drives", err);
    }
  };

  const handleCreateRecruiter = async (e) => {
    e.preventDefault();
    try {
      await adminService.createRecruiter(recruiterData);
      setRecruiterMsg('Recruiter created successfully! A temporary password has been emailed.');
      setRecruiterData({ username: '', email: '' });
    } catch (err) {
      setRecruiterMsg(err.response?.data || 'Failed to create recruiter');
    }
  };

  const handleApproveCompany = async (id) => {
    try {
      await adminService.approveCompany(id);
      loadPendingCompanies();
      loadCompanies();
      loadMetrics();
    } catch (err) {
      alert("Failed to approve company");
    }
  };

  const handleRejectCompany = async (id) => {
    try {
      await adminService.rejectCompany(id);
      loadPendingCompanies();
    } catch (err) {
      alert("Failed to reject company");
    }
  };

  const renderOverview = () => (
    <div className="animate-fade-in">
      <div className="metrics-grid">
        <Card>
          <h3 style={{color: 'var(--brand-primary)'}}>{metrics.totalStudents}</h3>
          <p>Total Students</p>
        </Card>
        <Card>
          <h3 style={{color: 'var(--success)'}}>{metrics.totalPlacedStudents}</h3>
          <p>Placed Students</p>
        </Card>
        <Card>
          <h3 style={{color: 'var(--warning)'}}>{metrics.totalCompanies}</h3>
          <p>Approved Companies</p>
        </Card>
        <Card>
          <h3 style={{color: 'var(--danger)'}}>{metrics.totalPlacementDrives}</h3>
          <p>Active Drives</p>
        </Card>
      </div>

      <Card title="Branch-wise Placements" className="mt-4">
        <div>
          {Object.entries(metrics.branchWisePlacements || {}).length > 0 ? (
            Object.entries(metrics.branchWisePlacements).map(([branch, count]) => (
              <div key={branch} style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
                <span style={{width: '100px', fontWeight: '500'}}>{branch}</span>
                <div style={{flex: 1, backgroundColor: 'var(--bg-secondary)', height: '12px', borderRadius: '6px', overflow: 'hidden'}}>
                  <div style={{ width: `${Math.min(count * 5, 100)}%`, backgroundColor: 'var(--brand-primary)', height: '100%' }}></div>
                </div>
                <span style={{width: '80px', textAlign: 'right', color: 'var(--text-secondary)'}}>{count} placed</span>
              </div>
            ))
          ) : (
            <p className="text-muted">No placement data available yet.</p>
          )}
        </div>
      </Card>
    </div>
  );

  const renderStudents = () => (
    <div className="animate-fade-in">
      <Card title="All Students">
        <div className="data-grid">
          {students.map(s => (
            <div key={s.id} style={{border: '1px solid var(--border-light)', padding: '1rem', borderRadius: 'var(--radius-md)'}}>
              <h4 style={{color: 'var(--brand-primary)', marginBottom: '0.25rem'}}>{s.user?.email || `Student #${s.id}`}</h4>
              <p style={{fontSize: '0.875rem', marginBottom: '0.25rem'}}>Enrollment: {s.enrollmentNo}</p>
              <p style={{fontSize: '0.875rem', marginBottom: '0.25rem'}}>CGPA: {s.cgpa}</p>
              <p style={{fontSize: '0.875rem'}}>Profile Completed: {s.profileCompletionPercentage}%</p>
            </div>
          ))}
          {students.length === 0 && <p className="text-muted">No students found.</p>}
        </div>
      </Card>
    </div>
  );

  const renderCompanies = () => (
    <div className="animate-fade-in">
      {pendingCompanies.length > 0 && (
        <Card title="Pending Company Approvals" className="mb-4">
          <div className="data-grid">
            {pendingCompanies.map(c => (
              <div key={c.id} style={{border: '1px solid var(--border-light)', padding: '1rem', borderRadius: 'var(--radius-md)'}}>
                <h4 style={{color: 'var(--warning)', marginBottom: '0.25rem'}}>{c.company?.companyName || 'Unknown'}</h4>
                <p style={{fontSize: '0.875rem', marginBottom: '1rem'}}>Requested update for company details.</p>
                <div style={{display: 'flex', gap: '0.5rem'}}>
                  <Button variant="success" onClick={() => handleApproveCompany(c.id)}>Approve</Button>
                  <Button variant="danger" onClick={() => handleRejectCompany(c.id)}>Reject</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card title="All Approved Companies">
        <div className="data-grid">
          {companies.map(c => (
            <div key={c.id} style={{border: '1px solid var(--border-light)', padding: '1rem', borderRadius: 'var(--radius-md)'}}>
              <h4 style={{color: 'var(--brand-primary)', marginBottom: '0.25rem'}}>{c.companyName}</h4>
              <p style={{fontSize: '0.875rem', marginBottom: '0.25rem'}}>Website: {c.website}</p>
              <p style={{fontSize: '0.875rem'}}>Status: <span style={{color: 'var(--success)', fontWeight: '600'}}>{c.status}</span></p>
            </div>
          ))}
          {companies.length === 0 && <p className="text-muted">No companies found.</p>}
        </div>
      </Card>
    </div>
  );

  const renderDrives = () => (
    <div className="animate-fade-in">
      <Card title="All Placement Drives">
        <div className="data-grid">
          {drives.map(d => (
            <div key={d.id} style={{border: '1px solid var(--border-light)', padding: '1rem', borderRadius: 'var(--radius-md)'}}>
              <h4 style={{color: 'var(--brand-primary)', marginBottom: '0.25rem'}}>{d.company?.companyName || 'Company'} - {d.jobRole}</h4>
              <p style={{fontSize: '0.875rem', marginBottom: '0.25rem'}}>CTC: {d.ctc}</p>
              <p style={{fontSize: '0.875rem', marginBottom: '0.25rem'}}>Location: {d.location}</p>
              <p style={{fontSize: '0.875rem'}}>Status: {d.active ? <span style={{color: 'var(--success)'}}>Active</span> : <span style={{color: 'var(--danger)'}}>Closed</span>}</p>
            </div>
          ))}
          {drives.length === 0 && <p className="text-muted">No placement drives found.</p>}
        </div>
      </Card>
    </div>
  );

  const renderCreateRecruiter = () => (
    <div className="animate-fade-in" style={{ maxWidth: '600px' }}>
      <Card title="Manually Onboard Recruiter">
        <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
          Create a recruiter account for a company HR. They will receive an email with a temporary password and must reset it on first login.
        </p>
        {recruiterMsg && <p style={{color: recruiterMsg.includes('success') ? 'var(--success)' : 'var(--danger)', marginBottom: '1rem'}}>{recruiterMsg}</p>}
        <form onSubmit={handleCreateRecruiter}>
          <div className="metrics-grid" style={{gridTemplateColumns: '1fr', gap: '1rem'}}>
            <Input 
              label="Recruiter Name" 
              value={recruiterData.username} 
              onChange={(e) => setRecruiterData({...recruiterData, username: e.target.value})} 
              required 
              placeholder="John Doe" 
            />
            <Input 
              label="Official Company Email" 
              type="email" 
              value={recruiterData.email} 
              onChange={(e) => setRecruiterData({...recruiterData, email: e.target.value})} 
              required 
              placeholder="hr@company.com" 
            />
          </div>
          <div className="mt-4">
            <Button type="submit" variant="primary">Create Account</Button>
          </div>
        </form>
      </Card>
    </div>
  );

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', WebkitBackgroundClip: 'text' }}>Admin Portal</div>
        <nav className="sidebar-nav">
          <div className={`sidebar-nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview Metrics</div>
          <div className={`sidebar-nav-item ${activeTab === 'students' ? 'active' : ''}`} onClick={() => setActiveTab('students')}>Students</div>
          <div className={`sidebar-nav-item ${activeTab === 'companies' ? 'active' : ''}`} onClick={() => setActiveTab('companies')}>Companies & Approvals</div>
          <div className={`sidebar-nav-item ${activeTab === 'drives' ? 'active' : ''}`} onClick={() => setActiveTab('drives')}>Placement Drives</div>
          <div className={`sidebar-nav-item ${activeTab === 'create-recruiter' ? 'active' : ''}`} onClick={() => setActiveTab('create-recruiter')}>Create Recruiter</div>
        </nav>
        <div className="sidebar-footer">
          <Button variant="danger" fullWidth onClick={() => { localStorage.clear(); navigate('/login'); }}>Logout</Button>
        </div>
      </aside>
      
      <main className="dashboard-main">
        <div style={{marginBottom: '2rem'}}>
          <h1 style={{fontSize: '1.5rem'}}>Admin Dashboard</h1>
        </div>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'students' && renderStudents()}
        {activeTab === 'companies' && renderCompanies()}
        {activeTab === 'drives' && renderDrives()}
        {activeTab === 'create-recruiter' && renderCreateRecruiter()}
      </main>
    </div>
  );
}

export default AdminDashboard;
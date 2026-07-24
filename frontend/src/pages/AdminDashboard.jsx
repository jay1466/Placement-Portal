import React, { useEffect, useState } from 'react';
import adminService from '../services/adminService';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import './AdminDashboard.css';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [metrics, setMetrics] = useState({
    totalStudents: 0,
    totalCompanies: 0,
    totalPlacementDrives: 0,
    totalPlacedStudents: 0,
    branchWisePlacements: {}
  });
  
  // Create Recruiter State
  const [recruiterData, setRecruiterData] = useState({ username: '', email: '' });
  const [recruiterMsg, setRecruiterMsg] = useState('');

  // Pending Companies State
  const [pendingCompanies, setPendingCompanies] = useState([]);

  useEffect(() => {
    loadMetrics();
    if (activeTab === 'approvals') loadPendingCompanies();
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
        <Card className="metric-card">
          <div className="metric-value text-blue">{metrics.totalStudents}</div>
          <div className="metric-label">Total Students</div>
        </Card>
        <Card className="metric-card">
          <div className="metric-value text-green">{metrics.totalPlacedStudents}</div>
          <div className="metric-label">Placed Students</div>
        </Card>
        <Card className="metric-card">
          <div className="metric-value text-purple">{metrics.totalCompanies}</div>
          <div className="metric-label">Approved Companies</div>
        </Card>
        <Card className="metric-card">
          <div className="metric-value text-orange">{metrics.totalPlacementDrives}</div>
          <div className="metric-label">Active Drives</div>
        </Card>
      </div>

      <Card title="Branch-wise Placements" className="mt-4">
        <div className="branch-stats">
          {Object.entries(metrics.branchWisePlacements || {}).length > 0 ? (
            Object.entries(metrics.branchWisePlacements).map(([branch, count]) => (
              <div key={branch} className="branch-stat-item">
                <span className="branch-name">{branch}</span>
                <div className="branch-bar-container">
                  <div className="branch-bar" style={{ width: `${Math.min(count * 5, 100)}%` }}></div>
                </div>
                <span className="branch-count">{count} placed</span>
              </div>
            ))
          ) : (
            <p className="text-muted">No placement data available yet.</p>
          )}
        </div>
      </Card>
    </div>
  );

  const renderApprovals = () => (
    <div className="animate-fade-in">
      <Card title="Pending Company Approvals">
        {pendingCompanies.length === 0 ? (
          <p className="text-muted">No pending company registrations.</p>
        ) : (
          <div className="approvals-list">
            {pendingCompanies.map(c => (
              <div key={c.id} className="approval-item">
                <div className="approval-info">
                  <h4>{c.companyName}</h4>
                  <p>Website: {c.website}</p>
                </div>
                <div className="approval-actions">
                  <Button variant="success" onClick={() => handleApproveCompany(c.id)}>Approve</Button>
                  <Button variant="danger" onClick={() => handleRejectCompany(c.id)}>Reject</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );

  const renderCreateRecruiter = () => (
    <div className="animate-fade-in" style={{ maxWidth: '600px' }}>
      <Card title="Manually Onboard Recruiter">
        <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
          Create a recruiter account for a company HR. They will receive an email with a temporary password and must reset it on first login.
        </p>
        {recruiterMsg && <div className="alert-message">{recruiterMsg}</div>}
        <form onSubmit={handleCreateRecruiter}>
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
          <Button type="submit" className="mt-4" fullWidth>Create Account</Button>
        </form>
      </Card>
    </div>
  );

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">Admin Portal</div>
        <nav className="sidebar-nav">
          <button className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview Metrics</button>
          <button className={`nav-item ${activeTab === 'approvals' ? 'active' : ''}`} onClick={() => setActiveTab('approvals')}>Company Approvals</button>
          <button className={`nav-item ${activeTab === 'create-recruiter' ? 'active' : ''}`} onClick={() => setActiveTab('create-recruiter')}>Create Recruiter</button>
        </nav>
      </aside>
      
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h2>Dashboard</h2>
          <Button variant="secondary" onClick={() => { localStorage.clear(); window.location.href = '/login'; }}>Logout</Button>
        </header>
        
        <div className="dashboard-content">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'approvals' && renderApprovals()}
          {activeTab === 'create-recruiter' && renderCreateRecruiter()}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
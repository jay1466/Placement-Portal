import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

import {
  FaBuilding,
  FaFileAlt,
  FaClipboardCheck,
  FaBriefcase,
  FaMapMarkerAlt
} from "react-icons/fa";

import "./StudentDashboard.css";

function StudentDashboard() {

  const BACKEND_URL = "https://placement-portal-x5j7.onrender.com";

  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await api.get("/companies");
      setCompanies(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to load companies");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container py-4">

        {/* Welcome Section */}

        <div className="welcome-section mb-5">
          <h2 className="fw-bold">Welcome Back 👋</h2>

          <p className="text-muted">
            Explore top companies, apply for opportunities, and track your placement journey.
          </p>
        </div>

        {/* Statistics */}

        <div className="row g-4 mb-5">

          <div className="col-lg-3 col-md-6">
            <div className="dashboard-card">
              <FaBuilding className="dashboard-icon text-primary" />
              <h3>{companies.length}</h3>
              <p>Total Companies</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="dashboard-card">
              <FaFileAlt className="dashboard-icon text-success" />
              <h3>0</h3>
              <p>Applications</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="dashboard-card">
              <FaClipboardCheck className="dashboard-icon text-warning" />
              <h3>0</h3>
              <p>Interviews</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="dashboard-card">
              🤖
              <h3>--</h3>
              <p>Resume Score</p>
            </div>
          </div>

        </div>

        {/* Companies */}

        <div className="row g-4">

          {companies.map((company) => (

            <div
              className="col-lg-4 col-md-6"
              key={company.id}
            >

              <div className="company-card">

                <div className="company-image">

                  <img
                    src={`${BACKEND_URL}/images/${company.image}`}
                    alt={company.companyName}
                    className="company-logo"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/350x200?text=Company";
                    }}
                  />

                </div>

                <div className="card-body">

                  <h3 className="company-title">
                    {company.companyName}
                  </h3>

                  <p className="company-description">
                    {company.description}
                  </p>

                  <div className="company-meta">

                    <div className="meta-item">
                      <FaBriefcase className="meta-icon" />
                      Multiple Roles
                    </div>

                    <div className="meta-item">
                      <FaMapMarkerAlt className="meta-icon" />
                      Across India
                    </div>

                  </div>

                  <button
                    className="view-btn"
                    onClick={() => navigate(`/company/${company.id}`)}
                  >
                    View Details
                    <span className="arrow ms-2">→</span>
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </>
  );
}

export default StudentDashboard;
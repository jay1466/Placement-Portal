import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import "../pages/CompanyDetails.css";
import { companyThemes } from "../data/companyThemes";

function CompanyDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [company, setCompany] = useState(null);

    useEffect(() => {

        api.get(`/companies/${id}`)
            .then((response) => {
                setCompany(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

    }, [id]);

    if (!company) {
        return (
            <>
                <Navbar />
                <div className="container mt-5 text-center">
                    <h3>Loading company details...</h3>
                </div>
            </>
        );
  }

 const theme = companyThemes[company.companyName] || {
     employees: "100K+",
     rating: "4.4",
     founded: "2000",
     primary: "#2563eb",
     secondary: "#3b82f6",
     banner: "/default-banner.jpg"
 };

  return (

    <>

        <Navbar />

        <div className="company-page">

         <div
             className="company-banner"
             style={{
                 backgroundImage: `url(${theme.banner})`
             }}
         ></div>

            <div className="container">

                <div className="company-details-card">

                   <div className="row">

                       <div className="col-lg-8">

                           <h1 className="company-name">
                               {company.companyName}
                               <span className="verified"> ✔</span>
                           </h1>

                           <p className="company-tagline">
                               {company.description ||
                                   "Join one of India's leading companies and build your career with exciting opportunities, innovation, and continuous learning."}
                           </p>

                         <div className="company-badges">

                             <span className="badge-item">
                                 💼 {company.jobRole}
                             </span>

                             <span className="badge-item">
                                 📍 {company.location}
                             </span>

                         </div>

                       </div>

                       <div className="col-lg-4">

                           <div
                               className="stats-box"
                               style={{
                                   background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
                               }}
                           >

                            <div
                                className="stat-card"
                                style={{
                                    background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
                                }}
                            >
                                <h3>{theme.employees}</h3>
                                <p>Employees</p>
                            </div>

                            <div
                                className="stat-card"
                                style={{
                                    background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
                                }}
                            >
                                <h3>{theme.rating}</h3>
                                <p>Rating</p>
                            </div>

                            <div
                                className="stat-card"
                                style={{
                                    background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
                                }}
                            >
                                <h3>{theme.founded}</h3>
                                <p>Founded</p>
                            </div>

                           </div>

                       </div>

                   </div>
                <div className="row mt-4">

                    <div className="col-lg-7">

                       <div className="info-card">

                           <h3>Job Overview</h3>

                           <hr />

                           <div className="detail-row">

                               <span>💼 Job Role</span>

                               <strong>{company.jobRole}</strong>

                           </div>

                            <div className="detail-row">

                                <span>📍 Location</span>

                                <strong>{company.location}</strong>

                            </div>

                            <div className="detail-row">

                                <span>💰 Package</span>

                                <strong>{company.packageLpa} LPA</strong>

                            </div>

                            <div className="detail-row">

                                <span>🎓 Eligibility</span>

                                <strong>{company.eligibilityCgpa} CGPA</strong>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-5">

                        <div className="info-card">

                            <h3>About Company</h3>

                           <p className="about-text">

                               {company.description ||
                                   "This organization provides an excellent platform for graduates to build technical and professional skills."}

                               <br /><br />

                               Employees work on cutting-edge technologies, collaborate with experienced professionals, and receive continuous learning opportunities, mentorship, and career growth through structured training programs.

                           </p>
                        </div>

                    </div>

                </div>

               <div className="button-section">

                   <button
                       className="back-btn"
                       onClick={() => navigate(-1)}
                   >
                       ← Back
                   </button>

                <button
                    className="apply-btn"
                    onClick={() => navigate(`/apply/${company.id}`)}
                >
                    Apply Now
                </button>

               </div>

                      </div>

                  </div>

              </div>

              </>

              );
              }

              export default CompanyDetails;
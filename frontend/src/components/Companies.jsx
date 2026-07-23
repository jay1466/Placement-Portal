import { useEffect, useState } from "react";
import axios from "axios";

function Companies() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/companies")
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
      });
  }, []);

  return (
    <section className="container my-5">
      <h2 className="text-center mb-4">Top Companies Hiring</h2>

      <div className="row">
        {companies.map((company) => (
          <div className="col-md-4 mb-4" key={company.id}>
            <div className="card shadow p-3 text-center">

              <img
                src={`/uploads/${company.image}`}
                alt={company.companyName}
                style={{
                  height: "90px",
                  objectFit: "contain",
                  marginBottom: "15px"
                }}
              />

              <h4>{company.companyName}</h4>

              <hr />

              <p>
                <strong>Role:</strong> {company.jobRole}
              </p>

              <p>
                <strong>Package:</strong> {company.packageLpa} LPA
              </p>

              <p>
                <strong>Minimum CGPA:</strong> {company.eligibilityCgpa}
              </p>

              <p>
                <strong>Location:</strong> {company.location}
              </p>

              <button className="btn btn-success w-100">
                Apply Now
              </button>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Companies;
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="container text-center py-5 mt-5">

        <h1
          className="display-2 fw-bold"
          style={{ color: "#212529" }}
        >
          AI Powered Placement Portal
        </h1>

        <p
          className="lead mt-3"
          style={{ color: "#495057", fontSize: "24px" }}
        >
          Connecting Students, Recruiters and Colleges on One Smart Placement
          Platform.
        </p>

        <div className="mt-4">

          <Link
            to="/student-register"
            className="btn btn-primary btn-lg me-3"
          >
            Get Started
          </Link>

          <a
            href="#features"
            className="btn btn-outline-dark btn-lg"
          >
            Learn More
          </a>

        </div>

      </section>

      {/* Why Choose */}
      <section
        id="features"
        className="container py-5"
      >

        <h2 className="text-center fw-bold mb-5">
          Why Choose Our Placement Portal?
        </h2>

        <div className="row">

          <div className="col-md-4 mb-4">
            <div className="card shadow h-100 p-4">

              <h3>🏢 Top Companies</h3>

              <p className="mt-3">
                Explore placement opportunities from leading IT companies.
              </p>

            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow h-100 p-4">

              <h3>📄 AI Resume Analysis</h3>

              <p className="mt-3">
                Upload your resume and receive AI-powered feedback.
              </p>

            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow h-100 p-4">

              <h3>📊 Application Tracking</h3>

              <p className="mt-3">
                Track every application from applied to selected.
              </p>

            </div>
          </div>

        </div>

      </section>

      {/* Statistics */}

      <section className="container py-5">

        <div className="row text-center">

          <div className="col-md-3 mb-4">

            <div className="card shadow p-4">

              <h1 className="text-primary">500+</h1>

              <h5>Students</h5>

            </div>

          </div>

          <div className="col-md-3 mb-4">

            <div className="card shadow p-4">

              <h1 className="text-success">120+</h1>

              <h5>Companies</h5>

            </div>

          </div>

          <div className="col-md-3 mb-4">

            <div className="card shadow p-4">

              <h1 className="text-warning">350+</h1>

              <h5>Placements</h5>

            </div>

          </div>

          <div className="col-md-3 mb-4">

            <div className="card shadow p-4">

              <h1 className="text-danger">98%</h1>

              <h5>Success Rate</h5>

            </div>

          </div>

        </div>

      </section>

      {/* Top Companies */}

      <section className="container py-5">

        <h2 className="text-center fw-bold mb-5">
          Top Companies Hiring
        </h2>

        <div className="row">

          <div className="col-md-4 mb-4">
            <div className="card shadow text-center p-4">
              <h3>Google</h3>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow text-center p-4">
              <h3>Microsoft</h3>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow text-center p-4">
              <h3>Amazon</h3>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow text-center p-4">
              <h3>Infosys</h3>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow text-center p-4">
              <h3>TCS</h3>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow text-center p-4">
              <h3>Accenture</h3>
            </div>
          </div>

        </div>

      </section>

      {/* Footer */}

      <footer
        className="mt-5"
        style={{
          background: "#0d6efd",
          color: "white",
          padding: "40px"
        }}
      >

        <div className="container text-center">

          <h3 style={{ color: "white" }}>
            AI Powered Placement Portal
          </h3>

          <p
            style={{
              color: "#f8f9fa"
            }}
          >
            Connecting Students, Recruiters and Colleges on One Smart Platform.
          </p>

          <hr
            style={{
              borderColor: "white"
            }}
          />

          <p
            style={{
              color: "#f8f9fa"
            }}
          >
            © 2026 AI Powered Placement Portal | Developed using React,
            Spring Boot & MySQL
          </p>

        </div>

      </footer>
    </>
  );
}

export default Home;
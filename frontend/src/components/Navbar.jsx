import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/");

    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">

            <div className="container">

                <Link
                    className="navbar-brand fw-bold fs-3"
                    to="/"
                >
                    Placement Portal
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >

                    {/* Before Login */}

                    {!token && (

                        <ul className="navbar-nav ms-auto">

                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    Home
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item dropdown">

                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                >
                                    Register
                                </a>

                                <ul className="dropdown-menu">

                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="/student-register"
                                        >
                                            Student Register
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="/recruiter-register"
                                        >
                                            Recruiter Register
                                        </Link>
                                    </li>

                                </ul>

                            </li>

                        </ul>

                    )}

                    {/* Student Navbar */}

                    {token && role?.toUpperCase() === "STUDENT" && (

                        <ul className="navbar-nav ms-auto">

                            <li className="nav-item">
                                <Link className="nav-link" to="/student-dashboard">
                                    Dashboard
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/applications">
                                    My Applications
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/notifications">
                                    🔔 Notifications
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/resume-analyzer">
                                    Resume Analyzer
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">
                                    Profile
                                </Link>
                            </li>

                            <li className="nav-item">
                                <button
                                    className="btn btn-warning ms-3"
                                    onClick={logout}
                                >
                                    Logout
                                </button>
                            </li>

                        </ul>

                    )}

                    {/* Recruiter Navbar */}

                    {token && role?.toUpperCase() === "RECRUITER" && (

                        <ul className="navbar-nav ms-auto">

                            <li className="nav-item">
                                <Link className="nav-link" to="/recruiter-dashboard">
                                    Dashboard
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/post-job">
                                    Post Jobs
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/students">
                                    Students
                                </Link>
                            </li>

                            <li className="nav-item">
                                <button
                                    className="btn btn-warning ms-3"
                                    onClick={logout}
                                >
                                    Logout
                                </button>
                            </li>

                        </ul>

                    )}

                    {/* Admin Navbar */}

                    {token && role?.toUpperCase() === "ADMIN" && (

                        <ul className="navbar-nav ms-auto">

                            <li className="nav-item">
                                <Link className="nav-link" to="/admin-dashboard">
                                    Dashboard
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/manage-students">
                                    Students
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/manage-recruiters">
                                    Recruiters
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/manage-companies">
                                    Companies
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">
                                    Profile
                                </Link>
                            </li>

                            <li className="nav-item">
                                <button
                                    className="btn btn-warning ms-3"
                                    onClick={logout}
                                >
                                    Logout
                                </button>
                            </li>

                        </ul>

                    )}

                </div>

            </div>

        </nav>

    );

}

export default Navbar;
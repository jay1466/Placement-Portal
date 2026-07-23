import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function MyApplications() {

    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {

        try {

            const response = await api.get("/applications/student/1");

            console.log(response.data);

            setApplications(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const getBadge = (status) => {

        switch (status) {

            case "APPLIED":
                return "bg-warning text-dark";

            case "SHORTLISTED":
                return "bg-success";

            case "REJECTED":
                return "bg-danger";

            default:
                return "bg-secondary";

        }

    };

    return (
        <>
            <Navbar />

            <div className="container mt-5">

                <h2 className="fw-bold mb-4">
                    📄 My Applications
                </h2>

                {applications.length === 0 ? (

                    <div className="alert alert-info">
                        You have not applied to any company yet.
                    </div>

                ) : (

                    <div className="row">

                        {applications.map((app) => (

                            <div
                                className="col-md-6 mb-4"
                                key={app.id}
                            >

                                <div className="card shadow">

                                    <div className="card-body">

                                        <h4>
                                            Application #{app.id}
                                        </h4>

                                        <hr />

                                        <p>
                                            <strong>Name :</strong> {app.fullName}
                                        </p>

                                        <p>
                                            <strong>Email :</strong> {app.email}
                                        </p>

                                        <p>
                                            <strong>Phone :</strong> {app.phone}
                                        </p>

                                        <p>
                                            <strong>Branch :</strong> {app.branch}
                                        </p>

                                        <p>
                                            <strong>CGPA :</strong> {app.cgpa}
                                        </p>

                                        <p>
                                            <strong>Company ID :</strong> {app.driveId}
                                        </p>

                                        <p>
                                            <strong>Status :</strong>{" "}
                                            <span className={`badge ${getBadge(app.applicationStatus)}`}>
                                                {app.applicationStatus}
                                            </span>
                                        </p>

                                        <button
                                            className="btn btn-primary"
                                            onClick={() => navigate(`/company/${app.driveId}`)}
                                        >
                                            View Company
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </>
    );
}

export default MyApplications;
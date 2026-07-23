import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function AdminDashboard() {

    const [dashboard, setDashboard] = useState({
        totalStudents: 0,
        totalCompanies: 0,
        totalDrives: 0,
        totalApplications: 0
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const response = await api.get("/dashboard");

            setDashboard(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to load dashboard.");

        }

    };

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <h2 className="fw-bold mb-4">
                    📊 Admin Dashboard
                </h2>

                <div className="row g-4">

                    <div className="col-md-3">

                        <div className="card shadow text-center border-0">

                            <div className="card-body">

                                <h1 className="text-primary">
                                    {dashboard.totalStudents}
                                </h1>

                                <h5>Total Students</h5>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card shadow text-center border-0">

                            <div className="card-body">

                                <h1 className="text-success">
                                    {dashboard.totalCompanies}
                                </h1>

                                <h5>Total Companies</h5>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card shadow text-center border-0">

                            <div className="card-body">

                                <h1 className="text-warning">
                                    {dashboard.totalDrives}
                                </h1>

                                <h5>Total Drives</h5>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card shadow text-center border-0">

                            <div className="card-body">

                                <h1 className="text-danger">
                                    {dashboard.totalApplications}
                                </h1>

                                <h5>Total Applications</h5>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="mt-5">

                    <div className="card shadow border-0">

                        <div className="card-body">

                            <h4>Placement Portal Overview</h4>

                            <hr />

                            <p>
                                👨‍🎓 <strong>{dashboard.totalStudents}</strong> students have registered.
                            </p>

                            <p>
                                🏢 <strong>{dashboard.totalCompanies}</strong> companies are available.
                            </p>

                            <p>
                                📅 <strong>{dashboard.totalDrives}</strong> placement drives are active.
                            </p>

                            <p>
                                📄 <strong>{dashboard.totalApplications}</strong> applications have been submitted.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default AdminDashboard;
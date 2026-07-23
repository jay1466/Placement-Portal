import Navbar from "../components/Navbar";

function RecruiterDashboard() {

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <h2>Welcome Recruiter 👋</h2>

                <div className="row mt-4">

                    <div className="col-md-4">

                        <div className="card shadow p-4 text-center">

                            <h4>Post Job</h4>

                            <p>Create New Opportunity</p>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="card shadow p-4 text-center">

                            <h4>Applications</h4>

                            <p>View Student Applications</p>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="card shadow p-4 text-center">

                            <h4>Profile</h4>

                            <p>Manage Company Profile</p>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default RecruiterDashboard;
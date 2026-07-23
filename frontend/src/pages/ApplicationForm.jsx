import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";


function ApplicationForm() {

    const { id } = useParams();
    const navigate = useNavigate();


    const [company, setCompany] = useState(null);

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        branch: "",
        cgpa: "",
        resume: null,
        coverLetter: ""
    });

    useEffect(() => {

        api.get(`/companies/${id}`)
            .then((res) => {
                setCompany(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

    }, [id]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });

    };

    const handleFile = (e) => {

        setForm({
            ...form,
            resume: e.target.files[0]
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const application = {

                studentId: 1,

                driveId: company.id,

                applicationStatus: "APPLIED",

                fullName: form.fullName,

                email: form.email,

                phone: form.phone,

                branch: form.branch,

                cgpa: parseFloat(form.cgpa),

                coverLetter: form.coverLetter

            };

            await api.post("/applications", application);

            alert("Application Submitted Successfully!");

            navigate("/applications");

        } catch (error) {

            console.error(error);

            alert("Failed to submit application.");

        }

    };

    if (!company) {

        return (
            <>
                <Navbar />
                <div className="container mt-5 text-center">
                    Loading...
                </div>
            </>
        );

    }

    return (

        <>
            <Navbar />

            <div className="container py-5">

                <div className="card shadow-lg border-0 rounded-4">

                    <div className="card-header bg-primary text-white p-4">

                        <h2>
                            Apply for {company.companyName}
                        </h2>

                        <p className="mb-0">
                            {company.jobRole}
                        </p>

                    </div>

                    <div className="card-body p-5">

                        <form onSubmit={handleSubmit}>

                            <div className="row">

                                <div className="col-md-6 mb-4">

                                    <label>Full Name</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="fullName"
                                        value={form.fullName}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-4">

                                    <label>Email</label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                            </div>

                            <div className="row">

                                <div className="col-md-6 mb-4">

                                    <label>Phone</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-4">

                                    <label>Branch</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="branch"
                                        value={form.branch}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                            </div>

                            <div className="row">

                                <div className="col-md-6 mb-4">

                                    <label>CGPA</label>

                                    <input
                                        type="number"
                                        step="0.01"
                                        className="form-control"
                                        name="cgpa"
                                        value={form.cgpa}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-4">

                                    <label>Resume</label>

                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={handleFile}
                                    />

                                </div>

                            </div>

                            <div className="mb-4">

                                <label>Why should we hire you?</label>

                                <textarea
                                    rows="5"
                                    className="form-control"
                                    name="coverLetter"
                                    value={form.coverLetter}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="d-flex gap-3">

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => navigate(-1)}
                                >
                                    Back
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-success"
                                >
                                    Submit Application
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </>

    );

}

export default ApplicationForm;
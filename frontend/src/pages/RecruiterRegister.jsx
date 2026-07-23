import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function RecruiterRegister() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        recruiterName: "",
        email: "",
        password: "",
        confirmPassword: "",
        companyName: "",
        phone: "",
        website: "",
        location: "",
        designation: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleRegister = async () => {

        if (formData.password !== formData.confirmPassword) {

            alert("Passwords do not match");
            return;
        }

        try {

            await api.post("/api/recruiters/register", {

                recruiterName: formData.recruiterName,
                email: formData.email,
                password: formData.password,

                companyName: formData.companyName,
                phone: formData.phone,
                website: formData.website,
                location: formData.location,
                designation: formData.designation

            });

            alert("Recruiter Registered Successfully");

            navigate("/login");

        }
        catch (error) {

            console.error(error);

            if (error.response) {

                alert(
                    "Status : " + error.response.status +
                    "\n\n" +
                    JSON.stringify(error.response.data, null, 2)
                );

            } else {

                alert(error.message);

            }

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-8">

                    <div className="card shadow p-4">

                        <h2 className="text-center mb-4">
                            Recruiter Registration
                        </h2>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Recruiter Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="recruiterName"
                                    value={formData.recruiterName}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Company Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Website
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Location
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Designation
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Confirm Password
                                </label>

                                <input
                                    type="password"
                                    className="form-control"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                        <button
                            className="btn btn-success w-100"
                            onClick={handleRegister}
                        >
                            Register
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default RecruiterRegister;
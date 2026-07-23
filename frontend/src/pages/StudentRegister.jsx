import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function StudentRegister() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        branch: "CSE",
        cgpa: "",
        phone: "",
        graduationYear: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async () => {

        if (
            !formData.username ||
            !formData.email ||
            !formData.password
        ) {
            alert("Please fill all required fields.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {

            await api.post("/auth/register", {

                username: formData.username,
                email: formData.email,
                password: formData.password,
                role: "STUDENT"

            });

            alert("Registration Successful!");

            navigate("/login");

        } catch (error) {

            console.error(error);

            if (
                error.response &&
                error.response.data &&
                error.response.data.message === "Email already exists"
            ) {

                alert("Email already exists. Please login or use another email.");

            }
            else if (
                error.response &&
                error.response.data &&
                typeof error.response.data === "string" &&
                error.response.data.includes("Email already exists")
            ) {

                alert("Email already exists. Please login or use another email.");

            }
            else {

                alert("Registration Failed.");

            }

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-8">

                    <div className="card shadow p-4">

                        <h2 className="text-center mb-4">
                            Student Registration
                        </h2>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="username"
                                    className="form-control"
                                    placeholder="Enter Full Name"
                                    value={formData.username}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Enter Password"
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
                                    name="confirmPassword"
                                    className="form-control"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Branch
                                </label>

                                <select
                                    name="branch"
                                    className="form-select"
                                    value={formData.branch}
                                    onChange={handleChange}
                                >
                                    <option>CSE</option>
                                    <option>ECE</option>
                                    <option>EEE</option>
                                    <option>IT</option>
                                    <option>MECH</option>
                                    <option>CIVIL</option>
                                </select>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    CGPA
                                </label>

                                <input
                                    type="number"
                                    name="cgpa"
                                    className="form-control"
                                    placeholder="Enter CGPA"
                                    value={formData.cgpa}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Phone Number
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    className="form-control"
                                    placeholder="Enter Phone Number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Graduation Year
                                </label>

                                <input
                                    type="number"
                                    name="graduationYear"
                                    className="form-control"
                                    placeholder="2027"
                                    value={formData.graduationYear}
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

export default StudentRegister;
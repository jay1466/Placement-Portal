import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [role, setRole] = useState("student");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        if (!email || !password) {
            alert("Please enter Email and Password");
            return;
        }

        try {

            const response = await api.post("/auth/login", {
                email,
                password
            });

            console.log("Login Response:", response.data);

            // Supports both plain token and JSON response
            const token =
                response.data.token ||
                response.data.jwt ||
                response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("role", role);

            alert("Login Successful");

            switch (role) {

                case "student":
                    navigate("/student-dashboard");
                    break;

                case "recruiter":
                    navigate("/recruiter-dashboard");
                    break;

                case "admin":
                    navigate("/admin-dashboard");
                    break;

                default:
                    navigate("/");
            }

        } catch (error) {

            console.error("Login Error:", error);

            if (error.response) {

                console.log("Status:", error.response.status);
                console.log("Response:", error.response.data);

                if (typeof error.response.data === "string") {

                    alert(error.response.data);

                } else if (error.response.data.message) {

                    alert(error.response.data.message);

                } else {

                    alert(JSON.stringify(error.response.data, null, 2));

                }

            } else {

                alert("Unable to connect to the server.");

            }

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow p-4">

                        <h2 className="text-center mb-4">
                            Login
                        </h2>

                        <div className="mb-3">
                            <label className="form-label">Email</label>

                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>

                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Login As</label>

                            <select
                                className="form-select"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="student">Student</option>
                                <option value="recruiter">Recruiter</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <button
                            className="btn btn-primary w-100"
                            onClick={handleLogin}
                        >
                            Login
                        </button>

                        <div className="text-center mt-3">

                            <Link to="#">
                                Forgot Password?
                            </Link>

                            <br />

                            <span>
                                Don't have an account?{" "}
                            </span>

                            <Link to="/student-register">
                                Student Register
                            </Link>

                            <br />

                            <Link to="/recruiter-register">
                                Recruiter Register
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Login;
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import "./Profile.css";

function Profile() {

    const studentId = 1;

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        branch: "",
        cgpa: "",
        phone: "",
        graduationYear: ""
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const response =
                await api.get(`/student/profile/${studentId}`);

            setProfile(response.data);

        } catch (error) {

            console.log(error);

            alert("Failed to load profile.");

        } finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        setProfile({

            ...profile,

            [e.target.name]: e.target.value

        });

    };

    const saveProfile = async () => {

        try {

            await api.put(

                `/student/profile/${studentId}`,

                profile

            );

            alert("Profile Updated Successfully");

        } catch (error) {

            console.log(error);

            alert("Update Failed");

        }

    };

    if (loading) {

        return (
            <>
                <Navbar />

                <div className="profile-loading">

                    Loading...

                </div>
            </>
        );

    }

    return (

        <>
            <Navbar />

            <div className="profile-page">

                <div className="profile-card">

                    <div className="profile-top">

                        <img
                            src="https://ui-avatars.com/api/?name=Sumanth&background=2563eb&color=fff&size=180"
                            alt="avatar"
                        />

                        <h2>Student Profile</h2>

                    </div>

                    <div className="profile-form">

                        <label>Name</label>

                        <input
                            type="text"
                            name="name"
                            value={profile.name || ""}
                            onChange={handleChange}
                        />

                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            value={profile.email || ""}
                            onChange={handleChange}
                        />

                        <label>Branch</label>

                        <input
                            type="text"
                            name="branch"
                            value={profile.branch || ""}
                            onChange={handleChange}
                        />

                        <label>CGPA</label>

                        <input
                            type="number"
                            name="cgpa"
                            value={profile.cgpa || ""}
                            onChange={handleChange}
                        />

                        <label>Phone</label>

                        <input
                            type="text"
                            name="phone"
                            value={profile.phone || ""}
                            onChange={handleChange}
                        />

                        <label>Graduation Year</label>

                        <input
                            type="number"
                            name="graduationYear"
                            value={profile.graduationYear || ""}
                            onChange={handleChange}
                        />

                        <button
                            onClick={saveProfile}
                            className="save-btn"
                        >

                            Save Changes

                        </button>

                    </div>

                </div>

            </div>

        </>
    );

}

export default Profile;
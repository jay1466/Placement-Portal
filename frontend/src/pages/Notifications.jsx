import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import "./Notifications.css";

function Notifications() {

    const studentId = 1;   // Replace with logged-in student's ID later

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        loadNotifications();

    }, []);

    const loadNotifications = async () => {

        try {

            const response =
                await api.get(`/notifications/${studentId}`);

            setNotifications(response.data);

        } catch (error) {

            console.log(error);

            alert("Failed to load notifications");

        }

    };

    return (

        <>
            <Navbar />

            <div className="notification-page">

                <h2>🔔 Notifications</h2>

                {notifications.length === 0 ? (

                    <div className="empty-box">

                        No Notifications Yet

                    </div>

                ) : (

                    notifications.map((notification) => (

                        <div
                            key={notification.id}
                            className="notification-card"
                        >

                            <h4>{notification.title}</h4>

                            <p>{notification.message}</p>

                            <small>

                                {notification.createdAt}

                            </small>

                        </div>

                    ))

                )}

            </div>

        </>

    );

}

export default Notifications;
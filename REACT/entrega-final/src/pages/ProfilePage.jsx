import React, { useEffect, useState} from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export const ProfilePage = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState("");

    useEffect(() => {
        setProfile(user);
    }, [user]);

    return (
        <div>
            <h1>Profile</h1>
            <p>{profile.name}</p>
            <p>{profile.email}</p>
            <Link to="/settings">Edit</Link>
        </div>
    );
   
}

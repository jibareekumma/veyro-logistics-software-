


import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../Sidebar";
import DesktopTopbar from "../DesktopTopbar";
import Header from "../Header";

import { getCurrentUser, getStoredUser, logoutUser, parseErrors, updateStoredUser, uploadAvatar } from "../../api/auth";

import "../../stylings/dashboard-stylings/Layout.css";
import "../../stylings/user/Profile.scss";

import pfp from "../../assets/photos/default-pfp.jpeg";
import cameraIcon from "../../assets/icons/camera.png";
import profileIcon from "../../assets/icons/user_icon.png";

import packageIcon from "../../assets/icons/pacakge-info.png";
import address from "../../assets/icons/nav-addresses.png";
import notification from "../../assets/icons/bell-icon.png";
import settings from "../../assets/icons/settings.png";
import support from "../../assets/icons/nav-support.png";
import rightArr from "../../assets/icons/right-Arr.png";
import signOut from "../../assets/icons/logout-icon.png";

import pencil from "../../assets/icons/pencil.png"
import rightArr2 from "../../assets/icons/right-arrow.png"
import verified from "../../assets/icons/secured-icon.png"
import quoting from "../../assets/icons/quotings.png"


const MAX_AVATAR_SIZE = 2 * 1024 * 1024;

const Profile = function(){

    const navigate = useNavigate();

    const storedUser = getStoredUser();

    const [avatar, setAvatar] = useState(storedUser ? storedUser.avatar : null);
    const [uploading, setUploading] = useState(false);
    const [avatarError, setAvatarError] = useState("");
    const fileInputRef = useRef(null);

    useEffect(function(){
        let active = true;
        getCurrentUser().then(function(user){
            if (active) {
                setAvatar(user.avatar);
                updateStoredUser(user);
            }
        }).catch(function(){});
        return function(){
            active = false;
        };
    }, []);

    const handleLogout = function(){
        logoutUser();
        navigate("/login", { replace: true });
    };

    const handleAvatarChange = async function(event){
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        setAvatarError("");
        if (!file.type.startsWith("image/")) {
            setAvatarError("Please choose an image file.");
            event.target.value = "";
            return;
        }
        if (file.size > MAX_AVATAR_SIZE) {
            setAvatarError("Image must be 2MB or smaller.");
            event.target.value = "";
            return;
        }
        setUploading(true);
        try {
            const user = await uploadAvatar(file);
            setAvatar(user.avatar);
        } catch (error) {
            const errors = parseErrors(error);
            setAvatarError(errors.avatar || errors.general || "Could not upload image. Please try again.");
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const profileLinks = [
        {
            id: 1,
            icon: packageIcon,
            title: "View Shipments",
            texts: "Track and manage all shipments",
            onClick: () => navigate('/recentshipmentspage')
            
        },
        {
            id: 2,
            icon: address,
            title: "Addresses",
            texts: "Manage your addresses",
            onClick: () => navigate('/addresses')
            
        },
        {
            id: 3,
            icon: notification,
            title: "Notifications",
            texts: "View your notifications",
            badge: 3,
        },
        {
            id: 4,
            icon: quoting,
            title: "Quoting",
            texts: "Get a quick and easy Quoting",
            onClick: () => navigate('/quotes')
        },
        {
            id: 5,
            icon: support,
            title: "Support",
            texts: "Get help and contact us",
        },
    ];


    const quickAccess = profileLinks.slice(0, 4);


    return <>

        <div className="dashboard-layout container-profile">

            <Sidebar/>

            <div className="dashboard-main container-main">

                <DesktopTopbar/>

                <div className="profile-mobile-header">
                    <Header/>
                </div>


                <div className="profile-content">

                    {/* PROFILE HEADING */}

                    <div className="profile-heading">

                        <div className="profile-texts">
                            <h3>Profile</h3>
                            <p>Manage your account and preferences.</p>
                        </div>

                        <div className="profile-banner-placeholder"></div>

                    </div>


                    {/* PROFILE INFORMATION */}

                    <div className="profile-info">

                        <div className="img-container">

                            <img
                                src={avatar || pfp}
                                alt="Profile Image of user"
                                style={{ opacity: uploading ? 0.5 : 1 }}
                            />

                            <input
                                type="file"
                                accept="image/*"
                                id="profile-upload"
                                ref={fileInputRef}
                                onChange={handleAvatarChange}
                                disabled={uploading}
                                hidden
                            />

                            <label htmlFor="profile-upload" className="edit-pfp-icon">
                                <img src={cameraIcon} alt="Edit profile image"/>
                            </label>

                        </div>


                        <div className="info-container">

                            <h4>Default User</h4>

                            <p>Default User Email</p>

                            <div className="category">
                                <img src={profileIcon} alt="Profile Icon"/>
                                <p>Customer</p>
                            </div>

                            {avatarError && (
                                <p style={{ color: "#d93025", fontSize: "0.85rem", marginTop: "6px" }}>
                                    {avatarError}
                                </p>
                            )}

                        </div>


                        <button className="edit-profile">
                            <img src={pencil} alt="Pencil Icon" className="pencil-icon" />
                            Edit Profile
                        </button>

                    </div>



                    {/* MOBILE PROFILE LINKS */}

                    <div className="profile-links">

                        {profileLinks.map((a) =>(

                            <div className="container" key={a.id} onClick = {a.onClick}>

                                <img
                                    src={a.icon}
                                    alt=""
                                />

                                <div className="texts">
                                    <h5>{a.title}</h5>
                                    <p>{a.texts}</p>
                                </div>

                                {a.badge && (
                                    <span className="notification-badge">
                                        {a.badge}
                                    </span>
                                )}

                                <img src={rightArr} alt=""/>

                            </div>

                        ))}


                        <div className="logout" onClick={handleLogout}>
                            <img src={signOut} alt=""/>
                            <p>Log Out</p>
                        </div>

                    </div>



                    {/* TABLET AND DESKTOP QUICK ACCESS */}

                    <section className="quick-access">

                        <h3>Quick Access</h3>

                        <div className="quick-access-grid">

                            {quickAccess.map((a) =>(

                                <div className="access-card" key={a.id} onClick={a.onClick}>

                                    <div className="access-icon">
                                        <img src={a.icon} alt=""/>
                                    </div>

                                    <div className="texts">
                                        <h5>{a.title}</h5>
                                        <p>{a.texts}</p>
                                    </div>

                                    {a.badge && (
                                        <span className="notification-badge">
                                            {a.badge}
                                        </span>
                                    )}

                                    <img
                                        className="access-arrow"
                                        src={rightArr}
                                        alt=""
                                    />

                                </div>

                            ))}

                        </div>

                    </section>



                    {/* NEED HELP */}

                    <section className="profile-help">

                        <img src = {support}
                        className="support-icon-big" alt="Customer Support Icon" 
                        
                        />

                        <div className="help-texts">
                            <h4>Need Help?</h4>
                            <p>Our support team is here for you.</p>
                        </div>

                        <button>
                            Contact Support
                            <img src={rightArr2} alt="Right Arrow" className="right-arr2" />
                        </button>

                    </section>



                    {/* SECURITY INFORMATION */}

                    <section className="profile-security">

                        <img src={verified} alt="Secured Icon" className="secured-icon" />

                        <div className="security-texts">
                            <h5>Your data is secure with VEYRO</h5>
                            <p>
                                We use industry-standard security
                                to protect your information.
                            </p>
                        </div>

                    </section>



                    {/* LOGOUT - TABLET AND DESKTOP */}

                    <div className="profile-desktop-logout" onClick={handleLogout}>

                        <img src={signOut} alt=""/>

                        <p>Log Out</p>

                    </div>


                </div>

            </div>

        </div>

    </>

}


export default Profile;
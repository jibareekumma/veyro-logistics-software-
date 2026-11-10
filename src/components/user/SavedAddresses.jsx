



import Sidebar from "../Sidebar";
import DesktopTopbar from "../DesktopTopbar";
import Header from "../Header";

import "../../stylings/dashboard-stylings/Layout.css";
import "../../stylings/user/SavedAddresses.scss";

import address from "../../assets/icons/nav-addresses.png";
import plus from "../../assets/icons/plus.png";
import home from "../../assets/icons/house_icon1.png";
import office from "../../assets/icons/office.png";
import family from "../../assets/icons/family.png";
import friends from "../../assets/icons/friend.png";
import other from "../../assets/icons/other.png";

import dots from "../../assets/icons/3dots.png";
import notice from "../../assets/icons/notice.png";


const SavedAddresses = function () {

    const savedAddresses = [

        {
            id: 1,
            icon: home,
            title: "Home",
            address: "123 main st Miami Fl, USA",
            isDefault: true
        },

        {
            id: 2,
            icon: office,
            title: "Office",
            address: "2841 Bayshore Boulevard, Tampa, FL 33629, USA",
            isDefault: false
        },

        {
            id: 3,
            icon: friends,
            title: "Friend",
            address: "15 Admiralty Way, Lekki Phase 1, Lagos, Nigeria",
            isDefault: false
        },

        {
            id: 4,
            icon: family,
            title: "Family",
            address: "42 Peter Odili Road, Trans Amadi, Port Harcourt, Rivers State, Nigeria",
            isDefault: false
        },

        {
            id: 5,
            icon: other,
            title: "Other",
            address: "18 Stadium Road, Rumuomasi, Port Harcourt, Rivers State, Nigeria",
            isDefault: false
        }

    ];


    return (

        <div className="dashboard-layout container-addresses">

            <Sidebar />

            <div className="dashboard-main container-main">

                <DesktopTopbar />

                <div className="addresses-mobile-header">
                    <Header />
                </div>


                <div className="addresses-content">

                    {/* PAGE HEADING */}

                    <div className="addresses-heading">

                        <div className="addresses-texts">

                            <div className="headings">
                                <img src={address} alt="Address Icon" />
                                <h3>Addresses</h3>
                            </div>

                            <p>
                                Manage your saved addresses for faster shipments.
                            </p>

                        </div>


                        <button className="add-address-btn">

                            <img src={plus} alt="Plus Icon" />

                            <p>Add New Address</p>

                        </button>

                    </div>


                    {/* NOTICE */}

                    <div className="notice">

                        <img
                            src={notice}
                            alt="Notice Icon"
                            className="notice-icon"
                        />

                        <p>
                            Set a default address to speed up your shipments.
                        </p>

                    </div>


                    {/* SAVED ADDRESSES */}

                    <div className="saved-container">

                        {savedAddresses.map((a) => (

                            <div key={a.id} className="address-saved">

                                <img
                                    src={a.icon}
                                    alt={`${a.title} icon`}
                                    className="icon1"
                                />


                                <div className="texts">

                                    <h5>{a.title}</h5>

                                    <p>{a.address}</p>

                                </div>


                                {/* DEFAULT ADDRESS BADGE */}

                                {a.isDefault && (

                                    <span className="default-badge">
                                        Default
                                    </span>

                                )}


                                {/* ADDRESS ACTIONS */}

                                <div className="address-actions">

                                    <button
                                        type="button"
                                        className="edit-btn"
                                        aria-label={`Edit ${a.title} address`}
                                    >
                                        <span className="action-icon edit-icon">
                                            ✎
                                        </span>

                                        Edit
                                    </button>


                                    <button
                                        type="button"
                                        className="delete-btn"
                                        aria-label={`Delete ${a.title} address`}
                                    >
                                        <span className="action-icon delete-icon">
                                            ▣
                                        </span>

                                        Delete
                                    </button>


                                    <button
                                        type="button"
                                        className="more-btn"
                                        aria-label={`More options for ${a.title}`}
                                    >
                                        <img
                                            src={dots}
                                            alt=""
                                            className="dot-icon"
                                        />
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>

    );

};


export default SavedAddresses;

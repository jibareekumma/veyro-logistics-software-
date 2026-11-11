

import { useEffect, useState } from "react";

import Sidebar from "../Sidebar";
import DesktopTopbar from "../DesktopTopbar";
import Header from "../Header";
import NewAddressModal from "./NewAddressModal";

import { API_BASE, authRequest } from "../../api/auth";

import "../../stylings/dashboard-stylings/Layout.css";
import "../../stylings/user/SavedAddresses.scss";

import address from "../../assets/icons/nav-addresses.png";
import plus from "../../assets/icons/plus.png";
import home from "../../assets/icons/house_icon1.png";
import family from "../../assets/icons/family.png";
import friends from "../../assets/icons/friend.png";
import other from "../../assets/icons/other.png";

import dots from "../../assets/icons/3dots.png";
import notice from "../../assets/icons/notice.png";
import deleteIcon from "../../assets/icons/delete.png";


const CATEGORY_ICONS = {
    home: home,
    family: family,
    friends: friends,
    other: other
};


const CATEGORY_LABELS = {
    home: "Home",
    family: "Family",
    friends: "Friends",
    other: "Other"
};


const SavedAddresses = function () {

    const [showAddressModal, setShowAddressModal] = useState(false);

    const [savedAddresses, setSavedAddresses] = useState([]);

    const [editingAddress, setEditingAddress] = useState(null);

    const [isSaving, setIsSaving] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState("");



    // ======================================
    // FORMAT ADDRESS
    // ======================================

    const formatAddress = function (data) {

        return [
            data.address_line,
            data.city,
            data.state_province,
            data.postal_code,
            data.country
        ].filter(Boolean).join(", ");

    };



    // ======================================
    // LOAD SAVED ADDRESSES
    // ======================================

    const fetchAddresses = async function () {

        try {

            setIsLoading(true);
            setError("");

            const data = await authRequest(
                "/",
                "GET",
                null,
                `${API_BASE}/addresses`
            );

            setSavedAddresses(data);

        } catch (error) {

            setError(
                error.data?.detail ||
                "Unable to load your saved addresses."
            );

        } finally {

            setIsLoading(false);

        }

    };


    useEffect(function () {

        fetchAddresses();

    }, []);



    // ======================================
    // OPEN ADD ADDRESS MODAL
    // ======================================

    const handleOpenModal = function () {

        setEditingAddress(null);
        setShowAddressModal(true);

    };



    // ======================================
    // OPEN EDIT ADDRESS MODAL
    // ======================================

    const handleEditAddress = function (item) {

        setEditingAddress(item);
        setShowAddressModal(true);

    };



    // ======================================
    // CLOSE ADDRESS MODAL
    // ======================================

    const handleCloseModal = function () {

        setShowAddressModal(false);
        setEditingAddress(null);

    };



    // ======================================
    // SAVE OR UPDATE ADDRESS
    // ======================================

    const handleSaveAddress = async function (data) {

        const payload = {
            category: data.category,
            address_line: data.addressLine,
            city: data.city,
            state_province: data.stateProvince,
            postal_code: data.postalCode,
            country: data.country
        };


        try {

            setIsSaving(true);
            setError("");

            let savedAddress;


            if (editingAddress) {

                savedAddress = await authRequest(
                    `/${editingAddress.id}/`,
                    "PATCH",
                    payload,
                    `${API_BASE}/addresses`
                );

                setSavedAddresses((prev) =>
                    prev.map((item) =>
                        item.id === savedAddress.id
                            ? savedAddress
                            : item
                    )
                );

            } else {

                savedAddress = await authRequest(
                    "/",
                    "POST",
                    payload,
                    `${API_BASE}/addresses`
                );

                setSavedAddresses((prev) => [
                    savedAddress,
                    ...prev
                ]);

            }


            handleCloseModal();

        } catch (error) {

            setError(
                error.data?.detail ||
                "Unable to save this address. Please try again."
            );

        } finally {

            setIsSaving(false);

        }

    };



    // ======================================
    // DELETE ADDRESS
    // ======================================

    const handleDeleteAddress = async function (id) {

        const confirmed = window.confirm(
            "Are you sure you want to delete this address?"
        );

        if (!confirmed) return;


        try {

            setError("");

            await authRequest(
                `/${id}/`,
                "DELETE",
                null,
                `${API_BASE}/addresses`
            );

            setSavedAddresses((prev) =>
                prev.filter((item) => item.id !== id)
            );

        } catch (error) {

            setError(
                error.data?.detail ||
                "Unable to delete this address. Please try again."
            );

        }

    };



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

                                <img
                                    src={address}
                                    alt="Address Icon"
                                />

                                <h3>Addresses</h3>

                            </div>

                            <p>
                                Manage your saved addresses for faster shipments.
                            </p>

                        </div>


                        <button
                            type="button"
                            className="add-address-btn"
                            onClick={handleOpenModal}
                        >

                            <img
                                src={plus}
                                alt="Plus Icon"
                            />

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



                    {/* ERROR */}

                    {error && (

                        <p className="address-error">
                            {error}
                        </p>

                    )}



                    {/* SAVED ADDRESSES */}

                    <div className="saved-container">

                        {isLoading ? (

                            <p className="address-status">
                                Loading saved addresses...
                            </p>

                        ) : savedAddresses.length === 0 ? (

                            <p className="address-status">
                                You haven't saved any addresses yet.
                            </p>

                        ) : (

                            savedAddresses.map((a) => (

                                <div
                                    key={a.id}
                                    className="address-saved"
                                >

                                    <img
                                        src={CATEGORY_ICONS[a.category] || other}
                                        alt={`${a.category} icon`}
                                        className="icon1"
                                    />


                                    <div className="texts">

                                        <h5>
                                            {CATEGORY_LABELS[a.category] || "Other"}
                                        </h5>

                                        <p>
                                            {formatAddress(a)}
                                        </p>

                                    </div>



                                    {/* DEFAULT ADDRESS BADGE */}

                                    {a.is_default && (

                                        <span className="default-badge">
                                            Default
                                        </span>

                                    )}



                                    {/* ADDRESS ACTIONS */}

                                    <div className="address-actions">

                                        <button
                                            type="button"
                                            className="edit-btn"
                                            aria-label={`Edit ${a.category} address`}
                                            onClick={() => handleEditAddress(a)}
                                        >

                                            <span className="action-icon edit-icon">
                                                ✎
                                            </span>

                                            Edit

                                        </button>


                                        <button
                                            type="button"
                                            className="delete-btn"
                                            aria-label={`Delete ${a.category} address`}
                                            onClick={() => handleDeleteAddress(a.id)}
                                        >

                                            <img
                                                src={deleteIcon}
                                                alt="Delete Icon"
                                                className="delete-icon"
                                            />

                                            Delete

                                        </button>


                                        <button
                                            type="button"
                                            className="more-btn"
                                            aria-label={`More options for ${a.category}`}
                                        >

                                            <img
                                                src={dots}
                                                alt=""
                                                className="dot-icon"
                                            />

                                        </button>

                                    </div>

                                </div>

                            ))

                        )}

                    </div>

                </div>



                {/* ADDRESS MODAL */}

                {showAddressModal && (

                    <NewAddressModal
                        onClose={handleCloseModal}
                        onSave={handleSaveAddress}
                        initialData={editingAddress}
                        isSaving={isSaving}
                    />

                )}

            </div>

        </div>

    );

};


export default SavedAddresses;
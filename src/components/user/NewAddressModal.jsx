

import { useEffect, useState } from "react";

import "../../stylings/user/NewAddressModal.scss";


const NewAddressModal = function ({
    onClose,
    onSave,
    initialData,
    isSaving
}) {

    const [formData, setFormData] = useState({
        category: "home",
        addressLine: "",
        city: "",
        stateProvince: "",
        postalCode: "",
        country: "United States"
    });


    useEffect(function () {

        if (initialData) {
            setFormData({
                category: initialData.category || "other",
                addressLine: initialData.address_line || "",
                city: initialData.city || "",
                stateProvince: initialData.state_province || "",
                postalCode: initialData.postal_code || "",
                country: initialData.country || "United States"
            });
        }

    }, [initialData]);


    const handleChange = function (e) {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };


    const handleSubmit = function (e) {

        e.preventDefault();

        onSave(formData);

    };


    return (

        <div
            className="new-address-overlay"
            onClick={onClose}
        >

            <div
                className="new-address-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="new-address-title"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="new-address-modal-header">

                    <div className="modal-heading">

                        <h3 id="new-address-title">
                            {initialData ? "Edit Address" : "Add New Address"}
                        </h3>

                        <p>
                            {initialData
                                ? "Update your saved address details."
                                : "Enter the details below to add a new address."
                            }
                        </p>

                    </div>


                    <button
                        type="button"
                        className="close-modal-btn"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        ×
                    </button>

                </div>


                <form
                    className="new-address-form"
                    onSubmit={handleSubmit}
                >

                    {/* CATEGORY */}

                    <div className="form-group">

                        <label htmlFor="category">
                            Address Category
                        </label>

                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >

                            <option value="home">Home</option>
                            <option value="family">Family</option>
                            <option value="friends">Friends</option>
                            <option value="other">Other</option>

                        </select>

                    </div>


                    {/* ADDRESS LINE */}

                    <div className="form-group">

                        <label htmlFor="addressLine">
                            Address Line
                        </label>

                        <input
                            type="text"
                            id="addressLine"
                            name="addressLine"
                            placeholder="e.g. 123 Main St, Apt 4B"
                            value={formData.addressLine}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* CITY */}

                    <div className="form-group">

                        <label htmlFor="city">
                            City
                        </label>

                        <input
                            type="text"
                            id="city"
                            name="city"
                            placeholder="e.g. Miami"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* STATE AND POSTAL CODE */}

                    <div className="form-row">

                        <div className="form-group">

                            <label htmlFor="stateProvince">
                                State / Province
                            </label>

                            <select
                                id="stateProvince"
                                name="stateProvince"
                                value={formData.stateProvince}
                                onChange={handleChange}
                                required
                            >

                                <option value="" disabled>
                                    Select State
                                </option>

                                <option value="Florida">Florida</option>
                                <option value="California">California</option>
                                <option value="Texas">Texas</option>
                                <option value="New York">New York</option>
                                <option value="Lagos">Lagos</option>
                                <option value="Rivers State">Rivers State</option>
                                <option value="Abuja">Abuja</option>
                                <option value="Ontario">Ontario</option>

                            </select>

                        </div>


                        <div className="form-group">

                            <label htmlFor="postalCode">
                                Postal Code
                            </label>

                            <input
                                type="text"
                                id="postalCode"
                                name="postalCode"
                                placeholder="e.g. 33101"
                                value={formData.postalCode}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>


                    {/* COUNTRY */}

                    <div className="form-group">

                        <label htmlFor="country">
                            Country
                        </label>

                        <div className="country-select-wrapper">

                            <select
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                required
                            >

                                <option value="United States">🇺🇸 United States</option>
                                <option value="Nigeria">🇳🇬 Nigeria</option>
                                <option value="Canada">🇨🇦 Canada</option>
                                <option value="United Kingdom">🇬🇧 United Kingdom</option>
                                <option value="South Africa">🇿🇦 South Africa</option>

                            </select>

                        </div>

                    </div>


                    {/* FORM ACTIONS */}

                    <div className="new-address-actions">

                        <button
                            type="button"
                            className="cancel-address-btn"
                            onClick={onClose}
                            disabled={isSaving}
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="save-address-btn"
                            disabled={isSaving}
                        >
                            {isSaving
                                ? "Saving..."
                                : initialData
                                    ? "Update Address"
                                    : "Save Address"
                            }
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};


export default NewAddressModal;
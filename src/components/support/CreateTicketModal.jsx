

import { useEffect, useState } from "react";

import { CATEGORY_OPTIONS } from "./SupportHelpers";

import "../../stylings/support/TicketModal.scss";


const CreateTicketModal = function ({
    onClose,
    onSave,
    isSaving,
    serverErrors = {}
}) {

    const [formData, setFormData] = useState({
        subject: "",
        category: "shipments",
        trackingId: "",
        description: ""
    });

    const [localErrors, setLocalErrors] = useState({});


    useEffect(function () {

        const handleKey = function (e) {
            if (e.key === "Escape" && !isSaving) {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKey);

        return function () {
            window.removeEventListener("keydown", handleKey);
        };

    }, [onClose, isSaving]);


    const handleChange = function (e) {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        setLocalErrors((prev) => ({
            ...prev,
            [name]: ""
        }));

    };


    const handleSubmit = function (e) {

        e.preventDefault();

        const errors = {};

        if (!formData.subject.trim()) {
            errors.subject = "Please enter a subject.";
        }

        if (formData.description.trim().length < 10) {
            errors.description = "Please describe the problem in at least 10 characters.";
        }

        if (Object.keys(errors).length > 0) {
            setLocalErrors(errors);
            return;
        }

        onSave(formData);

    };


    const errorFor = function (name) {
        return localErrors[name] || serverErrors[name];
    };


    return (

        <div
            className="ticket-sheet-overlay"
            onClick={isSaving ? undefined : onClose}
        >

            <div
                className="ticket-sheet"
                role="dialog"
                aria-modal="true"
                aria-labelledby="create-ticket-title"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="sheet-header">

                    <div className="sheet-heading">

                        <h3 id="create-ticket-title">
                            Create Support Ticket
                        </h3>

                        <p>
                            Tell us what went wrong and our team will get back to you.
                        </p>

                    </div>

                    <button
                        type="button"
                        className="sheet-close-btn"
                        onClick={onClose}
                        disabled={isSaving}
                        aria-label="Close"
                    >
                        ×
                    </button>

                </div>


                <form
                    className="sheet-form"
                    onSubmit={handleSubmit}
                    noValidate
                >

                    <div className="sheet-group">

                        <label htmlFor="ticket-subject">
                            Subject
                        </label>

                        <input
                            type="text"
                            id="ticket-subject"
                            name="subject"
                            placeholder="e.g. My package has not moved in 3 days"
                            maxLength={150}
                            value={formData.subject}
                            onChange={handleChange}
                            className={errorFor("subject") ? "has-error" : ""}
                        />

                        {errorFor("subject") && (
                            <span className="field-error">
                                {errorFor("subject")}
                            </span>
                        )}

                    </div>


                    <div className="sheet-row">

                        <div className="sheet-group">

                            <label htmlFor="ticket-category">
                                Category
                            </label>

                            <select
                                id="ticket-category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                            >

                                {CATEGORY_OPTIONS.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}

                            </select>

                            {errorFor("category") && (
                                <span className="field-error">
                                    {errorFor("category")}
                                </span>
                            )}

                        </div>


                        <div className="sheet-group">

                            <label htmlFor="ticket-tracking">
                                Tracking ID (optional)
                            </label>

                            <input
                                type="text"
                                id="ticket-tracking"
                                name="trackingId"
                                placeholder="e.g. VY-82K4-91AX"
                                maxLength={20}
                                value={formData.trackingId}
                                onChange={handleChange}
                                className={errorFor("trackingId") ? "has-error" : ""}
                            />

                            {errorFor("trackingId") && (
                                <span className="field-error">
                                    {errorFor("trackingId")}
                                </span>
                            )}

                        </div>

                    </div>


                    <div className="sheet-group">

                        <label htmlFor="ticket-description">
                            Describe the problem
                        </label>

                        <textarea
                            id="ticket-description"
                            name="description"
                            placeholder="Give us as much detail as you can"
                            maxLength={2000}
                            value={formData.description}
                            onChange={handleChange}
                            className={errorFor("description") ? "has-error" : ""}
                        />

                        <div className="field-meta">

                            {errorFor("description") ? (
                                <span className="field-error">
                                    {errorFor("description")}
                                </span>
                            ) : (
                                <span />
                            )}

                            <span className="field-count">
                                {formData.description.length}/2000
                            </span>

                        </div>

                    </div>


                    {serverErrors.general && (
                        <p className="sheet-error">
                            {serverErrors.general}
                        </p>
                    )}


                    <div className="sheet-actions">

                        <button
                            type="button"
                            className="sheet-cancel-btn"
                            onClick={onClose}
                            disabled={isSaving}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="sheet-submit-btn"
                            disabled={isSaving}
                        >
                            {isSaving ? "Submitting..." : "Submit Ticket"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};


export default CreateTicketModal;
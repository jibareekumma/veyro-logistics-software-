

import { useEffect, useState } from "react";

import { getTicket } from "../../api/support";
import { formatDate, formatTime, statusClass } from "./SupportHelpers";

import "../../stylings/support/TicketModal.scss";


const TicketDetailModal = function ({ ticketId, onClose }) {

    const [ticket, setTicket] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(function () {

        let cancelled = false;

        const load = async function () {

            try {

                setIsLoading(true);
                setError("");

                const data = await getTicket(ticketId);

                if (!cancelled) {
                    setTicket(data);
                }

            } catch (err) {

                if (!cancelled) {
                    setError(err.data?.detail || "Unable to load this ticket.");
                }

            } finally {

                if (!cancelled) {
                    setIsLoading(false);
                }

            }

        };

        load();

        return function () {
            cancelled = true;
        };

    }, [ticketId]);


    useEffect(function () {

        const handleKey = function (e) {
            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKey);

        return function () {
            window.removeEventListener("keydown", handleKey);
        };

    }, [onClose]);


    return (

        <div
            className="ticket-sheet-overlay"
            onClick={onClose}
        >

            <div
                className="ticket-sheet"
                role="dialog"
                aria-modal="true"
                aria-labelledby="ticket-detail-title"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="sheet-header">

                    <div className="sheet-heading">

                        <h3 id="ticket-detail-title">
                            Ticket #{ticketId}
                        </h3>

                        <p>
                            Details and responses from our support team.
                        </p>

                    </div>

                    <button
                        type="button"
                        className="sheet-close-btn"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        ×
                    </button>

                </div>


                {isLoading && (
                    <p className="sheet-message">
                        Loading ticket...
                    </p>
                )}


                {!isLoading && error && (
                    <p className="sheet-error">
                        {error}
                    </p>
                )}


                {!isLoading && ticket && (

                    <div className="sheet-detail">

                        <div className="detail-top">

                            <h4>{ticket.subject}</h4>

                            <span className={`sheet-status ${statusClass(ticket.status)}`}>
                                {ticket.status_label}
                            </span>

                        </div>


                        <div className="detail-grid">

                            <div>
                                <span>Category</span>
                                <p>{ticket.category_label}</p>
                            </div>

                            <div>
                                <span>Tracking ID</span>
                                <p>{ticket.tracking_id || "None"}</p>
                            </div>

                            <div>
                                <span>Date Created</span>
                                <p>{formatDate(ticket.created_at)}</p>
                            </div>

                            <div>
                                <span>Last Updated</span>
                                <p>
                                    {formatDate(ticket.updated_at)}, {formatTime(ticket.updated_at)}
                                </p>
                            </div>

                        </div>


                        <div className="detail-block">

                            <h5>Your message</h5>

                            <p>{ticket.description}</p>

                        </div>


                        <div className="detail-block">

                            <h5>Response from support</h5>

                            {ticket.replies.length === 0 ? (

                                <p className="reply-empty">
                                    No response yet. Our support team will reply here as soon as possible.
                                </p>

                            ) : (

                                <div className="reply-list">

                                    {ticket.replies.map((reply) => (

                                        <div
                                            key={reply.id}
                                            className={`reply-item ${reply.is_staff_reply ? "staff" : ""}`}
                                        >

                                            <div className="reply-meta">

                                                <strong>{reply.author_name}</strong>

                                                <span>
                                                    {formatDate(reply.created_at)}, {formatTime(reply.created_at)}
                                                </span>

                                            </div>

                                            <p>{reply.message}</p>

                                        </div>

                                    ))}

                                </div>

                            )}

                        </div>

                    </div>

                )}

            </div>

        </div>

    );

};


export default TicketDetailModal;
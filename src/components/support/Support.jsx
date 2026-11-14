

import { useEffect, useState } from "react";

import Sidebar from "../Sidebar";
import DesktopTopbar from "../DesktopTopbar";
import Header from "../Header";
import CreateTicketModal from "./CreateTicketModal";
import TicketDetailModal from "./TicketDetailModal";

import { createTicket, getTicketStats, listTickets, mapTicketErrors } from "../../api/support";
import { CATEGORY_OPTIONS, STATUS_OPTIONS, formatDate, formatTime, statusClass } from "./SupportHelpers";

import "../../stylings/dashboard-stylings/Layout.css";
import "../../stylings/support/Support.scss"
import "../../stylings/support/TicketModal.scss"


import supportIcon from "../../assets/icons/nav-support.png"

import pencil from "../../assets/icons/pencil.png"
import plus from "../../assets/icons/plus.png"
import spinner from "../../assets/icons/spinner.png"
import opened from "../../assets/icons/opened.png"
import completed from "../../assets/icons/completed.png"
import rightArr from "../../assets/icons/right-Arr.png"
import search from "../../assets/icons/search-icon.png"
import faq from "../../assets/icons/faq.png"
import downArr from "../../assets/icons/chevron-down.png"


const PAGE_SIZE = 5;


const statCards = [
    {
        id: 1,
        title: "Total Tickets",
        key: "total",
        icon: plus,
    },
    {
        id: 2,
        title: "Open",
        key: "open",
        icon: opened
    },
    {
        id: 3,
        title: "In Progress",
        key: "in_progress",
        icon: spinner
    },
    {
        id: 4,
        title: "Resolved",
        key: "resolved",
        icon: completed
    }
];


const faqs = [
    {
        id: 1,
        question: "How can I track my shipment?",
        answer: "You can track your shipment by entering your tracking ID in the Track a Package section of your dashboard."
    },
    {
        id: 2,
        question: "What should I do if my package is delayed?",
        answer: "You can create a support ticket under the Shipments category so our support team can assist you."
    },
    {
        id: 3,
        question: "Can I change the delivery address after shipment?",
        answer: "Contact our support team with your tracking ID to enquire about changing your delivery address."
    },
    {
        id: 4,
        question: "How do I get a refund?",
        answer: "Create a support ticket under the Billing category to get assistance with refund enquiries."
    }
];


const Support = function(){

    const [tickets, setTickets] = useState([]);
    const [stats, setStats] = useState({ total: 0, open: 0, in_progress: 0, resolved: 0, closed: 0 });
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);
    const [searchInput, setSearchInput] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [showCreate, setShowCreate] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [selectedTicketId, setSelectedTicketId] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const [notice, setNotice] = useState("");


    useEffect(function(){

        const timer = setTimeout(function(){
            setSearchTerm(searchInput.trim());
            setPage(1);
        }, 350);

        return function(){
            clearTimeout(timer);
        };

    }, [searchInput]);


    useEffect(function(){

        let cancelled = false;

        const load = async function(){

            try {

                setIsLoading(true);
                setError("");

                const data = await listTickets({
                    page: page,
                    search: searchTerm,
                    status: statusFilter,
                    category: categoryFilter
                });

                if (!cancelled) {
                    setTickets(data.results);
                    setTotalCount(data.count);
                }

            } catch (err) {

                if (!cancelled) {
                    setError(err.data?.detail || "Unable to load your support tickets.");
                }

            } finally {

                if (!cancelled) {
                    setIsLoading(false);
                }

            }

        };

        load();

        return function(){
            cancelled = true;
        };

    }, [page, searchTerm, statusFilter, categoryFilter, refreshKey]);


    useEffect(function(){

        const loadStats = async function(){

            try {
                const data = await getTicketStats();
                setStats(data);
            } catch (err) {
                return;
            }

        };

        loadStats();

    }, [refreshKey]);


    useEffect(function(){

        if (!notice) {
            return undefined;
        }

        const timer = setTimeout(function(){
            setNotice("");
        }, 5000);

        return function(){
            clearTimeout(timer);
        };

    }, [notice]);


    const handleOpenCreate = function(){
        setFormErrors({});
        setShowCreate(true);
    };


    const handleCloseCreate = function(){
        setShowCreate(false);
        setFormErrors({});
    };


    const handleCreateTicket = async function(form){

        try {

            setIsSaving(true);
            setFormErrors({});

            await createTicket(form);

            setShowCreate(false);
            setNotice("Your ticket has been submitted. Our team will respond soon.");
            setStatusFilter("");
            setCategoryFilter("");
            setSearchInput("");
            setSearchTerm("");
            setPage(1);
            setRefreshKey((key) => key + 1);

        } catch (err) {

            setFormErrors(mapTicketErrors(err.data));

        } finally {

            setIsSaving(false);

        }

    };


    const handleStatusChange = function(e){
        setStatusFilter(e.target.value);
        setPage(1);
    };


    const handleCategoryChange = function(e){
        setCategoryFilter(e.target.value);
        setPage(1);
    };


    const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

    const getPageNumbers = function(){

        const start = Math.max(1, Math.min(page - 1, totalPages - 2));
        const end = Math.min(totalPages, start + 2);
        const numbers = [];

        for (let i = start; i <= end; i++) {
            numbers.push(i);
        }

        return numbers;

    };

    const hasFilters = Boolean(searchTerm || statusFilter || categoryFilter);

    const rangeStart = (page - 1) * PAGE_SIZE + 1;
    const rangeEnd = Math.min(page * PAGE_SIZE, totalCount);


    return <>

        <div className="dashboard-layout container-profile">

            <Sidebar/>

            <div className="dashboard-main container-main">

                <DesktopTopbar/>

                <div className="support-mobile-header">
                    <Header/>
                </div>


                <main className="support-content">

                    <section className="support-heading">

                        <div className="heading-texts">

                            <div className="heading-icon">
                               <img src={supportIcon} alt="Customer Support Icon" className="support-icon" />
                            </div>

                            <div>
                                <h3>Support Center</h3>
                                <p>How can we help you today?</p>
                            </div>

                        </div>


                        <button
                            type="button"
                            className="create-ticket-btn"
                            onClick={handleOpenCreate}
                        >

                            <img src={pencil}
                            alt="Create Icon" className="smaller-icons"/>

                            Create Support Ticket

                        </button>

                    </section>


                    {notice && (
                        <p className="ticket-notice">
                            {notice}
                        </p>
                    )}


                    <section className="support-stats">

                        {statCards.map((stat) => (

                            <div className="stat-card" key={stat.id}>

                                <div className="stat-icon">
                                    <img src={stat.icon} alt="Stats Icon" className="smaller-icons" />
                                </div>

                                <div className="stat-info">
                                    <h4>{stats[stat.key]}</h4>
                                    <p>{stat.title}</p>
                                </div>

                                <div className="stat-arrow">
                                    <img src={rightArr} alt="Right Stats Arrow" className="smaller-icons" />
                                </div>

                            </div>

                        ))}

                    </section>


                    <section className="support-requests">

                        <div className="requests-heading">

                            <h3>My Support Requests</h3>

                            <div className="request-filters">

                                <div className="ticket-search">

                                    <img src={search} alt="Search Icon" className="smaller-icons" />

                                    <input
                                        type="text"
                                        placeholder="Search tickets..."
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                    />

                                </div>


                                <select value={statusFilter} onChange={handleStatusChange}>
                                    <option value="">All Statuses</option>
                                    {STATUS_OPTIONS.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>


                                <select value={categoryFilter} onChange={handleCategoryChange}>
                                    <option value="">All Categories</option>
                                    {CATEGORY_OPTIONS.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>

                            </div>

                        </div>


                        {error && (
                            <p className="ticket-feedback error">
                                {error}
                            </p>
                        )}


                        {!error && isLoading && tickets.length === 0 && (
                            <p className="ticket-feedback">
                                Loading your tickets...
                            </p>
                        )}


                        {!error && !isLoading && tickets.length === 0 && (
                            <p className="ticket-feedback">
                                {hasFilters
                                    ? "No tickets match your filters."
                                    : "You haven't created any support tickets yet."
                                }
                            </p>
                        )}


                        {tickets.length > 0 && (

                            <>

                                <div className="ticket-list">

                                    {tickets.map((ticket) => (

                                        <div className="ticket-card" key={ticket.id}>

                                            <div className="ticket-card-top">

                                                <span className="ticket-id">
                                                    #{ticket.ticket_id}
                                                    {ticket.has_response && (
                                                        <em className="replied-tag">Replied</em>
                                                    )}
                                                </span>

                                                <span className={`ticket-status ${statusClass(ticket.status)}`}>
                                                    {ticket.status_label}
                                                </span>

                                            </div>


                                            <h4>{ticket.subject}</h4>


                                            <div className="ticket-details">

                                                <div>
                                                    <span>Category</span>
                                                    <p>{ticket.category_label}</p>
                                                </div>

                                                <div>
                                                    <span>Tracking ID</span>
                                                    <p>{ticket.tracking_id || "None"}</p>
                                                </div>

                                            </div>


                                            <div className="ticket-card-bottom">

                                                <span>
                                                    Last updated: {formatDate(ticket.updated_at)}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedTicketId(ticket.ticket_id)}
                                                >

                                                    View Details

                                                    <img src={downArr} alt="Down Arrow"  className="smaller-icons"/>

                                                </button>

                                            </div>

                                        </div>

                                    ))}

                                </div>


                                <div className="ticket-table-container">

                                    <table className="ticket-table">

                                        <thead>
                                            <tr>
                                                <th>Ticket ID</th>
                                                <th>Subject</th>
                                                <th>Category</th>
                                                <th>Tracking ID</th>
                                                <th>Date Created</th>
                                                <th>Last Updated</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>


                                        <tbody>

                                            {tickets.map((ticket) => (

                                                <tr key={ticket.id}>

                                                    <td>
                                                        #{ticket.ticket_id}
                                                        {ticket.has_response && (
                                                            <em className="replied-tag">Replied</em>
                                                        )}
                                                    </td>

                                                    <td>{ticket.subject}</td>

                                                    <td>{ticket.category_label}</td>

                                                    <td>{ticket.tracking_id || "None"}</td>

                                                    <td>{formatDate(ticket.created_at)}</td>

                                                    <td>
                                                        {formatDate(ticket.updated_at)}

                                                        <span className="table-time">
                                                            {formatTime(ticket.updated_at)}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        <span className={`ticket-status ${statusClass(ticket.status)}`}>
                                                            {ticket.status_label}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="view-ticket"
                                                            onClick={() => setSelectedTicketId(ticket.ticket_id)}
                                                        >
                                                            View
                                                        </button>
                                                    </td>

                                                </tr>

                                            ))}

                                        </tbody>

                                    </table>

                                </div>

                            </>

                        )}


                        {totalCount > 0 && (

                            <div className="ticket-pagination">

                                <p>
                                    Showing {rangeStart}–{rangeEnd} of {totalCount} requests
                                </p>

                                <div className="pagination-buttons">

                                    <button
                                        type="button"
                                        disabled={page <= 1}
                                        onClick={() => setPage(page - 1)}
                                    >
                                        <span>
                                            ⮜
                                        </span>
                                    </button>

                                    {getPageNumbers().map((number) => (
                                        <button
                                            type="button"
                                            key={number}
                                            className={number === page ? "active" : ""}
                                            onClick={() => setPage(number)}
                                        >
                                            {number}
                                        </button>
                                    ))}

                                    <button
                                        type="button"
                                        disabled={page >= totalPages}
                                        onClick={() => setPage(page + 1)}
                                    >
                                        <span>
                                            ⮞
                                        </span>
                                    </button>

                                </div>

                            </div>

                        )}

                    </section>


                    <section className="support-faq">

                        <div className="faq-heading">

                            <div className="faq-title">

                                <img src={faq} alt="Faq Icon" className="smaller-icons" />

                                <h3>Frequently Asked Questions</h3>

                            </div>


                            <button>

                                View All FAQs

                                <img src={rightArr} alt="Right Arrow" className="smaller-icons" />

                            </button>

                        </div>


                        <div className="faq-list">

                            {faqs.map((faq) => (

                               <details key={faq.id}>

                                    <summary>

                                        {faq.question}

                                        <span className="faq-arrow">⮟</span>

                                    </summary>

                                    <p>{faq.answer}</p>

                                </details>

                            ))}

                        </div>

                    </section>


                </main>


                {showCreate && (

                    <CreateTicketModal
                        onClose={handleCloseCreate}
                        onSave={handleCreateTicket}
                        isSaving={isSaving}
                        serverErrors={formErrors}
                    />

                )}


                {selectedTicketId && (

                    <TicketDetailModal
                        ticketId={selectedTicketId}
                        onClose={() => setSelectedTicketId(null)}
                    />

                )}

            </div>

        </div>

    </>

}


export default Support;
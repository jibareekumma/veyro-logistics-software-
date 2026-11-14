

import Sidebar from "../Sidebar";
import DesktopTopbar from "../DesktopTopbar";
import Header from "../Header";

import "../../stylings/dashboard-stylings/Layout.css";
import "../../stylings/support/Support.scss"


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


const ticketStats = [
    {
        id: 1,
        title: "Total Tickets",
        count: 12,
        icon: plus,
    },
    {
        id: 2,
        title: "Open",
        count: 3,
        icon: opened
    },
    {
        id: 3,
        title: "In Progress",
        icon: spinner,
        count: 4
    },
    {
        id: 4,
        title: "Resolved",
        icon: completed,
        count: 5
    }
];


const supportTickets = [
    {
        id: 1,
        ticketId: "#SV-1001",
        subject: "Delivery delay inquiry",
        category: "Shipments",
        trackingId: "VY-82K4-91AX",
        dateCreated: "Oct 30, 2026",
        lastUpdated: "Oct 31, 2026",
        time: "09:14 AM",
        status: "Open"
    },
    {
        id: 2,
        ticketId: "#SV-1002",
        subject: "Change delivery address",
        category: "Account",
        trackingId: "VY-77A6-49PL",
        dateCreated: "Oct 29, 2026",
        lastUpdated: "Oct 30, 2026",
        time: "04:22 PM",
        status: "In Progress"
    },
    {
        id: 3,
        ticketId: "#SV-1003",
        subject: "Package not updated",
        category: "Tracking",
        trackingId: "VY-33LB-2XMD",
        dateCreated: "Oct 28, 2026",
        lastUpdated: "Oct 29, 2026",
        time: "11:37 AM",
        status: "Resolved"
    },
    {
        id: 4,
        ticketId: "#SV-1004",
        subject: "Request for invoice",
        category: "Billing",
        trackingId: "VY-21QK-8HNV",
        dateCreated: "Oct 27, 2026",
        lastUpdated: "Oct 28, 2026",
        time: "02:19 PM",
        status: "Resolved"
    },
    {
        id: 5,
        ticketId: "#SV-1005",
        subject: "General inquiry",
        category: "General",
        trackingId: "VY-19MN-7KPL",
        dateCreated: "Oct 26, 2026",
        lastUpdated: "Oct 27, 2026",
        time: "10:45 AM",
        status: "Closed"
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

    return <>

        <div className="dashboard-layout container-profile">

            <Sidebar/>

            <div className="dashboard-main container-main">

                <DesktopTopbar/>

                <div className="support-mobile-header">
                    <Header/>
                </div>


                <main className="support-content">


                    {/* SUPPORT HEADING */}

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


                        <button className="create-ticket-btn">

                            <img src={pencil} 
                            alt="Create Icon" className="smaller-icons"/>

                            Create Support Ticket

                        </button>

                    </section>



                    {/* TICKET STATISTICS */}

                    <section className="support-stats">

                        {ticketStats.map((stat) => (

                            <div className="stat-card" key={stat.id}>

                                <div className="stat-icon">
                                    <img src={stat.icon} alt="Stats Icon" className="smaller-icons" />
                                </div>

                                <div className="stat-info">
                                    <h4>{stat.count}</h4>
                                    <p>{stat.title}</p>
                                </div>

                                <div className="stat-arrow">
                                    <img src={rightArr} alt="Right Stats Arrow" className="smaller-icons" />
                                </div>

                            </div>

                        ))}

                    </section>



                    {/* SUPPORT REQUESTS */}

                    <section className="support-requests">

                        <div className="requests-heading">

                            <h3>My Support Requests</h3>

                            <div className="request-filters">

                                <div className="ticket-search">

                                    <img src={search} alt="Search Icon" className="smaller-icons" />

                                    <input
                                        type="text"
                                        placeholder="Search tickets..."
                                    />

                                </div>


                                <select defaultValue="All Statuses">
                                    <option>All Statuses</option>
                                    <option>Open</option>
                                    <option>In Progress</option>
                                    <option>Resolved</option>
                                    <option>Closed</option>
                                </select>


                                <select defaultValue="All Categories">
                                    <option>All Categories</option>
                                    <option>Shipments</option>
                                    <option>Account</option>
                                    <option>Tracking</option>
                                    <option>Billing</option>
                                    <option>General</option>
                                </select>

                            </div>

                        </div>



                        {/* MOBILE AND TABLET TICKET CARDS */}

                        <div className="ticket-list">

                            {supportTickets.map((ticket) => (

                                <div className="ticket-card" key={ticket.id}>

                                    <div className="ticket-card-top">

                                        <span className="ticket-id">
                                            {ticket.ticketId}
                                        </span>

                                        <span className={`ticket-status ${ticket.status.toLowerCase().replace(" ", "-")}`}>
                                            {ticket.status}
                                        </span>

                                    </div>


                                    <h4>{ticket.subject}</h4>


                                    <div className="ticket-details">

                                        <div>
                                            <span>Category</span>
                                            <p>{ticket.category}</p>
                                        </div>

                                        <div>
                                            <span>Tracking ID</span>
                                            <p>{ticket.trackingId}</p>
                                        </div>

                                    </div>


                                    <div className="ticket-card-bottom">

                                        <span>
                                            Last updated: {ticket.lastUpdated}
                                        </span>

                                        <button>

                                            View Details

                                            <img src={downArr} alt="Down Arrow"  className="smaller-icons"/>

                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>



                        {/* DESKTOP TICKET TABLE */}

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

                                    {supportTickets.map((ticket) => (

                                        <tr key={ticket.id}>

                                            <td>{ticket.ticketId}</td>

                                            <td>{ticket.subject}</td>

                                            <td>{ticket.category}</td>

                                            <td>{ticket.trackingId}</td>

                                            <td>{ticket.dateCreated}</td>

                                            <td>
                                                {ticket.lastUpdated}

                                                <span className="table-time">
                                                    {ticket.time}
                                                </span>
                                            </td>

                                            <td>
                                                <span className={`ticket-status ${ticket.status.toLowerCase().replace(" ", "-")}`}>
                                                    {ticket.status}
                                                </span>
                                            </td>

                                            <td>
                                                <button className="view-ticket">
                                                    View
                                                </button>
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>



                        {/* PAGINATION */}

                        <div className="ticket-pagination">

                            <p>Showing 1–5 of 12 requests</p>

                            <div className="pagination-buttons">

                                <button>
                                    <span>
                                        ⮜
                                    </span>
                                </button>

                                <button className="active">1</button>

                                <button>2</button>

                                <button>3</button>

                                <button>
                                    <span>
                                        ⮞
                                    </span>
                                </button>

                            </div>

                        </div>

                    </section>



                    {/* FREQUENTLY ASKED QUESTIONS */}

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

            </div>

        </div>

    </>

}


export default Support;
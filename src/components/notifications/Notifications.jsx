

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../Sidebar";
import DesktopTopbar from "../DesktopTopbar";
import Header from "../Header";

import { useNotifications } from "../../context/NotificationContext";

import "../../stylings/dashboard-stylings/Layout.css";
import "../../stylings/notifications/Notifications.scss";


const KIND_LABELS = {
    shipment_created: "Shipment",
    shipment_update: "Shipment update",
    admin_alert: "Admin",
    payment: "Payment",
    system: "System"
};


const timeAgo = function (value) {

    const seconds = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 1000));

    if (seconds < 60) return "Just now";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;

    return new Date(value).toLocaleDateString();

};


const Notifications = function () {

    const { items, unreadCount, isLoaded, markRead, markAllRead } = useNotifications();

    const [filter, setFilter] = useState("all");

    const navigate = useNavigate();

    const visibleItems = filter === "unread"
        ? items.filter(function (item) { return !item.is_read; })
        : items;

    const handleOpen = function (item) {

        markRead(item.id);

        if (item.tracking_id) {
            navigate(`/tracking/${item.tracking_id}`);
        }

    };


    return (

        <div className="dashboard-layout container-notifications">

            <Sidebar />

            <div className="dashboard-main container-main">

                <DesktopTopbar />

                <div className="notifications-mobile-header">
                    <Header />
                </div>


                <div className="notifications-content">

                    <div className="notifications-heading">

                        <div className="notifications-texts">

                            <h3>Notifications</h3>

                            <p>
                                {unreadCount > 0
                                    ? `You have ${unreadCount} unread ${unreadCount === 1 ? "notification" : "notifications"}.`
                                    : "You're all caught up."}
                            </p>

                        </div>

                        <button
                            type="button"
                            className="mark-all-btn"
                            onClick={markAllRead}
                            disabled={unreadCount === 0}
                        >
                            Mark all as read
                        </button>

                    </div>


                    <div className="notifications-tabs">

                        <button
                            type="button"
                            className={filter === "all" ? "tab active" : "tab"}
                            onClick={function () { setFilter("all"); }}
                        >
                            All
                        </button>

                        <button
                            type="button"
                            className={filter === "unread" ? "tab active" : "tab"}
                            onClick={function () { setFilter("unread"); }}
                        >
                            Unread
                        </button>

                    </div>


                    <div className="notifications-list">

                        {!isLoaded ? (

                            <p className="notifications-status">
                                Loading notifications...
                            </p>

                        ) : visibleItems.length === 0 ? (

                            <p className="notifications-status">
                                {filter === "unread"
                                    ? "No unread notifications."
                                    : "You have no notifications yet."}
                            </p>

                        ) : (

                            visibleItems.map(function (item) {

                                return (

                                    <button
                                        type="button"
                                        key={item.id}
                                        className={item.is_read ? "notification-item" : "notification-item unread"}
                                        onClick={function () { handleOpen(item); }}
                                    >

                                        <span className="item-marker"></span>

                                        <div className="item-body">

                                            <h5>{item.title}</h5>

                                            <p>{item.message}</p>

                                            <span className="item-tracking">
                                                {item.tracking_id || KIND_LABELS[item.kind] || "System"}
                                            </span>

                                        </div>

                                        <span className="item-time">
                                            {timeAgo(item.created_at)}
                                        </span>

                                    </button>

                                );

                            })

                        )}

                    </div>

                </div>

            </div>

        </div>

    );

};


export default Notifications;
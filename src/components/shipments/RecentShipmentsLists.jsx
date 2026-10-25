

import { useState, useEffect } from "react";
import packageImg from "../../assets/photos/package.png";
import search from "../../assets/icons/search-icon.png";
import "../../stylings/shipments/RecentShipmentsPage.scss";

const shipments = [
  { id: 1, trackingId: "VY-82K4-91AX", status: "In Transit", origin: "Miami, FL", destination: "Toronto, CA", date: "Oct 12, 2026", eta: "ETA Oct 16, 2026" },
  { id: 2, trackingId: "VY-77A6-4GPL", status: "Delivered", origin: "Chicago, IL", destination: "New York, NY", date: "Oct 5, 2026", eta: "Delivered Oct 9, 2026" },
  { id: 3, trackingId: "VY-33L8-2XMD", status: "In Transit", origin: "Atlanta, GA", destination: "Miami, FL", date: "Oct 3, 2026", eta: "ETA Oct 8, 2026" },
  { id: 4, trackingId: "VY-16F8-1LNP", status: "Needs Attention", origin: "New York, NY", destination: "Los Angeles, CA", date: "Sep 28, 2026", eta: "ETA Oct 2, 2026" },
  { id: 5, trackingId: "VY-46T3-9B80", status: "Delivered", origin: "Miami, FL", destination: "Atlanta, GA", date: "Sep 20, 2026", eta: "Delivered Sep 24, 2026" },
  { id: 6, trackingId: "VY-19K2-7QPL", status: "In Transit", origin: "Los Angeles, CA", destination: "Dallas, TX", date: "Sep 15, 2026", eta: "ETA Sep 19, 2026" },
  { id: 7, trackingId: "VY-08M4-3ZRT", status: "Delivered", origin: "Seattle, WA", destination: "Chicago, IL", date: "Sep 10, 2026", eta: "Delivered Sep 14, 2026" },
  { id: 8, trackingId: "VY-62N7-8LQW", status: "In Transit", origin: "Houston, TX", destination: "New York, NY", date: "Sep 5, 2026", eta: "ETA Sep 9, 2026" },
  { id: 9, trackingId: "VY-11P9-6KDT", status: "Delivered", origin: "Phoenix, AZ", destination: "Denver, CO", date: "Aug 28, 2026", eta: "Delivered Sep 1, 2026" },
  { id: 10, trackingId: "VY-03J5-7NMQ", status: "Delivered", origin: "San Francisco, CA", destination: "Seattle, WA", date: "Aug 22, 2026", eta: "Delivered Aug 26, 2026" },
  { id: 11, trackingId: "VY-27R1-5HVC", status: "Delivered", origin: "Boston, MA", destination: "Washington, DC", date: "Aug 18, 2026", eta: "Delivered Aug 21, 2026" },
  { id: 12, trackingId: "VY-54D8-0TXZ", status: "Delivered", origin: "Denver, CO", destination: "Chicago, IL", date: "Aug 12, 2026", eta: "Delivered Aug 16, 2026" },
  { id: 13, trackingId: "VY-90W3-2BNF", status: "Delivered", origin: "Dallas, TX", destination: "Houston, TX", date: "Aug 6, 2026", eta: "Delivered Aug 8, 2026" },
  { id: 14, trackingId: "VY-38G6-7YCE", status: "Delivered", origin: "Toronto, CA", destination: "Boston, MA", date: "Jul 30, 2026", eta: "Delivered Aug 3, 2026" },
  { id: 15, trackingId: "VY-72H2-4MKS", status: "Delivered", origin: "Seattle, WA", destination: "Portland, OR", date: "Jul 24, 2026", eta: "Delivered Jul 26, 2026" },
  { id: 16, trackingId: "VY-15B7-9QDA", status: "Delivered", origin: "Portland, OR", destination: "San Francisco, CA", date: "Jul 18, 2026", eta: "Delivered Jul 22, 2026" },
  { id: 17, trackingId: "VY-69C4-1RPU", status: "Delivered", origin: "Washington, DC", destination: "Atlanta, GA", date: "Jul 11, 2026", eta: "Delivered Jul 15, 2026" },
  { id: 18, trackingId: "VY-41S9-6WJH", status: "In Transit", origin: "Orlando, FL", destination: "Miami, FL", date: "Jul 5, 2026", eta: "ETA Jul 8, 2026" },
  { id: 19, trackingId: "VY-86Z5-3LTG", status: "Processing", origin: "Las Vegas, NV", destination: "Phoenix, AZ", date: "Jun 28, 2026", eta: "ETA Jul 2, 2026" },
  { id: 20, trackingId: "VY-24X0-8FEB", status: "Processing", origin: "San Diego, CA", destination: "Los Angeles, CA", date: "Jun 20, 2026", eta: "ETA Jun 23, 2026" },
];

const filters = ["All", "Active", "In Transit", "Delivered"];

const statusOptions = [
  { value: "All", label: "All Statuses" },
  { value: "Active", label: "Active" },
  { value: "In Transit", label: "In Transit" },
  { value: "Delivered", label: "Delivered" },
  { value: "Needs Attention", label: "Needs Attention" },
];

const sortOptions = [
  { value: "newest", label: "Sort by: Newest First" },
  { value: "oldest", label: "Sort by: Oldest First" },
];

const statusClasses = {
  "In Transit": "transit",
  Delivered: "delivered",
  "Needs Attention": "attention",
  Processing: "processing",
};

const getPageSize = function () {
  if (typeof window === "undefined") return 1000;
  if (window.matchMedia("(min-width: 1024px)").matches) return 10;
  if (window.matchMedia("(min-width: 768px)").matches) return 8;
  return 1000;
};

const RecentShipmentsLists = function ({ query = "", onQueryChange = function () {} }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSize);

  useEffect(function () {
    const handleResize = function () {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleResize);

    return function () {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(function () {
    setPage(1);
  }, [query, activeFilter, sortOrder]);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredShipments = shipments
    .filter(function (shipment) {
      if (activeFilter === "All") return true;

      if (activeFilter === "Active") {
        return shipment.status !== "Delivered";
      }

      return shipment.status === activeFilter;
    })
    .filter(function (shipment) {
      if (!normalizedQuery) return true;

      return [
        shipment.trackingId,
        shipment.origin,
        shipment.destination,
        shipment.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
    })
    .sort(function (a, b) {
      const difference = new Date(a.date) - new Date(b.date);
      return sortOrder === "newest" ? -difference : difference;
    });

  const totalPages = Math.max(1, Math.ceil(filteredShipments.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const visibleShipments = filteredShipments.slice(startIndex, startIndex + pageSize);
  const rangeStart = filteredShipments.length === 0 ? 0 : startIndex + 1;
  const rangeEnd = startIndex + visibleShipments.length;
  const pageNumbers = Array.from({ length: totalPages }, function (_, index) {
    return index + 1;
  });

  return (
    <section className="recent-shipments-list">
      <div className="recent-shipments-list__container">

        <div className="recent-shipments-list__filters">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`recent-shipments-list__filter ${
                activeFilter === filter
                  ? "recent-shipments-list__filter--active"
                  : ""
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="recent-shipments-list__toolbar">
          <div className="recent-shipments-list__search">
            <img src={search} alt="Search Icon" />
            <input
              type="text"
              placeholder="Search by tracking ID, destination..."
              value={query}
              onChange={function (event) {
                onQueryChange(event.target.value);
              }}
            />
          </div>

          <select
            className="recent-shipments-list__select"
            value={activeFilter}
            onChange={function (event) {
              setActiveFilter(event.target.value);
            }}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            className="recent-shipments-list__select"
            value={sortOrder}
            onChange={function (event) {
              setSortOrder(event.target.value);
            }}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <h3 className="recent-shipments-list__heading">
          {activeFilter === "All" ? "All Shipments" : `${activeFilter} Shipments`} ({filteredShipments.length})
        </h3>

        <div className="recent-shipments-list__table">

          <div className="recent-shipments-list__head">
            <span>Tracking ID</span>
            <span>Route</span>
            <span>Created</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          <div className="recent-shipments-list__items">
            {visibleShipments.length > 0 ? (
              visibleShipments.map((shipment) => (
                <article
                  className="recent-shipments-list__item"
                  key={shipment.id}
                >
                  <div className="recent-shipments-list__package">
                    <img src={packageImg} alt="Package" />
                  </div>

                  <div className="recent-shipments-list__details">
                    <div className="recent-shipments-list__top">
                      <h3 className="recent-shipments-list__tracking">
                        {shipment.trackingId}
                      </h3>

                      <span
                        className={`recent-shipments-list__status recent-shipments-list__status--${statusClasses[shipment.status]}`}
                      >
                        {shipment.status}
                      </span>
                    </div>

                    <p className="recent-shipments-list__route">
                      <span>{shipment.origin}</span>
                      <span className="recent-shipments-list__arrow">
                        →
                      </span>
                      <span>{shipment.destination}</span>
                    </p>

                    <div className="recent-shipments-list__bottom">
                      <span className="recent-shipments-list__date">
                        {shipment.date}
                      </span>
                      <span className="recent-shipments-list__eta">
                        {shipment.eta}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="recent-shipments-list__action"
                  >
                    <span>View Details</span>
                    <span>→</span>
                  </button>
                </article>
              ))
            ) : (
              <p className="recent-shipments-list__empty">
                No shipments found.
              </p>
            )}
          </div>

          <div className="recent-shipments-list__footer">
            <p>
              Showing {rangeStart}-{rangeEnd} of {filteredShipments.length} shipments
            </p>

            <div className="recent-shipments-list__pages">
              <button
                type="button"
                className="recent-shipments-list__page"
                aria-label="Previous page"
                disabled={currentPage === 1}
                onClick={function () {
                  setPage(currentPage - 1);
                }}
              >
                ‹
              </button>

              {pageNumbers.map((number) => (
                <button
                  key={number}
                  type="button"
                  className={`recent-shipments-list__page ${
                    currentPage === number
                      ? "recent-shipments-list__page--active"
                      : ""
                  }`}
                  onClick={function () {
                    setPage(number);
                  }}
                >
                  {number}
                </button>
              ))}

              <button
                type="button"
                className="recent-shipments-list__page"
                aria-label="Next page"
                disabled={currentPage === totalPages}
                onClick={function () {
                  setPage(currentPage + 1);
                }}
              >
                ›
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default RecentShipmentsLists;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import packageImg from "../../assets/photos/package.png";
import search from "../../assets/icons/search-icon.png";
import { listShipments } from "../../api/shipment.js";
import { getStatusInfo, formatDate, formatPlace, getEtaText } from "../../api/shipmentDisplays.js";
import "../../stylings/shipments/RecentShipmentsPage.scss";

const filters = ["All", "Active", "In Transit", "Delivered"];

const filterKeys = {
  "All": "",
  "Active": "active",
  "In Transit": "in_transit",
  "Delivered": "delivered",
  "Needs Attention": "attention",
};

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

const getPageSize = function () {
  if (typeof window === "undefined") return 10;
  if (window.matchMedia("(min-width: 1024px)").matches) return 10;
  if (window.matchMedia("(min-width: 768px)").matches) return 8;
  return 10;
};

const getPageNumbers = function (current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, function (_, index) {
      return index + 1;
    });
  }

  const pages = [1];
  if (current > 3) pages.push("start-gap");

  const from = Math.max(2, current - 1);
  const to = Math.min(total - 1, current + 1);
  for (let number = from; number <= to; number++) {
    pages.push(number);
  }

  if (current < total - 2) pages.push("end-gap");
  pages.push(total);
  return pages;
};

const RecentShipmentsLists = function ({ query = "", onQueryChange = function () {} }) {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSize);
  const [shipments, setShipments] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
  }, [query]);

  const normalizedQuery = query.trim();

  useEffect(function () {
    let cancelled = false;
    setLoading(true);

    const timer = setTimeout(function () {
      listShipments({
        page: page,
        page_size: pageSize,
        status: filterKeys[activeFilter],
        search: normalizedQuery,
        ordering: sortOrder,
      })
        .then(function (data) {
          if (cancelled) return;
          setShipments(data.results);
          setCount(data.count);
          setError("");
        })
        .catch(function (requestError) {
          if (cancelled) return;
          if (requestError.status === 404 && page > 1) {
            setPage(1);
            return;
          }
          setError("Could not load your shipments. Please try again.");
        })
        .finally(function () {
          if (!cancelled) setLoading(false);
        });
    }, normalizedQuery ? 300 : 0);

    return function () {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [page, pageSize, activeFilter, sortOrder, normalizedQuery]);

  const changeFilter = function (value) {
    setActiveFilter(value);
    setPage(1);
  };

  const changeSort = function (value) {
    setSortOrder(value);
    setPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(count / pageSize));
  const startIndex = (page - 1) * pageSize;
  const rangeStart = count === 0 ? 0 : startIndex + 1;
  const rangeEnd = startIndex + shipments.length;
  const pageNumbers = getPageNumbers(page, totalPages);
  const hasNoFilters = activeFilter === "All" && !normalizedQuery;

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
              onClick={() => changeFilter(filter)}
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
              changeFilter(event.target.value);
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
              changeSort(event.target.value);
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
          {activeFilter === "All" ? "All Shipments" : `${activeFilter} Shipments`} ({count})
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
            {loading && shipments.length === 0 && (
              <p className="recent-shipments-list__empty">
                Loading shipments...
              </p>
            )}

            {!loading && error && (
              <p className="recent-shipments-list__empty">
                {error}
              </p>
            )}

            {!loading && !error && shipments.length === 0 && (
              <p className="recent-shipments-list__empty">
                {hasNoFilters ? "You don't have any shipments yet." : "No shipments found."}
              </p>
            )}

            {!error && shipments.map((shipment) => {
              const info = getStatusInfo(shipment.status);
              return (
                <article
                  className="recent-shipments-list__item"
                  key={shipment.tracking_id}
                >
                  <div className="recent-shipments-list__package">
                    <img src={packageImg} alt="Package" />
                  </div>

                  <div className="recent-shipments-list__details">
                    <div className="recent-shipments-list__top">
                      <h3 className="recent-shipments-list__tracking">
                        {shipment.tracking_id}
                      </h3>

                      <span
                        className={`recent-shipments-list__status recent-shipments-list__status--${info.listClass}`}
                      >
                        {info.label}
                      </span>
                    </div>

                    <p className="recent-shipments-list__route">
                      <span>{formatPlace(shipment.sender_city, shipment.sender_country)}</span>
                      <span className="recent-shipments-list__arrow">
                        →
                      </span>
                      <span>{formatPlace(shipment.receiver_city, shipment.receiver_country)}</span>
                    </p>

                    <div className="recent-shipments-list__bottom">
                      <span className="recent-shipments-list__date">
                        {formatDate(shipment.created_at)}
                      </span>
                      <span className="recent-shipments-list__eta">
                        {getEtaText(shipment)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="recent-shipments-list__action"
                    onClick={function () {
                      navigate(`/tracking/${shipment.tracking_id}`);
                    }}
                  >
                    <span>View Details</span>
                    <span>→</span>
                  </button>
                </article>
              );
            })}
          </div>

          {count > 0 && (
            <div className="recent-shipments-list__footer">
              <p>
                Showing {rangeStart}-{rangeEnd} of {count} shipments
              </p>

              {totalPages > 1 && (
                <div className="recent-shipments-list__pages">
                  <button
                    type="button"
                    className="recent-shipments-list__page"
                    aria-label="Previous page"
                    disabled={page === 1}
                    onClick={function () {
                      setPage(page - 1);
                    }}
                  >
                    ‹
                  </button>

                  {pageNumbers.map((number) => (
                    typeof number === "number" ? (
                      <button
                        key={number}
                        type="button"
                        className={`recent-shipments-list__page ${
                          page === number
                            ? "recent-shipments-list__page--active"
                            : ""
                        }`}
                        onClick={function () {
                          setPage(number);
                        }}
                      >
                        {number}
                      </button>
                    ) : (
                      <span key={number} className="recent-shipments-list__ellipsis">…</span>
                    )
                  ))}

                  <button
                    type="button"
                    className="recent-shipments-list__page"
                    aria-label="Next page"
                    disabled={page === totalPages}
                    onClick={function () {
                      setPage(page + 1);
                    }}
                  >
                    ›
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

export default RecentShipmentsLists;
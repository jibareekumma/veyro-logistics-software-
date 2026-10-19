

import { useState } from "react";
import "../stylings/PackageDetails.css";

const packages = [
  {
    id: 1,
    trackingId: "RX-82K4-91AX",
    name: "Wireless Headphones",
    category: "Electronics",
    quantity: 1,
    weight: "1.2 kg",
    dimensions: "25 × 18 × 12 cm",
    sender: "Miami, USA",
    recipient: "Toronto, Canada",
    date: "Oct 10, 2026",
    status: "In Transit",
  },
];

function PackageDetails() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="package-details">
      {packages.map((item) => (
        <div className="package-details__card" key={item.id}>
          {/* Header */}
          <div className="package-details__header">
            <div className="package-details__heading">
              <div className="package-details__image">
                {/* Replace with your package image */}
                <div className="package-details__image-placeholder" />
              </div>

              <div className="package-details__title">
                <h3>Package Details</h3>
                <p>{item.trackingId}</p>
              </div>
            </div>

            <button
              type="button"
              className={`package-details__toggle ${
                isOpen ? "is-open" : ""
              }`}
              onClick={() => setIsOpen((previous) => !previous)}
              aria-expanded={isOpen}
              aria-label={
                isOpen ? "Close package details" : "Open package details"
              }
            >
              <span className="package-details__arrow" />
            </button>
          </div>

          {/* Expandable content */}
          {isOpen && (
            <div className="package-details__content">
              <div className="package-details__product">
                <div className="package-details__product-image">
                  {/* Replace with the actual product image */}
                  <div className="package-details__image-placeholder" />
                </div>

                <div className="package-details__product-info">
                  <h4>{item.name}</h4>
                  <p>{item.category}</p>
                  <span>Quantity: {item.quantity}</span>
                </div>

                <span className="package-details__status">
                  {item.status}
                </span>
              </div>

              <div className="package-details__divider" />

              <div className="package-details__grid">
                <div className="package-details__field">
                  <span>Tracking ID</span>
                  <p>{item.trackingId}</p>
                </div>

                <div className="package-details__field">
                  <span>Weight</span>
                  <p>{item.weight}</p>
                </div>

                <div className="package-details__field">
                  <span>Dimensions</span>
                  <p>{item.dimensions}</p>
                </div>

                <div className="package-details__field">
                  <span>Shipment Date</span>
                  <p>{item.date}</p>
                </div>
              </div>

              <div className="package-details__divider" />

              <div className="package-details__route">
                <div className="package-details__route-item">
                  <div className="package-details__route-icon">
                    {/* Replace with sender icon */}
                    <div className="package-details__icon-placeholder" />
                  </div>

                  <div>
                    <span>Sender Location</span>
                    <p>{item.sender}</p>
                  </div>
                </div>

                <div className="package-details__route-line" />

                <div className="package-details__route-item">
                  <div className="package-details__route-icon">
                    {/* Replace with destination icon */}
                    <div className="package-details__icon-placeholder" />
                  </div>

                  <div>
                    <span>Recipient Location</span>
                    <p>{item.recipient}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PackageDetails;
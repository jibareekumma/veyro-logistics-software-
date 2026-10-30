

import { useState } from "react";
import "../stylings/PackageDetails.scss";

import { getStatusInfo, formatDate, formatPlace, getCountryCode } from "../api/shipmentDisplays";

import packageImg from "../assets/photos/package2.png"
import packageIcon from "../assets/icons/pacakge-info.png"

const PackageDetails = function({ shipment }) {
  const [isOpen, setIsOpen] = useState(false);

  const pkg = shipment.package;
  const info = getStatusInfo(shipment.status);
  const senderCode = getCountryCode(shipment.origin_country);
  const recipientCode = getCountryCode(shipment.destination_country);

  return (
    <div className="package-details">
      <div className="package-details__card">
        <div className="package-details__header">
          <div className="package-details__heading">
            <div className="package-image-container">
              <img src={packageIcon} alt="" />
            </div>

            <div className="package-details__title">
              <h3>Package Details</h3>
              <p>{shipment.tracking_id}</p>
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

        {isOpen && (
          <div className="package-details__content">
            <div className="package-details__product">
              <div className="product-image-main">
                <img src={packageImg} alt="" />
              </div>

              <div className="package-details__product-info">
                <h4>{pkg.description}</h4>
                <p>{pkg.category}</p>
                <span>Fragile: {pkg.fragile ? "Yes" : "No"}</span>
              </div>

              <span className="package-details__status">
                {info.label}
              </span>
            </div>

            <div className="package-details__divider" />

            <div className="package-details__grid">
              <div className="package-details__field">
                <span>Tracking ID</span>
                <p>{shipment.tracking_id}</p>
              </div>

              <div className="package-details__field">
                <span>Weight</span>
                <p>{Number(pkg.weight)} kg</p>
              </div>

              <div className="package-details__field">
                <span>Dimensions</span>
                <p>{Number(pkg.length)} × {Number(pkg.width)} × {Number(pkg.height)} cm</p>
              </div>

              <div className="package-details__field">
                <span>Shipment Date</span>
                <p>{formatDate(shipment.created_at)}</p>
              </div>
            </div>

            <div className="package-details__divider" />

            <div className="package-details__route">
              <div className="package-details__route-item">
                <div className="sender-flag">
                  {senderCode && <img src={`https://flagcdn.com/w40/${senderCode}.png`} alt="" />}
                </div>

                <div>
                  <span>Sender Location</span>
                  <p>{formatPlace(shipment.origin_city, shipment.origin_country)}</p>
                </div>
              </div>

              <div className="package-details__route-line" />

              <div className="package-details__route-item">
                <div className="recipient-flag">
                  {recipientCode && <img src={`https://flagcdn.com/w40/${recipientCode}.png`} alt="" />}
                </div>

                <div>
                  <span>Recipient Location</span>
                  <p>{formatPlace(shipment.destination_city, shipment.destination_country)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PackageDetails;
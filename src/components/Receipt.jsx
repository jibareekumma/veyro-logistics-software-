
import "../stylings/Receipt.css"

import logo from "../assets/logo-main.png"

import { getStatusInfo, getDeliveryLabel, formatDate, formatDateTime } from "../api/shipmentDisplays.js"

const formatMoney = function(cents){
    return `$${(cents / 100).toFixed(2)}`
}

const Receipt = function({ shipment, receiptRef }){

    const info = getStatusInfo(shipment.status)
    const billing = shipment.billing
    const pkg = shipment.package

    const details = [
        {
            id: 1,
            label: "Route",
            value: `${shipment.origin_city}, ${shipment.origin_country} → ${shipment.destination_city}, ${shipment.destination_country}`
        },
        {
            id: 2,
            label: "Delivery Type",
            value: getDeliveryLabel(shipment.delivery_method)
        },
        {
            id: 3,
            label: "Shipment Date",
            value: formatDate(shipment.created_at)
        },
        {
            id: 4,
            label: "Estimated Delivery",
            value: formatDate(shipment.estimated_delivery)
        }
    ]

    if (pkg) {
        details.push({
            id: 5,
            label: "Package",
            value: pkg.description
        })
        details.push({
            id: 6,
            label: "Weight & Size",
            value: `${pkg.weight} kg • ${pkg.length} x ${pkg.width} x ${pkg.height} cm`
        })
    }

    const charges = billing ? [
        { id: 1, label: "Base Fee", value: formatMoney(billing.base_fee) },
        { id: 2, label: "Fuel Surcharge", value: formatMoney(billing.fuel_surcharge) },
        { id: 3, label: "Insurance", value: formatMoney(billing.insurance) }
    ] : []

    return (
        <div className="receipt-offscreen" aria-hidden="true">

            <div className="receipt" ref={receiptRef}>

                <div className="receipt-top">
                    <div className="logo-container">
                   <img src={logo} alt="Veyro Logo" 
                   className="veyro-logo" />
                   <h3>VEYRO</h3>
                   </div>
                    <p className="receipt-tagline">Global Logistics. Simplified.</p>
                </div>

                <div className="receipt-title-row">
                    <div>
                        <p className="receipt-label">Shipment Receipt</p>
                        <h3 className="receipt-id">{shipment.tracking_id}</h3>
                    </div>
                    <span className="receipt-status">{info.label}</span>
                </div>

                <div className="receipt-section">
                    {details.map(function(item){
                        return (
                            <div className="receipt-row" key={item.id}>
                                <span className="receipt-row-label">{item.label}</span>
                                <span className="receipt-row-value">{item.value}</span>
                            </div>
                        )
                    })}
                </div>

                {billing && (
                    <div className="receipt-section">

                        {charges.map(function(item){
                            return (
                                <div className="receipt-row" key={item.id}>
                                    <span className="receipt-row-label">{item.label}</span>
                                    <span className="receipt-row-value">{item.value}</span>
                                </div>
                            )
                        })}

                        <div className="receipt-total">
                            <span>Total</span>
                            <span>{formatMoney(billing.total_cost)}</span>
                        </div>

                    </div>
                )}

                <div className="receipt-footer">
                    <p>Issued on {formatDateTime(new Date().toISOString())}</p>
                    <p>Track this shipment anytime with the ID above.</p>
                </div>

            </div>

        </div>
    )
}

export default Receipt;
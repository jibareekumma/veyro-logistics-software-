

import "../../stylings/quotings/QuotesSummary.scss";

import routeIcon from "../../assets/icons/route.png"
import packageIcon from "../../assets/icons/pacakge-info.png"
import weight from "../../assets/icons/weight.png"
import methodIcon from "../../assets/icons/intransit.png"

import warningIcon from "../../assets/icons/warning.png"
import lockIcon from "../../assets/icons/lock_icon.png"

const QuotesSummary = function ({ form, price, onGetQuote, summaryRef }) {

    const route = `${form.from.split(",").slice(0, 2).join(",")} → ${form.to.split(",").slice(0, 2).join(",")}`

    const packageText = `${form.packages} package${Number(form.packages) === 1 ? "" : "s"} • ${form.weight} kg • ${form.length} x ${form.width} x ${form.height} cm`

    const items = [
        { id: 1, label: "Route", value: route, icon: routeIcon },
        { id: 2, label: "Delivery Type", value: form.delivery, icon: packageIcon },
        { id: 3, label: "Package Details", value: packageText, icon: weight },
        { id: 4, label: "Method", value: form.method, icon: methodIcon}
    ]

    return (
        <aside
            ref={summaryRef}
            className={`quotes-summary ${price !== null ? "quotes-summary-visible" : ""}`}
        >

            <div className="quotes-summary-top">
                <img className="quotes-summary-icon"
                src={lockIcon}
                />
                <div>
                    <h4>Estimated Quote</h4>
                    <p>Your estimated price will appear here once you submit the details.</p>
                </div>
            </div>

            <ul className="quotes-summary-list">
                {items.map(function(item){
                    return (
                        <li key={item.id}>
                            <img className="quotes-summary-item-icon" 
                            src={item.icon}
                            />
                            <div>
                                <h5>{item.label}</h5>
                                <p>{item.value}</p>
                            </div>
                        </li>
                    )
                })}
            </ul>

            <div className="quotes-summary-price">
                <div className="quotes-summary-price-head">
                    <span>Estimated Price</span>
                    <img className="quotes-summary-info"
                    src={warningIcon}
                    />
                </div>
                <h3>{price !== null ? `$${price.toFixed(2)}` : "$0.00"}</h3>
            </div>

            <p className="quotes-summary-note">
                Final price may vary based on weight, dimensions and other factors.
            </p>

            <button type="button" className="quotes-submit quotes-summary-submit" onClick={onGetQuote}>
                Get Quote →
            </button>

            <div className="quotes-summary-secure">
                <img className="quotes-summary-info"
                src={lockIcon}
                />
                <p>Your information is secure and encrypted.</p>
            </div>

        </aside>
    );
};

export default QuotesSummary;
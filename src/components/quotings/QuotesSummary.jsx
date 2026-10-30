

import "../../stylings/quotings/QuotesSummary.scss";

const QuotesSummary = function ({ form, price, onGetQuote }) {

    const route = `${form.from.split(",").slice(0, 2).join(",")} → ${form.to.split(",").slice(0, 2).join(",")}`

    const packageText = `${form.packages} package${Number(form.packages) === 1 ? "" : "s"} • ${form.weight} kg • ${form.length} x ${form.width} x ${form.height} cm`

    const items = [
        { id: 1, label: "Route", value: route },
        { id: 2, label: "Delivery Type", value: form.delivery },
        { id: 3, label: "Package Details", value: packageText },
        { id: 4, label: "Method", value: form.method }
    ]

    return (
        <aside className="quotes-summary">

            <div className="quotes-summary-top">
                <span className="quotes-summary-icon"></span>
                <div>
                    <h4>Estimated Quote</h4>
                    <p>Your estimated price will appear here once you submit the details.</p>
                </div>
            </div>

            <ul className="quotes-summary-list">
                {items.map(function(item){
                    return (
                        <li key={item.id}>
                            <span className="quotes-summary-item-icon"></span>
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
                    <span className="quotes-summary-info"></span>
                </div>
                <h3>{price !== null ? `$${price.toFixed(2)}` : "$0.00"}</h3>
            </div>

            <p className="quotes-summary-note">
                Final price may vary based on weight, dimensions and other factors.
            </p>

            <button type="button" className="quotes-submit" onClick={onGetQuote}>
                Get Quote →
            </button>

            <div className="quotes-summary-secure">
                <span className="quotes-summary-info"></span>
                <p>Your information is secure and encrypted.</p>
            </div>

        </aside>
    );
};

export default QuotesSummary;
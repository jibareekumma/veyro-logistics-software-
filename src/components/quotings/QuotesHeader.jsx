

import ocean from "../../assets/icons/sea_freight.png"

import air from "../../assets/icons/air_freight.png"

import road from "../../assets/icons/road_freight.png"


import "../../stylings/quotings/QuotesHeader.scss"

const QuotesHeader = function({ active, onSelect }){

    const category = [
        {
            id: 1,
            text: "Ocean Freight",
            sub: "Best for large shipments",
            icon: ocean
        },

        {
            id: 2,
            text: "Air Freight",
            sub: "Fast & reliable",
            icon: air
        },

        {
            id: 3,
            text: "Road Freight",
            sub: "Flexible & cost efficient",
            icon: road
        }
    ]

    return <>

        <div className="quotes-header">

            <div className="quotes-banner">

                <div className="quotes-texts">
                    <h5>GET A QUOTE</h5>
                    <h3>
                        <span className="quotes-title-mobile">
                            Your Shipment, <br />
                            Our Best Quote
                        </span>
                        <span className="quotes-title-wide">Get a Quote</span>
                    </h3>
                    <p>
                        Fill in the details below and get an instant quote for your shipment.
                        <br className="quotes-wide-break" /> No calls, no hassle.
                    </p>
                </div>

                <div className="quotes-banner-image"></div>

            </div>

            <div className="quotes-indicators">
                {category.map((item) => (
                    <button
                        type="button"
                        className={`quotes-indicator ${active === item.id ? "active" : ""}`}
                        key={item.id}
                        onClick={function(){ onSelect(item.id) }}
                    >
                        <img src={item.icon} alt={item.text} />
                        <div className="quotes-indicator-text">
                            <p>{item.text}</p>
                            <span>{item.sub}</span>
                        </div>
                    </button>
                ))}
            </div>

        </div>
    </>
}




export default QuotesHeader;
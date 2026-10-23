

import "../../stylings/shipments/ReviewSummary.css"

const ReviewSummary = function({ form, photoCount, onEdit }){

    const pkg = form.package;

    const partyRows = function(party){
        const rows = [
            ['Name', party.fullName],
            ['Phone', party.phone]
        ];
        if (party.email.trim()) rows.push(['Email', party.email]);
        rows.push(['Address', `${party.address}, ${party.city}, ${party.country}`]);
        return rows;
    };

    const packageRows = [
        ['Item', pkg.description],
        ['Category', pkg.category],
        ['Weight', `${pkg.weight} kg`],
        ['Dimensions', `${pkg.length} × ${pkg.width} × ${pkg.height} cm`],
        ['Fragile', pkg.fragile ? 'Yes' : 'No'],
        ['Photos', photoCount === 0 ? 'None' : `${photoCount} added`]
    ];

    const renderCard = function(title, step, rows){
        return (
            <div className="review-card">
                <div className="review-card-head">
                    <h5>{title}</h5>
                    <button type="button" onClick={function(){ onEdit(step); }}>Edit</button>
                </div>
                <dl>
                    {rows.map(function(row){
                        return (
                            <div className="row" key={row[0]}>
                                <dt>{row[0]}</dt>
                                <dd>{row[1]}</dd>
                            </div>
                        );
                    })}
                </dl>
            </div>
        );
    };

    return <>

        <div className="review-summary">
            {renderCard('Package Details', 1, packageRows)}
            {renderCard('Sender Details', 2, partyRows(form.sender))}
            {renderCard('Receiver Details', 3, partyRows(form.receiver))}
        </div>

    </>
}


export default ReviewSummary;
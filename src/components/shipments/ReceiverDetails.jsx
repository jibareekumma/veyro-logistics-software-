

import PartyDetails from './PartyDetails.jsx'

import "../../stylings/shipments/PartyDetails.scss";

const placeholders = {
    fullName: 'e.g. Jane Smith',
    phone: '+1 (555) 987-6543',
    email: 'e.g. jane@company.com',
    address: 'e.g. 456 Oak Ave',
    city: 'e.g. New York'
};

const ReceiverDetails = function({ data, errors, onChange }){
    return (
        <PartyDetails
            section="receiver"
            title="Receiver Details"
            subtitle="Who is receiving the package?"
            placeholders={placeholders}
            data={data}
            errors={errors}
            onChange={onChange}
        />
    );
}


export default ReceiverDetails;
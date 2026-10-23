

import PartyDetails from "./PartyDetails";

const placeholders = {
    fullName: 'e.g. John Doe',
    phone: '+1 (555) 123-4567',
    email: 'e.g. john@company.com',
    address: 'e.g. 123 Main St',
    city: 'e.g. Miami'
};

const SenderDetails = function({ data, errors, onChange }){
    return (
        <PartyDetails
            section="sender"
            title="Sender Details"
            subtitle="Who is sending the package?"
            placeholders={placeholders}
            data={data}
            errors={errors}
            onChange={onChange}
        />
    );
}


export default SenderDetails;
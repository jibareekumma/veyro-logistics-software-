

import "../../stylings/shipments/AddressPicker.scss";


const CATEGORY_LABELS = {
    home: "Home",
    family: "Family",
    friends: "Friends",
    other: "Other"
};


const AddressPicker = function({ addresses, onPick, label }){

    const handleChange = function(e){
        const item = addresses.find(function(address){
            return String(address.id) === e.target.value;
        });
        if (item) {
            onPick(item);
        }
    };

    if (addresses.length === 0) {
        return null;
    }

    return <>

        <div className="address-picker">
            <label htmlFor={`address-picker-${label}`}>Fill from a saved address</label>
            <select
                id={`address-picker-${label}`}
                value=""
                onChange={handleChange}
            >
                <option value="" disabled>Choose a saved address</option>
                {addresses.map(function(address){
                    return (
                        <option key={address.id} value={address.id}>
                            {`${CATEGORY_LABELS[address.category] || "Other"} - ${address.address_line}, ${address.city}`}
                        </option>
                    );
                })}
            </select>
        </div>

    </>
}


export default AddressPicker;
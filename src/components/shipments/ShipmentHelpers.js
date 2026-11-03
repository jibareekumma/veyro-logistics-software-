

export const categories = [
    'Electronics',
    'Clothing',
    'Documents',
    'Food Items',
    'Office Supplies',
    'Books',
    'Cosmetics',
    'Other'
];

export const countries = [
    'Canada',
    'United States',
    'United Kingdom',
    'Nigeria',
    'Ghana',
    'Kenya',
    'South Africa',
    'Germany',
    'France',
    'United Arab Emirates'
];

export const deliveryOptions = [
    { id: 'standard', name: 'Standard Delivery', days: '5 - 10 days', price: 1250 },
    { id: 'express', name: 'Express Delivery', days: '2 - 4 days', price: 1890 },
    { id: 'priority', name: 'Priority Delivery', days: '1 - 2 days', price: 3200 }
];

export const savedAddresses = {
    sender: { address: '123 Main St', city: 'Miami', country: 'United States' },
    receiver: { address: '456 Oak Ave', city: 'New York', country: 'United States' }
};

export const initialForm = {
    package: {
        description: '',
        category: '',
        weight: '',
        length: '',
        width: '',
        height: '',
        fragile: true
    },
    sender: {
        fullName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        country: '',
        useSaved: false
    },
    receiver: {
        fullName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        country: '',
        useSaved: false
    },
    deliveryMethod: 'standard'
};

export const shipmentToForm = function(shipment){
    return {
        package: {
            description: shipment.description,
            category: shipment.category,
            weight: String(Number(shipment.weight)),
            length: String(Number(shipment.length)),
            width: String(Number(shipment.width)),
            height: String(Number(shipment.height)),
            fragile: shipment.fragile
        },
        sender: {
            fullName: shipment.sender_full_name,
            phone: shipment.sender_phone,
            email: shipment.sender_email || '',
            address: shipment.sender_address,
            city: shipment.sender_city,
            country: shipment.sender_country,
            useSaved: false
        },
        receiver: {
            fullName: shipment.receiver_full_name,
            phone: shipment.receiver_phone,
            email: shipment.receiver_email || '',
            address: shipment.receiver_address,
            city: shipment.receiver_city,
            country: shipment.receiver_country,
            useSaved: false
        },
        deliveryMethod: shipment.delivery_method
    };
};

const isPositiveNumber = function(value){
    const number = Number(value);
    return value !== '' && !isNaN(number) && number > 0;
};

export const validatePackage = function(data){
    const errors = {};
    if (!data.description.trim()) errors.description = 'Please describe the item';
    if (!data.category) errors.category = 'Select a category';
    if (!isPositiveNumber(data.weight)) errors.weight = 'Enter a valid weight';
    const dimensionMessage = 'Enter length, width and height';
    if (!isPositiveNumber(data.length)) errors.length = dimensionMessage;
    if (!isPositiveNumber(data.width)) errors.width = dimensionMessage;
    if (!isPositiveNumber(data.height)) errors.height = dimensionMessage;
    return errors;
};

export const validateParty = function(data){
    const errors = {};
    if (!data.fullName.trim()) errors.fullName = 'Full name is required';
    if (!/^\+?[\d\s()-]{7,}$/.test(data.phone.trim())) errors.phone = 'Enter a valid phone number';
    if (data.email.trim() && !/^\S+@\S+\.\S+$/.test(data.email.trim())) errors.email = 'Enter a valid email';
    if (!data.address.trim()) errors.address = 'Address is required';
    if (!data.city.trim()) errors.city = 'City is required';
    if (!data.country) errors.country = 'Select a country';
    return errors;
};

export const calculatePricing = function(methodId){
    const option = deliveryOptions.find(function(item){ return item.id === methodId; }) || deliveryOptions[0];
    const total = option.price;
    const insurance = 50;
    const fuel = Math.round(total * 0.16);
    const base = total - fuel - insurance;
    return { total, base, fuel, insurance };
};

export const formatPrice = function(cents){
    return '$' + (cents / 100).toFixed(2);
};


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Sidebar from "../Sidebar";
import DesktopTopbar from "../DesktopTopbar";
import Header from "../Header";
import Stepper from "./Stepper";
import PackageDetails from "./PackageDetails";
import SenderDetails from "./SenderDetails";
import ReceiverDetails from "./ReceiverDetails";
import DeliveryMethod from "./DeliveryMethod";
import ReviewSummary from "./ReviewSummary";
import OrderSummary from "./OrderSummary";
import HelpCard from "./HelpCard";
import ShipmentSuccess from "./ShipmentSuccess";
import AddressPicker from "./AddressPicker";
import SaveAddressPrompt from "./SaveAddressPrompt";
import { initialForm, validatePackage, validateParty, calculatePricing, shipmentToForm } from "./ShipmentHelpers.js";
import { createShipment, getShipment, updateShipment, mapServerErrors } from "../../api/shipment.js";
import { API_BASE, authRequest } from "../../api/auth";

import "../../stylings/dashboard-stylings/Layout.css"
import "../../stylings/shipments/CreateShipments.scss"

import leftArr from "../../assets/icons/left-arr.png"


const TOTAL_STEPS = 4;
const stepSections = ['package', 'sender', 'receiver'];
const validators = {
    package: validatePackage,
    sender: validateParty,
    receiver: validateParty
};
const emptyErrors = { package: {}, sender: {}, receiver: {} };
const partyLabels = [
    ['sender', 'Sender address'],
    ['receiver', 'Receiver address']
];


const addressKey = function(address, city, country){
    return [address, city, country].map(function(value){
        return (value || '').trim().toLowerCase();
    }).join('|');
};


const CreateShipments = function(){

    const { trackingId } = useParams();
    const isEditing = Boolean(trackingId);

    const [currentStep, setCurrentStep] = useState(1);
    const [form, setForm] = useState(initialForm);
    const [photos, setPhotos] = useState([]);
    const [errors, setErrors] = useState(emptyErrors);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [createdShipment, setCreatedShipment] = useState(null);
    const [loadingShipment, setLoadingShipment] = useState(Boolean(trackingId));
    const [loadError, setLoadError] = useState('');
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [saveCandidates, setSaveCandidates] = useState(null);

    const pricing = calculatePricing(form.deliveryMethod);

    const loadSavedAddresses = async function(){
        try {
            const data = await authRequest("/", "GET", null, `${API_BASE}/addresses`);
            setSavedAddresses(Array.isArray(data) ? data : []);
        } catch (error) {
            setSavedAddresses([]);
        }
    };

    useEffect(function(){
        loadSavedAddresses();
    }, []);

    useEffect(function(){
        if (!trackingId) {
            return;
        }

        let active = true;
        setLoadingShipment(true);
        setLoadError('');

        getShipment(trackingId)
            .then(function(shipment){
                if (!active) {
                    return;
                }
                if (shipment.status !== 'pending') {
                    setLoadError('This shipment is already being processed and can no longer be edited.');
                    return;
                }
                setForm(shipmentToForm(shipment));
            })
            .catch(function(error){
                if (active) {
                    setLoadError(error.status === 404
                        ? 'We could not find this shipment.'
                        : 'We could not load this shipment right now. Please try again.');
                }
            })
            .finally(function(){
                if (active) {
                    setLoadingShipment(false);
                }
            });

        return function(){
            active = false;
        };
    }, [trackingId]);

    const scrollToTop = function(){
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToFirstError = function(){
        setTimeout(function(){
            const target = document.querySelector('.create-shipment-container .has-error');
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 60);
    };

    const updateSection = function(section, values){
        setForm(function(prev){
            return { ...prev, [section]: { ...prev[section], ...values } };
        });
        setErrors(function(prev){
            const next = { ...prev[section] };
            Object.keys(values).forEach(function(key){ delete next[key]; });
            return { ...prev, [section]: next };
        });
    };

    const handlePickAddress = function(section, item){
        updateSection(section, {
            address: item.address_line,
            city: item.city,
            country: item.country
        });
    };

    const handleSelectMethod = function(id){
        setForm(function(prev){
            return { ...prev, deliveryMethod: id };
        });
    };

    const handleNext = function(){
        const section = stepSections[currentStep - 1];
        const sectionErrors = validators[section](form[section]);
        if (Object.keys(sectionErrors).length > 0) {
            setErrors(function(prev){
                return { ...prev, [section]: sectionErrors };
            });
            scrollToFirstError();
            return;
        }
        setCurrentStep(currentStep + 1);
        scrollToTop();
    };

    const handleBack = function(){
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            scrollToTop();
            return;
        }
        window.history.back();
    };

    const handleStepClick = function(step){
        setCurrentStep(step);
        scrollToTop();
    };

    const goToFirstInvalidStep = function(nextErrors){
        const firstInvalid = stepSections.findIndex(function(section){
            return Object.keys(nextErrors[section]).length > 0;
        });
        if (firstInvalid !== -1 && !window.matchMedia('(min-width: 768px)').matches) {
            setCurrentStep(firstInvalid + 1);
        }
        return firstInvalid;
    };

    const getSaveCandidates = function(){
        const seen = [];
        const candidates = [];

        partyLabels.forEach(function(entry){
            const section = entry[0];
            const party = form[section];
            const key = addressKey(party.address, party.city, party.country);

            const alreadySaved = savedAddresses.some(function(item){
                return addressKey(item.address_line, item.city, item.country) === key;
            });

            if (seen.includes(key) || alreadySaved) {
                return;
            }

            seen.push(key);
            candidates.push({
                section: section,
                label: entry[1],
                text: [party.address, party.city, party.country].filter(Boolean).join(', ')
            });
        });

        return candidates;
    };

    const saveNewAddresses = async function(drafts){
        const results = await Promise.allSettled(drafts.map(function(draft){
            const party = form[draft.section];
            return authRequest(
                "/",
                "POST",
                {
                    category: draft.category,
                    address_line: party.address,
                    city: party.city,
                    state_province: draft.stateProvince,
                    postal_code: draft.postalCode,
                    country: party.country
                },
                `${API_BASE}/addresses`
            );
        }));

        const created = results
            .filter(function(result){ return result.status === 'fulfilled'; })
            .map(function(result){ return result.value; });

        if (created.length > 0) {
            setSavedAddresses(function(prev){
                return [...created, ...prev];
            });
        }
    };

    const submitShipment = async function(addressDrafts){
        setIsSubmitting(true);

        try {
            if (isEditing) {
                await updateShipment(trackingId, form);
                window.location.assign(`/tracking/${trackingId}`);
                return;
            }
            const shipment = await createShipment(form);
            if (addressDrafts.length > 0) {
                await saveNewAddresses(addressDrafts);
            }
            setCreatedShipment(shipment);
            setSubmitted(true);
            scrollToTop();
        } catch (error) {
            const mapped = mapServerErrors(error.data);
            const serverErrors = {
                package: mapped.package,
                sender: mapped.sender,
                receiver: mapped.receiver
            };
            setErrors(serverErrors);
            setSubmitError(mapped.general || (isEditing
                ? 'Could not save the changes. Please check the details and try again.'
                : 'Could not create the shipment. Please check the details and try again.'));
            goToFirstInvalidStep(serverErrors);
            scrollToFirstError();
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmit = async function(){
        if (isSubmitting) return;

        const nextErrors = {
            package: validatePackage(form.package),
            sender: validateParty(form.sender),
            receiver: validateParty(form.receiver)
        };
        if (goToFirstInvalidStep(nextErrors) !== -1) {
            setErrors(nextErrors);
            scrollToFirstError();
            return;
        }

        setErrors(emptyErrors);
        setSubmitError('');

        if (!isEditing) {
            const candidates = getSaveCandidates();
            if (candidates.length > 0) {
                setSaveCandidates(candidates);
                return;
            }
        }

        await submitShipment([]);
    };

    const handleConfirmSave = async function(drafts){
        setSaveCandidates(null);
        await submitShipment(drafts);
    };

    const handleReset = function(){
        photos.forEach(function(photo){ URL.revokeObjectURL(photo.id); });
        setPhotos([]);
        setForm(initialForm);
        setErrors(emptyErrors);
        setCurrentStep(1);
        setCreatedShipment(null);
        setSubmitError('');
        setSubmitted(false);
        scrollToTop();
    };

    const panelClass = function(step){
        return currentStep === step ? 'step-panel is-current' : 'step-panel';
    };

    const isReview = currentStep === TOTAL_STEPS;

    const idleLabel = isEditing ? 'Save Changes →' : 'Send Shipment →';
    const busyLabel = isEditing ? 'Saving...' : 'Sending...';

    return <>

        <div className="dashboard-layout create-shipment-container">

            <Sidebar/>

            <div className="dashboard-main container-main">
                <DesktopTopbar/>

                <div className="shipment-mobile-header">
                    <Header/>
                </div>

                <div className="shipment-content">

                    {submitted && createdShipment ? (
                        <ShipmentSuccess shipment={createdShipment} onReset={handleReset}/>
                    ) : loadingShipment ? (
                        <p>Loading shipment...</p>
                    ) : loadError ? (
                        <div className="submit-error" role="alert">
                            <p>{loadError}</p>
                            <button type="button" className="back-action" onClick={function(){ window.history.back(); }}>
                                Go Back
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="create-shipment-heading">
                                <div className="texts">
                                    <button type="button" className="back-btn" onClick={handleBack}>
                                        <img src={leftArr} alt="Back Arrow" />
                                        <span>Back</span>
                                    </button>
                                    <h4>{isEditing ? 'Edit Shipment' : 'Create Shipment'}</h4>
                                </div>
                                <p className="subtitle">
                                    {isEditing
                                        ? `Update the details of shipment ${trackingId}. Changes are only allowed while it is still processing.`
                                        : 'Fill in the details below to create a new shipment. You can track it anytime from your dashboard.'}
                                </p>
                            </div>

                            <Stepper currentStep={currentStep} onStepClick={handleStepClick}/>

                            {submitError && <div className="submit-error" role="alert">{submitError}</div>}

                            <div className="shipment-layout">

                                <div className="shipment-main">
                                    <div className={panelClass(1)}>
                                        <PackageDetails
                                            data={form.package}
                                            errors={errors.package}
                                            onChange={function(values){ updateSection('package', values); }}
                                            photos={photos}
                                            setPhotos={setPhotos}
                                        />
                                    </div>

                                    <div className={panelClass(2)}>
                                        <AddressPicker
                                            label="sender"
                                            addresses={savedAddresses}
                                            onPick={function(item){ handlePickAddress('sender', item); }}
                                        />
                                        <SenderDetails
                                            data={form.sender}
                                            errors={errors.sender}
                                            onChange={function(values){ updateSection('sender', values); }}
                                        />
                                    </div>

                                    <div className={panelClass(3)}>
                                        <AddressPicker
                                            label="receiver"
                                            addresses={savedAddresses}
                                            onPick={function(item){ handlePickAddress('receiver', item); }}
                                        />
                                        <ReceiverDetails
                                            data={form.receiver}
                                            errors={errors.receiver}
                                            onChange={function(values){ updateSection('receiver', values); }}
                                        />
                                    </div>

                                    <div className={`review-panel ${isReview ? 'is-current' : ''}`}>
                                        <ReviewSummary form={form} photoCount={photos.length} onEdit={handleStepClick}/>
                                    </div>

                                    <div className={panelClass(4)}>
                                        <DeliveryMethod
                                            selected={form.deliveryMethod}
                                            onSelect={handleSelectMethod}
                                            pricing={pricing}
                                        />
                                    </div>
                                </div>

                                <aside className={`shipment-aside ${isReview ? 'is-current' : ''}`}>
                                    <OrderSummary
                                        pricing={pricing}
                                        onSubmit={handleSubmit}
                                        isSubmitting={isSubmitting}
                                        isEditing={isEditing}
                                    />
                                    <HelpCard/>
                                </aside>

                                <div className="shipment-actions">
                                    {currentStep > 1 && (
                                        <button type="button" className="back-action" onClick={handleBack}>
                                            Back
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        className="next-action"
                                        onClick={isReview ? handleSubmit : handleNext}
                                        disabled={isSubmitting}
                                    >
                                        {isReview ? (isSubmitting ? busyLabel : idleLabel) : 'Next →'}
                                    </button>
                                    <button type="button" className="submit-action" onClick={handleSubmit} disabled={isSubmitting}>
                                        {isSubmitting ? busyLabel : idleLabel}
                                    </button>
                                </div>

                            </div>
                        </>
                    )}

                </div>

            </div>

        </div>

        {saveCandidates && (
            <SaveAddressPrompt
                candidates={saveCandidates}
                onConfirm={handleConfirmSave}
                onClose={function(){ setSaveCandidates(null); }}
            />
        )}

    </>
}



export default CreateShipments;


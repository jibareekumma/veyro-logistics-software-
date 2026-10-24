import { useState } from "react";

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
import { initialForm, validatePackage, validateParty, calculatePricing } from "./ShipmentHelpers.js";
import { createShipment, mapServerErrors } from "../../api/shipment.js";

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


const CreateShipments = function(){

    const [currentStep, setCurrentStep] = useState(1);
    const [form, setForm] = useState(initialForm);
    const [photos, setPhotos] = useState([]);
    const [errors, setErrors] = useState(emptyErrors);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [createdShipment, setCreatedShipment] = useState(null);

    const pricing = calculatePricing(form.deliveryMethod);

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
        setIsSubmitting(true);

        try {
            const shipment = await createShipment(form);
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
            setSubmitError(mapped.general || 'Could not create the shipment. Please check the details and try again.');
            goToFirstInvalidStep(serverErrors);
            scrollToFirstError();
        } finally {
            setIsSubmitting(false);
        }
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
                    ) : (
                        <>
                            <div className="create-shipment-heading">
                                <div className="texts">
                                    <button type="button" className="back-btn" onClick={handleBack}>
                                        <img src={leftArr} alt="Back Arrow" />
                                        <span>Back</span>
                                    </button>
                                    <h4>Create Shipment</h4>
                                </div>
                                <p className="subtitle">
                                    Fill in the details below to create a new shipment. You can track it anytime from your dashboard.
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
                                        <SenderDetails
                                            data={form.sender}
                                            errors={errors.sender}
                                            onChange={function(values){ updateSection('sender', values); }}
                                        />
                                    </div>

                                    <div className={panelClass(3)}>
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
                                    <OrderSummary pricing={pricing} onSubmit={handleSubmit} isSubmitting={isSubmitting}/>
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
                                        {isReview ? (isSubmitting ? 'Sending...' : 'Send Shipment →') : 'Next →'}
                                    </button>
                                    <button type="button" className="submit-action" onClick={handleSubmit} disabled={isSubmitting}>
                                        {isSubmitting ? 'Sending...' : 'Send Shipment →'}
                                    </button>
                                </div>

                            </div>
                        </>
                    )}

                </div>

            </div>

        </div>


    </>
}



export default CreateShipments;


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

import "../../stylings/shipments/CreateShipments.css"

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

    const handleSubmit = function(){
        const nextErrors = {
            package: validatePackage(form.package),
            sender: validateParty(form.sender),
            receiver: validateParty(form.receiver)
        };
        const firstInvalid = stepSections.findIndex(function(section){
            return Object.keys(nextErrors[section]).length > 0;
        });
        if (firstInvalid !== -1) {
            setErrors(nextErrors);
            if (!window.matchMedia('(min-width: 768px)').matches) {
                setCurrentStep(firstInvalid + 1);
            }
            scrollToFirstError();
            return;
        }
        setErrors(emptyErrors);
        setSubmitted(true);
        scrollToTop();
    };

    const handleReset = function(){
        photos.forEach(function(photo){ URL.revokeObjectURL(photo.id); });
        setPhotos([]);
        setForm(initialForm);
        setErrors(emptyErrors);
        setCurrentStep(1);
        setSubmitted(false);
        scrollToTop();
    };

    const panelClass = function(step){
        return currentStep === step ? 'step-panel is-current' : 'step-panel';
    };

    const isReview = currentStep === TOTAL_STEPS;

    return <>

        <div className="create-shipment-container">

            <Sidebar/>

            <div className="container-main">
                <DesktopTopbar/>

                <div className="shipment-mobile-header">
                    <Header/>
                </div>

                <div className="shipment-content">

                    {submitted ? (
                        <ShipmentSuccess form={form} pricing={pricing} onReset={handleReset}/>
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
                                    <OrderSummary pricing={pricing} onSubmit={handleSubmit}/>
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
                                    >
                                        {isReview ? 'Send Shipment →' : 'Next →'}
                                    </button>
                                    <button type="button" className="submit-action" onClick={handleSubmit}>
                                        Send Shipment →
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
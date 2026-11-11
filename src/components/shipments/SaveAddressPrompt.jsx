

import { useState } from "react";

import "../../stylings/shipments/SaveAddressPrompt.scss";


const CATEGORY_OPTIONS = [
    { value: "home", label: "Home" },
    { value: "family", label: "Family" },
    { value: "friends", label: "Friends" },
    { value: "other", label: "Other" }
];


const SaveAddressPrompt = function({ candidates, onConfirm, onClose }){

    const [drafts, setDrafts] = useState(function(){
        return candidates.map(function(candidate){
            return {
                section: candidate.section,
                label: candidate.label,
                text: candidate.text,
                save: true,
                category: candidate.section === 'sender' ? 'home' : 'other',
                stateProvince: '',
                postalCode: ''
            };
        });
    });

    const updateDraft = function(index, values){
        setDrafts(function(prev){
            return prev.map(function(draft, i){
                return i === index ? { ...draft, ...values } : draft;
            });
        });
    };

    const selected = drafts.filter(function(draft){ return draft.save; });

    const incomplete = selected.some(function(draft){
        return !draft.stateProvince.trim() || !draft.postalCode.trim();
    });

    const handleConfirm = function(){
        if (incomplete) return;
        onConfirm(selected.map(function(draft){
            return {
                section: draft.section,
                category: draft.category,
                stateProvince: draft.stateProvince.trim(),
                postalCode: draft.postalCode.trim()
            };
        }));
    };

    const handleSkip = function(){
        onConfirm([]);
    };

    return <>

        <div className="address-prompt-overlay" onClick={onClose}>

            <div
                className="address-prompt-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="address-prompt-title"
                onClick={function(e){ e.stopPropagation(); }}
            >

                <div className="address-prompt-header">
                    <div className="address-prompt-heading">
                        <h3 id="address-prompt-title">Save to your addresses?</h3>
                        <p>Keep these on your profile so you can reuse them on future shipments.</p>
                    </div>
                    <button
                        type="button"
                        className="address-prompt-close"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>

                <div className="address-prompt-list">
                    {drafts.map(function(draft, index){
                        return (
                            <div key={draft.section} className="address-prompt-card">

                                <label className="address-prompt-check">
                                    <input
                                        type="checkbox"
                                        checked={draft.save}
                                        onChange={function(e){ updateDraft(index, { save: e.target.checked }); }}
                                    />
                                    <span className="address-prompt-text">
                                        <strong>{draft.label}</strong>
                                        <small>{draft.text}</small>
                                    </span>
                                </label>

                                {draft.save && (
                                    <div className="address-prompt-fields">

                                        <div className="address-prompt-group">
                                            <label htmlFor={`prompt-category-${draft.section}`}>Category</label>
                                            <select
                                                id={`prompt-category-${draft.section}`}
                                                value={draft.category}
                                                onChange={function(e){ updateDraft(index, { category: e.target.value }); }}
                                            >
                                                {CATEGORY_OPTIONS.map(function(option){
                                                    return <option key={option.value} value={option.value}>{option.label}</option>;
                                                })}
                                            </select>
                                        </div>

                                        <div className="address-prompt-row">
                                            <div className="address-prompt-group">
                                                <label htmlFor={`prompt-state-${draft.section}`}>State / Province</label>
                                                <input
                                                    id={`prompt-state-${draft.section}`}
                                                    type="text"
                                                    placeholder="e.g. Rivers State"
                                                    value={draft.stateProvince}
                                                    onChange={function(e){ updateDraft(index, { stateProvince: e.target.value }); }}
                                                />
                                            </div>

                                            <div className="address-prompt-group">
                                                <label htmlFor={`prompt-postal-${draft.section}`}>Postal Code</label>
                                                <input
                                                    id={`prompt-postal-${draft.section}`}
                                                    type="text"
                                                    placeholder="e.g. 500101"
                                                    value={draft.postalCode}
                                                    onChange={function(e){ updateDraft(index, { postalCode: e.target.value }); }}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                )}

                            </div>
                        );
                    })}
                </div>

                {incomplete && (
                    <p className="address-prompt-hint">
                        Enter a state and postal code for each address you want to save.
                    </p>
                )}

                <div className="address-prompt-actions">
                    <button type="button" className="address-prompt-skip" onClick={handleSkip}>
                        Not now
                    </button>
                    <button
                        type="button"
                        className="address-prompt-confirm"
                        onClick={handleConfirm}
                        disabled={incomplete}
                    >
                        {selected.length > 0 ? 'Save & Send' : 'Send Shipment'}
                    </button>
                </div>

            </div>

        </div>

    </>
}


export default SaveAddressPrompt;
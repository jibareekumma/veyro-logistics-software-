

import { useState } from "react"

import "../../stylings/quotings/QuotesAction.scss";
import shipmentIcon from "../../assets/icons/pacakge-info.png"
import locationIcon from "../../assets/icons/nav-addresses.png"

const QuotesAction = function ({ form, updateForm, onGetQuote }) {

    const [photos, setPhotos] = useState([])

    const step = function(field, delta, min, decimals){
        const next = Math.max(min, Number((Number(form[field]) + delta).toFixed(decimals)))
        updateForm(field, next)
    }

    const addFiles = function(fileList){
        const valid = Array.from(fileList)
            .filter(function(file){
                return ["image/jpeg", "image/png"].includes(file.type) && file.size <= 5 * 1024 * 1024
            })
            .map(function(file, index){
                return {
                    id: `${file.name}-${file.lastModified}-${index}`,
                    url: URL.createObjectURL(file)
                }
            })

        setPhotos(function(prev){
            return [...prev, ...valid]
        })
    }

    const handleDrop = function(e){
        e.preventDefault()
        addFiles(e.dataTransfer.files)
    }

    const handleFileChange = function(e){
        addFiles(e.target.files)
        e.target.value = ""
    }

    return (
        <div className="quotes-action">

            <div className="quotes-shipment-details">

                <h3 className="quotes-section-title">
                    <img 
                    className = "quotes-icon"
                    src={shipmentIcon} alt="shipment details icon" width={20} height={20}/>
                    Shipment Details
                </h3>

                <div className="quotes-row">

                    <div className="quotes-form-group">
                        <label htmlFor="quotes-from">From</label>
                        <div className="quotes-input-wrap">
                            <img 
                    className = "quotes-icon"
                    src={locationIcon} alt="shipment details icon" width={20} height={20}/>
                            <select
                                id="quotes-from"
                                className="quotes-input"
                                value={form.from}
                                onChange={function(e){ updateForm("from", e.target.value) }}
                            >
                                <option>Miami, FL, USA</option>
                                <option>Toronto, ON, Canada</option>
                            </select>
                        </div>
                    </div>

                    <div className="quotes-form-group">
                        <label htmlFor="quotes-to">To</label>
                        <div className="quotes-input-wrap">
                            <img 
                    className = "quotes-icon"
                    src={locationIcon} alt="shipment details icon" width={20} height={20}/>
                            <select
                                id="quotes-to"
                                className="quotes-input"
                                value={form.to}
                                onChange={function(e){ updateForm("to", e.target.value) }}
                            >
                                <option>Toronto, ON, Canada</option>
                                <option>Miami, FL, USA</option>
                            </select>
                        </div>
                    </div>

                </div>

                <div className="quotes-row">

                    <div className="quotes-form-group">
                        <label htmlFor="quotes-delivery">Delivery Type</label>
                        <select
                            id="quotes-delivery"
                            className="quotes-input"
                            value={form.delivery}
                            onChange={function(e){ updateForm("delivery", e.target.value) }}
                        >
                            <option>Standard Delivery (5–10 days)</option>
                            <option>Express Delivery (2–4 days)</option>
                        </select>
                    </div>

                    <div className="quotes-form-group quotes-hide-mobile">
                        <label htmlFor="quotes-method">Delivery Method</label>
                        <select
                            id="quotes-method"
                            className="quotes-input"
                            value={form.method}
                            onChange={function(e){ updateForm("method", e.target.value) }}
                        >
                            <option>FCL (Full Container Load)</option>
                            <option>LCL (Less than Container Load)</option>
                        </select>
                    </div>

                </div>

            </div>

            <div className="quotes-package-details">

                <h3 className="quotes-section-title">
                    Package Details
                </h3>

                <div className="quotes-package-grid">

                    <div className="quotes-form-group">
                        <label htmlFor="quotes-packages">
                            Number of Packages
                        </label>

                        <div className="quotes-counter">
                            <input
                                type="number"
                                id="quotes-packages"
                                min="1"
                                value={form.packages}
                                onChange={function(e){ updateForm("packages", e.target.value) }}
                            />

                            <button
                                type="button"
                                aria-label="Decrease packages"
                                onClick={function(){ step("packages", -1, 1, 0) }}
                            >
                                −
                            </button>

                            <button
                                type="button"
                                aria-label="Increase packages"
                                onClick={function(){ step("packages", 1, 1, 0) }}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="quotes-form-group">
                        <label htmlFor="quotes-weight">
                            Total Weight (kg)
                        </label>

                        <div className="quotes-counter">
                            <input
                                type="number"
                                id="quotes-weight"
                                min="0.1"
                                step="0.1"
                                value={form.weight}
                                onChange={function(e){ updateForm("weight", e.target.value) }}
                            />

                            <button
                                type="button"
                                aria-label="Decrease weight"
                                onClick={function(){ step("weight", -0.1, 0.1, 1) }}
                            >
                                −
                            </button>

                            <button
                                type="button"
                                aria-label="Increase weight"
                                onClick={function(){ step("weight", 0.1, 0.1, 1) }}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="quotes-form-group quotes-hide-mobile">
                        <label>
                            Dimensions (cm) <span className="quotes-optional">(per package)</span>
                        </label>

                        <div className="quotes-dimensions">
                            <div className="quotes-dimension">
                                <span>L</span>
                                <input
                                    type="number"
                                    min="1"
                                    aria-label="Length in centimetres"
                                    value={form.length}
                                    onChange={function(e){ updateForm("length", e.target.value) }}
                                />
                            </div>
                            <div className="quotes-dimension">
                                <span>W</span>
                                <input
                                    type="number"
                                    min="1"
                                    aria-label="Width in centimetres"
                                    value={form.width}
                                    onChange={function(e){ updateForm("width", e.target.value) }}
                                />
                            </div>
                            <div className="quotes-dimension">
                                <span>H</span>
                                <input
                                    type="number"
                                    min="1"
                                    aria-label="Height in centimetres"
                                    value={form.height}
                                    onChange={function(e){ updateForm("height", e.target.value) }}
                                />
                            </div>
                        </div>
                    </div>

                </div>

                <div className="quotes-form-group quotes-hide-mobile">
                    <label htmlFor="quotes-details">
                        Additional Details <span className="quotes-optional">(Optional)</span>
                    </label>
                    <textarea
                        id="quotes-details"
                        maxLength={500}
                        placeholder="e.g. Special handling, fragile, temperature control..."
                        value={form.details}
                        onChange={function(e){ updateForm("details", e.target.value) }}
                    ></textarea>
                    <span className="quotes-char-count">{form.details.length}/500</span>
                </div>

                <div className="quotes-form-group quotes-hide-mobile">
                    <label>
                        Upload Package Photos <span className="quotes-optional">(Optional)</span>
                    </label>

                    <input
                        type="file"
                        id="quotes-photos"
                        className="quotes-file-input"
                        accept="image/png, image/jpeg"
                        multiple
                        onChange={handleFileChange}
                    />

                    <div className="quotes-upload">

                        <label
                            htmlFor="quotes-photos"
                            className="quotes-dropzone"
                            onDragOver={function(e){ e.preventDefault() }}
                            onDrop={handleDrop}
                        >
                            <span className="quotes-icon-placeholder"></span>
                            <p>Click to upload or drag and drop</p>
                            <small>JPG, PNG (Max 5MB each)</small>
                        </label>

                        <div className="quotes-thumbs">
                            {photos.map(function(photo){
                                return <img key={photo.id} src={photo.url} alt="Package preview" />
                            })}

                            <label htmlFor="quotes-photos" className="quotes-add-photo" aria-label="Add photo">
                                +
                            </label>
                        </div>

                    </div>
                </div>

            </div>


            <button type="button" className="quotes-submit" onClick={onGetQuote}>
                Get Quote →
            </button>

        </div>
    );
};

export default QuotesAction;
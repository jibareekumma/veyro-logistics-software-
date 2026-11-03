

import { useState, useRef, useEffect } from "react"

import Header from "../Header"
import Sidebar from "../Sidebar";

import QuotesHeader from "./QuotesHeader";
import QuotesAction from "./QuotesAction";
import QuotesSummary from "./QuotesSummary";

import { requestQuote } from "../../api/shipment.js"

import "../../stylings/quotings/QuotesPage.scss"


const readError = function(error){
    const data = error && error.data
    if (data && typeof data === "object") {
        if (data.detail) return data.detail
        const first = Object.values(data)[0]
        const message = Array.isArray(first) ? first[0] : first
        if (typeof message === "string") return message
    }
    if (error && typeof error.message === "string" && error.message) return error.message
    return "Could not get a quote. Please try again."
}


const Quotes = function(){

    const [form, setForm] = useState({
        category: 1,
        from: "Miami, FL, USA",
        to: "Toronto, ON, Canada",
        delivery: "Standard Delivery (5–10 days)",
        method: "FCL (Full Container Load)",
        packages: 1,
        weight: 2.8,
        length: 35,
        width: 25,
        height: 10,
        details: ""
    })

    const [price, setPrice] = useState(null)
    const [quoteId, setQuoteId] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const summaryRef = useRef(null)

    const updateForm = function(field, value){
        setForm(function(prev){
            return { ...prev, [field]: value }
        })
    }

    const getQuote = async function(){
        if (loading) return

        setLoading(true)
        setError("")

        try {
            const data = await requestQuote(form)
            setPrice(data.total_cost / 100)
            setQuoteId(function(prev){
                return prev + 1
            })
        } catch (err) {
            setError(readError(err))
        } finally {
            setLoading(false)
        }
    }

    useEffect(function(){
        if (quoteId > 0 && window.innerWidth < 1024 && summaryRef.current) {
            summaryRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
        }
    }, [quoteId])

    return <>

    <div className="quotes-main-page">

        <aside className="quotes-page-sidebar">
            <Sidebar/>
        </aside>

        <div className="quotes-content">

            <Header/>

            <QuotesHeader
                active={form.category}
                onSelect={function(id){ updateForm("category", id) }}
            />

            {error && (
                <p style={{ margin: "0 1rem 1rem", color: "#c2410c", fontSize: "0.9rem" }}>
                    {error}
                </p>
            )}

            {loading && (
                <p style={{ margin: "0 1rem 1rem", color: "#64849c", fontSize: "0.9rem" }}>
                    Calculating your quote...
                </p>
            )}

            <div className="quotes-body">

                <QuotesAction
                    form={form}
                    updateForm={updateForm}
                    onGetQuote={getQuote}
                />

                <QuotesSummary
                    form={form}
                    price={price}
                    onGetQuote={getQuote}
                    summaryRef={summaryRef}
                />

            </div>

        </div>

    </div>
    </>
}


export default Quotes;
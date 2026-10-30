

import { useState } from "react"

import Header from "../Header"
import Sidebar from "../Sidebar";

import QuotesHeader from "./QuotesHeader";
import QuotesAction from "./QuotesAction";
import QuotesSummary from "./QuotesSummary";

import "../../stylings/quotings/QuotesPage.scss"


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

    const updateForm = function(field, value){
        setForm(function(prev){
            return { ...prev, [field]: value }
        })
    }

    const getQuote = function(){
        setPrice(320)
    }

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
                />

            </div>

        </div>

    </div>
    </>
}


export default Quotes;


import { useState } from "react";

import RecentShipmentsHeader from "./RecentShipmentsHeader";

import CustomerStats from "../CustomerStats"

import RecentShipmentsLists from "./RecentShipmentsLists";

import Header from "../Header";

import Sidebar from "../Sidebar";

import "../../stylings/shipments/RecentShipmentsPage.scss"

import leftArr from "../../assets/icons/leftArr.png"
import { useNavigate } from "react-router-dom";

const RecentShipmentsPage = function(){

    const [query, setQuery] = useState("");
    const navigte = useNavigate();


    return <>


    <div className="recent-shipments-page">

        <aside className="recent-shipments-page__sidebar">
            <Sidebar/>
        </aside>

        <div className="recent-shipments-page__main">

            <Header/>

            <div className="recent-shipments-page__content">

                <div className="back"
                onClick = {() => navigte(-1)}
                >
                    <img src={leftArr} alt="Left Arrow" />
                    <p>back</p>
                </div>

                <RecentShipmentsHeader query={query} onQueryChange={setQuery}/>
                <CustomerStats/>

                <RecentShipmentsLists query={query} onQueryChange={setQuery}/>

            </div>
        </div>
    </div>
    </>
}


export default RecentShipmentsPage;
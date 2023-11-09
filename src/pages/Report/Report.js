import React, { useEffect, useState } from "react";
import "../home.css";
import { useLoadContext } from "../../components/context/DataLoadContext";
import CompanyReport from "./CompanyReport"
import CompanyChart from './CompanyChart'
import CargoReport from "./CargoReport"
import CargoChart from "./CargoChart";
import TotalRevenue from "./TotalRevenue";

const Report = () => {
  const { error, setRefresh } = useLoadContext();
  return (

    <div className="main-bar">
      <div className="main-bar-wrapper">
            <div className='reportWrapper'>
                    <TotalRevenue />
            </div>
  
            <div className='reportWrapper' >
                  <h2>Total Report / Company </h2>
                  <hr className="hr" />
                  {error ? (
                    <>
                      <p
                        style={{
                          textAlign: "center",
                          fontSize: "25px",
                          marginTop: "50px",
                          color: "red",
                        }}
                      >
                        {error}
                      </p>
                      <button
                        className="btn w-300 center"
                        onClick={() => setRefresh(true)}
                      >
                        Refresh Page
                      </button>
                    </>
                  ) : (
                    <div className="chart-container" >
                        <CompanyReport />
                        <CompanyChart />
                      </div>
                  )
                  }
              </div>
       {/* *************************Reports PAGE *************** */}
       
              <div className='reportWrapper' >
                <h2>Total Report / Cargo</h2>
                <hr className="hr" />
                {error ? (
                  <>
                    <p
                      style={{
                        textAlign: "center",
                        fontSize: "25px",
                        marginTop: "50px",
                        color: "red",
                      }}
                    >
                      {error}
                    </p>
                    <button
                      className="btn w-300 center"
                      onClick={() => setRefresh(true)}
                    >
                      Refresh Page
                    </button>
                  </>
                ) : (
                 
                  <div className="chart-container" >
                      <CargoReport />
                  <CargoChart />
                  </div>
                )}
                </div>
      </div>
          
   </div>
   
  );
}

export default Report;

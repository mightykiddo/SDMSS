import React from "react";
import { useEffect, useState } from "react";

function GenerateReport() {
  const [show, setShow] = useState("Weekly")
  const [sales ,setSales] = useState();

  const apiUrl_tx = process.env.REACT_APP_API_URL_TX;

  useEffect(() => { //load data on page load 
    fetch(`${apiUrl_tx}/transaction`)
    .then(response => response.json())
    .then(data => {
         setSales(data);
    })
    .catch(error => console.error(error));
  }, []);

  const GenerateReport = (type) => {
    if (type === "weekly"){
    //weekly sales
    const today = new Date();
    const oneWeekAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  
    fetch(`${apiUrl_tx}/transaction`)
    .then((response) => response.json())
    .then((data) => {
      const filteredSales = data.filter((sale) => {
        const saleDateStr = sale.date;
        const [day, month, year] = saleDateStr.split("/");
        const saleDate = new Date(year, month - 1, day);
        return saleDate >= oneWeekAgo && saleDate <= today;
      });

      setSales(filteredSales);
      setShow("weekly")
    })
    .catch((error) => console.error(error));
  }

  else if (type == "monthly") { //monthly
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);

    fetch(`${apiUrl_tx}/transaction`)
    .then((response) => response.json())
    .then((data) => {
      const filteredSales = data.filter((sale) => {
        const saleDateStr = sale.date;
        const [day, month, year] = saleDateStr.split("/");
        const saleDate = new Date(year, month - 1, day);
        return saleDate >= thirtyDaysAgo && saleDate <= today;
      });
      console.log(filteredSales)
      setSales(filteredSales);
      setShow("monthly")
    })
    .catch((error) => console.error(error));

    }
  //need transaction 
  console.log(sales)
  }
  return (
     <>
     <div className="text-white d-flex-column">
          <div>
            <button onClick={() => GenerateReport("weekly")}>Weekly sales</button>
            <button onClick={() => GenerateReport("monthly")}>Monthly sales</button>
          </div>
          <div>
            {
              show === "weekly" ? (
                <>

                </>
              ) 
              : (
                <>monthly</>
              )
            }
          </div>
     </div>
     </>
  );
}

export default GenerateReport;
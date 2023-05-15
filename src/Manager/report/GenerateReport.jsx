import React from "react";
import { useEffect, useState } from "react";

function GenerateReport() {
  const [data, setData] = useState();
  const [sales ,setSales] = useState();
  const [movieRankings , setMovieRankings] = useState()

  const apiUrl_tx = process.env.REACT_APP_API_URL_TX;

  const getTotalSales = () =>{
    const total = data.reduce((acc, curr) => acc + curr.totalamount, 0);
    setSales(total)
    
  }

  console.log(movieRankings)
  useEffect(() => { //load data on page load 


    fetch(`${apiUrl_tx}/ordertransaction`)
    .then(response => response.json())
    .then(data => {
         setData(data);
         const totalsales = data.reduce((acc, curr) => acc + curr.totalamount, 0);
         setSales(totalsales.toFixed(2))

         const movieCounts = {};
         data.forEach(transaction => {
           const movieName = transaction.movie;
           const quantity = transaction.quantity;
           if (movieCounts[movieName]) {
             movieCounts[movieName] += quantity;
           } else {
             movieCounts[movieName] = quantity;
           }
         });
     
         const movieRankings = Object.keys(movieCounts)
           .map(movieName => ({ movieName, count: movieCounts[movieName] }))
           .sort((a, b) => b.count - a.count);
     
         setMovieRankings(movieRankings);
    })
    .catch(error => console.error(error));
  }, []);

  return (
     <>
        <ul className="list-group py-5" style={{width : "max-content"}}>  
          <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
              <p className="fs-3">Total Revenue: </p>
              <p className="fs-4"><strong>${sales}</strong></p>
              </div>
          </li>
        </ul>

        <table className="text-black" style={{backgroundColor : "whitesmoke", width : '1000px'}}>
          <thead>
            <tr className="d-flex-column" style={{backgroundColor : "orange"}}>
              <th scope="col">Rank</th>
              <th scope="col">Movie</th>
              <th scope="col">Tickets Sold</th>
            </tr>
          </thead>
          <tbody>
          {
            movieRankings?.map((movie, index) => (
              <>
              <tr key={index}>
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{movie.movieName}</td>
                <td className="p-2">{movie.count}</td>
              </tr>
              <tr>
                  <td colSpan="6" className="border-bottom"></td>
              </tr>
              </>
            ))}
          </tbody>
        </table>
     </>
  );
}

export default GenerateReport;
/*
     <div className="text-white d-flex-column "  style={{backgroundColor : "whitesmoke"}}>
          <ul className="list-group p-4 bg-dark" style={{width : "max-content"}}>  
            <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                <p className="fs-3">Total Revenue: </p>
                <p className="fs-4"><strong>${sales}</strong></p>
                </div>
            </li>
          </ul>
          <div>
            <ul className="list-group p-4"  style={{width : "500px"}}>  
              <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                  <p className="fs-3">Movie by sales: </p>
                  </div>
              </li>
            {
              movieRankings?.map((movie) => (
                <>
                  <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      {movie.movieName}
                    </div>
                    <span className="badge bg-primary rounded-pill">{movie.count}</span>
                  </li>
                </>
              ))
            }
            </ul>
          </div>
     </div>
*/

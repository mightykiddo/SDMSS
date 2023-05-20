import React from "react";
import { useEffect, useState } from "react";

function GenerateReport() {
  const [data, setData] = useState();
  const [sales ,setSales] = useState();
  const [movieRankings , setMovieRankings] = useState()

  const apiUrl_tx = process.env.REACT_APP_API_URL_TX;

  const getOrderTransaction = async () => {
    const response = await  fetch(`${apiUrl_tx}/ordertransaction`)
    const tx = response.json();
    return tx;
  }


  useEffect(() => { //lload order tx and handle logic for getting sales and movie ranking
    getOrderTransaction()
    .then(data => {
         //setData(data);
         const ticket = data.filter(item => item.item === "Movie Ticket")
         const totalsales = ticket.reduce((acc, curr) => acc + curr.totalamount, 0);
         const movieCounts = {};
         ticket.forEach(transaction => {
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
          
        setSales(totalsales.toFixed(2))
        setMovieRankings(movieRankings);
    })
    .catch(error => console.error(error));
  }, []);

  return (
     <>
        <ul className="list-group py-5" style={{width : "max-content"}}>  
          <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
              <p className="fs-3 text-dark">Total Revenue: </p>
              <p className="fs-4 text-dark"><strong>${sales}</strong></p>
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

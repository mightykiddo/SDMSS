import React from "react";
import { useState } from "react";
function GenerateReport() {
  const [show, setShow] = useState("Weekly")

  //need transaction 
  return (
     <>
     <div className="text-white d-flex">
          <button onClick={() => setShow("Weekly")}>weekly</button>
          <button onClick={() => setShow("Monthy")}>monthly</button>
          {
            show === "Weekly" ? (
              <>weekly</>
            ) 
            : (
              <>monthly</>
            )
          }
     </div>
     </>
  );
}

export default GenerateReport;
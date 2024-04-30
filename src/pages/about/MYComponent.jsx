import { useContext, useState } from "react";
import { MyAccountContext } from "../../context/AccountContext";

import { report_url } from "../../config/env";
export const MyComponent = () => {
    const {  customerId,strToken } = useContext (MyAccountContext);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async () => {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const startOfYear = new Date(currentYear, 0, 1); // January is month 0
      const formattedCurrentDate = formatDate(currentDate);
      const formattedStartOfYear = formatDate(startOfYear);
  
      const url = `${report_url}&tag=show_report&intReportID=6&mask=demo&strToken=${strToken}`;
  
      const formData = new URLSearchParams();
      formData.append('intCustomerID', customerId);
      formData.append('dtDate',formattedStartOfYear );
      formData.append('dtDate2', formattedCurrentDate);
  
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString()
      };
  
      try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        setResponse(data?.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setResponse(null);
      }
    };
    console.log("That is a Response of Data==========> ",customerId)
    const formatDate = (date) => {
      // Format date as 'YYYY-MM-DD'
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
  
 return (
  <div>
    <button onClick={fetchData}>Fetch Data</button>
    {error && <div>Error: {error}</div>}
    {response && (
      <div>
        <h2>Response:</h2>
        <table>
          <thead>
            <tr>
              <th>CustomerID </th>
              <th>strDoc</th>
              <th>dtDate</th>
              <th>strCustomerDesc</th>
              <th>strCustomer</th>
              <th>dblDebit</th>
              <th>dblBalance</th>
              <th>dblCurrentBalance</th>
              <th>strPaymentTerms</th>
              <th>strCustomerAddress</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {response?.map((item, index) => (
              <tr key={index}>
                <td>{item?.intCustomerID}</td>
                <td>{item?.strCode}</td>
                <td>{item?.dtDate}</td>
                <td>{item?.strCustomerDesc}</td>
                <td>{item?.strCustomer}</td>
                <td>{item?.dblBalance}</td>
                <td>{item?.dblDebit}</td>
                <td>{item?.dblCurrentBalance}</td>
                <td>{item?.strPaymentTerms}</td>
                <td>{item?.strCustomerAddress}</td>
                {/* Render more columns as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

  };
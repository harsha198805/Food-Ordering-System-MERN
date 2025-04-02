import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    if (sessionId) {
      fetch("http://localhost:5000/api/payments/confirm-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      })
        .then((res) => res.json())
        .then((data) => {
          setOrderDetails(data);
        })
        .catch((err) => console.error("Error fetching order details:", err));
    }
  }, [sessionId]);

  if (!sessionId) return <p>Error: No session ID provided.</p>;
  if (!orderDetails) return <p>Loading order details...</p>;

  return (
    <div>
      <h1>Thank You for Your Order!</h1>
      <p>Order ID: {orderDetails._id}</p>
      <p>Payment Status: {orderDetails.paymentDetails.status}</p>
    </div>
  );
};

export default ConfirmationPage;

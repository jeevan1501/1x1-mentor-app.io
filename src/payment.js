import React from 'react';

function PaymentPage({ duration, premium }) {
  const baseRate = 2000;
  const premiumRate = 500;
  const ratePerMinute = baseRate / 30;
  const totalCost = (ratePerMinute * duration) + (premium ? premiumRate : 0);

  return (
    <div className="payment-summary">
      <h3>Payment Summary</h3>
      <p>Duration: {duration} minutes</p>
      <p>Premium Service: {premium ? "Yes" : "No"}</p>
      <h4>Total Cost: ₹{totalCost}</h4>
      <button onClick={() => alert('Payment successful!')}>Proceed to Payment</button>
    </div>
  );
}

export default PaymentPage;

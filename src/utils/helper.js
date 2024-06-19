// ============ Links ============
export const LinkShipping = [
  "User Login",
  "Shipping Address",
  "Payment Method",
  "Place Order",
];

export const payments = ["PayPal", "Stripe", "CashOnDelivery"];

// ============ Error ============
export const getError = (error) => {
  error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message;
};

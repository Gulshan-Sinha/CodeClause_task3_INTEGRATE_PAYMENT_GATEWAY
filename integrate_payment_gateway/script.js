const stripe = Stripe('<YOUR_PUBLISHABLE_KEY>');
const elements = stripe.elements();
const cardElement = elements.create('card');

cardElement.mount('#card-element');

const form = document.getElementById('payment-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const { paymentMethod, error } = await stripe.createPaymentMethod({
    type: 'card',
    card: cardElement,
  });

  if (error) {
    const errorElement = document.getElementById('card-errors');
    errorElement.textContent = error.message;
  } else {
    const paymentMethodId = paymentMethod.id;
    const response = await fetch('/process_payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ payment_method_id: paymentMethodId })
    });
    const responseData = await response.json();
    console.log(responseData);
  }
});

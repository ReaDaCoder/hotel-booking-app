import { loadStripe } from '@stripe/stripe-js';

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.pk_test_51Q2iK8Cs3w6cneavhZNzddYb4OlcMFwAUKyLyelyLNonblhQcj3tP0A2l9hvTs6wqzwaQvrSMpCUoSuiyTc4hLO800H4J7PVm4);
  }
  return stripePromise;
};

export default getStripe;
import { useState, useEffect } from 'react';

/**
 * Custom hook to lazy-load Razorpay script
 * Only loads when the component using this hook mounts
 * Prevents loading Razorpay on every page
 */
const useRazorpay = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if Razorpay is already loaded
    if (window.Razorpay) {
      setIsLoaded(true);
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector('script[src*="razorpay"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => setIsLoaded(true));
      existingScript.addEventListener('error', () => setError('Failed to load Razorpay'));
      return;
    }

    // Load Razorpay script dynamically
    setIsLoading(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;

    script.onload = () => {
      setIsLoaded(true);
      setIsLoading(false);
      console.log('✓ Razorpay loaded successfully');
    };

    script.onerror = () => {
      setError('Failed to load Razorpay script');
      setIsLoading(false);
      console.error('✗ Failed to load Razorpay');
    };

    document.body.appendChild(script);

    // Don't remove script on cleanup - keep it cached for future use
    // This prevents re-downloading Razorpay if user navigates away and comes back
  }, []);

  return { isLoaded, isLoading, error, Razorpay: window.Razorpay };
};

export default useRazorpay;

import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to lazy-load Razorpay script
 * Only loads when the component using this hook mounts
 * Prevents loading Razorpay on every page
 * 
 * OPTIMIZATIONS:
 * - Singleton pattern (only one script ever loaded)
 * - Proper cleanup and error handling
 * - Prevents duplicate loads
 */

// Global flag to track loading state across all hook instances
let globalLoadingState = {
  isLoading: false,
  isLoaded: false,
  loadPromise: null,
};

const useRazorpay = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    // Check if Razorpay is already loaded globally
    if (window.Razorpay) {
      console.log('✅ Razorpay already loaded');
      globalLoadingState.isLoaded = true;
      setIsLoaded(true);
      return;
    }

    // If already loading, wait for the existing load promise
    if (globalLoadingState.isLoading && globalLoadingState.loadPromise) {
      console.log('⏳ Razorpay already loading, waiting...');
      globalLoadingState.loadPromise
        .then(() => {
          if (isMounted.current) {
            setIsLoaded(true);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          if (isMounted.current) {
            setError(err.message);
            setIsLoading(false);
          }
        });
      return;
    }

    // Check if script already exists in DOM
    const existingScript = document.querySelector('script[src*="checkout.razorpay.com"]');
    if (existingScript) {
      console.log('✅ Razorpay script already in DOM');
      
      // Check if it's already loaded
      if (existingScript.getAttribute('data-loaded') === 'true') {
        globalLoadingState.isLoaded = true;
        setIsLoaded(true);
        return;
      }

      // Wait for existing script to load
      const handleLoad = () => {
        console.log('✅ Razorpay loaded from existing script');
        existingScript.setAttribute('data-loaded', 'true');
        globalLoadingState.isLoaded = true;
        globalLoadingState.isLoading = false;
        if (isMounted.current) {
          setIsLoaded(true);
          setIsLoading(false);
        }
      };

      const handleError = () => {
        console.error('❌ Razorpay failed to load from existing script');
        globalLoadingState.isLoading = false;
        if (isMounted.current) {
          setError('Failed to load Razorpay');
          setIsLoading(false);
        }
      };

      existingScript.addEventListener('load', handleLoad);
      existingScript.addEventListener('error', handleError);

      return () => {
        existingScript.removeEventListener('load', handleLoad);
        existingScript.removeEventListener('error', handleError);
      };
    }

    // Load Razorpay script for the first time
    console.log('🚀 Loading Razorpay script...');
    globalLoadingState.isLoading = true;
    setIsLoading(true);

    // Create a promise for other instances to wait on
    globalLoadingState.loadPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.setAttribute('data-razorpay-script', 'true');

      script.onload = () => {
        console.log('✅ Razorpay loaded successfully');
        script.setAttribute('data-loaded', 'true');
        globalLoadingState.isLoaded = true;
        globalLoadingState.isLoading = false;
        
        if (isMounted.current) {
          setIsLoaded(true);
          setIsLoading(false);
        }
        
        resolve();
      };

      script.onerror = () => {
        console.error('❌ Failed to load Razorpay script');
        const errorMsg = 'Failed to load Razorpay script';
        globalLoadingState.isLoading = false;
        
        if (isMounted.current) {
          setError(errorMsg);
          setIsLoading(false);
        }
        
        reject(new Error(errorMsg));
      };

      document.body.appendChild(script);
    });

    // Cleanup
    return () => {
      isMounted.current = false;
      // Don't remove script - keep it cached for entire session
    };
  }, []);

  return { isLoaded, isLoading, error, Razorpay: window.Razorpay };
};

export default useRazorpay;

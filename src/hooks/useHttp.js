import { useState, useCallback } from 'react';
import { api } from '../utils';
import { toast } from 'react-toastify';

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const sendRequest = useCallback(async (requestConfig, applyData, notifyOptions) => {
      // requestConfig is object, for url, method and data's body
      setIsLoading(true);
      setError(null);
      try {
        const response = await api(requestConfig);        
        if(notifyOptions) {
          if(notifyOptions instanceof Function) {
            notifyOptions(response)
          } else {            
            const message = notifyOptions.message || response.data.message  
            delete notifyOptions?.message
            toast(message, {type: notifyOptions.type || 'success', ...notifyOptions})
          }
        }
        const data = response.data;
        applyData(data);
      } catch (err) {      
        const errorMessage = err.response?.data.message || err.message || 'Something went wrong!'
        setError(errorMessage);
        toast(errorMessage, {type: 'error'})
      }
      setIsLoading(false);
    }, []);
    return { error, isLoading, sendRequest };
  };
  export default useHttp;
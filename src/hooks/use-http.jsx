import { useCallback, useState } from 'react/cjs/react.development';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [finishedLoading, setFinishedLoading] = useState(false);
  const [requestError, setRequestError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setRequestError(null);
    setFinishedLoading(false);
    setIsLoading(true);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        header: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error(`Request failed (${response.statusText})`);
      }

      const data = await response.json();

      applyData(data);
    } catch (error) {
      setRequestError(error.message || 'Something went wrong');
    }

    setIsLoading(false);
    setFinishedLoading(true);
  }, []);

  return {
    isLoading,
    finishedLoading,
    requestError,
    sendRequest,
  };
};

export default useHttp;

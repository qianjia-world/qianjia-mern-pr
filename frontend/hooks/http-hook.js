import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiMsg, setApiMsg] = useState();
  // msg 包含後端回傳的訊息+錯誤訊息
  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async ({ url, method = "GET", body = null, headers = {} }) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });

        const responseData = await response.json();

        //取得回傳要把控制器從陣列中移除
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl,
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        if (responseData.message) {
          setApiMsg(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setApiMsg(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    [],
  );

  const clearApiMsg = () => {
    setApiMsg(null);
  };

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, apiMsg, sendRequest, clearApiMsg };
};

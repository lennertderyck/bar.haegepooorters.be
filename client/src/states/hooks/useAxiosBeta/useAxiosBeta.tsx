import { FC, useCallback, useEffect, useRef } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Props } from './useAxiosBeta.types';
import useAxiosReducer from './useAxiosReducer';
import { useEffectOnce } from '../useEffectOnce/useEffectOnce';

const useAxiosBeta = <Data,>(endpoint: string, config?: AxiosRequestConfig): Props<Data> => {
    const [dataStates, dispatch] = useAxiosReducer<Data>();
    const isMounted = useRef(true);
    const controller = useRef<AbortController>(new AbortController());
    const signal = controller.current.signal;
    const axiosConfig = { ...config, signal };
        
    const abort = useCallback(() => {
        if (isMounted.current) {
            controller.current.abort();
            dispatch({ type: 'REQUEST_ABORT' })
        }
    }, []);
    
    const getData = useCallback(
        async () => {
            dispatch({ type: 'REQUEST_INIT' });
            
            try {
                const res = (await axios(endpoint, axiosConfig)) as AxiosResponse<Data>;
                
                if (isMounted.current) {
                    dispatch({ type: 'REQUEST_SUCCESS', payload: res.data });
                }
            } catch (e: any) {
                if (isMounted.current) {
                    dispatch({ type: 'REQUEST_FAILED', payload: e });
                }
            }
        }, 
        [endpoint, config]
    );
    
    useEffectOnce(() => {
        getData()
        return () => {
            isMounted.current = false;
            abort();
        }
    })
    
    return {
        ...dataStates,
        refetch: getData,
        cancel: abort
    }
}

export default useAxiosBeta;
import { EncodedRoute, RouteDecoder, RouteEncoder, ShareTypes, UseShareRouting } from "./useShareRouting.types";

const prefix = 'web+barapp://'
const separator = ':';

const encodeRoute: RouteEncoder = (key: ShareTypes, data) => {
    console.log(prefix + key + separator + data)
    return prefix + key + separator + data;
}

const decodeRoute: RouteDecoder = (encodedRoute) => {
    const [, value] = encodedRoute.split('://');
    const [route, data] = value.split(separator);
    
    return {
        route,
        data
    }
}

const useShareRouting: UseShareRouting = (encodedRoute?: EncodedRoute) => {
    const generateRoute = encodeRoute;
    
    const decodedRouteProp = encodedRoute ? decodeRoute(encodedRoute) : null;
    
    return [
        {
            generateRoute
        },
        decodedRouteProp,
    ]
}

export default useShareRouting;
import { EncodedRoute, RouteDecoder, RouteEncoder, ShareTypes, UseShareRouting } from "./useShareRouting.types";

const separator = ':';

const encodeRoute: RouteEncoder = (key: ShareTypes, data) => {
    return key + separator + data;
}

const decodeRoute: RouteDecoder = (encodedRoute) => {
    const [route, data] = encodedRoute.split(';');
    
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
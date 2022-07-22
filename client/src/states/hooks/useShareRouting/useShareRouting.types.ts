import useShareRouting from "./useShareRouting";

export type RouteKey = string;
export type RouteData = string | number;
export type ShareTypes = 'transaction' | 'topup';
export type EncodedRoute = string;
export interface DecodedRoute {
    route: RouteKey;
    data: RouteData;
}

export type RouteEncoder = (key: ShareTypes, data: RouteData) => EncodedRoute
export type RouteDecoder = (encodedRoute: EncodedRoute) => DecodedRoute;

export interface ShareRoutingFunctions {
    generateRoute: RouteEncoder;
}

export interface ShareRoutingProperties {
    decoded: DecodedRoute;
}

export type UseShareRouting = (encodedRoute?: EncodedRoute) => [ShareRoutingFunctions, DecodedRoute | null];
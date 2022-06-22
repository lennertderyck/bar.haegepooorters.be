export type UseAppProperties = {
    installed: boolean;
    add2Screen: () => Promise<void>
};
export type UseApp = () => UseAppProperties;
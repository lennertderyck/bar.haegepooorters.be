import { publicKeyCredentialCreationOptions } from "./config.auth";

export const requestWebAuthnCredentials = async () => {
    return await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions
    });
}

export const assertWebAuthnCredential = async () => {
    return await navigator.credentials.get({
        publicKey: {
            challenge: Uint8Array.from(
                'DI3isFUdeisCT8tjlgHtgJGjmYuO/pt0Tst1/VysqDQ=', c => c.charCodeAt(0)),
            allowCredentials: [{
                id: Uint8Array.from(
                    ['id'], c => c.charCodeAt(0)), // @todo add ID here
                type: 'public-key',
                transports: ['usb', 'ble', 'nfc'],
            }],
            timeout: 60000,
        }
    });
}
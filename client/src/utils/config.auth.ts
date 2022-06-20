export const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
    challenge: Uint8Array.from(
        'DI3isFUdeisCT8tjlgHtgJGjmYuO/pt0Tst1/VysqDQ=', c => c.charCodeAt(0)),
    rp: {
        name: "Scouts & Gidsen Haegepoorters Destelbergen",
        id: window.location.hostname,
    },
    user: {
        id: Uint8Array.from(
            "UZSL85T9AFC", c => c.charCodeAt(0)),
        name: "lee@webauthn.guide",
        displayName: "Lee",
    },
    pubKeyCredParams: [{alg: -7, type: "public-key"}],
    authenticatorSelection: {
        authenticatorAttachment: "platform",
    },
    timeout: 60000,
    attestation: "direct"
};
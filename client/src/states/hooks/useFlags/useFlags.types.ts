import { FeatureFlag, ID } from "../../../types/general";

interface UseFlags {
    flags: FeatureFlag[];
    toggleFlag: (flagId: ID, state?: boolean) => void;
    enable: (flagId: ID) => void;
    disable: (flagId: ID) => void;
    flagById: (id: string) => FeatureFlag | undefined;
}

export default UseFlags;
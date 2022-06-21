import { AuthClient } from "@dfinity/auth-client";
import assert from 'app/shared/assert';
import { canisterId } from 'app/shared/constants';

import { createActor } from '../../../declarations/app';

let authClient = null;
let identity = null;
let actor = null;

export async function useActor() {
    assert(authClient);

    if (!actor) {
        const identity = authClient.getIdentity();

        actor = createActor(
            canisterId,
            {
                agentOptions: {
                    identity,
                }
            }
        ); 
    }

    return actor;
}

export async function useAuthClient() {
    if (!authClient) {
        authClient = await AuthClient.create();
    }

    return authClient;
}
import { Principal } from "@dfinity/principal";

import { useActor, useAuthClient } from 'app/shared/auth';
import { useState, setState } from 'app/core/state';

export default async function balances(principals) {
    const actor = await useActor();

    for (const principalId of principals) {
        const balance = await actor.balanceOf(Principal.fromText(principalId));

        useState((state) => {
            setState({
                balances: {
                    ...state.balances,
                    [principalId]: Number.parseInt(balance),
                },
            });
        });
    }
}
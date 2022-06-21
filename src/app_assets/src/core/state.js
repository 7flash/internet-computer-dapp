import l from 'app/shared/log';
import { AuthStatus } from 'app/shared/constants';
import assert from 'app/shared/assert';

let state = {
    currentPage: '',
    principalId: '',
    authStatus: AuthStatus.unknown,
    questions:[],
    responses: [],
    balance: 0,
    balances: {},
    alert: null,
};

let prevState = {
    ...state
};

class StateBus extends EventTarget {}
const stateBus = new StateBus();

const useState = (callback, fields = []) => {
    if(!assert(fields instanceof Array)) return;

    if (fields.length > 0) {
        stateBus.addEventListener('update', () => {
            let hasChanged = false;
            for (let v of fields) {
                if (state[v] != prevState[v]) {
                    hasChanged = true;
                }

                if (v == 'balances') {
                    l(`comparing ${v} of ${JSON.stringify(state[v])} and ${JSON.stringify(prevState[v])} => ${hasChanged}`);
                }
            }
            // every time field changed
            if (hasChanged) {
                callback(state, prevState);
            }
        });
    } else {
        // just once
        callback(state, prevState);
    }
}

const setState = (newState) => {
    l(`##################${JSON.stringify(newState)}##################`);
    prevState = {
        ...state
    };
    state = {
        ...state,
        ...newState
    };
    stateBus.dispatchEvent(new CustomEvent('update'));
}

export { useState, setState };
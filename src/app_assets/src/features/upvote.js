import { useActor } from '../shared/auth';
import { useState, setState } from 'app/core/state';
import $ from 'app/core/selectors';
import l from 'app/shared/log';
import assert from 'app/shared/assert';
import { balances } from 'app/features';
import { alerts } from 'app/shared/constants';

export default async function upvote(responder, questioner) {
    const actor = await useActor();

    if (!assert(responder || questioner, `upvoting answer of ${responder} to ${questioner}`)) return;

    useState(async (state, prevState) => {
        try {
            const isLucky = await actor.upvote(responder, questioner);
            
            if (isLucky) {
                setState({
                    alert: alerts.LUCKY_UPVOTE,
                });    
            } else {
                setState({
                    alert: alerts.UNLUCKY_UPVOTE,
                })
            }

            useState(async (state) => {
                await balances([
                    responder,
                    questioner,
                    state.principalId,
                ]);
            });
        } catch (e) {
            assert(false, e.toString());
            setState({
                alert: alerts.FAILED_UPVOTE,
            });
        }

        const questionIdx = prevState.currentPage.split('-')[1];
        window.location.replace(`#details-${questionIdx}`);
    });
}
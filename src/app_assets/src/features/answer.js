import { useActor } from '../shared/auth';
import { useState, setState } from 'app/core/state';
import $ from 'app/core/selectors';
import l from 'app/shared/log';
import assert from 'app/shared/assert';
import { query } from 'app/features';
import { alerts } from 'app/shared/constants';

export default async function answer() {
    const actor = await useActor();
    const value = $.answerInput().value;

    useState(async (state, prevState) => {
        const questionIdx = prevState.currentPage.split('-')[1];
        const canisterQuestionId = state.questions.length - questionIdx - 1;

        if (!assert(questionIdx, `answering to ${canisterQuestionId}`)) return;

        if (!assert(typeof value == 'string' && value.length > 0, `responding with ${value}`)) return;

        try {
            const isLucky = await actor.answer(Number.parseInt(canisterQuestionId), value);
            
            if (isLucky) {
                setState({
                    alert: alerts.LUCKY_ANSWER,
                });    
            } else {
                setState({
                    alert: alerts.UNLUCKY_ANSWER,
                })
            }
        } catch (e) {
            assert(false, e.toString());
            setState({
                alert: alerts.FAILED_ANSWER,
            });
        }
        
        await query();

        useState((newState) => {
            const noUpdates = newState.questions.length == state.questions.length
                && newState.currentPage == state.currentPage;

            if (noUpdates) {
                window.location.replace('#');
                window.location.replace(`#details-${questionIdx}`);
            } else {
                window.location.replace('#');
            }
        });
    });
}
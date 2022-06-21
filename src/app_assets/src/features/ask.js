import { useActor } from '../shared/auth';
import { useState, setState } from 'app/core/state';
import $ from 'app/core/selectors';
import l from 'app/shared/log';
import assert from 'app/shared/assert';
import { query } from 'app/features';
import { alerts } from 'app/shared/constants';

export default async function ask() {
    const actor = await useActor();
    const question = $.questionInput.value;

    useState(async (state) => {
        l('asking ' + question);

        try {
            const isLucky = await actor.ask(question);
        
            if (isLucky) {
                setState({
                    alert: alerts.LUCKY_QUESTION,
                });            
            } else {
                setState({
                    alert: alerts.UNLUCKY_QUESTION,
                });            
            }
        } catch (e) {
            assert(false, e.toString());

            setState({
                alert: alerts.FAILED_QUESTION,
            });        
        }
        
        window.location.replace('#');

        query();
    });
}
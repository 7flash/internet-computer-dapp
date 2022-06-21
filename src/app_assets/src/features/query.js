import { Principal } from "@dfinity/principal";

import { useActor, useAuthClient } from 'app/shared/auth';
import { useState, setState } from 'app/core/state';
import { balances } from 'app/features';

import l from 'app/shared/log';

export default async function query() {
    const actor = await useActor();

    const principals = new Set();

    useState((state) => {
        principals.add(state.principalId);
    });

    const questionsRaw = await actor.queryAllQuestions();
    const questionsReversed = questionsRaw.reverse();

    const questions = [];
    const responses = [];

    for (let question of questionsReversed) {
        const parts = question.split('/');

        const questionText = parts.shift();
        const questionerPrincipal = parts.shift();

        const questionResponses = [];
 
        while (parts.length > 0) {
            const responseText = parts.shift();
            const responderPrincipal = parts.shift();

            principals.add(responderPrincipal);
            questionResponses.push([responseText, responderPrincipal]);
        }

        principals.add(questionerPrincipal);
        questions.push([questionText, questionerPrincipal]);
        responses.push(questionResponses);
    }

    setState({
        questions,
        responses,
    });

    await balances(principals);
}
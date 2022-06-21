import $ from 'app/core/selectors';
import { useState } from 'app/core/state';
import { AuthStatus, SvgIcons, alerts, alertMessages } from 'app/shared/constants';
import l from 'app/shared/log';
import assert from 'app/shared/assert';

const show = (el) => {
  if (el.classList.contains('invisible')) {
    el.classList.remove('invisible');
  }

  if (el.classList.contains('hidden')) {
    el.classList.remove('hidden');
  }

  if (el.classList.contains('collapse-close')) {
    el.classList.remove('collapse-close');
    el.classList.add('collapse-open');
  }
}

const hide = (el) => {
  if (el.classList.contains('collapse-open')) {
    el.classList.remove('collapse-open');
    el.classList.add('collapse-close');
    return;
  }

  el.classList.add('hidden');
}

const normalizePrincipal = (principalId) => {
  return 'principal ' +
  principalId.substring(0, principalId.indexOf('-')) +
    '---' +
      principalId.substring(principalId.lastIndexOf('-'))
    ; 
}

useState((state) => {
  let alert;

  if ([
    alerts.LUCKY_QUESTION,
    alerts.LUCKY_ANSWER,
    alerts.LUCKY_UPVOTE
  ].includes(state.alert)) {
    alert = document.querySelector('#mainView .alert-success');
  } else if ([
    alerts.UNLUCKY_QUESTION,
    alerts.UNLUCKY_ANSWER,
    alerts.UNLUCKY_UPVOTE
  ].includes(state.alert)) {
    alert = document.querySelector('#mainView .alert-warning');
  } else {
    alert = document.querySelector('#mainView .alert-error');
  }

  // hide other alerts
  alert.parentNode.querySelectorAll('.alert').forEach(hide);
  alert.parentNode.querySelectorAll('.alert>div').forEach((el) => {
    el.classList.add('opacity-0');
  })

  // show current alert
  alert.querySelector('span').innerText = alertMessages[state.alert];
  show(alert);
  alert.querySelector('div').classList.remove('opacity-0');
  alert.querySelector('div').classList.add('opacity-50');
  setTimeout(() => {
    alert.querySelector('div').classList.remove('opacity-50');
    alert.querySelector('div').classList.add('opacity-100');
  }, 25);
}, ['alert']);

useState((state) => {
  for (const principalId in state.balances) {
    const elements = document.querySelectorAll(`*[data-principal="${principalId}"]`);
    for (const el of elements) {
      el.parentNode.querySelector('*[data-name="balance"]').innerText = state.balances[principalId];
    }
  }
}, ['balances']);

useState((_) => {
  $.svgLogin.forEach((el) => {
    el.innerHTML = SvgIcons.login;
    show(el);
  });

  $.svgError.forEach((el) => {
    el.innerHTML = SvgIcons.error;
    show(el);
  });

  $.svgWelcome.forEach((el) => {
    el.innerHTML = SvgIcons.welcome;
    show(el);
  });

  $.svgInfo.forEach((el) => {
    el.innerHTML = SvgIcons.info;
    show(el);
  });

  $.svgSuccess.forEach((el) => {
    el.innerHTML = SvgIcons.success;
    show(el);
  });

  $.svgWarning.forEach((el) => {
    el.innerHTML = SvgIcons.warning;
    show(el);
  });
});

useState((state) => {
  if (state.authStatus == AuthStatus.authenticated) {
    show($.mainView);
    hide($.authView);
  } else if (state.authStatus == AuthStatus.requiredLogin) {
    show($.authView);
    hide($.mainView);
  } else if (state.authStatus == AuthStatus.unknown) {
    hide($.mainView);
    hide($.authView);
    show($.progress);
  }
}, ['authStatus']);

useState((state) => {
  $.principalId.innerText = normalizePrincipal(state.principalId);
  $.principalId.setAttribute('data-principal', state.principalId);
}, ['principalId']);

useState((state) => {
  l('render new questions ', state.questions);

  if (!assert(state.questions && state.questions.length > 0)) return;

  const questionsListNode = $.questionRowTemplate.parentNode;

  // template node is the first and persistent
  while (questionsListNode.childElementCount != 1) {
    questionsListNode.removeChild(questionsListNode.lastElementChild);
  }

  for (let questionIdx in state.questions) {
    const question = state.questions[questionIdx];
    const [questionText, questionerPrincipal] = question;

    const questionRow = $.questionRowTemplate.content.firstElementChild.cloneNode(true);

    questionRow.setAttribute('tabindex', questionIdx);
    questionRow.querySelector('*[data-name="question-text"]').innerText = questionText;
    questionRow.querySelector('*[data-name="questioner-principal"]').innerText = normalizePrincipal(questionerPrincipal);
    questionRow.querySelector('*[data-name="questioner-principal"]').setAttribute('data-principal', questionerPrincipal);
    questionRow.querySelector('a').setAttribute('href', `#details-${questionIdx}`);

    const responses = state.responses[questionIdx];

    questionRow.querySelector('*[data-name="answers-num"]').innerText = responses.length;

    if (responses && responses.length > 0) {
      const answerRowTemplate = $.questionRowTemplate.content.querySelector('template[data-name="answer"]');
      const currentEmptyTemplateNode = questionRow.querySelector('template[data-name="answer"]');

      if (!assert(answerRowTemplate, 'nested answer template')) return;

      for (const response of responses) {
        const [responseText, responderPrincipal] = response;

        const answerRow = answerRowTemplate.content.firstElementChild.cloneNode(true);
        answerRow.querySelector('*[data-name="response-text"]').innerText = responseText;
        answerRow.querySelector('*[data-name="responder-principal"]').innerText = normalizePrincipal(responderPrincipal);
        answerRow.querySelector('*[data-name="responder-principal"]').setAttribute('data-principal', responderPrincipal);

        currentEmptyTemplateNode.parentNode.appendChild(answerRow);
      }
    }

    questionsListNode.appendChild(questionRow);
  }
}, ['questions']);

useState((state, prevState) => {
  if (state.currentPage == '#ask') {
    $.askButton.classList.add('loading');
  } else if (prevState.currentPage == '#ask') {
    $.askButton.classList.remove('loading');
  }

  if (state.currentPage == '#answer') {
    $.answerButton().classList.add('loading');
  }
  
  if (state.currentPage.includes('#details')) {
    const questionIdx = state.currentPage.split('-')[1];
    show($.question(questionIdx));

    if (prevState.currentPage.includes('#details')) {
      const questionIdx = prevState.currentPage.split('-')[1];
      hide($.question(questionIdx));
    }
  }
}, ['currentPage']);
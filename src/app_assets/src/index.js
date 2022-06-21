import './main.css'

import './core/render';

import { setState } from './core/state';
import { start, login, logout, ask, answer, upvote } from './features';

async function main() {
  document.body.onload = start;

  let questioner;
  let responder;

  document.body.addEventListener('click', (e) => {
    if (e.target.matches('a[href="#upvote"]')) {
      questioner = e.target.closest('[data-name="question"]').querySelector('[data-name="questioner-principal"]').getAttribute('data-principal');
      responder = e.target.closest('[data-name="answer"]').querySelector('[data-name="responder-principal"]').getAttribute('data-principal');
    }
  });

  window.addEventListener('hashchange', (e) => {
    const currentPage = e.newURL.substring(e.newURL.indexOf('#'));
    
    setState({
      currentPage,
    });

    if (currentPage == '#login') {
      login();
    } else if (currentPage == '#logout') {
      logout();
    } else if (currentPage == '#ask') {
      ask();
    } else if (currentPage == '#answer') {
      answer();
    } else if (currentPage == '#upvote') {
      upvote(responder, questioner);
    }
  });
}

main();
export default {
    progress: document.querySelector('progress'),
    
    mainView: document.querySelector('#mainView'),
    authView: document.querySelector('#authView'),
    
    loginBtn: document.querySelector('#authView .btn'),
    askButton: document.querySelector('#ask-btn'),
    answerButton: () => document.querySelector('#mainView div.collapse-open .collapse-content a'),

    svgLogin: document.querySelectorAll('.svg-login'),
    svgError: document.querySelectorAll('.svg-error'),
    svgWelcome: document.querySelectorAll('.svg-welcome'),
    svgSuccess: document.querySelectorAll('.svg-success'),
    svgInfo: document.querySelectorAll('.svg-info'),
    svgWarning: document.querySelectorAll('.svg-warning'),

    principalId: document.querySelector('#principal-id'),
    questionInput: document.querySelector('#question-input'),
    answerInput: () => document.querySelector('#mainView div.collapse-open .collapse-content input'),

    questionRowTemplate: document.querySelector('template#question-row'),

    question: (idx) => document.querySelector(`#mainView div[tabindex="${idx}"]`)
};
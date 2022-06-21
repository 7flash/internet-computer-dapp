export const canisterId = process.env.APP_CANISTER_ID;

export const iiUrl =
    process.env.DFX_NETWORK === 'local' ?
        `http://localhost:8000/?canisterId=${process.env.INTERNET_IDENTITY_CANISTER_ID}` :
        `https://identity.ic0.app/`;

export const AuthStatus = {
    authenticated: 1,
    requiredLogin: 2,
    unknown: 3,
};

export const SvgIcons = {
    login: `<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 w-6 h-6"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1">
        </path>
    </svg>`,
    error: `<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
    welcome: `<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
  </svg>`,
  info: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  `,
  success: `<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
  warning: `<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>`
};

export const alerts = {
    LUCKY_QUESTION: 1,
    LUCKY_ANSWER: 2,
    LUCKY_UPVOTE: 3,
    UNLUCKY_QUESTION: 4,
    UNLUCKY_ANSWER: 5,
    UNLUCKY_UPVOTE: 6,
    FAILED_QUESTION: 7,
    FAILED_ANSWER: 8,
    FAILED_UPVOTE: 9,
};

export const alertMessages = {
    [alerts.LUCKY_QUESTION]: 'lucky question.. earned 7 coins..',
    [alerts.LUCKY_ANSWER]: 'lucky answer.. earned 5 coins..',
    [alerts.LUCKY_UPVOTE]: 'lucky upvote.. earned 3 coins..',
    [alerts.UNLUCKY_QUESTION]: 'question added.. spent 7 coins..',
    [alerts.UNLUCKY_ANSWER]: 'answer added.. spent 5 coins..',
    [alerts.UNLUCKY_UPVOTE]: 'upvote added.. spent 3 coins..',
    [alerts.FAILED_QUESTION]: 'question cannot be longer than 33 symbols..',
    [alerts.FAILED_ANSWER]: 'answer cannot be longer than 33 symbols..',
    [alerts.FAILED_UPVOTE]: 'cannot upvote own questions nor answers..',
};
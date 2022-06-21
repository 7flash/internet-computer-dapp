const label = 'app';

console.time(label);

const writeLog = (text) => {
    console.timeLog(label, '------------' + text + '--------');
}

export default writeLog;
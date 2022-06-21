import l from './log';

export default function assert(condition, message) {
    l(`assert "${message}"`);

    if (!condition) {
        console.assert(condition, message);
        return false;
    }

    return true;
}
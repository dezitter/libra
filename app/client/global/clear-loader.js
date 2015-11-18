import $ from 'jquery';

export function clearLoader(timerID) {
    global.clearTimeout(timerID);

    $('#loader').removeClass('is-active');
    $('#content').removeClass('loading');
}

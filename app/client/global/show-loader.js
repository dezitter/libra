import $ from 'jquery';

const DEFAULT_DELAY = 200;

export function showLoader(delay=DEFAULT_DELAY) {
    return global.setTimeout(function() {
        $('#loader').addClass('is-active');
        $('#content').addClass('loading');
    }, delay);
}

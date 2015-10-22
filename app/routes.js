export default function(match) {
    match('/',           'home#index');
    match('/files',      'files#index');
    match(/files(\/.+)/, 'files#show');
}

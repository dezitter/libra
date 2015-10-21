export default function(match) {
    match('/',            'home#index');
    match('/files',       'files#index');
    match('/files/:name', 'files#show');
}

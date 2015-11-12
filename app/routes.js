export default function(match) {
    match('/'             , 'home#index');
    match('/login'        , 'home#login');
    match('/files'        , 'files#index');
    match(/files(\/.+)/   , 'files#show');
}

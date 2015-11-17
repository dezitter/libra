export default function(match) {
    match('/'             , 'home#index');

    match('/login'        , 'user#login');
    match('/signup'       , 'user#signup');

    match('/files'        , 'files#index');
    match(/files(\/.+)/   , 'files#show');
}

export default function(match) {
    match('/login'        , 'user#login');
    match('/signup'       , 'user#signup');

    match('/'             , 'files#index');
    match('/files'        , 'files#index');
    match(/files(\/.+)/   , 'files#show');
}

import App from 'app/app';

import { clearLoader } from 'app/client/global/clear-loader';
import { showLoader } from 'app/client/global/show-loader';

const app = new App(global.data.app);

app.on('change:loading', function(app, loading) {
    let timerID = app.get('loadTimerID');

    clearLoader(timerID);
    if (loading) {
        timerID = showLoader();
        app.set('loadTimerID', timerID);
    }
});

app.bootstrapData(global.data.bootstrapData);
app.start();

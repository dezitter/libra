import App from 'app/app';

const appData = global.data.app;
const bootstrapData = global.data.bootstrapData;
const app = new App(appData);

app.bootstrapData(bootstrapData);
app.start();

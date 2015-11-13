import fs from 'fs';

export default {
    key : fs.readFileSync('certs/server/key.pem'),
    cert: fs.readFileSync('certs/server/crt.pem'),
    ca  : fs.readFileSync('certs/ca/crt.pem')
};


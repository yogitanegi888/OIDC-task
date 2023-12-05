const express = require('express');
const url = require('url');
const app = express();
const { buildURL } = require('../utils');
const randomToken = require('random-token');
const clientInfo = {
    clientId: '8e549b24-81c1-4b3b-914d-a7767db438e0',
    clientSecret: 'n0llb3exbyi3bnos',
    scopes: ['openid'],
    redirectUrl: 'http://localhost:3500/callback'
}
const OIDC_BASE_URL = "http://localhost:3200";
app.use(express.json());
app.use(express.urlencoded());

app.get('/login-with-oidc', (req, res) => {
    const state = randomToken(16);
    let redirectURL = buildURL(`${OIDC_BASE_URL}/authorize`, {
        resonse_type: 'code',
        scopes: clientInfo.scopes.join(' '),
        client_id: clientInfo.clientId,
        redirect_url: clientInfo.redirectUrl,
        state
    });
    console.log(redirectURL);
    res.redirect(redirectURL);
});


// Client App will run 3200 port
app.listen(3500, () => {
    console.log('Client App Server start on port 3500..');
})
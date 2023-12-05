const express = require("express");
const Joi = require("joi");
const { connect, connection } = require("mongoose");
const bcryptjs = require("bcryptjs");
const UserModel = require("./users.model");
const ClientModel = require("./clients.model");
const { buildResponse, buildURL } = require("../utils");
const randomToken = require("random-token");
const uuid = require("uuid");
const app = express();
const _ = require('lodash');

app.use(express.json());
app.use(express.urlencoded());
// connect to mongodb database
connect("mongodb://localhost:27017/oidc_task");
connection.on("connected", () => {
  console.log("MongoDB Connected!");
});

// Endpoint to register the users with OIDC Providers.
app.post("/register", async (req, res) => {
  try {
    const payload = req.body; // payload will have name, username, password and email
    // encrypt the password.
    payload.password = bcryptjs.hashSync(payload.password);
    await UserModel.create(payload);
    res.json(buildResponse(true, "User Successfully Registered!")).status(201);
  } catch (error) {
    res.json(buildResponse(false, "Failed to register user")).status(500);
  }
});

/**
 *
 */
app.post("/genereate-client-credentials", async (req, res) => {
  try {
    const payload = req.body; // payload will have name, redirectUrl, scopes
    // generate client id and client secret.
    payload.clientId = uuid.v4();
    payload.clientSecret = randomToken(16);
    let client = await ClientModel.create(payload);
    res.json(buildResponse(true, "Credentials Generated", client));
  } catch (error) {
    res.json(buildResponse(false, "Failed to generate client credentials"));
  }
});

app.get("/authorize", async (req, res) => {
  const clientId = req.query.client_id;
  let client = await ClientModel.findOne({ clientId }).exec();
  if (!client) {
    res.json(buildResponse(false, 'Client Not Found')); return;
  }
  if (client.redirectUrl !== req.query.redirect_url) {
    res.json(buildResponse(false, 'Redirect URL Mismatch')); return;
  }
  if (_.difference(req.query.scopes.split(' '), client.scopes).length) {
    res.json(buildResponse(false, 'Invalid scopes are requested.')); return;
  }

  res.json({});
});

// app.post("/token", (req, res) => {


// });
app.post("/token", async (req, res) => {
  const clientId = req.body.client_id;
  const clientSecret = req.body.client_secret;
  const client = await ClientModel.findOne({ clientId, clientSecret }).exec();
  if (!client) {
    res.status(401).json({ error: 'Unauthorized', error_description: 'Invalid client credentials' });
    return;
  }

  if (req.body.grant_type !== 'client_credentials') {
    res.status(400).json({ error: 'unsupported_grant_type', error_description: 'Unsupported grant type' });
    return;
  }

  const token = jwt.sign({ client_id: clientId }, 'your_secret_key', { expiresIn: '1h' });
  res.json({ access_token: token, token_type: 'Bearer', expires_in: 3600 });
});
app.listen(3200, () => {
  console.log("OIDC Server start on port 3200..");
});

// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE.txt in the project root for license information.
var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/auth');
var graph = require('@microsoft/microsoft-graph-client');
let letterBodyTemplate = require('../templates/letterBodyTemplate');


/* GET /contacts */
router.post('/', async function (req, res, next) {
  console.log(req.body);
  console.log('step1');

  let parms = {
    title: 'Send Letter',
    active: {
      sendLetter: true
    }
  };

  const accessToken = await authHelper.getAccessToken(req.cookies, res);
  const userName = req.cookies.graph_user_name;
  console.log('step2');
  if (accessToken && userName) {
    parms.user = userName;
    console.log('step2.1');

    // Initialize Graph client
    const client = graph.Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      }
    });
    console.log('step3');
    try {
      console.log('step4');
      const body = {
        Message: {
          Subject: `${req.body.projectName} > ${req.body.subjectName}`,
          body: {
        content: letterBodyTemplate(req.body.bodyLetter),
        ContentType: "html"
    },
          ToRecipients: [{
            EmailAddress: {
              Address: req.body.contactEmail
            }
          }]
        },
        SaveToSentItems: "true"
      }

      const result = await client
        .api('/me/sendMail')
        .post(body, (err, res) => {
          console.log(res);
          console.log(err);
        });
      // console.log(result);
      // res.render('successSendLetter', parms);
      res.send({status: "ok"});
    } catch (err) {
      parms.message = 'Error retrieving contacts';
      parms.error = {
        status: `${err.code}: ${err.message}`
      };
      parms.debug = JSON.stringify(err.body, null, 2);
      res.render('error', parms);
    }

  } else {
    res.send({
      "status": "can't send the letter"
    });
    // res.redirect('/');
  }
  // res.send({"stautus": JSON.stringify(req.body)});
});

module.exports = router;
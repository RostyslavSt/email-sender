// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE.txt in the project root for license information.
var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/auth');
var graph = require('@microsoft/microsoft-graph-client');

/* GET /contacts */
router.get('/', async function (req, res, next) {
  console.log('sttt1');
  let parms = {
    title: 'Contacts',
    active: {
      cont: true
    }
  };

  const accessToken = await authHelper.getAccessToken(req.cookies, res);
  const userName = req.cookies.graph_user_name;
  console.log(accessToken);
  console.log(userName);


  if (accessToken && userName) {
    parms.user = userName;
    console.log('sttt2');

    // Initialize Graph client
    const client = graph.Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      }
    });

    try {
    
     const body = {
        Message: {
          Subject: "Meet for lunch?",
          Body: {
            ContentType: "Text",
            Content: "The new cafeteria is open."
          },
          ToRecipients: [
            {
              EmailAddress: {
                Address: "rost.sht@gmail.com"
              }
            }
          ]        
        },
        SaveToSentItems: "true"
      }

     const result = await client
      .api('/me/sendMail')
      .post(body, (err, res) => {
        console.log(res);
        console.log(err);
       });
      console.log(result);
    } catch (err) {
      parms.message = 'Error retrieving contacts';
      parms.error = {
        status: `${err.code}: ${err.message}`
      };
      parms.debug = JSON.stringify(err.body, null, 2);
      res.render('error', parms);
    }

  } else {
    // Redirect to home
    res.redirect('/');
  }
});

module.exports = router;
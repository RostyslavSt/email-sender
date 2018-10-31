// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE.txt in the project root for license information.
var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/auth');
var graph = require('@microsoft/microsoft-graph-client');

function send(req, res, next) {
  console.log(req.body);
  
  // let parms = {
  //   title: 'Send Letter',
  //   active: {
  //     sendLetter: true
  //   }
  // };

  const accessToken = authHelper.getAccessToken(req.cookies, res);
  const userName = req.cookies.graph_user_name;

  if (accessToken && userName) {
    parms.user = userName;

    // Initialize Graph client
    const client = graph.Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      }
    });

    try {
    
     const body = {
        Message: {
          Subject: "Meet for lunch2?",
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

     const result = client
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
  // res.send({"stautus": JSON.stringify(req.body)});

}
module.exports = send;
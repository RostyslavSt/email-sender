const contactEmail = document.getElementById('contact');
const projectName = document.getElementById('project-name');
const subjectName = document.getElementById('inputSubject');
const bodyLetter = document.getElementById('body-letter');
const serverUrlForSendLetter = 'http://localhost:3000/sendLetter';
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', () => {
  let data = {
    contactEmail: contactEmail.value,
    projectName: projectName.value,
    subjectName: subjectName.value,
    bodyLetter: bodyLetter.value
  }
  // console.log(data)
  sendLetter(serverUrlForSendLetter, data);

});

//func for send fetch request with POST method that to send letter 
function sendLetter(URL, data) {
  fetch(URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    })
    .then(response => {
      console.log('st1');
      console.log(response);
      return response.json()
    })
    .then(data => {
      console.log('st2')
      console.dir(data);
    })
  // .catch(error => console.log('Request failed', error));
}

// function sendLetter2(URL) {
//   fetch(URL, {
//     method: 'GET',
//   })
//   .then(response => {
//     console.log('fetch GET');
//     console.log(response);
//   })
//   .catch(error => console.log('Request failed', error));
// }
const contactEmail = document.getElementById('contact');
const projectName = document.getElementById('project-name');
const subjectName = document.getElementById('inputSubject');
const serverUrlForSendLetter = 'http://localhost:3000/sendLetter';
// const serverUrlForSendLetter2 = 'http://localhost:3000/cont';
// const serverUrlForSendLetter = 'http://localhost:9001/testPost';
// const serverUrlForSendLetter = 'http://localhost:3000/testPost';



const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', () => {
  // console.log('sdsdsd');
  
  let data = {
    contactEmail: contactEmail.value,
    projectName: projectName.value,
    subjectName: subjectName.value
  }
  // console.log(data);
  sendLetter(serverUrlForSendLetter, data);
  // sendLetter2(serverUrlForSendLetter);
  // console.log(data);
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


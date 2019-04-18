/*
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function fetchImageUploadUrlAndShowForm() {
  fetch('/image-upload-url?call=feed')
      .then((response) => {
        return response.text();
      })
      .then((imageUploadUrl) => {
        const messageForm = document.getElementById('message-form');
        messageForm.action = imageUploadUrl;
        messageForm.classList.remove('hidden');
      });
}

/**
 * Shows the message form if the user is logged in
 */
function showMessageFormIfLoggedIn() {
  fetch('/login-status')
      .then((response) => {
        return response.json();
      })
      .then((loginStatus) => {
        if (loginStatus.isLoggedIn) {
          const messageForm = document.getElementById('message-form');
          messageForm.classList.remove('hidden');
          fetchImageUploadUrlAndShowForm();
        }
      });
}

// Fetch messages and add them to the page.
function fetchMessages(){
  const url = '/feed';
  fetch(url).then((response) => {
    return response.json();
  }).then((messages) => {
    const messageContainer = document.getElementById('message-container');
    if(messages.length == 0){
     messageContainer.innerHTML = '<p>There are no posts yet.</p>';
    }
    else{
     messageContainer.innerHTML = '';
    }
    messages.forEach((message) => {
     const messageDiv = buildMessageDiv(message);
     messageContainer.appendChild(messageDiv);
    });
  });
}

function buildMessageDiv(message){
 const usernameDiv = document.createElement('div');
 usernameDiv.classList.add("left-align");
 usernameDiv.appendChild(document.createTextNode(message.user));

 const timeDiv = document.createElement('div');
 timeDiv.classList.add('right-align');
 timeDiv.appendChild(document.createTextNode(new Date(message.timestamp)));

 const headerDiv = document.createElement('div');
 headerDiv.classList.add('message-header');
 headerDiv.appendChild(usernameDiv);
 headerDiv.appendChild(timeDiv);

 const bodyDiv = document.createElement('div');
 bodyDiv.classList.add('message-body');
 bodyDiv.appendChild(document.createTextNode(message.text));

 const messageDiv = document.createElement('div');
 messageDiv.classList.add("message-div");
 messageDiv.appendChild(headerDiv);
 messageDiv.appendChild(bodyDiv);

 return messageDiv;
}

// Fetch data and populate the UI of the page.
function buildUI(){
 fetchMessages();
 showMessageFormIfLoggedIn();
 const config = {removePlugins: ['Heading', 'List', 'ImageUpload', 'Table', 'MediaEmbed']};
 ClassicEditor.create(document.getElementById('message-input'), config);
 ClassicEditor.create(document.getElementById('about-me-input'), config);
}

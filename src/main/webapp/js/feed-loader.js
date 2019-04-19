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

 const post = document.createElement('div');
 post.classList.add("post");

 const postProfile = document.createElement('div');
 post.classList.add("post-profile");

 const usernameDiv = document.createElement('div');
 usernameDiv.classList.add("post-profile-name");
 usernameDiv.classList.add("text-box");
 usernameDiv.appendChild(document.createTextNode(message.user));

 const text = document.createElement('div');
 text.classList.add("post-text");
 text.classList.add("text");
 text.innerHTML = message.text;

 const imageDiv = document.createElement('div');
 imageDiv.classList.add("post-img");

 if(message.imageUrl) {
   imageDiv.innerHTML += '<br/>';
   imageDiv.innerHTML += '<img src="' + message.imageUrl + '" />';
 }

 const postProfileImage = document.createElement('div');
 postProfileImage.classList.add("post-profile-img");
 const postProfileImageSrc = document.createElement('div');
 postProfileImageSrc.classList.add("post-profile-img-src");

const url = '/about?user=' + message.user;
fetch(url)
       .then((response) => {
         return response.text();
       })
       .then((user) => {
         parsedUser = JSON.parse(user)
         console.log(parsedUser);
         if(parsedUser.imageUrl) {
           postProfileImageSrc.innerHTML += '<br/>';
           postProfileImageSrc.innerHTML += '<img src="' + parsedUser.imageUrl + '" />';
         }
   });

 postProfileImage.appendChild(postProfileImageSrc);
 postProfile.appendChild(usernameDiv);
 postProfile.appendChild(postProfileImage);
 post.appendChild(postProfile);
 post.appendChild(text);
 post.appendChild(imageDiv);

 return post;

}

// Fetch data and populate the UI of the page.
function buildUI(){
 fetchMessages();
 showMessageFormIfLoggedIn();
 const config = {removePlugins: ['Heading', 'List', 'ImageUpload', 'Table', 'MediaEmbed']};
 ClassicEditor.create(document.getElementById('message-input'), config);
 ClassicEditor.create(document.getElementById('about-me-input'), config);
}

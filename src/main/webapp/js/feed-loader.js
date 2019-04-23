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

const urlParams = new URLSearchParams(window.location.search);

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
  const parameterTag = urlParams.get('tag');
  let url = '/feed';
  if (parameterTag != null) {
    url += '?tag=' + parameterTag;
  }
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
 //1
 const post = document.createElement('div');
 post.classList.add("post");
 //2
 const postProfile = document.createElement('div');
 postProfile.classList.add("post-profile");
 //3
 const postProfileImage = document.createElement('div');
 postProfileImage.classList.add("post-profile-img");
 //3
 const usernameDiv = document.createElement('div');
 usernameDiv.classList.add("post-profile-name");
 usernameDiv.classList.add("text-box");
 usernameDiv.appendChild(document.createTextNode(message.user));
 //2
 const text = document.createElement('div');
 text.classList.add("post-text");
 text.classList.add("text");

 var regex = /@(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;
 var found;
 while ((found = regex.exec(message.text)) !== null) {
   var foundEmail = found[0].substring(1);
   message.text = message.text.replace(found[0], foundEmail.fontcolor("red").link("/user-page.html?user=" + foundEmail));
 }

 regex = /\B\#[a-zA-Z]+\b(?!;)/g
 var found;
 while ((found = regex.exec(message.text)) !== null) {
  var foundTag = found[0].substring(1);
  message.text = message.text.replace(found[0], "<a href=\"/feed.html?tag=" + foundTag + "\"><font color=\"blue\">" + foundTag + "</font></a>");
}

 text.innerHTML = message.text;
 //2
 const imageDiv = document.createElement('div');
 imageDiv.classList.add("post-img");

 if(message.imageUrl) {
   imageDiv.innerHTML += '<img class = "post-img-src" src="' + message.imageUrl + '" />';
 }

const url = '/about?user=' + message.user;
fetch(url)
       .then((response) => {
         return response.text();
       })
       .then((user) => {
         parsedUser = JSON.parse(user)
         console.log(parsedUser);
         if(parsedUser.imageUrl) {
           postProfileImage.innerHTML += '<img class = "post-profile-img-src" src="' + parsedUser.imageUrl + '" />';
         }
   });

 post.appendChild(postProfile);
 post.appendChild(text);
 post.appendChild(imageDiv);
 postProfile.appendChild(postProfileImage);
 postProfile.appendChild(usernameDiv);

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

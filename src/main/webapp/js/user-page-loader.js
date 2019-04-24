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

// Get ?user=XYZ parameter value
const urlParams = new URLSearchParams(window.location.search);
const parameterUsername = urlParams.get('user');

// URL must include ?user=XYZ parameter. If not, redirect to homepage.
if (!parameterUsername) {
  window.location.replace('/');
}

/** Sets the page title based on the URL parameter username. */
function setPageTitle() {
  document.getElementById('page-title').innerText = parameterUsername;
  document.title = parameterUsername + ' - User Page';
}

/**
 * Shows the message form if the user is logged in and viewing their own page.
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
          if (loginStatus.username == parameterUsername) {
            const aboutMeForm = document.getElementById('about-me-form');
            aboutMeForm.classList.remove('hidden');
            fetchImageUploadUrlAndShowForm();
            fetchImageUploadProfileAndShowForm();
          }
        }
      });
}

function fetchImageUploadUrlAndShowForm() {
  fetch('/image-upload-url?call=profile')
      .then((response) => {
        return response.text();
      })
      .then((imageUploadUrl) => {
        const messageForm = document.getElementById('message-form');
        messageForm.action = imageUploadUrl;
        messageForm.classList.remove('hidden');
        document.getElementById('recipientInput').value = parameterUsername;
      });
}

function fetchImageUploadProfileAndShowForm() {
  fetch('/image-upload-profile')
      .then((response) => {
        return response.text();
      })
      .then((imageUploadUrl) => {
        const aboutMeForm = document.getElementById('about-me-form');
        aboutMeForm.action = imageUploadUrl;
        aboutMeForm.classList.remove('hidden');
        document.getElementById('userInput').value = parameterUsername;
      });
}

/** Fetches messages and add them to the page. */
function fetchMessages() {
  const parameterLanguage = urlParams.get('language');
  let url = '/messages?user=' + parameterUsername;
  if (parameterLanguage) {
    url += '&language=' + parameterLanguage;
  }
  fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((messages) => {
        const messagesContainer = document.getElementById('message-container');
        if (messages.length == 0) {
          messagesContainer.innerHTML = '<p>This user has no posts yet.</p>';
        } else {
          messagesContainer.innerHTML = '';
        }
        messages.forEach((message) => {
          const messageDiv = buildMessageDiv(message);
          messagesContainer.appendChild(messageDiv);
        });
        const messagesContainerContainer = document.getElementById('message-container-container');
        messagesContainerContainer.appendChild(messagesContainer);
      });
}

/** Fetches about me and adds to the page. */
function fetchAboutMe() {
  const url = '/about?user=' + parameterUsername;
  fetch(url)
      .then((response) => {
        return response.text();
      })
      .then((user) => {
        parsedUser = JSON.parse(user)
        const aboutMeContainer = document.getElementById('about-me-container');
        if (parsedUser.aboutMe == undefined) {
          parsedUser.aboutMe = 'This user has not entered any information yet.';
        }
        aboutMeContainer.innerHTML = parsedUser.aboutMe;
        if(parsedUser.imageUrl) {
          aboutMeContainer.innerHTML += '<br/>';
          aboutMeContainer.innerHTML += '<img src="' + parsedUser.imageUrl + '" />';
        }
  });
}

/**
 * Builds an element that displays the message.
 * @param {Message} message
 * @return {Element}
 */
function buildMessageDiv(message) {
  /*const headerDiv = document.createElement('div');
  headerDiv.classList.add('message-header');
  headerDiv.classList.add('padded');
  var my_message = message.user + ' - ' + new Date(message.timestamp) +
      ' Sentiment Score: [' + message.sentimentScore + ']';
  headerDiv.appendChild(document.createTextNode(my_message));
  const bodyDiv = document.createElement('div');
  bodyDiv.classList.add('message-body');*/
  //1
  const post = document.createElement('div');
  post.classList.add("post");
  post.classList.add("align-right");
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

  var mapDiv;
  if(message.imageUrl) {
    imageDiv.innerHTML += '<img class = "post-img-src" src="' + message.imageUrl + '" />';
    mapDiv = document.createElement('div');
    mapDiv.classList.add("post-img-map");
    mapDiv.classList.add("box");
    mapDiv.onclick = function () { window.location.href = "sfmaps.html"; };
    imageDiv.appendChild(mapDiv);
    //heyheyhey
    mapDiv.innerHTML += '<img class = "post-img-map-icon" src="https://image.flaticon.com/icons/svg/67/67347.svg"/>';
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

function buildLanguageLinks() {
  const userPageUrl = '/user-page.html?user=' + parameterUsername;
  const languagesListElement = document.getElementById('languages');
  languagesListElement.appendChild(createListItem(createLink(userPageUrl + '&language=en', 'English')));
  languagesListElement.appendChild(createListItem(createLink(userPageUrl + '&language=zh', 'Chinese')));
  languagesListElement.appendChild(createListItem(createLink(userPageUrl + '&language=hi', 'Hindi')));
  languagesListElement.appendChild(createListItem(createLink(userPageUrl + '&language=es', 'Spanish')));
  languagesListElement.appendChild(createListItem(createLink(userPageUrl + '&language=ar', 'Arabic')));
  languagesListElement.appendChild(createListItem(createLink(userPageUrl + '&language=ja', 'Japanese')));
}

/** Fetches data and populates the UI of the page. */
function buildUI() {
  setPageTitle();
  buildLanguageLinks();
  showMessageFormIfLoggedIn();
  fetchMessages();
  fetchAboutMe();
  const config = {removePlugins: ['Heading', 'List', 'ImageUpload', 'Table', 'MediaEmbed']};
  ClassicEditor.create(document.getElementById('message-input'), config);
  ClassicEditor.create(document.getElementById('about-me-input'), config);
}

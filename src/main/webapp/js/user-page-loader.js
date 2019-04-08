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
          messageForm.action = '/messages?recipient=' + parameterUsername;
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
  fetch('/image-upload-url')
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
        if (parsedUser.aboutMe == '') {
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
  const headerDiv = document.createElement('div');
  headerDiv.classList.add('message-header');
  var my_message = message.user + ' - ' + new Date(message.timestamp) +
      ' Sentiment Score: [' + message.sentimentScore + ']';
  headerDiv.appendChild(document.createTextNode(my_message));
  const bodyDiv = document.createElement('div');
  bodyDiv.classList.add('message-body');
  bodyDiv.innerHTML = message.text;

  if(message.imageUrl) {
  bodyDiv.innerHTML += '<br/>';
  bodyDiv.innerHTML += '<img src="' + message.imageUrl + '" />';
  }

  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message-div');
  messageDiv.appendChild(headerDiv);
  messageDiv.appendChild(bodyDiv);

  return messageDiv;
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

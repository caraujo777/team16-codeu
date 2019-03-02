/* Week 2: Stats Page
Author: Anna Kawakami
Date: 03/02/19
*/

//Retrieves the number of messages that all users have posted. 
function fetchStats(){
    const url = '/stats';
    fetch(url).then((response) => {
      return response.json();
    }).then((stats) => {
      const statsContainer = document.getElementById('stats-container');
      statsContainer.innerHTML = '';

      const messageCountElement = buildStatElement('Message count: ' + stats.messageCount);
      statsContainer.appendChild(messageCountElement);
    });
  }

  function buildStatElement(statString){
   const statElement = document.createElement('p');
   statElement.appendChild(document.createTextNode(statString));
   return statElement;
  }

  // Fetch data and populate the UI of the page.
  function buildUI(){
   fetchStats();
  }
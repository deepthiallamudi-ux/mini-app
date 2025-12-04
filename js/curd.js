
import {dataBase} from '../js/metadata.js';

const name = document.getElementById('name')
const saveButton = document.getElementById('saveButton');
const userList = document.getElementById('contactList');

// Set up a click event listener for the save button
saveButton.onclick = function () {
    // Retrieve the value from the name input field and remove whitespace with trim()
    const contactName = name.value.trim();
    
    // Validate that the name is not empty
    if (contactName === '') {
        alert('Please enter a contact name');
        return;
    }
    
    // Send a POST request to the database JSON file
    fetch(`${dataBase}.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: contactName })
    })
    .then(response => response.json())
    .then(() => {
        // Clear the input field after successful submission
        name.value = ''; 
        // Reload the contact list to display the new contact
        loadContacts();
    })
    .catch(error => console.error('Error saving contact:', error));
};

// Define a function to fetch and display all contacts from the database
function loadContacts() {
    // Fetch the database JSON file
    fetch(`${dataBase}.json`)
        // Convert the response to JSON format
        .then(response => response.json())
        // Handle the parsed data
        .then(data => {
            // Clear the existing contact list HTML
            userList.innerHTML = '';
            
            // Loop through each contact in the data object
            for (const key in data) {
                // Add each contact's name as a list item to the userList
                userList.innerHTML += `<li>${data[key].name} </li>`;
            }
        });
}

// Call the loadContacts function to display existing contacts when the page loads
loadContacts();
// let data = [
//     { id: 1, sno: 1, name: "name", email: "email" },
//     { id: 2, sno: 2, name: "name", email: "email" }
// ]

// function readAll() {
//     localStorage.setItem("object", JSON.stringify(data));
//     var tabledata = document.querySelector(".data_table");
//     var object = localStorage.getItem('object');
//     var objectdata = JSON.parse(object);
//     var elements = "";

//     objectdata.map(record => {
//         if (record.name !== "" && record.email !== "") {
//             elements += `<tr> 
//                  <td>${record.sno}</td>        
//                  <td>${record.name}</td>
//                  <td>${record.email}</td>
//                  <td class="">
//                  <button class="edit" onclick="edit(${record.id})">Edit</button>
//                  <button class="delete" onclick="delet(${record.id})">Delete</button> 
//                  <td> 
//             </tr>`;
//         } else {
//             elements += `<tr>
//             <td>${record.sno}</td>
//             <td>${record.name}</td>
//             <td>${record.email}</td>
//             <td class="td"></td>
//             </tr>`;
//         }
//     })
//     tabledata.innerHTML = elements;
// }

// function delet(id) {
//     data = data.filter(rec => rec.id !== id);
//     readAll();
// }

// function create() {
//     document.querySelector(".create_form").style.display = "block";
// }

// function add() {
//     var nameInput = document.querySelector(".name");
//     var emailInput = document.querySelector(".email");
//     var nameMessage = document.querySelector(".name-message");
//     var emailMessage = document.querySelector(".email-message");

//     var name = nameInput.value.trim();
//     var email = emailInput.value.trim();

//     // Check if the name or email already exists
//     if (isDuplicate(name, email)) {
//         nameMessage.innerHTML = "This name has already taken";
//         emailMessage.innerHTML = "This email has already taken";
//         return;
//     }


//     if (name === '' || email === '') {
//         nameMessage.innerHTML = "Please enter required fields"; // Display error message
//         emailMessage.innerHTML = "Please enter required fields"; // Display error message
//         return;  // Do not proceed further if fields are empty
//     }

//     var newSno = data.length + 1;

//     var newId = Math.max(...data.map(rec => rec.id)) + 1;

//     var newObject = { id: newId, sno: newSno, name: name, email: email };
//     data.push(newObject);

//     nameInput.value = '';
//     emailInput.value = '';
//     nameMessage.innerHTML = '';
//     emailMessage.innerHTML = '';

//     readAll();
// }

// function isDuplicate(name, email) {
//     return data.some(record => record.name.toLowerCase() === name.toLowerCase() || record.email.toLowerCase() === email.toLowerCase());
// }


// function edit(id) {
//     document.querySelector('.update_form').style.display = "block";
//     var obj = data.find(rec => rec.id === parseInt(id));
//     document.querySelector('.uname').value = obj.name;
//     document.querySelector('.uemail').value = obj.email;
//     document.querySelector('.id').value = obj.id;
// }

// function update() {
//     var id = parseInt(document.querySelector('.id').value);
//     var name = document.querySelector('.uname').value;
//     var email = document.querySelector('.uemail').value;

//     var index = data.findIndex(rec => rec.id === id);
//     data[index] = { id, name, email };

//     document.querySelector('.update_form').style.display = 'none';

//     readAll();
// }

// function saveData(){
//     localStorage.setItem("data", dataContainer.innerHTML);
    
// }

// function showTask(){
//     dataContainer.innerHTML = localStorage.getItem("data");
// }
// showTask();

let data = JSON.parse(localStorage.getItem('data')) || [
    { id: 1, sno: 1, name: "Email Marli", email: "email@gmail.com" },
    { id: 2, sno: 2, name: "Heyy", email: "heyy@gmail.com" }
];

var objectdata;

function readAll() {
    localStorage.setItem("data", JSON.stringify(data));
    var tabledata = document.querySelector(".data_table");
    var object = localStorage.getItem('data');
    objectdata = JSON.parse(object);
    var elements = "";

    objectdata.map(record => {
        if (record.name !== "" && record.email !== "") {
            elements += `<tr> 
                 <td>${record.sno}</td>        
                 <td>${record.name}</td>
                 <td>${record.email}</td>
                 <td class="">
                 <button class="edit" onclick="edit(${record.id})"><i class="fa-solid fa-trash"></i>Edit</button>
                 <button class="delete" onclick="delet(${record.id})"><i class="fa-regular fa-pen-to-square"></i>Delete</button>
                 <button class="copy" onclick="copy(${record.id})"><i class="fa-regular fa-copy"></i></i>Copy</button>
                 </td> 
            </tr>`;
        } else {
            elements += `<tr>
            <td>${record.sno}</td>
            <td>${record.name}</td>
            <td>${record.email}</td>
            </tr>`;
        }
    })
    tabledata.innerHTML = elements;
}

function copy(recordId) {
    // Find the record with the given id
    var recordToCopy = objectdata.find(record => record.id === recordId);

    // Make a copy of the record (you can customize this as needed)
    // var copiedRecord = { ...recordToCopy, id: generateUniqueId() };

    // Make a copy of the record with only name and email properties
    // var copiedRecord = { sno: recordToCopy.sno, name: recordToCopy.name, email: recordToCopy.email };

    // Format the copied data as a string with tabs
    // var copiedRecordString = `${recordToCopy.sno}\t${recordToCopy.name}\t${recordToCopy.email}`;

    // Convert the copied record to a string
    var copiedRecordString = JSON.stringify(`${recordToCopy.name}${recordToCopy.email}`);

    // Copy the string to the clipboard
    copyToClipboard(copiedRecordString);

    // Optionally, you can notify the user that the record has been copied
    // alert('Record copied to clipboard. You can now paste it wherever you want.');
}

// Function to copy a string to the clipboard
function copyToClipboard(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}
// function generateUniqueId() {
//     return new Date().getTime();
// }

function delet(id) {
    data = data.filter(rec => rec.id !== id);
    localStorage.setItem("data", JSON.stringify(data)); // Update localStorage
    readAll();
    alert('Are you sure you want to delete this record?');
}

function create() {
    document.querySelector(".create_form").style.display = "block";
}

function add() {
    var nameInput = document.querySelector(".name");
    var emailInput = document.querySelector(".email");
    var nameMessage = document.querySelector(".name-message");
    var emailMessage = document.querySelector(".email-message");

    var name = nameInput.value.trim();
    var email = emailInput.value.trim();

    // Check if the name already exists
    if (isDuplicateName(name)) {
        nameMessage.innerHTML = "This name has already taken";
        return;
    }

    // Check if the email already exists
    if (isDuplicateEmail(email)) {
        emailMessage.innerHTML = "This email has already taken";
        return;
    }

    if (name === '' || email === '') {
        nameMessage.innerHTML = "Please enter required fields"; // Display error message
        emailMessage.innerHTML = "Please enter required fields"; // Display error message
        return;  // Do not proceed further if fields are empty
    }

    if (
        (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/) && (nameMessage.innerHTML = 'Please Enter full name')) ||
        (!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) && (emailMessage.innerHTML = 'Please Enter Valid Email'))
      ) {
        return false;
      }

    var newSno = data.length + 1;

    var newId = Math.max(...data.map(rec => rec.id)) + 1;

    var newObject = { id: newId, sno: newSno, name: name, email: email };
    data.push(newObject);

    localStorage.setItem("data", JSON.stringify(data)); // Update localStorage

    nameInput.value = '';
    emailInput.value = '';
    nameMessage.innerHTML = '';
    emailMessage.innerHTML = '';

    readAll();
}

function isDuplicateName(name) {
    return data.some(record => record.name.toLowerCase() === name.toLowerCase());
}

function isDuplicateEmail(email) {
    return data.some(record => record.email.toLowerCase() === email.toLowerCase());
}

function isDuplicate(name, email) {
    return isDuplicateName(name) || isDuplicateEmail(email);
}

function edit(id) {
    document.querySelector('.update_form').style.display = "block";
    var obj = data.find(rec => rec.id === parseInt(id));
    document.querySelector('.uname').value = obj.name;
    document.querySelector('.uemail').value = obj.email;
    document.querySelector('.id').value = obj.id;    
    document.querySelector('.create_form').style.display = "none";    
}

// function update() {
//     var id = parseInt(document.querySelector('.id').value);
//     var name = document.querySelector('.uname').value;
//     var email = document.querySelector('.uemail').value;

//     var index = data.findIndex(rec => rec.id === id);
//     data[index] = { id, name, email };

//     localStorage.setItem("data", JSON.stringify(data)); // Update localStorage

//     document.querySelector('.update_form').style.display = 'none';

//     readAll();
// }

function update() {
    document.querySelector('.create_form').style.display = "block";    
    var id = parseInt(document.querySelector('.id').value);
    var name = document.querySelector('.uname').value;
    var email = document.querySelector('.uemail').value;
    

    var existingRecord = data.find(rec => rec.id === id);

    if (existingRecord) {
        // Update the existing record without changing the serial number
        existingRecord.name = name;
        existingRecord.email = email;

        localStorage.setItem("data", JSON.stringify(data)); // Update localStorage

        document.querySelector('.update_form').style.display = 'none';

        readAll();
    }
}
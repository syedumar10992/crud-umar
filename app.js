let data = [
    { id: 1, name: "Umar Syed", email: "mu8175660@gmail.com" },
    { id: 2, name: "Syed umar", email: "su8175660@gmail.com" }
]



function readAll() {
    localStorage.setItem("object", JSON.stringify(data));
    var tableData = document.querySelector(".data_table");
    var object = localStorage.getItem('object');
    var objectData = JSON.parse(object);
    var elements = "";

    objectData.map(record => {
        if (record.name !== "" && record.email !== "") {
            elements += `<tr>
                 <td>${record.name}</td>
                 <td>${record.email}</td>
                 <td class="">
                     <button class="edit" onclick="edit(${record.id})">Edit</button>
                     <button class="delete" onclick="delet(${record.id})">Delete</button>
                 </td>    
            </tr>`;
        } else {
            elements += `<tr>
                <td>${record.name}</td>
                <td>${record.email}</td>
                <td class=""></td> 
            </tr>`;
        }
    })
    tableData.innerHTML = elements;
}

function delet(id) {
    data = data.filter(rec => rec.id !== id);
    readAll();
}

function create(){
    document.querySelector (".create_form").style.display = "block";
}

function add(){
    var nameInput = document.querySelector(".name");
    var emailInput = document.querySelector(".email");
    var nameMessage = document.querySelector(".name-message");
    var emailMessage = document.querySelector(".email-message");

    var name = nameInput.value.trim();
    var email = emailInput.value.trim();

    if (name === '' || email === '') {
        nameMessage.innerHTML = "Please enter required fields"; // Display error message
        emailMessage.innerHTML = "Please enter required fields"; // Display error message
        return;  // Do not proceed further if fields are empty
    }


    // Generate a new id for the new record
    var newId = Math.max(...data.map(rec => rec.id)) +1;

    var newObject = { id: newId, name: name, email: email};
    data.push(newObject);

    // Reset the input fields
    nameInput.value = '';
    emailInput.value = '';
    
    readAll();

}

function isDuplicate(name, email) {
    return data.some(record => record.name.toLowerCase() === name.toLowerCase() || record.email.toLowerCase() === email.toLowerCase());
}


function edit(id){
    document.querySelector('.update_form').style.display = 'block';
    var obj = data.find(rec => rec.id === parseInt(id));
    document.querySelector('.uname').value = obj.name;
    document.querySelector('.uemail').value = obj.email;
    document.querySelector('.id').value = obj.id;
}

function update(){
    var id = parseInt(document.querySelector('.id').value);
    var name = document.querySelector('.uname').value;
    var email = document.querySelector('.uemail').value;

    var index = data.findIndex(rec => rec.id === id);
    data[index] = {id, name, email};

    document.querySelector('.update_form').style.display = 'none';

    readAll();
}


// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Login function
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            document.getElementById('login').style.display = 'none';
            document.getElementById('admin').style.display = 'block';
        })
        .catch(error => {
            document.getElementById('login-error').textContent = error.message;
        });
}

// Show add member form
function showAddMemberForm() {
    const adminContent = document.getElementById('admin-content');
    adminContent.innerHTML = `
        <h3>Add Member</h3>
        <input type="text" id="member-name" placeholder="Member Name">
        <input type="email" id="member-email" placeholder="Member Email">
        <button onclick="addMember()">Add Member</button>
        <p id="add-member-error" class="error"></p>
    `;
}

// Add member to Firestore
function addMember() {
    const name = document.getElementById('member-name').value;
    const email = document.getElementById('member-email').value;

    db.collection("members").add({
        name: name,
        email: email,
        joinedAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        alert("Member added successfully!");
        showMembers();
    })
    .catch(error => {
        document.getElementById('add-member-error').textContent = error.message;
    });
}

// Show members
function showMembers() {
    const adminContent = document.getElementById('admin-content');
    db.collection("members").get().then(querySnapshot => {
        adminContent.innerHTML = '<h3>Members</h3>';
        querySnapshot.forEach(doc => {
            adminContent.innerHTML += `<p>${doc.data().name} (${doc.data().email})</p>`;
        });
    });
}

// Show create bills form
function showBills() {
    const adminContent = document.getElementById('admin-content');
    adminContent.innerHTML = `
        <h3>Create Bill</h3>
        <input type="text" id="bill-member-email" placeholder="Member Email">
        <input type="number" id="bill-amount" placeholder="Amount">
        <button onclick="createBill()">Create Bill</button>
        <p id="create-bill-error" class="error"></p>
    `;
}

// Create bill
function createBill() {
    const email = document.getElementById('bill-member-email').value;
    const amount = document.getElementById('bill-amount').value;

    db.collection("bills").add({
        email: email,
        amount: amount,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        alert("Bill created successfully!");
        showBills();
    })
    .catch(error => {
        document.getElementById('create-bill-error').textContent = error.message;
    });
}

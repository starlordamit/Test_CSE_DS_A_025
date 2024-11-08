// Path: /script.js

const users = [{ username: "testuser", password: "password123" }];

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;
    const messageElement = document.getElementById("loginMessage");

    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      messageElement.textContent = "Login successful!";
      messageElement.style.color = "green";

      setTimeout(() => {
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("dashboardContainer").style.display = "block";
        document.getElementById(
          "welcomeMessage"
        ).textContent = `Welcome, ${username}`;
      }, 1000);
    } else {
      messageElement.textContent = "Invalid username or password";
      messageElement.style.color = "red";
    }
  });

async function fetchGitHubUsers() {
  const response = await fetch("https://api.github.com/users");
  const data = await response.json();
  return data.slice(0, 10);
}

function displayUsers(users) {
  const userList = document.getElementById("userList");
  userList.innerHTML = "";
  users.forEach((user) => {
    const listItem = document.createElement("li");
    listItem.textContent = user.login;
    listItem.style.color = "blue";
    listItem.style.cursor = "pointer";
    userList.appendChild(listItem);
  });
}

document
  .getElementById("fetchButton")
  .addEventListener("click", async function () {
    const users = await fetchGitHubUsers();
    displayUsers(users);
    window.currentUsers = users;
  });

document
  .getElementById("sortOptions")
  .addEventListener("change", function (event) {
    const sortOption = event.target.value;
    let sortedUsers = [...window.currentUsers];

    if (sortOption === "alphabetical") {
      sortedUsers.sort((a, b) => a.login.localeCompare(b.login));
    }

    displayUsers(sortedUsers);
  });

document.getElementById("logoutButton").addEventListener("click", function () {
  document.getElementById("dashboardContainer").style.display = "none";
  document.getElementById("loginContainer").style.display = "block";
  document.getElementById("loginMessage").textContent = "";
  document.getElementById("loginForm").reset();
});

const listURL = "http://localhost:3005/api/v1/items";

const listcontainer = document.getElementById("list-container");

getTodos();

async function getTodos() {
  const response = await fetch(listURL)
    .then((response) => response.json())
    .catch((error) => console.log(error));

  if (response.items.lenght === 0) return;
  response.items.forEach((element) => {
    let li = document.createElement("li");
    li.innerHTML = element.text;
    li.id = element.id;
    if (element.checked === true) li.classList.add("checked");
    listcontainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  });
}

async function addTask() {
  const inputBox = document.getElementById("input-box");
  if (inputBox.value === "") return;
  const response = await sendRequest(listURL, "POST", { text: inputBox.value });
  if (response.id) {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    li.id = response.id;
    inputBox.value = "";
    listcontainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
}

listcontainer.addEventListener(
  "click",
  async function (e) {
    if (e.target.tagName === "LI") {
      const response = await sendRequest(listURL, "PUT", {
        id: e.target.id,
        checked: e.target.classList.contains("checked"),
      });
      if (response.ok) {
        e.target.classList.toggle("checked");
      }
    } else if (e.target.tagName === "SPAN") {
      const response = await sendRequest(listURL, "DELETE", {
        id: e.target.parentElement.id,
      });
      if (response.ok) {
        e.target.parentElement.remove();
      }
    }
  },
  false
);

function sendRequest(url, method, body) {
  return fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
}


import { sendPrompt } from "../server";
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal");
  const userInput = document.getElementById("message");
  const userInputSend = document.getElementById("send-button");
  const chatHistory = document.getElementById("chat-history");
  const btn = document.querySelector(".fa-plus");
  const span = document.getElementsByClassName("close")[0];
  const addActivityBtn = document.getElementById("add-activity");
  const newActivityInput = document.getElementById("new-activity");
  const boxColumn = document.querySelector(".box-column");
  const numSpan = document.querySelector(".box-header .num");

  btn.onclick = function () {
    modal.style.display = "block";
  };

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  addActivityBtn.onclick = function () {
    const newActivity = newActivityInput.value.trim();
    if (newActivity !== "") {
      const newBox = document.createElement("div");
      newBox.className = "box";
      newBox.innerHTML = `
        <input type="checkbox" />
        <label>${newActivity}</label>
      `;
      boxColumn.appendChild(newBox);
      newActivityInput.value = "";

      const currentNum = parseInt(numSpan.textContent);
      numSpan.textContent = currentNum + 1;

      modal.style.display = "none";
    }
  };

  userInputSend.addEventListener('click') = async function () {
    const messageContent = userInput.value;

    var newMessage = document.createElement("div");
    newMessage.className = "chat-message right";
    newMessage.textContent = messageContent;
    chatHistory.appendChild(newMessage);

    userInput.setAttribute("disabled", true);
    const generatedContent = await sendPrompt(messageContent);
    userInput.removeAttribute("disabled");

    var newMessageBot = document.createElement("div");
    newMessageBot.className = "chat-message left";
    newMessageBot.textContent = generatedContent;
    chatHistory.appendChild(newMessageBot);
  };
});

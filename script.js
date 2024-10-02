let enterbtn = document.getElementById("enter");
let itemList = document.getElementById("items");

function updateTaskIndices() {
    const items = itemList.querySelectorAll("li");
    items.forEach((item, index) => {
        const indexSpan = item.querySelector(".index-span");
        indexSpan.textContent = `${index + 1}.`; 
    });
}

enterbtn.addEventListener("click", function () {
    let content = document.getElementById("inputbox").value;
    if (content) {
        const li = document.createElement('li');
        li.style.display = "grid";
        li.style.gridTemplateColumns = "auto 1fr 1fr auto"; 
        li.style.alignItems = "center"; 
        li.style.width = "100%"; 
        li.style.marginBottom = "10px"; 

        // Index number
        const indexSpan = document.createElement("span");
        indexSpan.className = "index-span"; 
        indexSpan.textContent = `${itemList.children.length + 1+", "}`;
        indexSpan.style.textAlign = "center"; 

        // Task text
        const taskText = document.createElement("span");
        taskText.textContent = content;

        // Timestamp
        const timestamp = document.createElement("div");
        const currentDate = new Date();
        timestamp.textContent = `${currentDate.toLocaleDateString()} | ${currentDate.toLocaleTimeString()}`;
        timestamp.style.textAlign = "center"; 

        // Button container
        const buttonContainer = document.createElement("div");
        buttonContainer.style.display = "flex";
        buttonContainer.style.gap = "5px"; 

        const donebtn = document.createElement("button");
        donebtn.textContent = "Done";

        const editbtn = document.createElement("button");
        editbtn.style.backgroundColor = "lightgrey";
        editbtn.textContent = "Edit";

        const deletebtn = document.createElement("button");
        deletebtn.textContent = "Delete";
        deletebtn.style.backgroundColor = "#FF8A8A";
        deletebtn.style.width = "60px";

        // Add buttons to the button container
        buttonContainer.appendChild(donebtn);
        buttonContainer.appendChild(editbtn);
        buttonContainer.appendChild(deletebtn);

        // Add index, task text, timestamp, and button container to the list item
        li.appendChild(indexSpan);
        li.appendChild(taskText);
        li.appendChild(timestamp);
        li.appendChild(buttonContainer);

        itemList.appendChild(li);

        // Delete task
        deletebtn.addEventListener("click", function () {
            li.remove();
            updateTaskIndices();
        });

        // Mark task as done
        donebtn.addEventListener("click", function () {
            taskText.style.textDecoration = "line-through";
        });

        // Edit task
        editbtn.addEventListener("click", function () {
            document.getElementById("inputbox").value = content; 
            li.remove(); 
            updateTaskIndices(); 

            enterbtn.onclick = function () {
                let updatedTask = document.getElementById("inputbox").value;
                if (updatedTask) {
                    taskText.textContent = updatedTask; 
                    taskText.appendChild(timestamp); 

                    document.getElementById("inputbox").value = "";
                    itemList.appendChild(li); 
                    enterbtn.onclick = null;
                    updateTaskIndices(); 
                }
            };
        });

        // Clear the input field after adding the task
        document.getElementById("inputbox").value = "";
        document.getElementById("items").appendChild(li);

        updateTaskIndices(); 
    }
});

window.onload = function () {
    const select = document.createElement("select");
    select.id = "topicSelect";
    const contentDiv = document.createElement("div");
    contentDiv.id = "content";
  
    const disclaimer = document.querySelector(".disclaimer");
    disclaimer.after(select);
    select.after(contentDiv);
  
    // Fetch the text file
    fetch("text/reactans.txt")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.text();
      })
      .then((text) => {
        // Define escapeHtml function to sanitize the text
        function escapeHtml(unsafe) {
          return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
        }
  
        contentDiv.innerHTML = `<pre><code class="language-txt">${escapeHtml(
          text
        )}</code></pre>`;
        Prism.highlightAll();
  
        const topicsList = [
          "1. Create a Stateless Functional Component",
          "2. Create a Stateful Class Component",
          "3. Implementation of Conditional Rendering using Class Component",
          "4. Implementation of Communication (Parent-child) between Components",
          "5. Create material UI Card using React",
          "6. Implementation of FORM validation in React",
          "7. Implementation of Routing in React",
          "8. Implementation of a Dropdown component using React  ",
          "9. Implementation of React component to handle HTTP requests",
          "10. Design a Custom Navigation bar using React",
          "10.1. FORM validation (must install Material UI)"
        ];
  
        const sections = text.split("END");
  
        select.innerHTML = "";
  
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Select a Topic";
        select.appendChild(defaultOption);
  
        topicsList.forEach((topic, index) => {
          const option = document.createElement("option");
          option.value = index;
          option.textContent = topic;
          select.appendChild(option);
        });
  
        select.addEventListener("change", function () {
          if (this.value === "") {
            contentDiv.innerHTML = `<pre><code class="language-txt">${escapeHtml(
              text
            )}</code></pre>`;
          } else {
            const selectedContent = sections[this.value].trim();
            contentDiv.innerHTML = `<pre><code class="language-txt">${escapeHtml(
              selectedContent
            )}</code></pre>`;
          }
          Prism.highlightAll();
        });
      })
      .catch((error) => {
        console.error("Error loading file:", error);
        contentDiv.innerHTML =
          '<p style="color: red;">Error loading content. Please refresh the page.</p>';
      });
  };
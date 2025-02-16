document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("send-button").addEventListener("click", async function () {
        let input = document.getElementById("user-input").value;
        let chatBox = document.getElementById("chat-messages");

        chatBox.innerHTML += `<p><b>You:</b> ${input}</p>`;
        document.getElementById("user-input").value = ""; // Clear input field

        try {
            const response = await fetch("http://127.0.0.1:5000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: input  // Send user's message to backend
                })
            });

            let jsonResponse = await response.json();
            if (jsonResponse.choices) {
                let botReply = jsonResponse.choices[0].message.content;
                chatBox.innerHTML += `<p><b>AI:</b> ${botReply}</p>`;
            } else {
                chatBox.innerHTML += `<p><b>AI:</b> Error: No response received.</p>`;
            }
        } catch (error) {
            chatBox.innerHTML += `<p><b>AI:</b> Error fetching response. Check API connection.</p>`;
        }
    });
});

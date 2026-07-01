const API_BASE = "http://localhost:3008/agepdesign";

const form = document.getElementById("contactForm");
const message = document.getElementById("formMessage");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.innerText = "Sending...";

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const subject = document.getElementById("subject");

  console.log(name);
  console.log(email);
  console.log(phone);
  console.log(subject);

  const data = {
    name: name?.value?.trim() || "",
    email: email?.value?.trim() || "",
    contact: phone?.value?.trim() || "", // ✅ Correct key
    subject: subject?.value?.trim() || "",
  };

  console.log(data);

  try {
    console.log("Sending request...");

    const response = await fetch(`${API_BASE}/contactform`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("Status:", response.status);

    const text = await response.text();

    console.log("Response:", text);

    const result = JSON.parse(text);

    if (response.ok) {
      message.style.color = "green";
      message.innerHTML = result.message;
      form.reset();
    } else {
      message.style.color = "red";
      message.innerHTML = result.message;
    }
  } catch (err) {
    console.error("ERROR:", err);

    message.innerHTML = err.message;
  }

  submitBtn.disabled = false;
  submitBtn.innerText = "Send Your Response";
});

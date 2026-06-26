<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $contact = $_POST["contact"];
    $subject = $_POST["subject"];

    $to = "ajinkya@ageep-international.com"; // Replace with your email address
    $subject = "New Contact Form Submission";

    $headers = "From: $email";

    // You can customize the email body as needed
    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Contact:$contact\n";
    $body .= "Subject:$subject\n";


    // Send the email
    mail($to, $subject, $body, $headers);

    // Redirect to a thank you page or display a success message
    header("Location: thank_you.html");
    exit();
}
?>
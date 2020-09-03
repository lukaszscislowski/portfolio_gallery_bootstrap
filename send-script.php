<?php

$mailToSend = "lukas.scislowski@gmail.comgit";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    $errors = [];
	$return = [];

    if (empty($name)) { //if value is empty
        array_push($errors, "name");
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { //check email
        array_push($errors, "email");
    }
    if (empty($message)) {
        array_push($errors, "message");
    }

    if (count($errors) > 0) {
        $return["errors"] = $errors;
    } else {
        //before send massage, we sets headers
        $headers  = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type: text/html; charset=UTF-8". "\r\n";
        $headers .= "From: ".$email."\r\n";
        $headers .= "Reply-to: ".$email;
        $message  = "
            <html>
                <head>
                    <meta charset=\"utf-8\">
                </head>
                <body>
                    <div> Imię: $name</div>
                    <div> Email: <a href=\"mailto:$email\">$email</a> </div>
                    <div> Wiadomość: </div>
                    <div> $message </div>
                </body>
            </html>";

        if (mail($mailToSend, "Wiadomość ze strony - " . date("d-m-Y"), $message, $headers)) {
            $return["status"] = "ok";
        } else {
            $return["status"] = "error";
        }
    }

    header("Content-Type: application/json");
    echo json_encode($return);
}
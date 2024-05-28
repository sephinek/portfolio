<?php

if(isset($_POST['submit'])) {
  $mailto = 'sephine.k31@gmail.com';

  $name = $_POST['name'];
  $fromEmail = $_POST['email'];
  $subject = 'Submitted Message via Portfolio';
  $subject2 = 'Confirmation: Message was submitted successfully!';

  $message = 'Client name: ' . $name . '\n'
  . 'Client Message: ' . '\n' . $_POST['message'];

  $message2 = 'Dear' . $name . '\n'
  . 'Thank you for contacting me. I will get back to you shortly!' . '\n\n'
  . 'Regards,' . '\n' . 'Sephine';


  $headers = 'From: ' . $fromEmail;
  $headers2 = 'From: ' . $mailto;

  $result1 = mail($mailto, $subject, $message, $headers);
  $result2 = mail($fromEmail, $subject2, $message2, $headers2);

  if ($result1 && $result2) {
    $success = 'Your message was sent successfully!';
  } else {
    $failed = 'Sorry! Message was not sent, try again later.';
  }

}

?>;
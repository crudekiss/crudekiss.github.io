<?php
// Define the log file path
$logFile = 'visits_log.txt';

// Get the current date and time
$currentDateTime = date('Y-m-d H:i:s');

// Prepare the log entry
$logEntry = "Visited on: " . $currentDateTime . "\n";

// Append the log entry to the file
file_put_contents($logFile, $logEntry, FILE_APPEND);

// Display a message to the visitor
echo "Thank you for visiting! Your visit has been logged.";
?>

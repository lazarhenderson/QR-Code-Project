/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

/**
 * Checkbox list examples
 */

import inquirer from "inquirer";
import fs from "fs";
import qr from "qr-image";

// Function to generate a QR code and save it as an image
function generateQRCode(url, filename) {
  const qrImage = qr.image(url, { type: "png" });
  qrImage.pipe(fs.createWriteStream(`${filename}.png`));
}

// Prompt the user for input
inquirer
  .prompt([
    {
      type: "input",
      name: "url",
      message:
        "Enter the URL to convert to a QR code (e.g: https://google.com):",
    },
    {
      type: "input",
      name: "filename",
      message: "Enter the name for the QR code image (e.g., qrcode):",
    },
  ])
  .then((answers) => {
    const { url, filename } = answers;

    // Generate QR code
    generateQRCode(url, filename);

    // Save user input to a text file
    fs.writeFile(
      "user_input.txt",
      `Entered URL: ${url}\nImage Filename: ${filename}`,
      (err) => {
        if (err) {
          console.error("Error saving user input:", err);
        } else {
          console.log("User input and QR code generated successfully.");
        }
      }
    );
  })
  .catch((error) => {
    console.error("Error:", error);
  });

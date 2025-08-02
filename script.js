// Add an event listener to the form to handle submission
// When the form is submitted, this function will run
document.getElementById('qr-form').addEventListener('submit', function(e) {
    // Prevent the default form submission (which would reload the page)
    e.preventDefault();
    // Get the value entered by the user in the URL input field
    var url = document.getElementById('url-input').value;
    // Get the container where the QR code will be displayed
    var qrcodeContainer = document.getElementById('qrcode');
    // Clear any previous QR code from the container
    qrcodeContainer.innerHTML = '';
    // Get the download button
    var downloadBtn = document.getElementById('download-btn');
    
    // If the user entered a URL, generate a new QR code
    if (url) {
        new QRCode(qrcodeContainer, {
            text: url, // The text (URL) to encode in the QR code
            width: 256, // Width of the QR code
            height: 256, // Height of the QR code
            colorDark : "#000000", // Color of the QR code dots
            colorLight : "#ffffff", // Background color of the QR code
            correctLevel : QRCode.CorrectLevel.H // Error correction level (high)
        });
        
        // Enable the download button after a short delay to ensure QR code is rendered
        setTimeout(function() {
            downloadBtn.disabled = false;
        }, 300);
    } else {
        // If no URL, disable download button
        downloadBtn.disabled = true;
    }
});

// Add event listener for the download button
document.getElementById('download-btn').addEventListener('click', function() {
    var qrcodeContainer = document.getElementById('qrcode');
    var qrImage = qrcodeContainer.querySelector('img');
    
    if (qrImage) {
        // Create a temporary anchor element
        var link = document.createElement('a');
        link.href = qrImage.src;
        link.download = 'qrcode.png'; // Set the filename for download
        document.body.appendChild(link);
        link.click(); // Trigger the download
        document.body.removeChild(link); // Clean up
    } else {
        alert('Please generate a QR code first!');
    }
});
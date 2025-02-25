document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("urlInput");
    const generateBtn = document.getElementById("generateBtn");
    const qrCorner = document.querySelector(".qr-corner");
    
    generateBtn.addEventListener("click", function () {
        let url = inputField.value.trim();

        // Validate input
        if (isUrlValid(url) === false) {
            alert("Please enter a valid URL.");
            return;
        }

        // Remove any existing QR code image
        qrCorner.innerHTML = "<p>Scan Me</p>";

        // Create a new QR code canvas
        let qrCanvas = document.createElement("canvas");
        qrCorner.appendChild(qrCanvas);

        // Generate the QR code
        QRCode.toCanvas(qrCanvas, url, {
            width: 100,
            height: 100
        }, function (error) {
            if (error) {
                console.error("QR Code generation error:", error);
                return;
            }

            // Convert canvas to PNG and replace the image
            let img = document.createElement("img");
            img.src = qrCanvas.toDataURL("image/png");
            img.alt = "QR Code";

            // Style image (optional)
            img.style.width = "100px";
            img.style.height = "100px";
            img.style.border = "2px solid #3f72af";
            img.style.borderRadius = "5px";

            // Replace canvas with image
            qrCorner.innerHTML = "<p>Scan Me</p>";
            qrCorner.appendChild(img);
        });
    });
});

function isUrlValid(userInput) {
    var res = userInput.match(/^(https?:\/\/)?([\w.-]+\.[a-zA-Z]{2,})/);
    return res !== null;
}

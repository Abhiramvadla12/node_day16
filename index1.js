const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");

app.use(express.urlencoded({ extended: true }));

let store = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, 'anime')); // Ensure it's the correct directory
    },
    filename: (req, file, callback) => {
        // Clean filename by replacing spaces with underscores (avoids issues with URLs)
        callback(null, file.originalname);
    }
});

let upload = multer({ storage: store });

// Handle form submission and redirect to /success
app.post("/register", upload.single("file"), (req, res) => {
    const { username, email } = req.body;
    const profilepic = req.file ? `${encodeURIComponent(req.file.filename)}` : null; // Correct file path

    // Redirect to /success with query parameters
    res.redirect(`/success?name=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&profilepic=${encodeURIComponent(profilepic)}`);
});

// Serve the success page
app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, 'success.html'));
});

let port = 3000;
app.listen(port, () => {
    console.log(`Server has started at http://localhost:${port}`);
});

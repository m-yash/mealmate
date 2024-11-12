// // In routes/user.js or a similar file

// In routes/user.js or a similar file
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer setup for file uploads with absolute path
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);  // Ensure absolute path
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// Update profile route
router.put('/update-profile', upload.single('food_handling_certificate'), async (req, res) => {
    try {
        const { email, newEmail, name, phone, currentPassword, newPassword, location } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User  not found' });

        const updates = {};
        if (name) updates.name = name;
        if (newEmail) {
            const existingUser  = await User.findOne({ email: newEmail });
            if (existingUser ) return res.status(400).json({ message: 'Email already in use' });
            updates.email = newEmail; // Update the email field
        }
        if (phone) updates.phone = phone;
        if (location) updates.location = JSON.parse(location);

        // Password handling
        if (currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
            if (!isMatch) return res.status(400).json({ message: 'Incorrect current password' });
            updates.password_hash = await bcrypt.hash(newPassword, 10);
        }

        // File handling
        if (req.file) {
            // Check if there are existing certificates and delete the old file if it exists
            if (user.food_handling_certificates && user.food_handling_certificates.length > 0) {
                const oldFilePath = path.join(__dirname, '../', user.food_handling_certificates[0]);
                console.log(`Attempting to delete old file: ${oldFilePath}`);

                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath); // Delete the old file
                    console.log(`Deleted old file: ${oldFilePath}`);
                } else {
                    console.warn(`Old file not found: ${oldFilePath}`);
                }
            }

            // Update food_handling_certificates to only include the new file
            updates.food_handling_certificates = [`uploads/${req.file.filename}`];
            updates.role = 'chef'; // Assuming you want to set the role to chef
        }

        const updatedUser  = await User.findOneAndUpdate({ email }, updates, { new: true });
        res.json(updatedUser );
    } catch (error) {
        console.error('Error in updating profile:', error);
        res.status(500).json({ message: 'Error updating profile' });
    }
});

module.exports = router;
// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const multer = require('multer');
// const upload = multer();

// // Update profile route
// router.put('/update-profile', upload.single('food_handling_certificate'), async (req, res) => {
//     try {
//       const { email, newEmail, name, phone, currentPassword, newPassword, location } = req.body;
  
//       const user = await User.findOne({ email });
//       if (!user) return res.status(404).json({ message: 'User not found' });
  
//       const updates = {};
//       if (name) updates.name = name;
//       if (newEmail) updates.newEmail = newEmail;
//       if (phone) updates.phone = phone;
//       if (location) updates.location = JSON.parse(location);
  
//       if (currentPassword && newPassword) {
//         const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
//         if (!isMatch) return res.status(400).json({ message: 'Incorrect current password' });
//         updates.password_hash = await bcrypt.hash(newPassword, 10);
//       }
//       if (newEmail) {
//         const existingUser  = await User.findOne({ email: newEmail });
//         if (existingUser ) return res.status(400).json({ message: 'Email already in use' });
//         updates.email = newEmail; // Update the email field
//     }
  
//       if (req.file) {
//         updates.food_handling_certificates = user.food_handling_certificates || [];
//         updates.food_handling_certificates.push(`uploads/${req.file.filename}`);
//         updates.role = 'chef';
//       }
  
//       const updatedUser = await User.findOneAndUpdate({ email }, updates, { new: true });
//       res.json(updatedUser);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Error updating profile' });
//     }
//   });
  
//   module.exports = router;
// // Update profile route
// router.put('/update-profile', upload.single('food_handling_certificate'), async (req, res) => {
//   try {
//     const userId = req.user._id; // Assuming user ID is available from authentication middleware
//     const { name, email, phone, currentPassword, newPassword, location } = req.body;
    
//     const updates = {};
//     if (name) updates.name = name;
//     if (email) updates.email = email;
//     if (phone) updates.phone = phone;
//     if (location) updates.location = JSON.parse(location);

//     if (currentPassword && newPassword) {
//       const user = await User.findById(userId);
//       const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
//       if (!isMatch) return res.status(400).json({ message: 'Incorrect current password' });
//       updates.password_hash = await bcrypt.hash(newPassword, 10);
//     }

//     if (req.file) {
//       const certificatePath = `uploads/${req.file.filename}`;
//       updates.food_handling_certificates = [certificatePath];
//       updates.role = 'chef';
//     }

//     const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
//     res.json(updatedUser);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error updating profile' });
//   }
// });

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const bcrypt = require('bcrypt');
// const multer = require('multer');
// const upload = multer();

// // Update profile route
// router.put('/update-profile', upload.single('food_handling_certificate'), async (req, res) => {
//   try {
//     const userId = req.user._id; // Assuming the user ID is available from authentication middleware
//     const { name, email, phone, currentPassword, newPassword } = req.body;

//     const updates = {};

//     if (name) updates.name = name;
//     if (email) updates.email = email;
//     if (phone) updates.phone = phone;

//     if (currentPassword && newPassword) {
//       const user = await User.findById(userId);
//       const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
//       if (!isMatch) return res.status(400).json({ message: 'Incorrect current password' });
//       updates.password_hash = await bcrypt.hash(newPassword, 10);
//     }

//     if (req.file) {
//       const certificatePath = `uploads/${req.file.filename}`; // Customize path as needed
//       updates.food_handling_certificates = [certificatePath]; // Replace or add new certificate
//     }

//     const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
//     res.json(updatedUser);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error updating profile' });
//   }
// });

// module.exports = router;

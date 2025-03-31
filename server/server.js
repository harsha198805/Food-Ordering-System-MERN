const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./Database/Connect');
const path = require('path'); 

const postMessageRoute = require('./routes/postmessage.route');
const getMessageRoute = require('./routes/getmessage.route');
const getSpecificRoute = require('./routes/getmessagebyid.route');
const updateMessageRoute = require('./routes/updatemessage.route');
const deleteMessageRoute = require('./routes/deletemessage.route');

const register = require('./routes/register.route');
const login = require('./routes/login.route');
const loginJWT = require('./routes/login.route.JWT');

const postMessageAuthenticateRoute = require('./routes/postmessageauthenticate.route');
const getMessageAuthenticateRoute = require('./routes/getmessageauthenticate.route');
const getUserMessageRoute = require('./routes/getmessageofuser.route.js');

const restaurantRoute = require('./routes/admin/restaurant.route');
const adminRoute = require('./routes/admin.route'); // Import the admin route

const foodItemRoute = require('./routes/admin/fooditem.route'); 


require('dotenv').config();
connectDB(process.env.MONGODB_URL);



const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use('/post-message',postMessageRoute);
app.use('/get-message',getMessageRoute);
app.use('/get-specific-message',getSpecificRoute);
app.use('/update-message',updateMessageRoute);
app.use('/delete-message',deleteMessageRoute);

app.use('/register',register);
app.use('/login',login);
app.use('/loginJWT',loginJWT);

app.use('/post-message-authenticate',postMessageAuthenticateRoute);
app.use('/get-message-authenticate',getMessageAuthenticateRoute);
app.use('/user-message',getUserMessageRoute);

app.use('/restaurants', restaurantRoute);
app.use('/food-items', foodItemRoute);

app.use('/admin', adminRoute);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

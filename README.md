# Node-Mongo-Express-user_create_delete_edit
Node JS, Mongo DB, Express,     create user and edit and delete and get all users,  using postman

Create a user which takes 2 parameters email and password. Enforce strong password rule and add validation for email format.     
API Endpoint:   
POST: /user/create – User creation with a meaningful message if the user email or password is invalid)

Update the user email address and password.    
API Endpoint:    
POST: /user/edit – Add validations for correct email and password

Delete the product by taking the email and password as input.   
Api Endpoint:   
DELETE: /user/delete

Get all the users email addresses and passwords stored in the database.    
API Endpoint:   
GET: /user/getAll

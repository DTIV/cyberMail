---
description: How to deploy CyberMail locally
---

# Get Started

#### Clone Repository

{% embed url="https://github.com/DTIV/cyberMail" %}

#### Get a MongoDB URI

Create a MongoDB Atlas Cloud Account and get a URI to connect to the database.

{% embed url="https://account.mongodb.com/account/login?signedOut=true" %}

#### Create a .env file

Create a .env file in the server root directory with index.js &#x20;

The env file should include the MONGO\_URL

Insert your username and password in the URI where \[USER] and \[PASSWORD] are located.

```
MONGO_URL = "mongodb+srv://[USER]:[PASSWORD]@cluster0.jrbh4.mongodb.net/cyberMailDB?retryWrites=true&w=majority"
```

#### Install dependencies for the server

```
npm install
```

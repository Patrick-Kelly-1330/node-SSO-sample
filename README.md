# Node Example Application powered by WorkOS

Sample application that demonstrates how to use the [WorkOS Node SDK](https://github.com/workos-inc/workos-node) for SSO and Directory Sync

# Deployed Application Details

Deployed app:  https://samplessoworkos.onrender.com

**Deployment note:** given that I have used a free service via Render, the initial load of the deployed site may take up to 20 seconds. 

# Application Demo and Login Flow 
1. Visit https://samplessoworkos.onrender.com
2. Select _Log In_
3. Enter the email of the test user listed below 
4. Via Okta, enter the emmail and password of the test user listed below
5. Select _View Team Members_ to view list of group members from Okta directory

**Test User Credentials**

username: michaelanderson@arandomwinner.com

password: workosPassword1

# Application Demo 
![deployedSSOsampleworkOS](https://user-images.githubusercontent.com/51098314/233248709-aba596b0-8fff-4ded-b549-c67ad1a17a2e.gif)

# Local Setup and Application Demo

**Preqequisite**: Node.js version 10+

**Local Install Instructions**

1. Clone the main repo

```
git clone https://github.com/Patrick-Kelly-1330/node-SSO-sample.git
```
2. Navigate into the node-sso-example directory 
```
cd node-sso-sample/node-sso-example
```

3. Install the dependencies
```
npm install
```

4. Run the application
```
npm start
```
**Local Demo Instructions**

Initial step: create an .env file in the main directory to store your API Key and Client ID. 

```
WORKOS_API_KEY = your_api_key_here
WORKOS_CLIENT_ID = your_client_id_here
```

1. Visit https://localhost:8000
2. Select _Log In_
3. Enter the email of the test user listed above 
4. Via Okta, enter the emmail and password of the test user listed above
5. Select _View Team Members_ to view list of group members from Okta directory

## For more information, please see the following guides:

- [Single Sign-On](https://workos.com/docs/sso/guide)
- [API Reference](https://workos.com/docs/reference)

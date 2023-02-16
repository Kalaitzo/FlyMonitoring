# FlyMonitoring - High Security Room Monitoring Application (Project 12.1)

## Overview - Architecture

This project is an IOT web application developed with <a href=https://deno.land/>Deno</a> and the framework 
<a href=https://fresh.deno.dev/>Fresh</a> that provides monitoring for high security rooms. In order to simulate
some real life scenarios, some virtual sensors have been implemented using 
<a href=https://nodered.org/>Node-RED</a>. Also some real sensor data are shown on the website. The application is
deployed online using <a href=https://deno.com/deploy>Deno Deploy</a>

## Prerequisites

You can either use this application by installing <strong>Node-RED</strong> 
and accessing the website at the link presented below or locally by also installing 
<strong>Deno</strong>, 
downloading the source code,
creating an account on the <strong>mailgun</strong> service
and creating
your own <strong>MongoDB</strong> database using <strong>Atlas</strong>.

<ul>
    <li>
        To install <strong>Node-RED</strong> and run it locally follow the instructions 
        for your system specifications on the 
        <a href=https://nodered.org/docs/getting-started/local>Running Node-RED locally</a> page 
        on the Node-Red website
    </li>
    <br>
    <li>
        If you want to run the application locally you have to also install <b>Deno</b> by 
        following the instructions for your system specifications found on the 
        <a href="https://deno.land/manual@v1.30.3/getting_started/installation">Deno Installation</a> 
        page,
        create an account on the <a href="https://www.mailgun.com/">mailgun</a> service
        and follow the 
        <a href="https://www.mongodb.com/docs/atlas/getting-started/">Get Started with Atlas</a>
        instructions in order to deploy your cluster with your database
    </li>
</ul>

## Deploy Node-RED

After Node-RED has been installed you can run it locally by typing the following command on a terminal:
<br>

```
node-red
```

Access the Node-RED editor by pointing your browser at <a>http://localhost:1880</a> 
<br>
Then import the flows found at this repository (flows.json) by following the steps bellow:

<ol>
    <li>Click on the hamburger icon at the top right of the Node-RED editor page next to the "Deploy" button</li>
    <li>Select Import</li>
    <li>Either copy the all content of the flows.json file and paste it to the clipboard window or if you have the
        file downloaded click the "select a file to import" button and select the file on your computer
    </li>
    <li>Click the "Import" button</li>
</ol>
Finally click the red "Deploy" button at the top right to deploy the flows

<br>

The flows used for the application are:
<ul>
    <li>Temperature-Humidity Sensor Flow</li>
    <li>Tag Sensor Flow</li>
    <li>Water Sensor Flow</li>
    <li>Smoke Sensor Flow</li>
    <li>Dust Sensor Flow</li>
    <li>Rack Temperature Sensors Flow</li>
    <li>Door Sensor Flow</li>
    <li>Alert-Check</li>
</ul>

## Access the application online (Recommended)

After Node-RED has been deployed you can use the application as stated above by visiting the 
online deployed version at:

### <a href=https://fly-monitoring.deno.dev/>fly-monitoring.deno.dev</a>

To log in to the app you can use the following credentials:
<ul>
    <li>Username: admin</li>
    <li>Password: pass</li>
</ul>

<hr>

**_NOTE:_**  !! The following further instructions are needed only if you want to <u>run the application locally</u> !!

<hr>

## MongoDB Atlas Database
After the cluster has been deployed by following the instructions linked before create a database, with any name,
containing the following collections:
<ul>
    <li>DoorSensor</li>
    <li>DustSensor</li>
    <li>FluidLevelSensor</li>
    <li>RackTemperatureSensors</li>
    <li>RealMove</li>
    <li>RealTempHum</li>
    <li>SmokeSensor</li>
    <li>TagSensor</li>
    <li>TemperatureSensor</li>
    <li>users</li>
</ul>

**_NOTE:_**  You shouldn't insert any documents on the Sensor collections. The documents will be created and inserted
by Node-RED which at this point should be installed and deployed
<br>
**_NOTE:_**  Insert any user credentials (username, password) you want to test in the "users" collection.

## Mailgun Authorized Recipient

After the mailgun account has been created you must add the Authorized Recipient you want to receive the alerts from the 
application to your mailgun domain. To do so follow the 
<a href=https://help.mailgun.com/hc/en-us/articles/217531258-Authorized-Recipients>Authorized Recipients</a> 
instructions from the mailgun help center

## Run the application locally 

### Install the source code
Some options to install the source code are:
<ul>
    <li>
        Clone the repository by following the instructions on the 
        <a href=https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository>
            Github Docs
        </a>
    </li>
    <li>
        Download a .zip with the source code
    </li>
</ul>

#### Download ZIP
<ol>
    <li>Click on the green "Code" button</li>
    <li>Click on the "Download ZIP" button</li>
    <li>Select the path where the zip will be downloaded and then extract it</li>
</ol>

### Create your .env file 
At this point you have your database deployed on MongoDB Atlas, you have successfully deployed Node-RED and 
you have your domain ready on the mailgun service. In order to
run the source code locally you need to create a .env file with the following variables
#### MongoDB Atlas Variables
The environmental variables needed for MongoDB Atlas are:

```
DB=<DATABASE_NAME>
API_KEY=<ATLAS_API_KEY>
ENDPOINT=<DATABASE_URL_ENDPOINT>
DATA_SOURCE=<CLUSTER_NAME>
```

**_NOTE:_**  Be careful to instantly copy and paste ATLAS_API_KEY when you create it on the Data API tab on MongoDB Atlas
because afterwards you won't be able to access it, and you'll have to create another one

#### Mailgun Variables
The environmental variables needed for mailgun are the following:
<br>

```
EMAIL=<SENDER_EMAIL>
RECV_EMAIL=<RECIPIENT_EMAIL>
API_KEY_MAILGUN=<MAILGUN_API_KEY>
MAILGUN_DOMAIN=<MAILGUN_DOMAIN_NAME>
```

**_NOTE:_**  The MAILGUN_API_KEY is not the one that is sent to you after you created the account. You must access it 
form the API keys tab on the Overview page of your domain (Private API key).
**_NOTE_** The RECIPIENT_EMAIL must be saved as an Authorized Recipient and also be verified.

### Run the source code
For this part a code editor is needed (e.g. Visual Studio Code)
#### Install Visual Studio Code
<ul>
    <li>To install Visual Studio Code choose the correct version for your system specifications on the 
    <a href=https://code.visualstudio.com/Download>Visual Studio Code Download</a> page</li>
</ul>

After you have Visual Studio Code installed some changes must be done to the source code in order to access the 
environmental variables mentioned above found in the .env file provided by us

#### Modify the source code
<ul>
    <li>mongodb.ts</li>
    <ol>
        <li>Open the "mongodb.ts" file found at <strong>model/</strong></li>
        <li>Uncomment the commented lines of code (line 2 to line 8) by removing the '//' from their beginning</li>
        <li>Comment the lines from line 9 to line 12 by adding '//' at their beginning</li>
    </ol>
    <li>alert-email.ts</li>
    <ol>
        <li>Open the "alert-email.ts" file found at the <strong>routes/api/</strong></li>
        <li>Uncomment the commented lines of code (line 8 and line 61 ot line 65) by removing the '//' from their beginning</li>
        <li>Comment the lines from line 57 to line 60 by adding '//' at their beginning</li>
    </ol>
</ul>


Finally, after those changes have been completed you can run the source code by typing the following command to a 
terminal:
<br>
```
deno task start
```

The message ```Listening on http://localhost:8000``` should be printed on your terminal. Navigate to localhost and log 
in to the application
<br>

**_NOTE:_**  You can log in to the application by using a set of credentials you have inserted as a document
(e.g. {username:"test", password:"1234"} ) to the users collection as stated above
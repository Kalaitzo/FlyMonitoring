<h1>High security room monitoring application </h1>

<h2>Requirements</h2>

You can either use this application by installing Node-RED 
and accessing the website at the link presented below or by also installing Deno, cloning this repository and
running the code locally

<ul>
    <li>
        To install <strong>Node-RED</strong> and run it locally follow the instructions 
        for your system specifications on the 
        <a href=https://nodered.org/docs/getting-started/local>Running Node-RED locally</a> page 
        on the Node-Red website
    </li>
    <br>
    <li>
        If you want to run the web application locally you have to also install <b>Deno</b> by 
        following the instructions for your system specifications found on the 
        <a href="https://deno.land/manual@v1.30.3/getting_started/installation">Deno Installation</a> 
        page on the Deno website
    </li>
</ul>

<h2>Deploy Node-RED</h2>
After Node-RED has been installed you can run it locally by typing the following command on a terminal:
<br>

```node-red```
<br>

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
Finally click the red "Deploy" button at the top right

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

<h2>Access the application online</h2>
After Node-RED has been deployed you can use the application as stated above by visiting the 
online deployed version at <a href=https://fly-monitoring.deno.dev/>fly-monitoring.deno.dev</a>
<br>
To log in to the app you can use the following credentials:
<ul>
    <li>Username: admin</li>
    <li>Password: pass</li>
</ul>

<h2>Run the web application locally</h2>
In order to run the code locally access to some environmental variables are needed. In case those variables are provided
to you by us follow the steps bellow
<h3>Install the source code</h3>
You can install the source code with one of the following ways
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

<h4>Download ZIP</h4>
<ol>
    <li>Click on the green "Code" button</li>
    <li>Click on the "Download ZIP" button</li>
    <li>Select the path where the zip will be downloaded and then extract it</li>
</ol>

<h3>Run the source code</h3>
For this part a code editor is needed (e.g. Visual Studio Code)
<h4>Install Visual Studio Code</h4>
<ul>
    <li>To install Visual Studio Code by choosing the correct version for your system specifications on the 
    <a>visual studio code download</a> page</li>
</ul>

After you have Visual Studio Code installed some changes must be done to the source code in order to access the 
environmental variables mentioned above found in the .env file provided by us

<ol>
    <li>Open the "mongodb.ts" file found at the directory: model/</li>
    <li>Uncomment the commented lines of code (line 2 to line 8) by removing the '//' added at their beginning</li>
    <li>Comment the lines from line 9 to line 12 by adding '//' at their beginning</li>
</ol>

Finally after those changes have been completed you can run the source code by typing the following command to a 
terminal 
<br>
```deno task start```
<br>
Again you can log in to the app by using the credentials mention above

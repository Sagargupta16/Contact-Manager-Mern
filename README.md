<h1 align="Center">Contact Manager</h1>

<h5 align="center"> Project deployed link -> <a href="https://contact-manager-mern-stack.herokuapp.com/">Contact Manager</a></h5>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- ABOUT THE PROJECT -->
<h2 id="about-the-project"> :pencil: About The Project</h2>

<p align="justify"> 
  Conatact Manger is web application that allows users to manage their contact with there privacy.
</p>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- OVERVIEW -->
<h2 id="overview"> :cloud: Overview</h2>

<p align="justify"> 
  This Project is created as MERN App , This Contains adding contacts , editing them ,deleting them and searching feature followed with each contact individual detail section. Project also contains Switching between dark and light mode . and your theme is saved in local storage so next time you visit your Mode will be same as last time you left,all data is saved at MongoDb Server and this project have 0 refresh rate which done by using routers.
</p>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- Tech Stack -->
<h2 id="language-and-description"> 💻 Tech Stack </h2>

<ul>
  <li><b>Basics</b> - HTML, CSS, and Javascript. </li>
  <li><b>Client</b> - React, Redux, and React Router . </li>
  <li><b>Server</b> - Nodejs, Expressjs and MongoDB . </li>
</ul>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- PROJECT FILES DESCRIPTION -->
<h2 id="project-files-description"> :floppy_disk: Project Files Description</h2>
<h3> Frontend </h3>
<ul>
  <li><b>client/public/index.html</b> - This File contains stylesheets links and root div.</li>
  <li><b>client/src/components/App.js</b> - This Js File imports all other js component files and binds them together with help of router. Its Content is in all over routes</li>
  <li><b>client/src/components/AddContact.js</b> - This Contains html structure of /addcontact route which takes data in form based and pass it to app.js which stores it to the local storage.</li>
  <li><b>client/src/components/App.css</b> - This Contains All styling of each route pages.</li>
  <li><b>client/src/components/ContactCart.js</b> - (card*) This Contains Contact list each individual card detail displayed on front page and edit and delete button as well.</li>
  <li><b>client/src/components/ContactDetails.js</b> - This contains details of individual contacts when tapped on them.</li>
  <li><b>client/src/components/ContactList.js</b> - This Contains Full List of All Contacts. that is being displayed on front page. </li>
  <li><b>client/src/components/EditContact.js</b> - This File Contains the editing page Ui where you can edit contact detail from old data. </li>
  <li><b>client/src/components/Header.js</b> - This contains Header part which is fixed part for every route.</li>
  <li><b>client/src/components/darkmode.js</b> - This contains Dark mode switching feature onclick and also keeps saved mode to local storage. </li>
  <li><b>client/src/components/predata.js</b> - This is array of data which is given from before.</li>
  <li><b>client/src/index.js</b> - This binds App.js to Html root div.</li>
</ul>
<h3> Backend</h3>
<ul>
  <li><b>config/db.js</b> - This Contains Database Connectivity function. </li>
  <li><b>config/default.js</b> - This Contains Database URL (i.e MongoURL). </li>
  <li><b>models/Contact.js</b> - This Contains Structure of Contact. </li>
  <li><b>routes/api/contacts.js</b> - This Contains All CRUD Operation routers To be Performed. </li>
  <li><b>index.js</b> - This is main file of backend or server side. </li>
</ul>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)
 
<h2 id="local build"> 📼 How you can run it Locally</h2>
<ul>
  <li><b>Step-1 </b> - go to code section above and download it as zip. </li>
  <li><b>Step-2 </b> - extract the zip file than open the extracted folder in Vscode. </li>
  <li><b>Step-3 </b> - press ctrl+j in windows it will opern terminal to this folder. </li>
  <li><b>Step-4 </b> - now run command npm run dev which will launch this in localhost:3000 and server at localhost:3006. (if it not redirect you than manually search localhost:3000. </li>
  <li><b>Step-5 </b> - Done now you will be able to see project running on your system. </li>
</ul>


![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

 <h2 id="Project-Images"> Project-Images</h2>
 
  <img src="client/images/1_1.png" alt="contact-manager" width="100%" height="500">
  <img src="client/images/1_2.png" alt="contact-manager" width="100%" height="500">
  <img src="client/images/1_2.png" alt="contact-manager" width="100%" height="500">
  <img src="client/images/1_3.png" alt="contact-manager" width="100%" height="500">
  <img src="client/images/1_4.png" alt="contact-manager" width="100%" height="500">
  <img src="client/images/1_5.png" alt="contact-manager" width="100%" height="500">
  <img src="client/images/1_6.png" alt="contact-manager" width="100%" height="500">
  <img src="client/images/1_7.png" alt="contact-manager" width="100%" height="500">

to run this project, you have to unzip it, then directly open the folder in vsCode
and run the command "npm install" to install all the dependencies,
then open terminal and go to 'api', by running the command 'cd api', the run the 'index.js' file by running the command 'nodemon index.js'. this will start the backend.
now you have to open another terminal, then go to 'client', then install all the dependencies by running 'npm install' command, then start the server by running 'npm run dev' command.

I have used cors, which listens on 'http://localhost:5173' port, if you run the frontend on any other port, then kindly change the port on the cors, the cors is available in 'api/index.js' directory.

there are three pages in this project
1. the first one is admin page, to login in this page you have to enter username as "demo", and the password as "demo".
you will be redirected to admin page, but you can access home page also
2. the second one is editor page, to login in this page you have to enter username as "demo2", and the password as "demo2".
you will be redirected to editor page, but you can access home page also
3. the third one is home/viewer page, to login in this page you have to enter username as "demo3", and the password as "demo3". or you can signUp from any username and login with the same username, it will redirect you to the home page, because the default role is viewer.
All the routes are protected, as to implement RBAC.
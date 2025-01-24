# Backend

## Setup instructions

1. cd to the backend folder
2. npm install
3. then because my window is in restricted mode so it cannot run script, change from the windows powershell
   Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
4. then i will need to compile my typescript file to javascript using 'tsc'
5. then it says 'dotenv' is not recognized as an internal or external command,
   operable program or batch file.
6. went to stackoverflow
   https://stackoverflow.com/questions/61407393/while-running-the-script-throws-cannot-find-module-dotenv
7. add a line of command npm install -g dotenv-cli
8. need to npm install zod
9. need to npm install mysql2 for sql connection
10. uses nodemon to skip the compiling typescript to javascript part

## API endpoint details

1. put mysql configuration in backend/services/db.ts
2. configuration might need to input own password and own database
3. all the routing to frontend in routes folder

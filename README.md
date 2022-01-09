# Shopify - Connor Dong Backend Application
Shopify 2022 Summer Backend

FullStack Application using: Angular, Flask, and a local SQLite db.  
I chose this stack for its ease of installation and development.   
The application is tested with unit tests, as shown in the Testing Section.


## Features
Basic CRUD Functionality.  

Items are shown in a list.   
Selected items highlighted in red and can be edited/deleted.  
Can edit a specific item's price and stock.   
Can delete an item.  
Can add a new item. 

The additional feature is pushing a button to export product data to a CSV.  
A new window will pop out and allow the user to download the CSV file. 

## Setup Instructions
Node.js and Python3 need to be installed.  
There are set up instructions for both the back-end (Flask) and front-end (Angular).

First clone the Github repo.  
### Flask Setup
In the project directory, run:  
```bash
cd api
python -m venv venv 
```
You may need to run the command below if multiple versions of python are installed
``` 
python3 -m venv venv 
```  
To run the virtual environment run:  
Unix:
`. venv/bin/activate`  
Windows:
`.\venv\Scripts\activate`  

Then, run `pip install -r requirements.txt` to install the required dependencies.  
Run `flask run` to start the Flask server.

### Angular Setup
In the project directory, run:
```bash
cd frontend
npm install -g @angular/cli
npm install
ng serve --open
```

Newer versions of node may run into the error 'ERR_OSSL_EVP_UNSUPPORTED'.  
Before running  ```ng serve --open``` run:
```bash
export NODE_OPTIONS=--openssl-legacy-provider
```
This will start the Angular server at http://localhost:4200/ to view in dev mode.  
This is a very simple UI since the problem was back-end focused.  
The view comes prepopulated with 2 entries.


## Testing Instructions
### Backend Unit Tests
Activate the virtual env as shown earlier. 
Run:  
`python -m pytest`

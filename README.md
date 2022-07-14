

# Order Management System

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.4.

## Installation

Run 'npm install' to install all the packages
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Project overview

# 
1. There are majorly 2 sections inside app components Login and User-layout
2. Login is a separate component and once login is done it will be redirected to users users-layout
3. User-layout is a lazy loading module within which we have single orders component where majority of the process is happening
4. To list orders, I have created a static JSON file which is invoked using HTTP client module in a service file
5. Reactive forms are used for creating/editing new orders along with ngx-bootstrap modals and Sweetalert2 for confirmation popups


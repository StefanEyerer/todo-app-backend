# Todo App Backend with Node/Express

This is the Node/Express backend component of a simple Todo Application.

## Getting Started

### Prerequisites

This is a list of prerequisites, that need to be installed on your system:

-   [NodeJS](https://nodejs.org/en/) - JavaScript runtime
-   [NPM](https://www.npmjs.com/) - Node Package Manager

### Installing the dependencies

The following command installs all required dependencies:

```
npm install
```

### Building the application

The following command builds the application:

```
npm run build
```

### Starting the application

The following command starts the application:

```
npm run start       (environment variables need to be configured)
```

## Configuration

The application needs to be configured with environment variables in order to be used.

The following environment variables can be set:

-   DEBUG: can be set to 'app' to enable debug output
-   PORT: the port on which the application will start
-   DATABASE_CONNECTION: the mongodb database connection string
-   ACCESS_TOKEN_SECRET: the secret for the access token
-   REFRESH_TOKEN_SECRET: the secret for the refresh token

## Author

-   **Stefan Eyerer**

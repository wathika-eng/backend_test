<!-- # A simple JSON Server Setup

This file sets up a lightweight REST API using json-server. It reads data from a db.json file and serves it over HTTP. Perfect for prototyping, testing, or mocking APIs.

## Installation

Dependencies:

- [Node.js] v16 only (https://nodejs.org/en/) comes with npm installed

- Node Version Manager (nvm) (https://github.com/nvm-sh/nvm) or Fast Node Manager (fnm) (https://github.com/Schniz/fnm)

- [json-server] v0.16.3 (https://www.npmjs.com/package/json-server)

To install json-server globally, run:

```bash
npm install -g json-server
```

# Setup

```bash
git clone --depth 1 && cd json-server-setup
```

```bash
npm install
```

Run the server while watching for changes in the db.json file:

```bash
npm run dev
```

The server will be running on http://localhost:3000

## Usage

To deploy on render.com, create a new web service and use the following settings:
![renderSettings](/images/image.png)

`.npmrc` file is used to set engine-strict=true to ensure that the correct version of Node.js is used.

`.nvmrc` file is used to specify the version of Node.js to use, if you are using nvm or fnm.

![npmIFails](/images/Screenshot%20From%202024-11-16%2010-07-02.png)
![fnmUse](/images//Screenshot%20From%202024-11-16%2010-07-16.png) -->

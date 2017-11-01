Conferoo Publisher
==================

This is a React client application used to administer an instance of the Conferoo platform for paperless conferences. It requires a running `conferoo-core` application to function.

Publisher makes common content management tasks achievable for non-technical folk, but it does not allow every aspect of the platform to be administered. It does not permit user management, for instance.

Installation
------------

Conferoo Publisher is based on `create-react-app`, so the commands are the same. To spin up a development server, clone the repo, run `npm install` and then `npm start`.

To run in production, do `npm run build` and copy the contents of the build folder to a static web server.

Make sure the values in the config.js file are adjusted to those for your Conferoo installation, particularly the Google Client ID (needed for 'sign in with Google' functionality) and the URL to the `conferoo-core` server.

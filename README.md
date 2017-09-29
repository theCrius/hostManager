HostManager
==================================

Simple application to manage property details.

I used a simple bootstrap/angularJS as frontend but you can easily replace it with whatever float your boat.
Be sure that port 4000 is being kept free for this application to work. Or configure the whole thing as you prefer.

Requirements
---------------

You'll need an up-to-date node, npm, bower, knex and mysql.

Getting Started
---------------

From the root folder of the project:

```sh
knex migrate:latest --knexfile=db/knexfile.js
npm install
cd public; npm install; cd ..
```

Finally run node to start the application:

```sh
node index.js
```

Then head over http://localhost:4000/ and behold the awesomeness of a couple of days of messing around!

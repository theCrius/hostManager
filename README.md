HostManager
==================================

Simple application to manage property details.

I used a simple bootstrap/angularJS as frontend but you can easily replace it with whatever float your boat.
Be sure that port 4000 is being kept free for this application to work.

Requirements
---------------

You need an up-to-date node, npm, bower, and mysql.

Getting Started
---------------

```sh
knex migrate:latest --knexfile=db/knexfile.js
npm install
cd public; npm install; grunt build; cd ..
```

Finally run node to start the application:

```sh
node index.js
```

Then head over http://localhost:4000/

License
-------

MIT

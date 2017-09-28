HostManager
==================================

Simple application to manage property details.

I used a simple bootstrap/angularJS as frontend but you can easile replace it with whatever float your boat.

Requirements
---------------

You need an up-to-date node, npm, bower and mysql.

Getting Started
---------------

Begin setting up the configswer

```sh
cp db/knexfile.sample.js db/knexfile.js
cp .env.sample .env
cp public/constants.sample.js public/constants.js
```

Be sure that the values inside those files match your development environment.

```sh
knex migrate:latest --knexfile=db/knexfile.js
npm install
cd public; npm install; cd ..
```

Finally run node to start the application:

```sh
node index.js
```

Then head over http://localhost:4000/

License
-------

MIT

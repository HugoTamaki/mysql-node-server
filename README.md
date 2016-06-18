# Node Server with mysql connection

## To run at development environment

Create a database called `nodeserver`

Create a contacts table

```
CREATE TABLE contacts (id INTEGER AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), phone VARCHAR(255), carrier_id INTEGER)
```

Create a carriers table

```
CREATE TABLE carriers (id INTEGER AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))
```

Run `node server.js` and it will listen to port 8000.

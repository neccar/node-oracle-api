# node-oracle-api (wip)

express based rest api connecting to oracle db

 you need 
cd into main directory

```bash
docker build -t nodeoracleapi .
```

then make check the image

```bash
docker images
```

then run it as below

```bash
docker run -i -p 3131:3131 nodeoracleapi
```

navigate to

<http://localhost:31/api/customers>

## API

```sh
# sign up
curl -X POST localhost:3000/signup \
-H 'Content-Type: application/json' \
-d '{"email": "lx@gmail.com", "password": "12345678", "confirm": "12345678", "name": "lx"}'

# sign in
curl -X POST localhost:3000/signin \
-H 'Content-Type: application/json' \
-d '{"email": "lx@gmail.com", "password": "12345678"}'

# sign out
curl -X POST localhost:3000/signout
```

## Docker

```sh
# mongo
docker exec -it db-container mongosh -u admin -p pass test

# redis
docker exec -it cache-container redis-cli -a pass
```

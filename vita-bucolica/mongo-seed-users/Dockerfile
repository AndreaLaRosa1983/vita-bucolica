FROM mongo

COPY users.json /collections/users.json

CMD mongoimport --host mongodb --db test --collection users --type json  --file /collections/users.json --jsonArray
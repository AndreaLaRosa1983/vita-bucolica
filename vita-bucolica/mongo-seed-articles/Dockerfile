FROM mongo

COPY postmessages.json /collections/postmessages.json

CMD mongoimport --host mongodb --db test --collection postmessages --type json  --file /collections/postmessages.json --jsonArray
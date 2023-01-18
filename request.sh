curl -i \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: super duper secret" \
  --data '{"title":"Bumi Manusia", "author": "Pramoedya Ananta Toer"}' \
  http://localhost:3000/add
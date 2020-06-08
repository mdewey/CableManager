docker build -t CableManager-image .

docker tag CableManager-image registry.heroku.com/CableManager/web


docker push registry.heroku.com/CableManager/web

heroku container:release web -a CableManager
up-app:
	docker-compose up -d --force-recreate app

up-auth:
	docker-compose up -d --force-recreate auth

up-sync:
	docker-compose up -d --force-recreate sync

up-getaway:
	docker-compose up -d --force-recreate --build getaway

up-mongo:
	docker-compose up -d --force-recreate mongo

up: up-app up-auth up-sync up-getaway up-mongo

logs:
	docker-compose logs -f

install-app:
	docker-compose run --rm app "npm install"

install-auth:
	docker-compose run --rm auth "npm install"

install-sync:
	docker-compose run --rm sync "npm install"

install: install-app install-auth install-sync

into-app:
	docker-compose exec app bash

into-auth:
	docker-compose exec auth bash

into-sync:
	docker-compose exec sync bash

into-getaway:
	docker-compose exec getaway bash

into-mongo-db:
	docker-compose exec mongo mongo bible-tracker

unrootify:
	sudo chown -R $$(id -u):$$(id -g) .

getaway/certs:

	docker run --name tmp-nginx-container -d nginx \
					|| (docker rm -f tmp-nginx-container \
					&& docker run --name tmp-nginx-container -d nginx)
	docker exec tmp-nginx-container apt update
	docker exec tmp-nginx-container apt install openssl 
	docker exec tmp-nginx-container mkdir /etc/nginx/certs
	docker exec tmp-nginx-container \
					openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
									-subj "/C=US/ST=Denial/L=Springfield/O=Dis/CN=app.lvh.me" \
									-keyout /etc/nginx/certs/lvh.me.key \
									-out /etc/nginx/certs/lvh.me.crt
	docker exec tmp-nginx-container \
					openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
									-subj "/C=US/ST=Denial/L=Springfield/O=Dis/CN=penguin.linux.test" \
									-keyout /etc/nginx/certs/penguin.linux.test.key \
									-out /etc/nginx/certs/penguin.linux.test.crt
	docker cp tmp-nginx-container:/etc/nginx/certs getaway/certs
	docker rm -f tmp-nginx-container


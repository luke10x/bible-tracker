up-app:
	docker-compose up -d --force-recreate app

up-auth:
	docker-compose up -d --force-recreate auth

up-sync:
	docker-compose up -d --force-recreate sync

up: up-app up-auth up-sync

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
	docker-compose 	exec sync bash

unrootify:
	sudo chown -R $$(id -u):$$(id -g) .

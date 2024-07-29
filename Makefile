.PHONY: tests
# Inspired from https://www.strangebuzz.com/en/snippets/the-perfect-makefile-for-symfony
USER_ID:=$(shell id -u)
GROUP_ID:=$(shell id -g)

export USER_ID
export GROUP_ID

# Alias
PHP_CONTAINER = score-lib-php

DOCKER = docker
DOCKER_EXEC = ${DOCKER} exec -it --user user ${PHP_CONTAINER}
SYMFONY =  ${DOCKER_EXEC} symfony
CONSOLE = ${DOCKER_EXEC} bin/console
COMPOSER = ${DOCKER_EXEC} composer
FRONT_EXEC = ${DOCKER_EXEC} npm

VERSION := $(shell $$SHELL -c 'echo $$ZSH_VERSION')
read_param = $(if $(2), $(shell echo $(2)), $(if $(strip $VERSION), $(shell $$SHELL -c 'read param\?"$(1) : "; echo $$param'), $(shell $$SHELL -c 'read "$(1) : " param; echo $$param')))

help: ## Outputs this help screen
	@grep -E '(^[a-zA-Z0-9_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

## —— Docker ————————————————————————————————————————————————————————————
build: down ## Docker container up (including build)
	${DOCKER} compose up -d --build

up: down ## Docker container up (without build)
	${DOCKER} compose up -d

down: ## Docker container down
	${DOCKER} compose down

bash-php: ## Access the PHP container
	${DOCKER_EXEC} bash

execute: ## Execute a command in the PHP container
	${DOCKER_EXEC} $(filter-out $@,$(MAKECMDGOALS))

## —— Composer ————————————————————————————————————————————————————————————
install: ## Install the project dependencies
	${COMPOSER} install

update: ## Update the project dependencies
	${COMPOSER} update

require: ## Require a new package
	${COMPOSER} require $(filter-out $@,$(MAKECMDGOALS))

require-dev: ## Require a new package
	${COMPOSER} require --dev $(filter-out $@,$(MAKECMDGOALS))

## —— Frontend ————————————————————————————————————————————————————————————
front-install: ## Install the project dependencies
	${FRONT_EXEC} install

front-require: ## Require a new package
	${FRONT_EXEC} install $(filter-out $@,$(MAKECMDGOALS))

front-require-dev: ## Require a new package
	${FRONT_EXEC} install --save-dev $(filter-out $@,$(MAKECMDGOALS))

front-build-dev: ## Build the assets in dev mode
	${FRONT_EXEC} run dev

front-watch: ## Watch the assets
	${FRONT_EXEC} run watch

front-build-prod: ## Build the assets in prod mode
	${FRONT_EXEC} run build
## —— Doctrine ————————————————————————————————————————————————————————————
db-create: db-drop ## Create the database
	${CONSOLE} doctrine:database:create --env=dev

db-drop: ## Drop the database
	${CONSOLE} doctrine:database:drop --force --env=dev

fixtures: db-create migrate ## Load fixtures into the database
	${CONSOLE} doctrine:fixtures:load --no-interaction --env=dev

migration: ## Create a new migration
	${CONSOLE} make:migration

migrate: ## Execute the migrations in DEV environment
	${CONSOLE} doctrine:migrations:migrate --no-interaction --env=dev

## —— Testing ————————————————————————————————————————————————————————————
tests-prepare: ## Prepare the test environment (database / fixtures)
	${CONSOLE} doctrine:database:drop --force --env=test
	${CONSOLE} doctrine:database:create --env=test
	${CONSOLE} doctrine:schema:update --force --env=test
	${CONSOLE} doctrine:fixtures:load --no-interaction --env=test
	${DOCKER_EXEC} chmod 777 var/data.db

tests: ## Launch the tests
	${DOCKER_EXEC} bin/phpunit

tests-domain: ## Launch the domain tests
	${DOCKER_EXEC} bin/phpunit --testsuite=Domain

tests-infrastructure: ## Launch the infrastructure tests
	${DOCKER_EXEC} bin/phpunit --testsuite=Infrastructure

tests-application: ## Launch the application tests
	${DOCKER_EXEC} bin/phpunit --testsuite=Application
## —— Static analysis ————————————————————————————————————————————————————————————
analyze: phpstan php-cs-fixer ## Launch PHPStan and PHP-CS-Fixer
	${CONSOLE} lint:yaml config --parse-tags
	${CONSOLE} lint:twig src/Application/templates
	${CONSOLE} lint:container
	${COMPOSER} validate

phpstan: ## Launch PHPStan
	${DOCKER_EXEC} vendor/bin/phpstan analyse -c phpstan.neon

php-cs-fixer: ## Launch PHP-CS-Fixer
	${DOCKER_EXEC} ci/php-cs-fixer/vendor/bin/php-cs-fixer fix --verbose --config=.php-cs-fixer.config.php

## —— Symfony ————————————————————————————————————————————————————————————
serve: ## Start the Symfony server
	${SYMFONY} serve -d

console: ## Access the Symfony console
	${CONSOLE} $(filter-out $@,$(MAKECMDGOALS))

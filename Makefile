.PHONY: build test

APP_IMAGE_NAME ?= santoshs/beerverse
NODE_ENV ?= test
VERSION ?= 1.0.0

build:
	@docker build -t $(APP_IMAGE_NAME):$(VERSION) --rm .

test: build
	@docker run --rm $(APP_IMAGE_NAME):$(VERSION)
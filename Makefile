install: install-deps install-flow-typed

run:
	npm run babel-node -- 'src/solution.js' 10

install-deps:
	yarn

install-flow-typed:
	npm run flow-typed install

build:
	rm -rf dist
	npm run build

test:
	npm test

check-types:
	npm run flow

lint:
	npm run eslint -- src test

publish:
	npm publish

.PHONY: test

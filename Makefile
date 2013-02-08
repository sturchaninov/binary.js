dev:
	@bower install
	@bower install chai

test: 
	@testacular start --single-run

interactive-test: 
	@testacular start 

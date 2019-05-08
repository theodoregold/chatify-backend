default:
	docker-compose up
live:
	docker-compose -f docker-compose.live.yml run --rm install

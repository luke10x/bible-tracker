# My Bible reading tracker

Fullstack application for tracking your Bible reading progress

## How to run it?

To run this locally make sure you have the following:
- Docker (with Compose)
- GNU Make

To run it for first time:

    make install up logs

Later you can run it without `install`:

    make up logs

## Running it on Chromebook 🔴🟡🟢🔵 

To enable development URLs, source this:

    export $(cat chromebook.env | xargs)

Unfortunatelly, it is currently not possible to run MongoDb v5.0+
on my Lenovo C330 Chromebook, this is why *mongo* container here is locked to v4.

## BFF

Sync service is a Restiful BFF.

Supported methods 1 - POST:

    curl -XPOST -k https://localhost:3003  -H 'Content-Type: application/json' \
      -d'{"start": "2001-01-01T11:11:11", "end": "2001-01-01T12:12:12", "book": "genesis", "chapter": 1}'

Supported methods 2 - GET:

    curl -XGET -k https://localhost:3003

## Troubleshooting

Gateway chashes. It may be because of other services not started yet so proxy creation fails.
try just re-running

    make up-gateway

in a little while, in another tab.

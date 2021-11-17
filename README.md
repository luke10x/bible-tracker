# My readings tracker

## How to run it?

To run this locally make sure you have the following:
- Docker (with Compose)
- GNU Make

To run it for first time:

    make install up logs

Later you can run it without `install`:

    make up logs

## BFF

Sync service is a Restful BFF.

Supported methods:

    curl -XPOST http://localhost:3003 \
        -d'{start: '2001-01-01T11:11:11', end: '2001-01-01T12:12:12', book: "genesis", chapter: 1}'

## Troubleshooting

Gateway chashes. It may be because of other services not started yet so proxy creation fails.
try just re-running

    make up-gateway

in a little while, in another tab.
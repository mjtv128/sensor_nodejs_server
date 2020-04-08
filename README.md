run ```npm install``` then run ```node app.js``` to start the server. 
Then use postman to check the endpoints. 

The threshold value was hardcoded and can be changed depending on the desired threshold value. 

When the threshold value is exceeded, a SMS message notification is sent. ( For this, I hardcoded my own phone number as I could only verify my own number).

# Backend take-home exercise for Converge

The purpose of this exercise is to test your ability to build a basic data
ingestion server in node.js.

The Converge Platform ingests sensor data from our customers' sites (these
could be construction sites, factories, oil wells, etc.), does some processing
(including alerting users for anomalous values) on them, and stores them,
allowing them to be served from an HTTP API. This exercise will see you building
a basic version of the infrastructure required to do this.

## Part one: Data ingestion

The most basic requirement of the application is that it can ingest the data
from sensors, storing them in some form of persistent storage such that these
data can later be queried and retrieved. You will be expected to justify your
choice of persistent storage.

Sensors will send data over HTTP, by making a request to `PUT /data`, with the
following request body:

    {
        sensorId: string,
        time:     int,
        value:    float,
    }

This endpoint should exhibit the following behaviour:

* Return error 400 if the packet does not contain `sensorId`;
* Return error 400 if the packet does not contain `time`;
* Return error 409 if the packet is a duplicate  - `(sensorId, time)` pairings should
  be unique;
* Return 204 if the packet structure is valid, and the packet was successfully
  stored in the persistent storage.

## Part two: retrieving data

For these data to be useful, a client (e.g. a web app) must be able to query and
retrieve them. You should create an endpoint which allows a client to retrieve
data from a sensor. The endpoint should return suitable status codes, and the
body of the request should be returned as JSON. An example of a suitable
endpoint would be:

    GET /data

With parameters:

* `sensorId`: the sensor id for which to query data;
* `since`: a lower bound on the time of the data;
* `until`: an upper bound on the time of the data.

## Part three: threshold alerts

Often, customers want to know if something is wrong, and therefore your
application should have the ability to configure thresholds for individual
sensors which can send a message (e.g. via email or SMS) when that threshold is
tripped. For example, if the pressure on a fuel tank is too high it could
explode, or if a pipe is too cold it could burst.

## Requirements

The solution should be made available to us as a git repository (whether hosted
or merely in an archive is up to you). It should be installable and runnable
using the basic `npm` commands `npm install` and `npm start`.

## Included files

1. README.md (this file)
3. package.json

## Questions etc.

I am always happy to answer any questions you may have. Please email me at
<gideon@converge.io> if you need anything clarified.
# sensor_nodejs_server

# Copyright (c) 2018, Autonomous Networks Research Group. All rights reserved.
#     Read license file in main directory for more details

#!/usr/bin/env python

import asyncio
import json
import random

import iota
import websockets

# Connect to the tangle
seed = ""
client = "http://node02.iotatoken.nl:14265"
iota_api = iota.Iota(client, seed)

# TODO receive it from the buyer
payment_address = iota.Address(
    'RFQASBVGDTTPDEYVSPIWHG9YUMHAGHFDUZVVXEMDRNNMWJHQYBWHXWQ9JST9NZFBFMFPPFETFLE9RMUJCTNXFZJDGW')


def sendTransaction(transaction):
    try:
        bundle = iota_api.send_transfer(depth=2, transfers=[transaction])
        url = "https://thetangle.org/bundle/" + str(bundle["bundle"].hash)
        print("Invoice - " + url)
    except iota.adapter.BadApiResponse as error:
        print(error)


def prepareTransaction(message=None, value=0):
    transaction = iota.ProposedTransaction(
        address=payment_address,
        value=value,

        # TODO: put the actual value
        message=iota.TryteString.from_string("Data Invoice"),
        tag=iota.Tag(b"SDPPBUYER")
    )

    return sendTransaction(transaction)


def read_data_from_file(data):
    data_type = data['type']
    filepath = "actual_data/" + data_type + ".txt"
    lines = []
    with open(filepath) as f:
        for i, line in enumerate(f):
            if i >= data['quantity']:
                break
            lines.append(line.strip())
    return lines


async def time(websocket, path):
    print("Data Transfer starts!")
    while True:
        data = await websocket.recv()
        data = read_data_from_file(json.loads(data))
        print(data)
        k = 3
        counter = 1
        for d in data:
            if counter % k == 0:
                prepareTransaction()
            await websocket.send(d)
            counter = counter + 1
        print("Data Transfer completed!\n\n")
        break
        # await asyncio.sleep(random.random() * 3)


start_server = websockets.serve(time, '127.0.0.1', 5678)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()

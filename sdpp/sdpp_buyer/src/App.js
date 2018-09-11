import React, {Component} from "react";
import {saveAs} from 'file-saver/FileSaver';
import IOTA from 'iota.lib.js'
// import CURL from 'curl.lib.js'

class App extends Component {

    start = () => {
        // get from ethereum
        var quant = 7;
        var data_type = "gas";


        var k = 3;
        var data = [];

        var iota = new IOTA({
            'provider': 'http://node02.iotatoken.nl:14265'
            // 'provider' : 'http://node03.iotatoken.nl:15265'
        });
        // console.log("iota", iota);

        // try
        // {
        //     CURL.init();
        //     CURL.overrideAttachToTangle(iota);
        // } catch (err) {
        //     console.error("Error", err);
        // }

        var ws = new WebSocket("ws://127.0.0.1:5678/");

        function send(mess) {
            // TODO: get this input from an input text box
            const seed = 'RAHULRAHULRAHULRAHULRAHULRAHULRAHULRAHULRAHULRAHULRAHULRAHULRAHULRAHULRAHUL9RAHUL';

            const depth = 2;
            const minWeightMagnitude = 14;

            const transaction =
                {
                    // TODO: get this address from the seller
                    address: 'XKVOPYNOEMGHSMNVHQXZRESW9MORQFWWZF9PYYQXH9DWMGIEJQNCOHGZWMVHDTWJQYLSBLISKYLPPDFIWHFGGDQPHD',
                    value: 0,
                    message: iota.utils.toTrytes(mess),
                    tag: 'SDPPBUYER'
                };

            const transfers = [transaction];

            iota.api.sendTransfer(seed, depth, minWeightMagnitude, transfers, (error, success) => {
                if (error) {
                    console.error("sendTransfer: error", error);
                } else {
                    console.log(mess + " - " + "https://thetangle.org/bundle/" + success[0]["bundle"].toString());
                }
            });
        }


        send('Order Placed');

        ws.onopen = () => ws.send(JSON.stringify({
            quantity: quant,
            type: data_type,
        }));


        ws.onmessage = function (event) {
            data.push(event.data);
            console.log(data);
            if (data.length % k === 0) {
                //do IOTA operation
                send('Money paid');
            }

            if (data.length === quant) {
                ws.close();
            }
        };

        ws.onclose = function () {
            var blob = new Blob([data.join("\n")], {type: 'text/plain'});
            console.log("Please check " + data_type + ".txt" + " in your downloads folder!");
            saveAs(blob, data_type + '.txt');
        }
    };

    render() {
        return (
            <div style={{textAlign: "center"}}>
                <button onClick={() => this.start()}>Buy</button>
            </div>
        )
    }
}

export default App;
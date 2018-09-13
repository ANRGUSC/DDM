import React, {Component} from 'react';
import {Button, Radio, Select} from 'antd';
import Item from "./Item";
import storehash from "./storehash";
import ipfs from "./ipfs";
import web3 from "./web3";
import hex2ascii from 'hex2ascii';
import {Link} from "react-router-dom";

const Option = Select.Option;
const RadioGroup = Radio.Group;

class QueryProduct extends Component {

    state = {
        searchTag: '',
        items_string: [],
        items_object: [],
        selectedIndex: null
    };

    // from Rahul
    handleOnClick = () => {
        const products_description = []; // array of String
        const products_object = []; // array of Object

        const account = web3.eth.accounts.privateKeyToAccount('0xC89ADA337DCDD9D9D092D582104064554DDC3A835B0D164B82E304F0DFC5F0FC');
        web3.eth.accounts.wallet.add(account);
        web3.eth.defaultAccount = account.address;
        storehash.getPastEvents("PostProducts", {fromBlock: 0, toBlock: 'latest'}).then(
            (events) => {
                //console.log(events);
                events.forEach((product) => {
                    let product_data = product.returnValues;
                    //console.log(product_data["_hash_start"]);
                    let ipfs_pointer = hex2ascii(product_data["hash_start"]) + hex2ascii(product_data["hash_end"]);
                    console.log(ipfs_pointer);

                    ipfs.files.get(ipfs_pointer, (err, files) => {
                        if (files === undefined) {
                            console.log('file is undefined!')
                        } else {
                            for (let i = 0; i < files.length; i++) {
                                console.log("---------------Data Product---------------------");
                                let product_description = files[i].content.toString('utf8');
                                let product_object = files[i].content;

                                console.log(product_description);
                                products_description.push(product_description);
                                products_object.push(product_object);
                                this.setState(() => ({
                                    items_string: products_description,
                                    items_object: products_object
                                }));
                                console.log("------------------------------------------------");
                            }
                        }
                    });
                });
            }
        );
    }

    getItems = () => {
        // map all the element in items_string to a new array
        const items = this.state.items_object.map((item, index) => {


            const JSON_parse = require('uint8array-json-parser').JSON_parse;
            const obj = JSON_parse(item);

            const newObj = {
                Seller: obj.Seller,
                Peripheral_Sensor: obj.Peripheral_Sensor,
                Product_Description: obj.Product_Description,
                Price_In_USD: obj.Price_per_Data_Unit_USD,
                Max_Data_Unit: obj.Data_Unit,
                //test_field: obj.latitude

            };

            console.log(newObj);

            return (
                <Item
                    content={JSON.stringify(newObj)}
                    index={index}
                />
            )
        })
        return items;
    }

    handleRadioSelection = (e) => {
        this.setState({
            selectedIndex: e.target.value
        });
    }

    handleDropdown = (value) => {
        this.setState({
            searchTag: value
        });
    }




    render() {
        console.log('render query product');

        const dummyData = {
            Seller: 'this is Seller',
            Peripheral_Sensor: 'this is Peripheral_Sensor',
            Product_Description: 'this is this is product description',
            Longitude: 'this is Longitude',
            Latitude: 'this is Latitude',
            Price_per_Data_Unit_USD: 'this is Price_per_Data_Unit_USD',
            Data_Unit: 'this is Data_Unit',
            IP_Address: 'this is IP_Address',
            Public_Address: 'this is Public_Address',
            Seller_Credentials: 'this is Seller_Credentials'
        };

        return (
            <div>
                <br/><br/>
                <Select
                    defaultValue="SDPP"
                    style={{width: 100}}
                    onChange={this.handleDropdown}
                >
                    <Option value="others">OTHER</Option>
                    <Option value="SDPP">SDPP</Option>
                </Select>
                <br/><br/>
                <Button
                    type="primary"
                    icon="search"
                    onClick={this.handleOnClick}
                >
                    Search
                </Button>
                <div>
                    <RadioGroup
                        onChange={this.handleRadioSelection}
                        value={this.state.selectedIndex}
                    >
                        {this.getItems()}
                    </RadioGroup>
                </div>
                <Button
                    style={{width: 100}}
                >

                    <Link to={{pathname: '/order', state: {item_object: this.state.items_object[this.state.selectedIndex]}}}>
                        Checkout
                    </Link>

                    {/*<Link to={{pathname: '/order', state: dummyData}}>*/}
                        {/*Checkout*/}
                    {/*</Link>*/}
                </Button>
            </div>
        );
    }
}

export default QueryProduct;
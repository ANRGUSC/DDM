/*
   Copyright (c) 2018, Autonomous Networks Research Group. All rights reserved.
   Read license file in main directory for more details
*/

import { Button, Select, Table } from "antd";
import hex2ascii from "hex2ascii";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import ipfs from "./ipfs";
import Item from "./Item";
import storehash from "./storehash";
import web3 from "./web3";

const Option = Select.Option;

class QueryProduct extends Component {
  state = {
    searchTag: "",
    items_string: [],
    items_object: [], // uint8array
    items_object_json: [], // JSON array
    selectedIndex: 0,
  };

  // from Rahul
  handleOnClick = () => {
    const products_description = []; // array of String
    const products_object = []; // array of Object
    const products_object_json = []; // array of object in JSON

    const account = web3.eth.accounts.privateKeyToAccount(
      "0xC89ADA337DCDD9D9D092D582104064554DDC3A835B0D164B82E304F0DFC5F0FC"
    );
    web3.eth.accounts.wallet.add(account);
    web3.eth.defaultAccount = account.address;
    storehash
      .getPastEvents("PostProducts", { fromBlock: 0, toBlock: "latest" })
      .then((events) => {
        events.forEach((product) => {
          let product_data = product.returnValues;
          let ipfs_pointer =
            hex2ascii(product_data["hash_start"]) +
            hex2ascii(product_data["hash_end"]);
          console.log(ipfs_pointer);

          ipfs.files.get(ipfs_pointer, (err, files) => {
            if (files === undefined) {
              console.log("file is undefined!");
            } else {
              // eslint-disable-next-line
              for (let file of files) {
                const product_description = file.content.toString("utf8");
                const product_object = file.content;
                const JSON_parse = require("uint8array-json-parser").JSON_parse;
                let product_object_json = JSON_parse(product_object);

                product_object_json = Object.assign(product_object_json, {
                  key: this.state.items_object.length,
                });

                products_description.push(product_description);
                products_object.push(product_object);
                products_object_json.push(product_object_json);

                this.setState(() => ({
                  items_string: products_description,
                  items_object: products_object,
                  items_object_json: products_object_json,
                }));
              }
            }
          });
        });
      });
  };

  getItems = () => {
    // map all the element in items_string to a new array
    const items = this.state.items_object.map((item, index) => {
      const JSON_parse = require("uint8array-json-parser").JSON_parse;
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

      return <Item content={JSON.stringify(newObj)} index={index} />;
    });
    return items;
  };

  handleRadioSelection = (e) => {
    this.setState({
      selectedIndex: e.target.value,
    });
  };

  handleDropdown = (value) => {
    this.setState({
      searchTag: value,
    });
  };

  render() {
    // rowSelection object indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
        this.setState({ selectedIndex: selectedRowKeys[0] });
      },
      type: "radio",
    };

    const columns = [
      {
        title: "Seller",
        dataIndex: "Seller",
      },
      {
        title: "Peripheral Sensor",
        dataIndex: "Peripheral_Sensor",
      },
      {
        title: "Product Description",
        dataIndex: "Product_Description",
      },
      {
        title: "Price in USD",
        dataIndex: "Price_per_Data_Unit_USD",
      },
    ];

    return (
      <div className="searchform">
        <br />
        <br />
        <Select
          defaultValue="SDPP"
          style={{ width: 100 }}
          onChange={this.handleDropdown}
        >
          <Option value="others">OTHER</Option>
          <Option value="SDPP">SDPP</Option>
        </Select>
        <br />
        <br />
        <Button type="primary" icon="search" onClick={this.handleOnClick}>
          Search
        </Button>

        <br />
        <br />
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.state.items_object_json}
        />

        <br />
        <br />

        <div>
          <Link
            to={{
              pathname: "/order",
              state: {
                item_object: this.state.items_object[this.state.selectedIndex],
              },
            }}
          >
            <Button className="checkout" style={{ width: 100 }}>
              Checkout
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default QueryProduct;

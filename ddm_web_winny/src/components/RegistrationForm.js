import React, {Component} from 'react';
import {Form, Input, Button, Select} from 'antd';
import {Menu, Dropdown, Icon} from 'antd';
import axios from 'axios';
import {API_ROOT} from "../constants";
import web3 from "./web3";
import storehash from "./storehash";
import ipfs from "./ipfs";

const Option = Select.Option;
const FormItem = Form.Item;

class RegistrationForm extends Component {

    state = {
        // display
        description: '',
        price: '',
        longitude: '',
        latitude: '',
        seller_credential: '',
        ip_address: '',
        public_address: '',
        data_unit: '',
        seller: '',
        peripheral_sensor: '',

        // ipfs part
        ipfsHash: null,
        buffer: '',
        ethAddress: '',
        blockNumber: '',
        transactionHash: '',
        gasUsed: '',
        txReceipt: ''

    };

    getHexfromIPFSHash = (ipfsHash) => {
        let hash = Buffer.from(ipfsHash).toString('hex');
        return {
            hash_start: `0x${hash.substring(0, 64)}`,
            hash_end: `0x${hash.slice(64)}`,
            protocol_type: '0x01'
        }
    }

    handleBtnClick = (e) => {
        this.sendToIpfs();
        console.log('------------------------------------------------------------------')
        console.log(this.state);
        if (this.state.ipfsHash !== '') {
            alert('Register Success!')
        }
    }

    sendToIpfs = () => {
        this.convertToBuffer();
        this.onSubmit();
    }

    convertToBuffer = async () => {
        //file is converted to a buffer for upload to IPFS
        const obj = {
            Seller: this.state.seller,
            Peripheral_Sensor: this.state.peripheral_sensor,
            Product_Description: this.state.description,
            Longitude: this.state.longitude,
            Latitude: this.state.latitude,
            Price_per_Data_Unit_USD: this.state.price,
            Data_Unit: this.state.data_unit,
            IP_Address: this.state.ip_address,
            Public_Address: this.state.public_address,
            Seller_Credentials: this.state.seller_credential
        };

        const buffer = await Buffer.from(JSON.stringify(obj));
        this.setState({buffer});
    };


    onSubmit = async () => {
        //event.preventDefault();
        //bring in user's metamask account address
        const account = web3.eth.accounts.privateKeyToAccount('0xC89ADA337DCDD9D9D092D582104064554DDC3A835B0D164B82E304F0DFC5F0FC');
        web3.eth.accounts.wallet.add(account);
        web3.eth.defaultAccount = account.address;

        console.log('Sending from Metamask account: ' + account.address);
        //obtain contract address from storehash.js
        const ethAddress = await storehash.options.address;
        this.setState({ethAddress});
        //save document to IPFS,return its hash#, and set hash# to state
        //https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add
        await ipfs.add(this.state.buffer, (err, ipfsHash) => {
            console.log(err, ipfsHash);
            //setState by setting ipfsHash to ipfsHash[0].hash
            this.setState({ipfsHash: ipfsHash[0].hash});
            // call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract
            //return the transaction hash from the ethereum contract
            //see, this https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-send

            let data = this.getHexfromIPFSHash(this.state.ipfsHash);
            console.log(data);
            storehash.methods.postProduct(data.hash_start, data.hash_end, data.protocol_type).send({
                from: account.address,
                gas: 1000000
            }, (error, transactionHash) => {
                console.log(transactionHash);
                this.setState({transactionHash});
            }); //storehash
        }) //await ipfs.add
    }; //onSubmit

    handleInputChange = (input, e) => {
        if (input === 'description') {
            this.setState({
                description: e.target.value
            })
        }
        if (input === 'longitude') {
            this.setState({
                longitude: e.target.value
            })
        }
        if (input === 'peripheral_sensor') {
            this.setState({
                peripheral_sensor: e.target.value
            })
        }

        if (input === 'latitude') {
            this.setState({
                latitude: e.target.value
            })
        }
        if (input === 'price') {
            this.setState({
                price: e.target.value
            })
        }
        if (input === 'seller_credential') {
            this.setState({
                seller_credential: e.target.value
            })
        }
        if (input === 'ip_address') {
            this.setState({
                ip_address: e.target.value
            })
        }
        if (input === 'public_address') {
            this.setState({
                public_address: e.target.value
            })
        }
        if (input === 'data_unit') {
            this.setState({
                data_unit: e.target.value
            })
        }
        if (input === 'seller') {
            this.setState({
                seller: e.target.value
            })
        }
        if (input === 'product_sensor') {
            this.setState({
                product_sensor: e.target.value
            })
        }
    }

    render() {
        console.log('render registration');

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        const description = 'description';
        const price = 'price';
        const longitude = 'longitude';
        const latitude = 'latitude';
        const seller_credential = 'seller_credential'
        const ip_address = 'ip_address';
        const public_address = 'public_address';
        const data_unit = 'data_unit';
        const seller = 'seller';
        const peripheral_sensor = 'peripheral_sensor';

        return (
            <Form className="register-form"
            >
            <div className="left-form">
                <FormItem 
                    label='Type'
                    {...formItemLayout}
                >
                    <Select
                        defaultValue="SDPP"
                        style={{ width: 150}}
                    >
                        <Option value="others">OTHER</Option>
                        <Option value="SDPP">SDPP</Option>
                    </Select>
                </FormItem>
                <FormItem
                    label= 'Seller'
                    {...formItemLayout}
                >
                    <Input 
                        value={this.state.seller}
                        onChange={this.handleInputChange.bind(this, seller)}
                    />
                </FormItem>

                <FormItem
                    label='Peripheral Sensor'
                    {...formItemLayout}
                >
                    <Input
                        value={this.state.peripheral_sensor}
                        onChange={this.handleInputChange.bind(this, peripheral_sensor)}
                    />

                </FormItem>
                <FormItem
                    label='Description'
                    {...formItemLayout}
                >
                    <Input
                        value={this.state.description}
                        onChange={this.handleInputChange.bind(this, description)}
                    />
                </FormItem>
                <FormItem
                    label='Longitude'
                    {...formItemLayout}
                >
                    <Input
                        value={this.state.longitude}
                        onChange={this.handleInputChange.bind(this, longitude)}
                    />
                </FormItem>
                
                </div>
                <div className="right-form">

                <FormItem
                    label='Latitude'
                    {...formItemLayout}
                >
                    <Input
                        value={this.state.latitude}
                        onChange={this.handleInputChange.bind(this, latitude)}
                    />
                </FormItem>

                <FormItem
                    label='Price in USD'
                    {...formItemLayout}
                >
                    <Input
                        value={this.state.price}
                        onChange={this.handleInputChange.bind(this, price)}
                    />
                </FormItem>
                {/*<FormItem
                    label='Max Data Unit'
                    {...formItemLayout}
                >
                    <Input
                        value={this.state.data_unit}
                        onChange={this.handleInputChange.bind(this, data_unit)}
                    />
                </FormItem>*/}
                <FormItem
                    label='IP Address'
                    {...formItemLayout}
                >
                    <Input
                        value={this.state.ip_address}
                        onChange={this.handleInputChange.bind(this, ip_address)}
                    />
                </FormItem>

                <FormItem
                    label='Public Address'
                    {...formItemLayout}
                >
                    <Input
                        value={this.state.public_address}
                        onChange={this.handleInputChange.bind(this, public_address)}
                    />
                </FormItem>

                </div>

                <div>

                <FormItem
                    {...tailFormItemLayout}
                >
                    <Button className="regbutton"
                        type="primary"
                        htmlType="submit"
                        onClick={this.handleBtnClick}
                    >
                        Register
                    </Button>
                </FormItem>
                
                </div>

            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);
export default WrappedRegistrationForm;
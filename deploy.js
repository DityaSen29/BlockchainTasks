// Import the necessary modules
const { ethers } = require("ethers");
require("dotenv").config(); 

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");


const privateKey = process.env.PRIVATE_KEY || "ac4b244de16a1bbdcc534b67f94a969afe4a935f095195e519f66e0875a58cfb"; 
const wallet = new ethers.Wallet(privateKey, provider);

const abi = [
    [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                }
            ],
            "name": "registerCandidate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_voter",
                    "type": "address"
                }
            ],
            "name": "registerVoter",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_durationInSeconds",
                    "type": "uint256"
                }
            ],
            "name": "startVoting",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_candidateId",
                    "type": "uint256"
                }
            ],
            "name": "vote",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "candidates",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "voteCount",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "declareWinner",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "winnerName",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "winnerVotes",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getTotalCandidates",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "voters",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "isRegistered",
                    "type": "bool"
                },
                {
                    "internalType": "bool",
                    "name": "hasVoted",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "votedTo",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "votingEndTime",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "votingStartTime",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
];

const bytecode = "6080604052348015600f57600080fd5b5033600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061187e806100606000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80633477ee2e116100715780633477ee2e1461014357806338db6dd3146101755780633d2f5bda146101915780638da5cb5b146101ad5780639eb88db6146101cb578063a3ec138d146101e7576100a9565b80630121b93f146100ae5780630deb56ab146100ca57806314034bd2146100e85780631ea736e0146101075780632019a60814610125575b600080fd5b6100c860048036038101906100c39190610c1e565b610219565b005b6100d261040a565b6040516100df9190610c5a565b60405180910390f35b6100f0610417565b6040516100fe929190610d05565b60405180910390f35b61010f610682565b60405161011c9190610c5a565b60405180910390f35b61012d610688565b60405161013a9190610c5a565b60405180910390f35b61015d60048036038101906101589190610c1e565b61068e565b60405161016c93929190610d35565b60405180910390f35b61018f600480360381019061018a9190610dd1565b610750565b005b6101ab60048036038101906101a69190610c1e565b61091f565b005b6101b5610a5f565b6040516101c29190610e0d565b60405180910390f35b6101e560048036038101906101e09190610f5d565b610a85565b005b61020160048036038101906101fc9190610dd1565b610b90565b60405161021093929190610fc1565b60405180910390f35b600354421015801561022d57506004544211155b61026c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161026390611044565b60405180910390fd5b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060000160009054906101000a900460ff166102ff576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102f6906110b0565b60405180910390fd5b8060000160019054906101000a900460ff1615610351576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103489061111c565b60405180910390fd5b600180549050821080156103655750600082115b6103a4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161039b90611188565b60405180910390fd5b60018160000160016101000a81548160ff02191690831515021790555081816001018190555060018083815481106103df576103de6111a8565b5b906000526020600020906003020160020160008282546103ff9190611206565b925050819055505050565b6000600180549050905090565b60606000600454421161045f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161045690611286565b60405180910390fd5b6000806000805b6001805490508160ff161015610536578360018260ff168154811061048e5761048d6111a8565b5b90600052602060002090600302016002015411156104e05760018160ff16815481106104bd576104bc6111a8565b5b90600052602060002090600302016002015493508060ff16925060009150610523565b8360018260ff16815481106104f8576104f76111a8565b5b906000526020600020906003020160020154148015610518575060008414155b1561052257600191505b5b808061052e906112b3565b915050610466565b506000831161057a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161057190611328565b60405180910390fd5b80156105c457826040518060400160405280600381526020017f5469650000000000000000000000000000000000000000000000000000000000815250909450945050505061067e565b600182815481106105d8576105d76111a8565b5b9060005260206000209060030201600101838180546105f690611377565b80601f016020809104026020016040519081016040528092919081815260200182805461062290611377565b801561066f5780601f106106445761010080835404028352916020019161066f565b820191906000526020600020905b81548152906001019060200180831161065257829003601f168201915b50505050509150945094505050505b9091565b60045481565b60035481565b6001818154811061069e57600080fd5b90600052602060002090600302016000915090508060000154908060010180546106c790611377565b80601f01602080910402602001604051908101604052809291908181526020018280546106f390611377565b80156107405780601f1061071557610100808354040283529160200191610740565b820191906000526020600020905b81548152906001019060200180831161072357829003601f168201915b5050505050908060020154905083565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146107e0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107d79061141a565b60405180910390fd5b6000808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900460ff161561086f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161086690611486565b60405180910390fd5b604051806060016040528060011515815260200160001515815260200160008152506000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff0219169083151502179055506040820151816001015590505050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146109af576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109a69061141a565b60405180910390fd5b600060045414806109c1575060045442115b610a00576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109f790611518565b60405180910390fd5b60008111610a43576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a3a906115aa565b60405180910390fd5b426003819055508042610a569190611206565b60048190555050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610b15576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b0c9061141a565b60405180910390fd5b60016040518060600160405280600180549050815260200183815260200160008152509080600181540180825580915050600190039060005260206000209060030201600090919091909150600082015181600001556020820151816001019081610b809190611776565b5060408201518160020155505050565b60006020528060005260406000206000915090508060000160009054906101000a900460ff16908060000160019054906101000a900460ff16908060010154905083565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b610bfb81610be8565b8114610c0657600080fd5b50565b600081359050610c1881610bf2565b92915050565b600060208284031215610c3457610c33610bde565b5b6000610c4284828501610c09565b91505092915050565b610c5481610be8565b82525050565b6000602082019050610c6f6000830184610c4b565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610caf578082015181840152602081019050610c94565b60008484015250505050565b6000601f19601f8301169050919050565b6000610cd782610c75565b610ce18185610c80565b9350610cf1818560208601610c91565b610cfa81610cbb565b840191505092915050565b60006040820190508181036000830152610d1f8185610ccc565b9050610d2e6020830184610c4b565b9392505050565b6000606082019050610d4a6000830186610c4b565b8181036020830152610d5c8185610ccc565b9050610d6b6040830184610c4b565b949350505050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610d9e82610d73565b9050919050565b610dae81610d93565b8114610db957600080fd5b50565b600081359050610dcb81610da5565b92915050565b600060208284031215610de757610de6610bde565b5b6000610df584828501610dbc565b91505092915050565b610e0781610d93565b82525050565b6000602082019050610e226000830184610dfe565b92915050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610e6a82610cbb565b810181811067ffffffffffffffff82111715610e8957610e88610e32565b5b80604052505050565b6000610e9c610bd4565b9050610ea88282610e61565b919050565b600067ffffffffffffffff821115610ec857610ec7610e32565b5b610ed182610cbb565b9050602081019050919050565b82818337600083830152505050565b6000610f00610efb84610ead565b610e92565b905082815260208101848484011115610f1c57610f1b610e2d565b5b610f27848285610ede565b509392505050565b600082601f830112610f4457610f43610e28565b5b8135610f54848260208601610eed565b91505092915050565b600060208284031215610f7357610f72610bde565b5b600082013567ffffffffffffffff811115610f9157610f90610be3565b5b610f9d84828501610f2f565b91505092915050565b60008115159050919050565b610fbb81610fa6565b82525050565b6000606082019050610fd66000830186610fb2565b610fe36020830185610fb2565b610ff06040830184610c4b565b949350505050565b7f566f74696e67206973206e6f7420616374697665000000000000000000000000600082015250565b600061102e601483610c80565b915061103982610ff8565b602082019050919050565b6000602082019050818103600083015261105d81611021565b9050919050565b7f596f7520617265206e6f74207265676973746572656420746f20766f74650000600082015250565b600061109a601e83610c80565b91506110a582611064565b602082019050919050565b600060208201905081810360008301526110c98161108d565b9050919050565b7f596f75206861766520616c726561647920766f74656400000000000000000000600082015250565b6000611106601683610c80565b9150611111826110d0565b602082019050919050565b60006020820190508181036000830152611135816110f9565b9050919050565b7f496e76616c69642063616e646964617465204944000000000000000000000000600082015250565b6000611172601483610c80565b915061117d8261113c565b602082019050919050565b600060208201905081810360008301526111a181611165565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061121182610be8565b915061121c83610be8565b9250828201905080821115611234576112336111d7565b5b92915050565b7f566f74696e6720706572696f6420686173206e6f7420656e6465640000000000600082015250565b6000611270601b83610c80565b915061127b8261123a565b602082019050919050565b6000602082019050818103600083015261129f81611263565b9050919050565b600060ff82169050919050565b60006112be826112a6565b915060ff82036112d1576112d06111d7565b5b600182019050919050565b7f4e6f20766f746573207765726520636173740000000000000000000000000000600082015250565b6000611312601283610c80565b915061131d826112dc565b602082019050919050565b6000602082019050818103600083015261134181611305565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061138f57607f821691505b6020821081036113a2576113a1611348565b5b50919050565b7f4f6e6c7920746865206f776e65722063616e2063616c6c20746869732066756e60008201527f6374696f6e000000000000000000000000000000000000000000000000000000602082015250565b6000611404602583610c80565b915061140f826113a8565b604082019050919050565b60006020820190508181036000830152611433816113f7565b9050919050565b7f566f74657220697320616c726561647920726567697374657265640000000000600082015250565b6000611470601b83610c80565b915061147b8261143a565b602082019050919050565b6000602082019050818103600083015261149f81611463565b9050919050565b7f50726576696f757320766f74696e6720706572696f64207374696c6c2061637460008201527f6976650000000000000000000000000000000000000000000000000000000000602082015250565b6000611502602383610c80565b915061150d826114a6565b604082019050919050565b60006020820190508181036000830152611531816114f5565b9050919050565b7f4475726174696f6e206d7573742062652067726561746572207468616e207a6560008201527f726f000000000000000000000000000000000000000000000000000000000000602082015250565b6000611594602283610c80565b915061159f82611538565b604082019050919050565b600060208201905081810360008301526115c381611587565b9050919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b60006008830261162c7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826115ef565b61163686836115ef565b95508019841693508086168417925050509392505050565b6000819050919050565b600061167361166e61166984610be8565b61164e565b610be8565b9050919050565b6000819050919050565b61168d83611658565b6116a16116998261167a565b8484546115fc565b825550505050565b600090565b6116b66116a9565b6116c1818484611684565b505050565b5b818110156116e5576116da6000826116ae565b6001810190506116c7565b5050565b601f82111561172a576116fb816115ca565b611704846115df565b81016020851015611713578190505b61172761171f856115df565b8301826116c6565b50505b505050565b600082821c905092915050565b600061174d6000198460080261172f565b1980831691505092915050565b6000611766838361173c565b9150826002028217905092915050565b61177f82610c75565b67ffffffffffffffff81111561179857611797610e32565b5b6117a28254611377565b6117ad8282856116e9565b600060209050601f8311600181146117e057600084156117ce578287015190505b6117d8858261175a565b865550611840565b601f1984166117ee866115ca565b60005b82811015611816578489015182556001820191506020850194506020810190506117f1565b86831015611833578489015161182f601f89168261173c565b8355505b6001600288020188555050505b50505050505056fea264697066735822122091eb4b1c02ef387309d4aab812398075c314cb9c40f73426c1809510b44a88e564736f6c634300081a0033"

async function main() {
  console.log("Deploying contract...");

  const factory = new ethers.ContractFactory(abi, bytecode, wallet);

  const contract = await factory.deploy();

  console.log("Contract deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
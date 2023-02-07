/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  GreeterFacet,
  GreeterFacetInterface,
} from "../../facets/GreeterFacet";

const _abi = [
  {
    inputs: [],
    name: "hello",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610179806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c806319ff1d2114610030575b600080fd5b61003861004e565b6040516100459190610121565b60405180910390f35b606060006040518060400160405280600481526020017f686f6c610000000000000000000000000000000000000000000000000000000081525090508091505090565b600081519050919050565b600082825260208201905092915050565b60005b838110156100cb5780820151818401526020810190506100b0565b60008484015250505050565b6000601f19601f8301169050919050565b60006100f382610091565b6100fd818561009c565b935061010d8185602086016100ad565b610116816100d7565b840191505092915050565b6000602082019050818103600083015261013b81846100e8565b90509291505056fea2646970667358221220d2be680ab7fdda2317744f86c4ec8460cb37ce4f03ca9f642a5840752e9c85e564736f6c63430008100033";

type GreeterFacetConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GreeterFacetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class GreeterFacet__factory extends ContractFactory {
  constructor(...args: GreeterFacetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<GreeterFacet> {
    return super.deploy(overrides || {}) as Promise<GreeterFacet>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): GreeterFacet {
    return super.attach(address) as GreeterFacet;
  }
  override connect(signer: Signer): GreeterFacet__factory {
    return super.connect(signer) as GreeterFacet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GreeterFacetInterface {
    return new utils.Interface(_abi) as GreeterFacetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): GreeterFacet {
    return new Contract(address, _abi, signerOrProvider) as GreeterFacet;
  }
}

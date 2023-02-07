/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Farewell, FarewellInterface } from "../../facets/Farewell";

const _abi = [
  {
    inputs: [],
    name: "goodbye",
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
  "0x608060405234801561001057600080fd5b50610179806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c806375fc8e3c14610030575b600080fd5b61003861004e565b6040516100459190610121565b60405180910390f35b606060006040518060400160405280600581526020017f6164696f7300000000000000000000000000000000000000000000000000000081525090508091505090565b600081519050919050565b600082825260208201905092915050565b60005b838110156100cb5780820151818401526020810190506100b0565b60008484015250505050565b6000601f19601f8301169050919050565b60006100f382610091565b6100fd818561009c565b935061010d8185602086016100ad565b610116816100d7565b840191505092915050565b6000602082019050818103600083015261013b81846100e8565b90509291505056fea2646970667358221220c3cc73d8a2919349a196114649403a989e4190e167cd1f9ac7575a8efe02e87b64736f6c63430008100033";

type FarewellConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FarewellConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Farewell__factory extends ContractFactory {
  constructor(...args: FarewellConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Farewell> {
    return super.deploy(overrides || {}) as Promise<Farewell>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Farewell {
    return super.attach(address) as Farewell;
  }
  override connect(signer: Signer): Farewell__factory {
    return super.connect(signer) as Farewell__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FarewellInterface {
    return new utils.Interface(_abi) as FarewellInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Farewell {
    return new Contract(address, _abi, signerOrProvider) as Farewell;
  }
}

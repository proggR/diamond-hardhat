/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface Persistent2Interface extends utils.Interface {
  functions: {
    "getDS()": FunctionFragment;
    "l1()": FunctionFragment;
    "l2()": FunctionFragment;
    "s1(string)": FunctionFragment;
    "s2(string)": FunctionFragment;
    "setDS(string)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "getDS" | "l1" | "l2" | "s1" | "s2" | "setDS"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "getDS", values?: undefined): string;
  encodeFunctionData(functionFragment: "l1", values?: undefined): string;
  encodeFunctionData(functionFragment: "l2", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "s1",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "s2",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setDS",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(functionFragment: "getDS", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "l1", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "l2", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "s1", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "s2", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setDS", data: BytesLike): Result;

  events: {};
}

export interface Persistent2 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: Persistent2Interface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    getDS(overrides?: CallOverrides): Promise<[string]>;

    l1(overrides?: CallOverrides): Promise<[string]>;

    l2(overrides?: CallOverrides): Promise<[string]>;

    s1(
      msg_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    s2(
      msg_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setDS(
      msg_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  getDS(overrides?: CallOverrides): Promise<string>;

  l1(overrides?: CallOverrides): Promise<string>;

  l2(overrides?: CallOverrides): Promise<string>;

  s1(
    msg_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  s2(
    msg_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setDS(
    msg_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    getDS(overrides?: CallOverrides): Promise<string>;

    l1(overrides?: CallOverrides): Promise<string>;

    l2(overrides?: CallOverrides): Promise<string>;

    s1(msg_: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    s2(msg_: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    setDS(
      msg_: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    getDS(overrides?: CallOverrides): Promise<BigNumber>;

    l1(overrides?: CallOverrides): Promise<BigNumber>;

    l2(overrides?: CallOverrides): Promise<BigNumber>;

    s1(
      msg_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    s2(
      msg_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setDS(
      msg_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getDS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    l1(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    l2(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    s1(
      msg_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    s2(
      msg_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setDS(
      msg_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}

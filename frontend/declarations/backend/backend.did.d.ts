import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Category {
  'id' : CategoryId,
  'name' : string,
  'description' : string,
}
export type CategoryId = bigint;
export type Result = { 'ok' : TopicId } |
  { 'err' : string };
export type Time = bigint;
export interface Topic {
  'id' : TopicId,
  'categoryId' : CategoryId,
  'title' : string,
  'content' : [] | [string],
  'createdAt' : Time,
}
export type TopicId = bigint;
export interface _SERVICE {
  'createTopic' : ActorMethod<[CategoryId, string, [] | [string]], Result>,
  'getCategories' : ActorMethod<[], Array<Category>>,
  'getTopic' : ActorMethod<[TopicId], [] | [Topic]>,
  'getTopics' : ActorMethod<[CategoryId], Array<Topic>>,
  'init' : ActorMethod<[], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];

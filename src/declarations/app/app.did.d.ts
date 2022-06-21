import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type Bool = boolean;
export type Int = bigint;
export interface _SERVICE {
  'answer' : ActorMethod<[bigint, string], Bool>,
  'ask' : ActorMethod<[string], Bool>,
  'balanceOf' : ActorMethod<[Principal], Int>,
  'queryAllQuestions' : ActorMethod<[], Array<string>>,
  'upvote' : ActorMethod<[string, string], Bool>,
}

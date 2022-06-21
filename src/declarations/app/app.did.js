export const idlFactory = ({ IDL }) => {
  const Bool = IDL.Bool;
  const Int = IDL.Int;
  return IDL.Service({
    'answer' : IDL.Func([IDL.Nat, IDL.Text], [Bool], []),
    'ask' : IDL.Func([IDL.Text], [Bool], []),
    'balanceOf' : IDL.Func([IDL.Principal], [Int], ['query']),
    'queryAllQuestions' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'upvote' : IDL.Func([IDL.Text, IDL.Text], [Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };

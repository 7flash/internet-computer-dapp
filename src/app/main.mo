import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import D "mo:base/Debug";
import TrieMap "mo:base/TrieMap";
import Random "mo:base/Random";
import Bool "mo:base/Bool";
import Int "mo:base/Int";
import Text "mo:base/Text";

actor {
  type Int = Int.Int;
  type Bool = Bool.Bool;

  // constants..
  let questionAmount: Nat = 7;
  let responseAmount: Nat = 5;
  let upvoteResponderAmount: Nat = 2;
  let upvoteQuestionerAmount: Nat = 1;
  let maxQuestionLength: Nat = 33;
  let maxAnswerLength: Nat = 33;

  // questions & answers compressed..
  var questions: [var Text] = [var];

  // balances/reputation of each user..
  var balances: TrieMap.TrieMap<Principal, Int> = TrieMap.TrieMap<Principal, Int>(Principal.equal, Principal.hash);

  // pseudo-random.. based on assumption of many users interacting with canister simultaneously..
  var coin: Bool = true;
  func flipCoin() : Bool {
    switch (coin) {
      case (true) {
        coin := false;
        true;
      };
      case (false) {
        coin := true;
        false;
      };
    }
  };

  func updateBalance(principal : Principal, amount : Int) : Bool {
    var currentBalance: Int = 0;
    switch (balances.get(principal)) {
      case (null) {
        currentBalance := 0;
      };
      case (?v) {
        currentBalance := v;
      };
    };

    var isLucky: Bool = flipCoin();
    switch (isLucky) {
      case (true) {
        balances.put(principal, currentBalance + amount);
      };
      case (false) {
        balances.put(principal, currentBalance - amount);
      };
    };

    isLucky;
  };

  // user can ask a question..
  public shared (msg) func ask(question: Text) : async Bool {
    assert Text.size(question) <= maxQuestionLength;

    let caller: Text = Principal.toText(msg.caller);
    let questionWithAsker: Text = question # "/" # caller;

    var questionsTemp = Array.init<Text>(questions.size() + 1, "");
    for ((idx) in questions.keys()) {
      questionsTemp[idx] := questions[idx];
    };
    questionsTemp[questions.size()] := questionWithAsker;

    questions := questionsTemp;

    updateBalance(msg.caller, questionAmount);
  };

  // user can answer existing questions..
  public shared (msg) func answer(idx: Nat, response: Text) : async Bool {
    assert Text.size(response) <= maxAnswerLength;
    
    let caller: Text = Principal.toText(msg.caller);
    
    var answerWithResponder = questions[idx] # "/" # response # "/" # caller;
    questions[idx] := answerWithResponder;

    updateBalance(msg.caller, responseAmount);
  };

  // TODO: determine questioner and responder by question ID
  public shared (msg) func upvote(responderPrincipal: Text, questionerPrincipal: Text) : async Bool {
    let responder: Principal = Principal.fromText(responderPrincipal);
    let questioner: Principal = Principal.fromText(questionerPrincipal);

    assert msg.caller != responder;
    assert msg.caller != questioner;

    switch (balances.get(responder)) {
      case (null) {
        balances.put(responder, upvoteResponderAmount);
      };
      case (?v) {
        balances.put(responder, v + upvoteResponderAmount);
      };
    };
    switch (balances.get(questioner)) {
      case (null) {
        balances.put(questioner, upvoteQuestionerAmount);
      };
      case (?v) {
        balances.put(questioner, v + upvoteQuestionerAmount);
      };
    };
    
    updateBalance(msg.caller, upvoteQuestionerAmount + upvoteQuestionerAmount);
  };

  public query func balanceOf(whom: Principal): async Int {
    switch (balances.get(whom)) {
      case (null) {
        0;
      };
      case (?v) {
        v;
      };
    };
  };

  public query func queryAllQuestions() : async [Text] {
    Array.tabulate<Text>(questions.size(), func(i:Nat) : Text {
      questions[i];
    });
  };
}
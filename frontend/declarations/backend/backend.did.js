export const idlFactory = ({ IDL }) => {
  const CategoryId = IDL.Nat;
  const TopicId = IDL.Nat;
  const Result = IDL.Variant({ 'ok' : TopicId, 'err' : IDL.Text });
  const Category = IDL.Record({
    'id' : CategoryId,
    'name' : IDL.Text,
    'description' : IDL.Text,
  });
  const Time = IDL.Int;
  const Topic = IDL.Record({
    'id' : TopicId,
    'categoryId' : CategoryId,
    'title' : IDL.Text,
    'content' : IDL.Opt(IDL.Text),
    'createdAt' : Time,
  });
  return IDL.Service({
    'createTopic' : IDL.Func(
        [CategoryId, IDL.Text, IDL.Opt(IDL.Text)],
        [Result],
        [],
      ),
    'getCategories' : IDL.Func([], [IDL.Vec(Category)], ['query']),
    'getTopic' : IDL.Func([TopicId], [IDL.Opt(Topic)], ['query']),
    'getTopics' : IDL.Func([CategoryId], [IDL.Vec(Topic)], ['query']),
    'init' : IDL.Func([], [], []),
  });
};
export const init = ({ IDL }) => { return []; };

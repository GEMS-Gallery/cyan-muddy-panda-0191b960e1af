import Bool "mo:base/Bool";
import Hash "mo:base/Hash";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Option "mo:base/Option";

actor {
  type CategoryId = Nat;
  type TopicId = Nat;

  type Category = {
    id: CategoryId;
    name: Text;
    description: Text;
  };

  type Topic = {
    id: TopicId;
    categoryId: CategoryId;
    title: Text;
    content: ?Text;
    createdAt: Time.Time;
  };

  stable var categoryCounter : Nat = 0;
  stable var topicCounter : Nat = 0;

  let categories = HashMap.HashMap<CategoryId, Category>(10, Nat.equal, Nat.hash);
  let topics = HashMap.HashMap<TopicId, Topic>(100, Nat.equal, Nat.hash);

  // Initialize with some sample categories
  public func init() : async () {
    let sampleCategories = [
      { name = "General Discussion"; description = "Talk about anything and everything" },
      { name = "Technology"; description = "Discuss the latest tech trends" },
      { name = "Sports"; description = "All things sports-related" }
    ];

    for (cat in sampleCategories.vals()) {
      ignore createCategory(cat.name, cat.description);
    };
  };

  func createCategory(name: Text, description: Text) : CategoryId {
    categoryCounter += 1;
    let newCategory : Category = {
      id = categoryCounter;
      name = name;
      description = description;
    };
    categories.put(categoryCounter, newCategory);
    categoryCounter
  };

  public query func getCategories() : async [Category] {
    Array.tabulate(categories.size(), func (i: Nat) : Category {
      Option.unwrap(categories.get(i + 1))
    })
  };

  public func createTopic(categoryId: CategoryId, title: Text, content: ?Text) : async Result.Result<TopicId, Text> {
    switch (categories.get(categoryId)) {
      case (null) {
        #err("Category not found")
      };
      case (?_) {
        topicCounter += 1;
        let newTopic : Topic = {
          id = topicCounter;
          categoryId = categoryId;
          title = title;
          content = content;
          createdAt = Time.now();
        };
        topics.put(topicCounter, newTopic);
        #ok(topicCounter)
      };
    }
  };

  public query func getTopics(categoryId: CategoryId) : async [Topic] {
    Array.filter(Array.tabulate(topics.size(), func (i: Nat) : Topic {
      Option.unwrap(topics.get(i + 1))
    }), func (topic: Topic) : Bool {
      topic.categoryId == categoryId
    })
  };

  public query func getTopic(topicId: TopicId) : async ?Topic {
    topics.get(topicId)
  };
};

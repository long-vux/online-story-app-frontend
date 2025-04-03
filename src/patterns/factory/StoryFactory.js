
import { ActionStory, HorrorStory, RomanceStory, DetectiveStory } from "./ConcreteStory.js";

class StoryFactory {
    static createStory(type, data) {
      switch (type) {
        case "Action":
          return new ActionStory(data);
        case "Horror":
          return new HorrorStory(data);
        case "Romance":
          return new RomanceStory(data);
        case "Detective":
          return new DetectiveStory(data);
        default:
          throw new Error("Invalid story type");
      }
    }
  }
export default StoryFactory;
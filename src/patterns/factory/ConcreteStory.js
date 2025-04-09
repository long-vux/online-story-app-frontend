import Story from "./Story.js";

// Concrete Story Classes
class ActionStory extends Story {
    constructor(data) {
        super(data);
        this.type = "Action";
    }
}

class HorrorStory extends Story {
    constructor(data) {
        super(data);
        this.type = "Horror";
    }
}

class RomanceStory extends Story {
    constructor(data) {
        super(data);
        this.type = "Romance";
    }
}

class DetectiveStory extends Story {
    constructor(data) {
        super(data);
        this.type = "Detective";
    }
}

export { ActionStory, HorrorStory, RomanceStory, DetectiveStory };
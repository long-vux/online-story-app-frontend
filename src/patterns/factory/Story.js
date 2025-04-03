class Story {
    constructor(data) {
        this.title = data.title;
        this.description = data.description;
        this.author = data.author;
        this.category_id = data.category_id;
        this.number_of_chapters = data.number_of_chapters || 0;
        this.latest_chapter = data.latest_chapter || 0;
        this.status = data.status || 'ongoing';
    }

    toJSON() {
        return {
            title: this.title,
            description: this.description,
            author: this.author,
            category_id: this.category_id,
            number_of_chapters: this.number_of_chapters,
            latest_chapter: this.latest_chapter,
            status: this.status,
        };
    }
}

export default Story;
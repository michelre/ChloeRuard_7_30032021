export default class Tag {
	constructor(type, content) {
		this.type = type;
		this.content = content;
	}

	render() {
		return `<div class="tag tag-${this.type}" data-trigger="tag" data-id="tag-${this.content}" >
		<span class="tag__content" data-trigger="tagContent">${this.content}</span>
		<img src="./img/delete_icon.svg" class="tag__deleteIcon" alt="" data-trigger="tagDelete">
		</div>`;
	}
}

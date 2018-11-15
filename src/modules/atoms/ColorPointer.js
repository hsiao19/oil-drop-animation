import P5Component from 'util/P5Component';

export default class ColorPointer extends P5Component {
	position;

	color;

	constructor({ position, color }) {
		super();
		this.position = position;
		this.color = color;
	}
}

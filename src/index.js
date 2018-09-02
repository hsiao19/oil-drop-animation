import P5 from 'p5';

const sketchGenerator = s => {
	const sketch = s;
	sketch.setup = () => {
		sketch.createCanvas(720, 400);
		sketch.background(0);
	};

	sketch.draw = () => {};
};

// eslint-disable-next-line no-new
new P5(sketchGenerator);

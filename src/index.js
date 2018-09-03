import P5 from 'p5';

import 'global.css';

const sketchGenerator = s => {
	const sketch = s;
	sketch.setup = () => {
		sketch.createCanvas(100, 100);
		sketch.background(120);
	};

	sketch.draw = () => {};

	sketch.windowResized = () => {
		sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
		sketch.background(120);
	};
};

// eslint-disable-next-line no-new
new P5(sketchGenerator, window.document.getElementById('sketch'));

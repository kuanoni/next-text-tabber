// checks if 'num' is between 'a' and 'b'
const numIsBetweenRange = (num: number, a: number, b: number) => {
	const min = Math.min.apply(Math, [a, b]),
		max = Math.max.apply(Math, [a, b]);
	return num >= min && num <= max;
};

export default numIsBetweenRange;

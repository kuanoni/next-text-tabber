module.exports = {
	plugins: {
		'postcss-sorting': {
			order: ['custom-properties', 'dollar-variables', 'declarations', 'at-rules', 'rules'],
			'properties-order': [
				'display',
				'flex-direction',
				'flex-flow',
				'flex',
				'flex-basis',
				'flex-grow',
				'flex-shrink',
				'flex-wrap',
				'justify-content',
				'align-items',
				'align-content',
				'align-self',
				'gap',
				'row-gap',
				'column-gap',

				'position',
				'top',
				'right',
				'bottom',
				'left',

				'float',
				'clear',

				'width',
				'min-width',
				'max-width',

				'height',
				'min-height',
				'max-height',

				'margin',
				'margin-top',
				'margin-right',
				'margin-bottom',
				'margin-left',

				'padding',
				'padding-top',
				'padding-right',
				'padding-bottom',
				'padding-left',

				'color',
				'background',
				'background-color',
				'background-image',
				'background-repeat',
				'background-position',

				'border',
				'border-top',
				'border-right',
				'border-bottom',
				'border-left',

				'border-width',
				'border-top-width',
				'border-right-width',
				'border-bottom-width',
				'border-left-width',

				'border-style',
				'border-top-style',
				'border-right-style',
				'border-bottom-style',
				'border-left-style',

				'border-color',
				'border-top-color',
				'border-right-color',
				'border-bottom-color',
				'border-left-color',

				'border-radius',
				'border-top-left-radius',
				'border-top-right-radius',
				'border-bottom-left-radius',
				'border-bottom-right-radius',

				'list-style',
				'caption-side',

				'table-layout',
				'border-collapse',
				'border-spacing',
				'empty-cells',

				'vertical-align',

				'text-align',
				'text-indent',
				'text-transform',
				'text-decoration',

				'line-height',
				'word-spacing',
				'letter-spacing',
				'white-space',

				'font',
				'font-family',
				'font-size',
				'font-weight',

				'outline',
				'visibility',
				'overflow',
				'opacity',
				'cursor',
				'z-index',

				'content',
				'quotes',
			],
		},
	},
};

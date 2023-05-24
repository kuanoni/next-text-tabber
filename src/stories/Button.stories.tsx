import type { Meta, StoryObj } from '@storybook/react';
import React, { ComponentProps } from 'react';

import Button from '../common/utils/components/Button';

const meta: Meta<typeof Button> = {
	component: Button,
	title: 'Atoms/Button',
	tags: ['autodocs'],
	args: {
		children: 'Button',
		onClick: () => {
			return;
		},
		iconStart: (
			<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'>
				<path
					fill='currentColor'
					d='m9.25 22l-.4-3.2q-.325-.125-.613-.3t-.562-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.337v-.674q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2h-5.5Zm2.8-6.5q1.45 0 2.475-1.025T15.55 12q0-1.45-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12q0 1.45 1.012 2.475T12.05 15.5Z'
				/>
			</svg>
		),
		iconEnd: (
			<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'>
				<path
					fill='currentColor'
					d='m9.25 22l-.4-3.2q-.325-.125-.613-.3t-.562-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.337v-.674q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2h-5.5Zm2.8-6.5q1.45 0 2.475-1.025T15.55 12q0-1.45-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12q0 1.45 1.012 2.475T12.05 15.5Z'
				/>
			</svg>
		),
	},
	argTypes: {
		onClick: {
			control: false,
		},
	},
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = { args: { iconStart: undefined, iconEnd: undefined } };

const renderVariants =
	(extraArgs = {} as Partial<ComponentProps<typeof Button>>) =>
	(args: ComponentProps<typeof Button>) => {
		args = { ...args, ...extraArgs };

		return (
			<div style={{ display: 'flex', gap: '1.5rem' }}>
				<Button {...args} size='extra-small' />
				<Button {...args} size='small' />
				<Button {...args} size='medium' />
				<Button {...args} size='large' />
				<Button {...args} size='large' disabled />
			</div>
		);
	};

export const ContainedNeutral: Story = {
	render: renderVariants(),
};

export const ContainedPrimary: Story = {
	render: renderVariants({ color: 'primary' }),
};

export const ContainedSecondary: Story = {
	render: renderVariants({ color: 'secondary' }),
};

export const OutlineNeutral: Story = {
	render: renderVariants({ variant: 'outline' }),
};

export const OutlinePrimary: Story = {
	render: renderVariants({ variant: 'outline', color: 'primary' }),
};

export const OutlineSecondary: Story = {
	render: renderVariants({ variant: 'outline', color: 'secondary' }),
};

export const TextNeutral: Story = {
	render: renderVariants({ variant: 'text' }),
};

export const TextPrimary: Story = {
	render: renderVariants({ variant: 'text', color: 'primary' }),
};

export const TextSecondary: Story = {
	render: renderVariants({ variant: 'text', color: 'secondary' }),
};

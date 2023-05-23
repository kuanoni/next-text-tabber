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
	},
	argTypes: {
		onClick: {
			control: false,
		},
	},
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

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

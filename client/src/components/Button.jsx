import React from 'react';
import clsx from 'clsx';

const variantClasses = {
	primary: 'btn-primary',
	secondary: 'btn-secondary',
	danger: 'btn-danger'
};

const sizeClasses = {
	sm: 'btn-sm',
	md: 'btn-md',
	lg: 'btn-lg'
};

export default function Button({
	variant = 'primary',
	size = 'md',
	className,
	disabled = false,
	type = 'button',
	children,
	...rest
}) {
	const classes = clsx(
		'btn',
		variantClasses[variant] || variantClasses.primary,
		sizeClasses[size] || sizeClasses.md,
		{ 'btn-disabled': disabled },
		className
	);

	return (
		<button type={type} className={classes} disabled={disabled} {...rest}>
			{children}
		</button>
	);
}



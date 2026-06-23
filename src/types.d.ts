// Components

interface IconProps {
	size?: number;
	color?: string;
	className?: string;
}

// Extending svelteHTML to utilize custom button attributes for CSS
declare namespace svelteHTML {
	interface HTMLProps<T> {
		"button-type"?: string;
	}
}

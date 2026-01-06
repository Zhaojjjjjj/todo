import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "ghost";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "primary", ...props }, ref) => {
	return (
		<button
			ref={ref}
			className={cn(
				"inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
				{
					"bg-[#4F6D7A] text-white hover:bg-[#3d5a66] shadow-sm hover:shadow-md active:scale-95 px-6 py-2": variant === "primary",
					"bg-[#e09f3e] text-white hover:bg-[#d08f2e] shadow-sm hover:shadow-md active:scale-95 px-6 py-2": variant === "secondary",
					"bg-transparent text-[#4F6D7A] hover:bg-[#4F6D7A]/10 px-4 py-2": variant === "ghost",
				},
				className
			)}
			{...props}
		/>
	);
});
Button.displayName = "Button";

export default Button;

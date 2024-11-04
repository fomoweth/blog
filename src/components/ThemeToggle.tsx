"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
	const { setTheme, theme } = useTheme();

	if (process.env.NODE_ENV === "production") return null;

	return (
		<Button
			className="fixed bottom-2 left-3 z-50 h-8 w-8"
			size="icon"
			variant="ghost"
			onClick={() => setTheme(theme === "light" ? "dark" : "light")}
		>
			<Sun className="h-[1.5rem] w-[1.3rem] dark:hidden" />
			<Moon className="hidden h-5 w-5 dark:block" />
			<span className="sr-only">Toggle Theme</span>
		</Button>
	);
}

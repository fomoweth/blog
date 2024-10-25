import { TooltipProvider } from "@/components/ui";
import JotaiProvider from "./JotaiProvider";
import ThemeProvider from "./ThemeProvider";

export default function Providers({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<JotaiProvider>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				<TooltipProvider delayDuration={0}>{children}</TooltipProvider>
			</ThemeProvider>
		</JotaiProvider>
	);
}

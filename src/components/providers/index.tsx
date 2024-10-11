import { TooltipProvider } from "@/components/ui/tooltip";
import JotaiProvider from "./JotaiProvider";
import ThemeProvider from "./ThemeProvider";
import VisualEditor from "./VisualEditor";
import TailwindIndicator from "./TailwindIndicator";

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
				<TooltipProvider delayDuration={0}>
					{children}
					<TailwindIndicator />
					<VisualEditor />
				</TooltipProvider>
			</ThemeProvider>
		</JotaiProvider>
	);
}

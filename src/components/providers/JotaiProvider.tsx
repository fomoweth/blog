import { Provider as JotaiProvider } from "jotai";

export default function Provider({
	children,
	store,
}: React.ComponentProps<typeof JotaiProvider>) {
	return <JotaiProvider store={store}>{children}</JotaiProvider>;
}

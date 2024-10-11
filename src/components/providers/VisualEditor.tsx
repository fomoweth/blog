import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";

export default function VisualEditor() {
	return (
		<>
			{draftMode().isEnabled && (
				<>
					<a
						className="fixed bottom-0 right-0 m-4 bg-blue-500 p-4 text-white"
						href="/api/draft/disable"
					>
						Disable Draft Mode
					</a>

					<VisualEditing />
				</>
			)}
		</>
	);
}

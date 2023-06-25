import { useCallback } from "react";
import { IDKitWidget } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";

export function IDKit() {
	const handleProof = useCallback((result: ISuccessResult) => {
		return new Promise<void>((resolve) => {
			setTimeout(() => resolve(), 3000);
			// NOTE: Example of how to decline the verification request and show an error message to the user
		});
	}, []);

	const onSuccess = (result: ISuccessResult) => {
		console.log(result);
	};

	return (
			<div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
				<IDKitWidget
					action="my_action"
					signal="my_signal"
					onSuccess={onSuccess}
					handleVerify={handleProof}
					app_id="app_e1699974cc7199c662b6543b93b624f8"
				>
					{({ open }) => <button onClick={open}>Click me</button>}
				</IDKitWidget>
			</div>
	);
}

export default IDKit
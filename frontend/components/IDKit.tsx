import { ReactNode, useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { ISuccessResult, useIDKit } from "@worldcoin/idkit";
import { Button } from "@chakra-ui/react";
const IDKitWidget = dynamic(() => import('@worldcoin/idkit').then(mod => mod.IDKitWidget), { ssr: false })

export default function IDKit({ 
	title,
	disabled = false,
	loading = false,
	next,
} : { 
	title: string,
	disabled?: boolean,
	loading?: boolean,
	next: () => void,
}) {

	const [success, setSuccess] = useState(false)
	const [opened, setOpened] = useState(false)

	const onSuccess = (result: ISuccessResult) => {
		setSuccess(true);
		next();
	};

	const { open, setOpen } = useIDKit({ onSuccess })

	return (<>
				<IDKitWidget
					action="my_action"
					signal="my_signal"
					walletConnectProjectId="a6513ebfdf8545aeb9134f5753ab2ef1"
					autoClose
					onSuccess={onSuccess}
					app_id="app_e1699974cc7199c662b6543b93b624f8"
				/>
				{!open && !opened && <Button 
					bg="gray.900"
					color="gray.100"
					_hover={{
						bg: "gray.700",
					}}
					disabled={disabled} 
					isLoading={loading}
					width="full"
					py={6}
					onClick={() => { 
						setOpened(true)
						setOpen(true) 
					}}
				>
					{ title }
				</Button>}
				{!open && opened && !success && (
					<Button 
						disabled={disabled}
						isLoading={loading}
						onClick={() => { next() }}
						width="full"
						py={6}
					>
						Continue without verified as a human
					</Button>
				)}
			</>
	);
}
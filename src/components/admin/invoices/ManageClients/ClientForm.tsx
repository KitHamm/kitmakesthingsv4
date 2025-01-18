import { useForm } from "react-hook-form";
import { ClientForm } from "@/lib/types";

const ClientFormComponent = ({
	onSubmit,
	onClose,
}: {
	onSubmit: (data: ClientForm) => void;
	onClose: () => void;
}) => {
	const { register, reset, handleSubmit, formState } = useForm<ClientForm>({
		defaultValues: { name: "", address: "" },
	});
	const { errors } = formState;

	const handleFormSubmit = (data: ClientForm) => {
		onSubmit(data);
		reset();
		onClose();
	};

	return (
		<form id="newClientForm" onSubmit={handleSubmit(handleFormSubmit)}>
			<div>
				<label className="font-bold" htmlFor="name">
					Client Name:
				</label>
				<input
					type="text"
					{...register("name", {
						required: "Client Name is required.",
					})}
					placeholder={errors.name?.message || "Client Name"}
					className={errors.name ? "placeholder:text-red-500" : ""}
				/>
			</div>
			<div>
				<label className="font-bold" htmlFor="address">
					Client Address:
				</label>
				<textarea
					{...register("address", {
						required: "Address is required.",
					})}
					placeholder={errors.address?.message || "Client Address"}
					className={errors.address ? "placeholder:text-red-500" : ""}
				/>
			</div>
		</form>
	);
};

export default ClientFormComponent;

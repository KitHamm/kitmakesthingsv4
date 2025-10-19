"use client";

import { totalPaidToDate } from "@/lib/utils/invoiceUtils/totalPaidToDate";
import { Expense, Invoice, TaxSettings } from "@prisma/client";
import { Settings } from "lucide-react";
import { useForm } from "react-hook-form";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { updateTaxSettings } from "@/server/invoiceActions/updateTaxSettings";
import { getCurrentTaxYear } from "@/lib/utils/invoiceUtils/getCurrentTaxYear";

export type TaxFormData = {
	id: string;
	personalAllowance: number;
	incomeTaxRate: number;
	class4NiRate: number;
	class4NiThreshold: number;
	class2NiThreshold: number;
	class2NiAmount: number;
	calculateClass2Ni: boolean;
};

export default function TaxCalculator({
	taxSettings,
	invoices,
	expenses,
}: Readonly<{ taxSettings: TaxSettings | null; invoices: Invoice[]; expenses: Expense[] }>) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const totalPaid = totalPaidToDate(invoices);
	const totalExpenses = expenses.reduce((acc, exp) => {
		if (exp.taxYear === getCurrentTaxYear()) {
			return acc + exp.amount;
		}
		return acc;
	}, 0.0);

	const netIncome = totalPaid - totalExpenses;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TaxFormData>({
		defaultValues: taxSettings
			? {
					id: taxSettings.id,
					personalAllowance: taxSettings.personalAllowance,
					incomeTaxRate: taxSettings.incomeTaxRate,
					class4NiRate: taxSettings.class4NiRate,
					class4NiThreshold: taxSettings.class4NiThreshold,
					class2NiThreshold: taxSettings.class2NiThreshold,
					class2NiAmount: taxSettings.class2NiAmount,
					calculateClass2Ni: taxSettings.calculateClass2Ni,
			  }
			: undefined,
	});

	async function onSubmit(data: TaxFormData) {
		console.log(typeof data.class4NiRate);
		try {
			const response = await updateTaxSettings(data);
			if (response.success) {
				onClose();
			} else {
				console.log(response.error);
			}
		} catch (error) {
			console.error("Error updating tax settings:", error);
		}
	}

	if (!taxSettings) {
		return (
			<div className="bg-neutral-100 flex rounded-lg shadow p-4">
				<div className="m-auto text-neutral-600">No tax settings configured</div>
			</div>
		);
	}

	// --- CALCULATION LOGIC ---
	const taxableIncome = Math.max(0, netIncome - taxSettings.personalAllowance);

	const incomeTax = taxableIncome * taxSettings.incomeTaxRate;

	// Class 4 NI
	const class4Base = Math.max(0, netIncome - taxSettings.class4NiThreshold);
	const class4Ni = class4Base * taxSettings.class4NiRate;

	// Optional Class 2 NI (flat annual or weekly)
	let class2Ni = 0;
	if (taxSettings.calculateClass2Ni && netIncome >= taxSettings.class2NiThreshold) {
		class2Ni = taxSettings.class2NiAmount;
	}

	const totalTax = incomeTax + class4Ni + class2Ni;

	// --- UTILS ---
	const format = (val: number) => val.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

	return (
		<div className="relative bg-neutral-100 flex rounded-lg shadow p-4">
			<div className="my-auto grid grid-cols-2 gap-6">
				<div id="left">
					<div className="flex gap-2 items-baseline">
						<div className="font-bold text-xl">Income Tax:</div>
					</div>
					<div className="flex gap-2">
						<div className="font-bold text-xl">National Insurance:</div>
					</div>
					{taxSettings.calculateClass2Ni && (
						<div className="flex gap-2">
							<div className="font-bold text-xl">Class 2 NI:</div>
						</div>
					)}
					<div className="flex gap-2">
						<div className="font-bold text-xl">Total:</div>
					</div>
				</div>

				<div id="right">
					<div className="flex gap-2 items-baseline">
						<div className="text-xl">£{format(incomeTax)}</div>
					</div>
					<div className="flex gap-2">
						<div className="text-xl">£{format(class4Ni)}</div>
					</div>
					{taxSettings.calculateClass2Ni && (
						<div className="flex gap-2">
							<div className="text-xl">£{format(class2Ni)}</div>
						</div>
					)}
					<div className="flex gap-2">
						<div className="text-xl font-bold">£{format(totalTax)}</div>
					</div>
				</div>
			</div>
			<button onClick={onOpen} className="absolute top-2 right-2 p-2 rounded hover:bg-neutral-200">
				<Settings />
			</button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<ModalHeader>Tax Settings</ModalHeader>
						<ModalBody>
							<div>
								<label>Personal Allowance</label>
								<input type="number" {...register("personalAllowance", { required: true, valueAsNumber: true })} />
								{errors.personalAllowance && <span>This field is required</span>}
							</div>
							<div>
								<label>Income Tax Rate</label>
								<input step="0.01" type="number" {...register("incomeTaxRate", { required: true, valueAsNumber: true })} />
								{errors.incomeTaxRate && <span>This field is required</span>}
							</div>
							<div>
								<label>Class 4 NI Rate</label>
								<input step="0.01" type="number" {...register("class4NiRate", { required: true, valueAsNumber: true })} />
								{errors.class4NiRate && <span>This field is required</span>}
							</div>
							<div>
								<label>Class 4 NI Threshold</label>
								<input type="number" {...register("class4NiThreshold", { required: true, valueAsNumber: true })} />
								{errors.class4NiThreshold && <span>This field is required</span>}
							</div>
							<div>
								<label>Class 2 NI Threshold</label>
								<input type="number" {...register("class2NiThreshold", { required: true, valueAsNumber: true })} />
								{errors.class2NiThreshold && <span>This field is required</span>}
							</div>
							<div>
								<label>Class 2 NI Amount</label>
								<input step="0.01" type="number" {...register("class2NiAmount", { required: true, valueAsNumber: true })} />
								{errors.class2NiAmount && <span>This field is required</span>}
							</div>
							<div>
								<label>Calculate Class 2 NI</label>
								<input className="ml-2" type="checkbox" {...register("calculateClass2Ni")} />
							</div>
						</ModalBody>
						<ModalFooter>
							<Button variant="light" color="danger" onPress={onClose}>
								Close
							</Button>
							<Button color="success" className="text-white" type="submit">
								Save
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</div>
	);
}

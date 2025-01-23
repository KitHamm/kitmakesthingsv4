import {
	Client,
	Invoice,
	InvoiceItem,
	Landing,
	ProjectTask,
	TaskPriority,
	Tech,
	WorkingProject,
} from "@prisma/client";
import { ReactNode } from "react";

// Extended Prisma Types

export interface LandingWithTech extends Landing {
	tech: Tech[];
}

export interface InvoiceWithClientAndItems extends Invoice {
	invoiceItem: InvoiceItem[];
	client: Client;
}

export interface WorkingProjectWithTasksAndClient extends WorkingProject {
	tasks: ProjectTask[];
	client: Client;
}

// Form Types

export type ClientForm = {
	name: string;
	address: string;
};

export type ProjectForm = {
	name: string;
	dateDue: Date;
	clientId: string;
};

export type TaskForm = {
	description: string;
	priority: TaskPriority;
	projectId: string;
};
export type PriorityType = {
	label: string;
	key: TaskPriority;
};

export type InvoiceForm = {
	reference: string;
	date: Date;
	taxYear: string;
	paid: boolean;
	total: number;
	clientId: string;
	items: {
		description: string;
		quantity: number;
		unitPrice: number;
		subTotal: number;
	}[];
};

export type LandingContentForm = {
	title: string;
	tech: Tech[];
	copy: string;
	shortAbout: string;
	imageUrl: string;
	techParallaxImage: string;
	aboutParallaxImage: string;
	firstHighlightImage: string;
	secondHighlightImage: string;
	thirdHighlightImage: string;
	firstHighlightHeader: string;
	secondHighlightHeader: string;
	thirdHighlightHeader: string;
	firstHighlightIcon: string;
	secondHighlightIcon: string;
	thirdHighlightIcon: string;
	firstHighlightText: string;
	secondHighlightText: string;
	thirdHighlightText: string;
};

export type AboutContentForm = {
	title: string;
	copy: string;
	image1Url: string;
	image2Url: string;
	image3Url: string;
	image4Url: string;
	text1: string;
	text2: string;
	title1: string;
	title2: string;
	title3: string;
	title4: string;
};

export type ContentProjectForm = {
	name: string;
	slug: string;
	role: string;
	stack: {
		name: string;
	}[];
	description: string;
	date: string;
	where: string;
	images: {
		url: string;
	}[];
	client: string;
	short: string;
	outLink: string;
	outLinkText: string;
	order: number;
};

export type ContentTextInputProps = {
	target:
		| "name"
		| "slug"
		| "role"
		| "date"
		| "where"
		| "client"
		| "outLink"
		| "outLinkText";
	label: string;
	required: boolean;
	message: string;
	placeholder: string;
};

export type ContentTextAreaProps = {
	target: "short" | "description";
	label: string;
	required: boolean;
	message: string;
	placeholder: string;
};

export type ContactForm = {
	name: string;
	email: string;
	message: string;
};

export type LoginForm = {
	email: string;
	password: string;
};

// Enumerations

export enum MessageState {
	NONE,
	SENDING,
	SUCCESS,
	ERROR,
}

// Functions

export type Views = {
	date: string;
	pages: { page: string; count: number }[];
};

export type LogoList = {
	name: string;
	url: string;
};

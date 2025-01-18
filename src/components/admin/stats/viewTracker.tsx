"use client";

import { RemoveOldPages } from "@/components/actions/ServiceActions";
import { countViews, pagesWithViews } from "@/lib/functions";
import { Views } from "@/lib/types";
import { ServiceRequest } from "@prisma/client";
import { useEffect, useState } from "react";

export default function ViewTracker(
	props: Readonly<{
		serviceRequests: ServiceRequest[];
	}>
) {
	const [views, setViews] = useState<Views[]>();
	const [pages, setPages] = useState<string[]>();

	useEffect(() => {
		setViews(countViews(props.serviceRequests));
		setPages(pagesWithViews(props.serviceRequests));
	}, [props.serviceRequests]);

	useEffect(() => {
		RemoveOldPages();
	}, []);
	return (
		<div className="bg-neutral-100 rounded-lg shadow p-4">
			<div className="flex flex-col">
				<div className="font-bold flex">
					<div className="grow">Views</div>
					{views?.map((view) => {
						return (
							<div className="w-1/12 text-center" key={view.date}>
								{view.date.split("/")[0]}
							</div>
						);
					})}
				</div>
				{pages?.map((page) => {
					return (
						<div className="flex" key={page}>
							<div className="grow">{page}</div>
							{views?.map((view) => {
								return (
									<div
										key={view.date + "-map"}
										className="w-1/12 border-s border-e"
									>
										{view.pages.map((pageName, index) => {
											if (pageName.page === page) {
												return (
													<div
														key={
															pageName.page +
															"-" +
															index
														}
														className="text-center"
													>
														{pageName.count}
													</div>
												);
											}
										})}
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		</div>
	);
}

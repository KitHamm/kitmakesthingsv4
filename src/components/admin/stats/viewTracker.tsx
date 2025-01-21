"use client";

import { countViews } from "@/lib/utils/viewCountUtils/countViews";
import { getPagesWithViews } from "@/lib/utils/viewCountUtils/getPagesWithView";
import { Views } from "@/lib/types";
import { ServiceRequest } from "@prisma/client";
import { Fragment, useEffect, useState } from "react";

export default function ViewTracker(
	props: Readonly<{
		serviceRequests: ServiceRequest[];
	}>
) {
	const [views, setViews] = useState<Views[]>();
	const [pages, setPages] = useState<string[]>();

	useEffect(() => {
		setViews(countViews(props.serviceRequests));
		setPages(getPagesWithViews(props.serviceRequests));
	}, [props.serviceRequests]);

	return (
		<div className="bg-neutral-100 rounded-lg shadow p-4">
			<div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr_1fr_1fr]">
				<div className="mb-2 font-bold">View Tracker</div>
				{views?.map((view) => {
					return (
						<div className="text-center" key={view.date}>
							{view.date.split("/")[0]}
						</div>
					);
				})}

				{pages?.map((page) => {
					return (
						<Fragment key={page}>
							<div className="truncate">{page}</div>
							{views?.map((view) => {
								return (
									<div
										key={`${page}-${view.date}`}
										className="border-s border-e"
									>
										{view.pages.map((pageName) => {
											if (pageName.page === page) {
												return (
													<div
														key={pageName.page}
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
						</Fragment>
					);
				})}
			</div>
		</div>
	);
}

"use client";

import { Button } from "@nextui-org/react";

export default function ErrorButtons() {
    return (
        <div className="flex justify-center">
            <Button
                className="font-bold bg-white border-2 border-black rounded-none hover:bg-green-500 hover:border-white hover:text-white"
                onClick={() => {
                    window.location.href = "/";
                }}>
                Home
            </Button>
        </div>
    );
}

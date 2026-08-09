"use client";

import { useState } from "react";

interface CopyButtonProps {
    value: string;
    label?: string;
    className?: string;
}

export default function CopyButton({
    value,
    label = "Copy",
    className = "",
}: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        if (!value) return;

        try {
            await navigator.clipboard.writeText(value);

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error("Failed to copy:", error);
        }
    }

    return (
        <button
            type="button"
            onClick={handleCopy}
            disabled={!value}
            className={`rounded-lg bg-gray-200 hover:bg-gray-300 px-3 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        >
            {copied ? "✓ Copied!" : label}
        </button>
    );
}
"use client";

import { useState } from "react";

interface Props {
    name: string;
    defaultValue: string;
    label: string;
}

export default function ColorPicker({
    name,
    defaultValue,
    label,
}: Props) {
    const [color, setColor] = useState(defaultValue);

    return (
        <div className="space-y-3">

            <label className="block font-medium">
                {label}
            </label>

            <div className="flex items-center gap-4">

                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="h-12 w-20 rounded border cursor-pointer"
                />

                <input
                    type="text"
                    name={name}
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="flex-1 border rounded-lg px-4 py-3"
                />

            </div>

        </div>
    );
}
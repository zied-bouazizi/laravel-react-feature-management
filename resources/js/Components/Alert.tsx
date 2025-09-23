import { AlertProps } from "@/types";
import { useEffect, useState } from "react";

export default function Alert({ message, trigger }: AlertProps) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (message) {
            setShow(true);
            const timer = setTimeout(() => setShow(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [message, trigger]);

    if (!show) return null;

    return (
        <div className="bg-emerald-500 py-3 px-4 rounded mb-8">
            {message}
        </div>
    );
}
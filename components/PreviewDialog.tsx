"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from "react";

interface PreviewDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function PreviewDialog({ open, onOpenChange }: PreviewDialogProps) {
    const [html, setHtml] = useState("");

    useEffect(() => {
        if (open) {
            const saved = localStorage.getItem("grapesjs-site");
            // eslint-disable-next-line react-hooks/set-state-in-effect
            if (saved) setHtml(saved);
        }
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogHeader>
                <DialogTitle>Website Preview</DialogTitle>
            </DialogHeader>
            <DialogContent className="max-w-[95vw] h-[95vh] p-0">
                <iframe
                    title="Website Preview"
                    className="w-full h-full border-0"
                    srcDoc={html}
                />
            </DialogContent>
        </Dialog>
    );
}

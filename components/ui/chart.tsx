"use client";

import { TooltipProps } from "recharts";
import { cn } from "@/lib/utils";

// ChartContainer component wraps chart with custom styles and colors from config
export function ChartContainer({
                                   config,
                                   children,
                                   className,
                                   ...props
                               }: React.ComponentProps<"div"> & {
    config: Record<string, { label: string; color: string }>;
}) {
    return (
        <div
            className={cn("relative flex flex-col", className)}
            style={
                {
                    "--chart-colors": Object.values(config)
                        .map((item) => item.color)
                        .join(" "),
                } as React.CSSProperties
            }
            {...props}
        >
            {children}
        </div>
    );
}

// ChartTooltip component displays a tooltip with content when hovering over chart points
export function ChartTooltip({
                                 active,
                                 payload,
                                 label,
                                 content,
                                 ...props
                             }: TooltipProps<any, any> & { content?: React.ReactNode }) {
    if (!active || !payload) {
        return null;
    }
    return (
        <div className="rounded-lg border bg-background p-2 shadow-sm" {...props}>
            {content ?? <ChartTooltipContent payload={payload} label={label} />}
        </div>
    );
}

// ChartTooltipContent component renders the content of the tooltip
export function ChartTooltipContent({
                                        payload,
                                        label,
                                    }: {
    payload: TooltipProps["payload"];
    label: TooltipProps["label"];
}) {
    if (!payload) {
        return null;
    }
    return (
        <div>
            <div className="text-sm font-medium">{label}</div>
            <div className="text-xs text-muted-foreground">
                {payload.map((item, i) => (
                    <div key={i} className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full" style={{ background: item.color }} />
                        <span className="font-medium">{item.value}</span>
                        <span>{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

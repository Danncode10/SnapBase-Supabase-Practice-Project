import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function Loading() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-5 w-64" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                    <Card key={i} className="overflow-hidden border-zinc-200 dark:border-zinc-800">
                        <Skeleton className="aspect-square w-full" />
                        <div className="p-4 space-y-2">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

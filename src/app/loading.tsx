import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Rocket } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex items-center justify-center h-full bg-background p-4">
      <Card className="w-full max-w-2xl h-[90vh] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <div className="flex items-center gap-3">
             <Rocket className="w-6 h-6" />
            <Skeleton className="h-8 w-32" />
          </div>
          <Skeleton className="h-8 w-8" />
        </CardHeader>
        <CardContent className="flex-1 p-6 space-y-4">
          <div className="flex items-start gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-64" />
            </div>
          </div>
          <div className="flex items-start gap-3 justify-end">
            <div className="flex flex-col gap-1 items-end">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-48" />
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
          <div className="flex items-start gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-16 w-80" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t p-4">
          <div className="flex w-full items-center gap-2">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-10" />
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}

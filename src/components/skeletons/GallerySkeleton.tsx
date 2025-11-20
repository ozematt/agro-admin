import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

const GallerySkeleton = () => {
  const array = Array.from({ length: 6 }).map((_, index) => index + 1);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-3 w-full max-w-20" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-3 w-full max-w-30" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {array.map((el) => (
              <Skeleton key={el} className="h-35 w-35" />
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default GallerySkeleton;

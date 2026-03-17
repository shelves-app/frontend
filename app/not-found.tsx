import Link from "next/link";
import { Button } from "@/components/ui/button";

const NotFound = () => (
  <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
    <h1 className="text-6xl font-bold">404</h1>
    <h2 className="text-2xl font-semibold">Page Not Found</h2>
    <p className="text-muted-foreground">
      The page you are looking for does not exist.
    </p>
    <Button asChild>
      <Link href="/">Go Home</Link>
    </Button>
  </div>
);

export default NotFound;

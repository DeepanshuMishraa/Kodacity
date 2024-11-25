import Link from "next/link";
import { getProblem } from "~/actions/queries";
import LandingNavbar from "~/components/Navbar";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default async function DSA() {
  const problems = await getProblem();
  return (
    <div className="">
      <nav className="flex items-center justify-between border-b p-4">
        <div>
          <h1 className="text-xl font-semibold">Kodacity DSA</h1>
        </div>
      </nav>
      <div className="mt-4 p-4">
        {problems.problem?.map((prb, index) => (
            <Link href={`/dashboard/dsa/${prb.id}`}>
          <Card className="flex items-center justify-betzween" key={index}>
            <CardHeader>
              <CardTitle>{prb.title}</CardTitle>
              <CardDescription>{prb.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge
                variant={
                  prb.difficulty === "EASY"
                    ? "secondary"
                    : prb.difficulty === "MEDIUM"
                      ? "default"
                      : "destructive"
                }
              >
                {prb.difficulty}
              </Badge>
            </CardContent>
          </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

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

  if(problems.problem?.length === 0){
    return(
        <div className="flex items-center min-h-screen justify-center">
            <h1>No Problems Found, You can create problems <a href="/admin/problems/create" className="text-blue-500 underline">here</a></h1>
        </div>
    )
  }
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

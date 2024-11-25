import { getProblemByID } from "~/actions/queries";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const response = await getProblemByID(id);

  // Handle error response
  if (response.status !== 200 || !response.problem) {
    return <div>{response.message || "An error occurred."}</div>;
  }

  const problem = response.problem;

  return (
    <div>
      {Array.isArray(problem) ? (
        problem.map((prb, index) => (
          <div key={index}>
            <h1>{prb.title}</h1>
            <h2>{prb.id}</h2>
          </div>
        ))
      ) : (
        <div>
          <h1>{problem.title}</h1>
          <h2>{problem.id}</h2>
        </div>
      )}
    </div>
  );
}

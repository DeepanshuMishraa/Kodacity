import { Button } from "./ui/button";

export default function AdminDashboardComponent() {
  return (
    <div>
      <nav className="flex items-center justify-between border-b p-5">
        <div>
          <h1 className="text-3xl">Kodacity Admin</h1>
        </div>
        <div>
          <Button>Create Problem</Button>
        </div>
      </nav>

      <div className=" h-screen overflow-hidden w-full items-center flex justify-center">
        <h1 className="text-4xl">This is the Admin dashboard for Kodacity</h1>
      </div>
    </div>
  );
}

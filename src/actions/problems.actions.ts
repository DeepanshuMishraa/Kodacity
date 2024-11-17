import { getServerSession } from "next-auth";
import { ProblemSchema } from "~/lib/validators/problems.validators"
import { db } from "~/server/db";


export const CreateProblem = async(_data:unknown)=>{
    const data = ProblemSchema.parse(_data);
    const session = await getServerSession();

    if(session?.user.role == "ADMIN"){
        //create Problem
      const problem = await 
    }
}

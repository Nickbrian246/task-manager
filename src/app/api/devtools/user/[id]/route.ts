import prisma from "../../../../../../prisma"
import { Prisma } from "@prisma/client"
type Params = {
  id: string
}
export  async function GET(request: Request, context: { params: Params }){
   try {
      const id = context.params.id 
      const user = await prisma.user.findFirstOrThrow({where:{ id}})
    
    return Response.json({data: user})
   } catch (error) {
      if(error instanceof Prisma.PrismaClientKnownRequestError){
        return Response.json({ data: error.message},{status:400}) 
      }
      return Response.json({data:`${error}`}, {status:400})
   }
}

export async  function DELETE(request: Request, context: { params: Params }){
     try {
      const id = context.params.id 
      const user = await prisma.user.delete({where:{ id}})
    
    return Response.json({data: user})
   } catch (error) {
      if(error instanceof Prisma.PrismaClientKnownRequestError){
        return Response.json({ data: error.message},{status:400}) 
      }
      return Response.json({data:`${error}`}, {status:400})
   }
}

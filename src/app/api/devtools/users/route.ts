import { Prisma } from "@prisma/client"
import prisma from "../../../../../prisma"

export async function GET(){
   try {
      const user = await prisma.user.findMany({include:{
        validatationToken:true
      }})
    
    return Response.json({data: user})
   } catch (error) {
      if(error instanceof Prisma.PrismaClientKnownRequestError){
        return Response.json({ data: error.message},{status:400}) 
      }
      return Response.json({data:`${error}`}, {status:400})
   }
}

export async function DELETE(){
  try {
      await prisma.user.deleteMany()
      await prisma.token.deleteMany()
       return Response.json({data: "ok"})
  } catch (error) {
          if(error instanceof Prisma.PrismaClientKnownRequestError){
        return Response.json({ data: error.message},{status:400}) 
      }
      return Response.json({data:`${error}`}, {status:400})
  }
}
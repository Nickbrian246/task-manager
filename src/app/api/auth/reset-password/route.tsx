export async function POST(request:Request){
  try {
    const data = await  request.json()
    console.log(data)
    return Response.json({data:""})
  } catch (error) {
    console.log(error)
    Response.json({error})
  }
}
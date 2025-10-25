import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(){
    const session = await getServerSession(authOptions)

    if(!session?.user.id){
        return NextResponse.json({error:"Unauthorisied User"} , {status:401})
    }


    try {
        const user = await prisma.user.findUnique({
            where:{id:session.user.id},
            select:{id:true , avatar:true , bio:true , name:true , email:true}
        })


        if(!user){
           
            return NextResponse.json({error:"User not Found"} , {status:401})
        }

        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        return console.error("Fetching Data Error" + error);
    }
}
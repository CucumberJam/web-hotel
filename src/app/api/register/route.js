import {NextResponse} from 'next/server';
import bcrypt from 'bcryptjs';
import {createGuest} from "@/app/_lib/data-service.js";
import validate from "@/app/_lib/ajv_user_schema.js";
export const POST = async(request)=>{

    const user = await request.json();
    const {name, email, password} = user;

    if(!validate(user))  return new NextResponse(validate.errors.join(', '), {
        status: 500,
    })

    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = {
        fullName: name,
        email: email,
        password: hashedPassword
    }
    console.log(newUser);
    try{
        await createGuest(newUser);
    }catch (e) {
        return new NextResponse(e.message, {
            status: 500,
        })
    }
    return new NextResponse('User has been created', {
        status: 201,
    });
}
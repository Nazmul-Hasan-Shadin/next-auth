import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server';

 
export default withAuth((req)=>{
    console.log(req.nextUrl.pathname);
    if (req.nextUrl.pathname.startsWith("/createUser") && req.nextauth.token.role !='admin' ) {
        return NextResponse.rewrite(new URL('/Denied',req.url))
    }
 
},
{callbacks: {
    authorized:({token})=> !!token,
},
}
)

export const config={matcher:["/createUser"]};
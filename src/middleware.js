import {auth} from '@/app/_lib/auth.js'

export const middleware = auth;
export const config = {
    matcher: ['/account:path*']
}

/*export function middleware(request){
    console.log(request);

    return NextResponse.redirect(new URL('/about', request.url));
}*/
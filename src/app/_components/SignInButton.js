import {signInAction} from "@/app/_lib/actions.js";
import google from '../../../public/google.svg';
import mail from '../../../public/mail.png';
import github from '../../../public/github.jpg';
import Image from "next/image";

function SignInButton() {
  return (
      <form action={signInAction} className='flex flex-col space-y-4'>
          <button type='submit' name='action' value='google'
                  className='flex hover:border-white  items-center gap-6 text-lg border border-primary-300 px-10 py-3 font-medium'>
              <Image
                  src={google} alt='Google logo'
                  height='24' width='24'/>
              <span>Continue with Google</span>
          </button>
         {/* <button type='submit' name='action' value='mail'
                  className='flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium'>
              <Image
                  src={mail} alt='MailRu logo'
                  height='24' width='24'/>
              <span>Continue with MailRu</span>
          </button>*/}
          <button type='submit' name='action' value='githab'
                  className='hover:border-white rounded flex items-center gap-6 text-lg border border-primary-300 px-10 py-3 font-medium'>
              <Image
                  src={github} alt='Github logo'
                  height='24' width='24'/>
              <span>Continue with Githab</span>
          </button>
      </form>
  );
}

export default SignInButton;

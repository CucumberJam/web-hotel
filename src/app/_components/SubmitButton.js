'use client';
import {useFormStatus} from "react-dom";

export default function SubmitButton({labelNormal = 'Updating...', labelLoading = 'Update profile'}){
    const {pending} = useFormStatus();

    return  <div className="flex justify-end items-center gap-6">
        <button disabled={pending}
                className="bg-accent-500 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300
                px-4 md:px-6 lg:px-8
                py-2 md:py-3 lg:py-4 ">
            {pending ? labelNormal : labelLoading}
        </button>
    </div>
}

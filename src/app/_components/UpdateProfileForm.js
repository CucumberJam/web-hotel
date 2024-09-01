import Image from 'next/image'
export default function UpdateProfileForm({countryFlag, children}){
    return (
        <form className="bg-primary-900 flex flex-col
                        py-4 sm:py-6 md:py-8
                        px-6 sm:px-10 md:px-12
                        text-sm sm:text-base md:text-lg
                        gap-3 sm:gap-4 md:gap-6 ">

            <FormItem labelName='Full name' htmlFor='fullName'/>
            <FormItem labelName='Email address' htmlFor='email'/>

            <FormItemWithChildrenAndImage labelName='Where are you from?'
                                          htmlFor="nationality"
                                          countryFlag={countryFlag}>
                {children}
            </FormItemWithChildrenAndImage>

            <FormItem labelName='National ID number' htmlFor='nationalID'/>

            <FormButton/>
        </form>
    );
}
function FormItem({labelName, htmlFor, type = 'text', disabled = false}){
    return (
        <div className="space-y-2">
            <label htmlFor={htmlFor}>{labelName}</label>
            <input name={htmlFor} id={htmlFor} type={type}
                disabled={disabled}
                className="bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400
                px-2 sm:px-3 md:px-5
                py-2 md:py-3 "/>
        </div>
    );
}
function FormItemWithChildrenAndImage({labelName, htmlFor, countryFlag, children}){
    return <div className="space-y-2">
        <div className="flex items-center justify-between">
            <label htmlFor={htmlFor}>{labelName}</label>
            <Image
                src={countryFlag} width={20} height={20}
                alt="Country flag"
                className="h-5 rounded-sm"/>
        </div>
        {children}
    </div>
}
function FormButton(){
    return  <div className="flex justify-end items-center gap-6">
        <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
            Update profile
        </button>
    </div>
}
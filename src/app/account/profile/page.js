import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm.js";

export const metadata = {
    title: 'Profile'
}
export default function Page() {
    return (
        <div>
            <h2 className="font-semibold text-accent-400 mb-4
            text-base md:text-lg lg:text-2xl'">
                Update your guest profile
            </h2>

            <p className="mb-8 text-primary-200
            text-sm md:text-base lg:text-lg">
                Providing the following information will make your check-in process
                faster and smoother. See you soon!
            </p>
            <UpdateProfileForm>
                <SelectCountry
                    name="nationality"
                    id="nationality"
                    className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"/>
            </UpdateProfileForm>
        </div>
    );
}

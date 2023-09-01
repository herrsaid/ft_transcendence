'use client'

const Form = () => 
{
    return(
        <div className="relative flex h-[30px] top-[150px] md:top-[200px] lg:top-[200px]">
            <p className="relative flex left-[10%] text-xl md:text-2xl lg:text-3xl font-semibold text-white-500">
                    Invite :
            </p>
            <form>
                <input id= "input_val" type='text' placeholder="invite user..." className=" absolute h-[30px] w-[150px] left-[45%] bg-indigo-500 rounded-md text-center ">
                </input>
            </form>
        </div>
    );
}
export default Form;

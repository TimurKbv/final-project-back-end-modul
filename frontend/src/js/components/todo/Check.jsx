import {HiCheck} from 'react-icons/hi';


function Check({isCompleted, handleCheckbox}) {
    

    return (
        <button 
        onClick={handleCheckbox}  
        className='border-2 rounded-lg border-pink-400 w-7 h-7 mr-2 flex items-center justify-center cursor-pointer'>
            {isCompleted &&
            // checkbox icon
                <HiCheck size={24} className="text-pink-400" />
            }
            
        </button>
    )
}


export default Check;
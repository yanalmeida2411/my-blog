import React from 'react'

const Loading = () => {
    return (
        <>
            <div className="flex justify-center items-center h-80">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#00809D]"></div>
            </div>
        </>
    )
}

export default Loading
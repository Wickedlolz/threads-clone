type SpinnerProps = {
    isSmall?: boolean;
};

const Spinner = ({ isSmall }: SpinnerProps) => {
    return (
        <>
            {isSmall ? (
                <div
                    className='inline-block h-3 w-3 mr-2 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
                    role='status'
                >
                    <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
                        Loading&hellip;
                    </span>
                </div>
            ) : (
                <div className='max-w-screen-xl flex justify-center mt-5'>
                    <div
                        className='inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
                        role='status'
                    >
                        <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
                            Loading&hellip;
                        </span>
                    </div>
                </div>
            )}
        </>
    );
};

export default Spinner;

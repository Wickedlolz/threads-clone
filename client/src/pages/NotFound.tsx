const NotFound = () => {
    return (
        <section className='flex flex-col justify-center items-center gap-5 py-20'>
            <h2>Sorry, this page isn't available</h2>
            <p className='text-gray-500 text-sm w-80 text-center'>
                The link that you followed may be broken or the page may have
                been removed.
            </p>
        </section>
    );
};

export default NotFound;

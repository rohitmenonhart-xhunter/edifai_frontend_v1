import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PurpleBox from '@/components/PurpleBox';
import Wishlist from '@/components/Wishlistcomp';
import React from 'react';


const WishlistPage = () => {
    return (
        <div className=" bg-white  ">
            <Navbar />

            <Wishlist />

            <div className='flex  justify-center'>
                <PurpleBox />
            </div>

            <Footer />

        </div>
    );
};

export default WishlistPage;
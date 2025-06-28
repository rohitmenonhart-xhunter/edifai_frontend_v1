import React, { useState } from 'react';
import user from "../Assets/Duplicateuser.png";
import Navbar from '@/components/Navbar';
import PurpleBox from '@/components/PurpleBox';
import Footer from '@/components/Footer';

const initialNotifications = [
  {
    id: 1,
    text: 'Lorem ipsum dolor sit amet consectetur. Dapibus placerat ornare ornare blandit morbi eget senectus tempus iaculis. Posuere bibendum lacinia pulvinar pharetra et.',
    date: 'June 26, 2025',
  },
  // {
  //   id: 2,
  //   text: 'Lorem ipsum dolor sit amet consectetur. Diam eleifend erat hendrerit varius aliquet donec pulvinar. Tincidunt at malesuada viverra nibh consequat pellentesque nibh et libero.',
  //   date: 'February 26, 2025',
  // },
  // {
  //   id: 3,
  //   text: 'Lorem ipsum dolor sit amet consectetur. Consectetur sit quam sapien hendrerit eu eu vitae eget mauris. Lectus proin a tempus turpis.',
  //   date: 'April 25, 2025',
  // },
  // {
  //   id: 4,
  //   text: 'Lorem ipsum dolor sit amet consectetur. Id neque mattis lacus a adipiscing non. Aliquam amet venenatis eu maecenas mauris.',
  //   date: 'March 6, 2025',
  // },
  // {
  //   id: 5,
  //   text: 'Lorem ipsum dolor sit amet consectetur. Aliquam viverra ut placerat est vitae elit maecenas nibh. In senectus fermentum integer enim lobortis at.',
  //   date: 'March 1, 2025',
  // },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  return (
    <div className='justify-center align-top '>
        <Navbar/>
        <div className=' justify-items-center my-14'>
          <h1 className="font-semibold 3xl:pr-[40%] 3xl:text-5xl lg:pr-[47%] lg:text-3xl ">Notifications</h1> 
        </div>
  <div className='justify-items-center'>
    <div className="justify-items-center 3xl:px-28 3xl:w-[67%] lg:w-[60%]">
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex items-start 3xl:pb-4">
            <img
              src={user}
              alt="user"
              className="3xl:w-[75px] rounded-full mr-4 lg:w-[55px]"
            />
            <div className="flex-1">
              <p className="font-medium 3xl:text-[1rem] text-gray-700 3xl:pb-1 lg:text-base">{notification.text}</p>
              <p className="3xl:text-[1rem] text-gray-500 mt-2 3xl:pb-2 lg:text-[13px]">{notification.date}</p>
            </div>
            <button
              className="font-light text-gray-600 hover:text-red-500 3xl:text-5xl pl-4 pt-2 ml-4 lg:text-3xl"
              onClick={() => handleDelete(notification.id)}
            >
              ×
            </button>
          </div>
        ))}
        {notifications.length === 0 && (
          <p className="text-center text-gray-400 3xl:text-4xl">No notifications left</p>
        )}
      </div>
    </div>
    </div>
    <div className='flex justify-center pt-10'>
    <PurpleBox/>

    </div>
    <Footer/>
    </div>
  );
};

export default Notifications;

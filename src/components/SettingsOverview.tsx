import React from 'react';
import SettingsTabs from './SettingsTab'; // Adjust the path if needed
import RightSideBar from './RightSideBar';
const SettingsOverview = () => {
  return (

    <div className="max-w-xxl mx-auto">
      {/* <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your profile, account, and notifications all in one place.
        </p>
      </div> */}

      <div className='flex justify-around w-[100vw]  '>
        <SettingsTabs />
        {/* <RightSideBar /> */}
      </div>
    </div>


  );
};
export default SettingsOverview;







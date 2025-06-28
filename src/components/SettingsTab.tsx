import React, { useState, useRef, useEffect } from 'react';
import { User, Lock, Bell } from 'lucide-react';
import camera from "../Assets/Camera.svg";
import { getUserProfile, updateUserProfile } from '@/services/profileService';
import { toast } from 'sonner';

const SettingsTabs = () => {
  const [activeTab, setActiveTab] = useState('edit');
  const [selectedImage, setSelectedImage] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null); 

  // State for Edit Profile form
  const [profileForm, setProfileForm] = useState({
    fullName: '',
    email: '',
    location: '',
    dateOfBirth: '',
    phone: '',
  });

  // State for Account form (passwords and username)
  const [accountForm, setAccountForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    username: '',
    language: 'English, India',
  });

  // State for Notification settings
  const [notificationForm, setNotificationForm] = useState({
    pushNotification: 'All New Messages',
    emailNotification: 'Send me email notifications',
    morePreferences: {
      option1: false,
      option2: false,
    },
  });

  // Fetch user profile data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userData = await getUserProfile();
        
        if (userData) {
          setProfileForm({
            fullName: userData.name || '',
            email: userData.email || '',
            location: userData.location || 'Tamilnadu, Chennai',
            dateOfBirth: userData.dateOfBirth || '2003-12-17',
            phone: userData.phone || '+1 234 567 890',
          });
          
          if (userData.avatar) {
            setSelectedImage(userData.avatar);
          }
          
          setAccountForm(prev => ({
            ...prev,
            username: userData.username || '',
          }));
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);

  const tabs = [
    { id: 'edit', label: 'Edit Profile', icon: <User className="w-4 h-4 mr-1" /> },
    { id: 'account', label: 'Account', icon: <Lock className="w-4 h-4 mr-1" /> },
    { id: 'notification', label: 'Notification', icon: <Bell className="w-4 h-4 mr-1" /> },
  ];

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); 
      setSelectedImage(imageUrl); 
    }
  };

  // Handle camera icon click to trigger file input
  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  // Handle form submission for Edit Profile
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      // Convert form data to user profile update format
      const updateData = {
        name: profileForm.fullName,
        email: profileForm.email,
        location: profileForm.location,
        dateOfBirth: profileForm.dateOfBirth,
        phone: profileForm.phone
      };
      
      await updateUserProfile(updateData);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Handle form submission for Account
  const handleAccountSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (accountForm.newPassword !== accountForm.confirmPassword) {
        toast.error('New password and confirmation do not match');
        return;
      }
      
      setSaving(true);
      console.log('Account update with:', accountForm);
      // Placeholder for actual password update API call
      // await updatePassword(accountForm);
      
      toast.success('Account settings updated successfully!');
      
      // Reset password fields
      setAccountForm(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    } catch (error) {
      console.error('Failed to update account settings:', error);
      toast.error('Failed to update account settings');
    } finally {
      setSaving(false);
    }
  };

  // Handle form submission for Notification
  const handleNotificationSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      // Placeholder for notification settings API call
      // await updateNotificationSettings(notificationForm);
      
      console.log('Notification Settings Updated:', notificationForm);
      toast.success('Notification preferences updated');
    } catch (error) {
      console.error('Failed to update notification settings:', error);
      toast.error('Failed to update notification settings');
    } finally {
      setSaving(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading settings...</p>
        </div>
      );
    }
    
    switch (activeTab) {
      case 'edit':
        return (
          <form className="space-y-8" onSubmit={handleProfileSubmit}>
            <div className="flex items-center mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden mr-4 relative">
                <img
                  src={selectedImage || "/placeholder.svg"}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
                <img
                  src={camera}
                  alt="Camera Icon"
                  className="w-[50%] h-[50%] absolute bottom-6 left-1/2 transform -translate-x-1/2 cursor-pointer"
                  onClick={handleCameraClick}
                />
                {/* <input
                  type="png"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageChange}
                /> */}

                <input
                  type="file" // Changed from type="png" to type="file"
                  accept="image/png, image/jpeg" // Specify allowed image types
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              <div>
                <p className="text-gray-900 text-sm">Upload Photo</p>
                <p className="text-sm text-gray-400">1000 x 1000</p>
                <p className="text-sm text-gray-400">
                  Image size should be under 1MB and image ratio needs to be 1:1
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                className="mt-1 block w-[40%] px-3 py-2 border rounded-[30px] bg-gray-100 text-gray-400 focus:ring-[#8A63FF] focus:border-[#8A63FF]"
                value={profileForm.fullName}
                onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
              />
            </div>
            <div className="space-y-4">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                id="location"
                type="text"
                className="mt-1 block w-[40%] px-3 py-2 border rounded-[30px] bg-gray-100 text-gray-400 focus:ring-[#8A63FF] focus:border-[#8A63FF]"
                value={profileForm.location}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, location: e.target.value })
                }
              />
            </div>
            <div className="space-y-4">
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium text-gray-700"
              >
                Date Of Birth
              </label>
              <input
                id="dateOfBirth"
                type="date"
                className="mt-1 block w-[40%] px-3 py-2 border rounded-[30px] bg-gray-100 text-gray-400 focus:ring-[#8A63FF] focus:border-[#8A63FF]"
                value={profileForm.dateOfBirth}
                onChange={(e) => setProfileForm({ ...profileForm, dateOfBirth: e.target.value })}
              />
            </div>
            <div className="space-y-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                className="mt-1 block w-[40%] px-3 py-2 border rounded-[30px] bg-gray-100 text-gray-400 focus:ring-[#8A63FF] focus:border-[#8A63FF]"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
              />
            </div>
            <div className="space-y-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 block w-[40%] px-3 py-2 border rounded-[30px] bg-gray-100 text-gray-400 focus:ring-[#8A63FF] focus:border-[#8A63FF]"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-[#8A63FF] text-white rounded-[30px] hover:bg-purple-700 disabled:bg-gray-400"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        );
      case 'account':
        return (
          <div className="space-y-8">
            <form onSubmit={handleAccountSubmit} className="space-y-5">
              <div className="space-y-4">
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  className="mt-1 block w-[40%] px-3 py-2 border rounded-[30px] bg-gray-100 text-gray-400"
                  value={accountForm.currentPassword}
                  onChange={(e) =>
                    setAccountForm({ ...accountForm, currentPassword: e.target.value })
                  }
                />
              </div>
              <div className="space-y-4">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  className="mt-1 block w-[40%] px-3 py-2 border rounded-[30px] bg-gray-100 text-gray-400"
                  value={accountForm.newPassword}
                  onChange={(e) =>
                    setAccountForm({ ...accountForm, newPassword: e.target.value })
                  }
                />
              </div>
              <div className="space-y-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  className="mt-1 block w-[40%] px-3 py-2 border rounded-[30px] bg-gray-100 text-gray-400"
                  value={accountForm.confirmPassword}
                  onChange={(e) =>
                    setAccountForm({ ...accountForm, confirmPassword: e.target.value })
                  }
                />
              </div>
              <button
                disabled={saving}
                className="px-4 py-2 bg-[#8A63FF] text-white rounded-[30px] hover:bg-[#8A63FF] disabled:bg-gray-400"
                type="submit"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
            <div className="space-y-3">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                New Username
              </label>
              <input
                id="username"
                type="text"
                className="mt-1 block w-[40%] rounded-[30px] bg-gray-100 text-gray-300 px-3 py-2"
                placeholder="Username"
                value={accountForm.username}
                onChange={(e) => setAccountForm({ ...accountForm, username: e.target.value })}
              />
              <button
                className="mt-2 px-4 py-2 bg-[#8A63FF] text-white rounded-[30px] hover:bg-purple-700 disabled:bg-gray-400"
                onClick={async () => {
                  try {
                    setSaving(true);
                    // This would be an API call in a real app
                    await updateUserProfile({ username: accountForm.username });
                    toast.success('Username updated successfully');
                  } catch (error) {
                    console.error('Failed to update username:', error);
                    toast.error('Failed to update username');
                  } finally {
                    setSaving(false);
                  }
                }}
                disabled={!accountForm.username || saving}
              >
                {saving ? 'Updating...' : 'Update Username'}
              </button>
            </div>
            <div className="space-y-3">
              <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                Language
              </label>
              <select
                id="language"
                className="mt-1 block w-[40%] px-3 py-2 border rounded-[30px] bg-gray-100 text-gray-400"
                value={accountForm.language}
                onChange={(e) => setAccountForm({ ...accountForm, language: e.target.value })}
              >
                <option value="English, USA">English, USA</option>
                <option value="English, India">English, India</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
            </div>
          </div>
        );
      case 'notification':
        return (
          <form onSubmit={handleNotificationSubmit}>
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Push Notification
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="allMessages"
                    name="pushNotification"
                    value="All New Messages"
                    checked={notificationForm.pushNotification === "All New Messages"}
                    onChange={(e) =>
                      setNotificationForm({
                        ...notificationForm,
                        pushNotification: e.target.value,
                      })
                    }
                    className="mr-2 form-radio text-purple-600 h-4 w-4"
                  />
                  <label htmlFor="allMessages" className="text-sm text-gray-700">
                    All New Messages
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="mentions"
                    name="pushNotification"
                    value="Only @ mentions"
                    checked={notificationForm.pushNotification === "Only @ mentions"}
                    onChange={(e) =>
                      setNotificationForm({
                        ...notificationForm,
                        pushNotification: e.target.value,
                      })
                    }
                    className="mr-2 form-radio text-purple-600 h-4 w-4"
                  />
                  <label htmlFor="mentions" className="text-sm text-gray-700">
                    Only @ mentions
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="nothing"
                    name="pushNotification"
                    value="Nothing"
                    checked={notificationForm.pushNotification === "Nothing"}
                    onChange={(e) =>
                      setNotificationForm({
                        ...notificationForm,
                        pushNotification: e.target.value,
                      })
                    }
                    className="mr-2 form-radio text-purple-600 h-4 w-4"
                  />
                  <label htmlFor="nothing" className="text-sm text-gray-700">
                    Nothing
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Email Notification
              </h3>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="emailNotification"
                  checked={notificationForm.emailNotification === "Send me email notifications"}
                  onChange={(e) =>
                    setNotificationForm({
                      ...notificationForm,
                      emailNotification: e.target.checked
                        ? "Send me email notifications"
                        : "",
                    })
                  }
                  className="form-checkbox text-purple-600 h-5 w-5"
                />
                <label htmlFor="emailNotification" className="ml-2 text-sm text-gray-700">
                  Send me email notifications
                </label>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                More Preferences
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="option1"
                    checked={notificationForm.morePreferences.option1}
                    onChange={(e) =>
                      setNotificationForm({
                        ...notificationForm,
                        morePreferences: {
                          ...notificationForm.morePreferences,
                          option1: e.target.checked,
                        },
                      })
                    }
                    className="form-checkbox text-purple-600 h-5 w-5"
                  />
                  <label htmlFor="option1" className="ml-2 text-sm text-gray-700">
                    Receive newsletters and other promotional emails
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="option2"
                    checked={notificationForm.morePreferences.option2}
                    onChange={(e) =>
                      setNotificationForm({
                        ...notificationForm,
                        morePreferences: {
                          ...notificationForm.morePreferences,
                          option2: e.target.checked,
                        },
                      })
                    }
                    className="form-checkbox text-purple-600 h-5 w-5"
                  />
                  <label htmlFor="option2" className="ml-2 text-sm text-gray-700">
                    Receive important updates about courses and platform
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-purple-600 text-white rounded-[30px] hover:bg-purple-700 disabled:bg-gray-400"
            >
              {saving ? 'Saving...' : 'Save Preferences'}
                {/* className="mt-1 block w-[40%] rounded-[30px] bg-gray-100 text-gray-300 px-3 py-2"
                placeholder="Username"
                value={accountForm.username}
                onChange={(e) =>
                  setAccountForm({ ...accountForm, username: e.target.value })
                }
              />
              <button
                className="mt-2 px-4 py-2 bg-[#8A63FF] text-white rounded-[30px] hover:bg-purple-700"
                onClick={() =>
                  console.log("Username Updated:", accountForm.username)
                }
              >
                Save Username
              </button>
            </div>
            <div className="space-y-3">
              <label
                htmlFor="language"
                className="block text-sm font-medium text-gray-700"
              >
                Select Language
              </label>
              <select
                id="language"
                className="mt-1 block w-[40%] px-3 py-2 border rounded-[30px] bg-gray-100 text-gray-400"
                value={accountForm.language}
                onChange={(e) =>
                  setAccountForm({ ...accountForm, language: e.target.value })
                }
              >
                <option value="English, India">English (India)</option>
                <option value="English, US">English (US)</option>
              </select>
              <button
                className="mt-2 px-4 py-2 bg-[#8A63FF] text-white rounded-[30px] hover:bg-purple-700"
                onClick={() =>
                  console.log("Language Updated:", accountForm.language)
                }
              >
                Save Language
              </button>
            </div>
            <div className="pt-4 border-t space-y-3">
              <p className="text-sm text-gray-700">
                Delete your account permanently
              </p>
              <label className="flex items-center mt-2 space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-[#8A63FF] focus:ring-purple-500"
                />
                <span className="text-sm">Confirm Delete your account</span>
              </label>
              <button
                className="mt-2 px-4 py-2 bg-[#8A63FF] text-white rounded-[30px] hover:bg-purple-700"
                onClick={() => console.log("Account Deletion Requested")}
              >
                Delete My Account
              </button>
            </div>
          </div>
        );
      case "notification":
        return (
          <form className="space-y-10" onSubmit={handleNotificationSubmit}>
            <div className="space-y-4">
              <label
                htmlFor="pushNotification"
                className="block text-md font-medium text-gray-700"
              >
                Mobile push notification
              </label>
              <select
                id="pushNotification"
                className="mt-1 block w-full text-grey-700 rounded-lg px-3 py-2 border border-gray-300"
                value={notificationForm.pushNotification}
                onChange={(e) =>
                  setNotificationForm({
                    ...notificationForm,
                    pushNotification: e.target.value,
                  })
                }
              >
                <option value="All New Messages">All New Messages</option>
                <option value="Important Only">Important Only</option>
              </select>
            </div>
            <div className="space-y-4">
              <h3 className="text-md font-semibold text-gray-800">
                Email Notifications
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Control the types of email notifications you receive. You can choose to be notified about account activity, promotional offers, or important updates. We'll only send you relevant information based on your selections.
              </p>
            </div>
            <fieldset className="space-y-4">
              <legend className="text-md font-medium text-gray-700">
                Send me Email Notifications
              </legend>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="emailNotify"
                  className="text-[#8A63FF]"
                  value="Send me email notifications"
                  checked={
                    notificationForm.emailNotification ===
                    "Send me email notifications"
                  }
                  onChange={(e) =>
                    setNotificationForm({
                      ...notificationForm,
                      emailNotification: e.target.value,
                    })
                  }
                />
                <span className="text-sm">Send me email notifications</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="emailNotify"
                  className="text-[#8A63FF]"
                  value="Once an hour at most"
                  checked={
                    notificationForm.emailNotification ===
                    "Once an hour at most"
                  }
                  onChange={(e) =>
                    setNotificationForm({
                      ...notificationForm,
                      emailNotification: e.target.value,
                    })
                  }
                />
                <span className="text-sm">Once an hour at most</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="emailNotify"
                  className="text-[#8A63FF]"
                  value="Never"
                  checked={notificationForm.emailNotification === "Never"}
                  onChange={(e) =>
                    setNotificationForm({
                      ...notificationForm,
                      emailNotification: e.target.value,
                    })
                  }
                />
                <span className="text-sm">Never</span>
              </label>
            </fieldset>
            <div className="space-y-4">
              <h3 className="text-md font-semibold text-gray-800">
                More Email Preferences
              </h3>
              <p className="text-sm text-gray-600">
                Further customize your email preferences. Select specific categories or types of emails you wish to receive or opt-out of. Manage your subscription to ensure you get the most out of your experience
              </p>
              <label className="flex items-center mt-2 space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-[#8A63FF]"
                  checked={notificationForm.morePreferences.option1}
                  onChange={(e) =>
                    setNotificationForm({
                      ...notificationForm,
                      morePreferences: {
                        ...notificationForm.morePreferences,
                        option1: e.target.checked,
                      },
                    })
                  }
                />
                <span className="text-sm">Title text goes here</span>
              </label>
              <label className="flex items-center mt-2 space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-[#8A63FF]"
                  checked={notificationForm.morePreferences.option2}
                  onChange={(e) =>
                    setNotificationForm({
                      ...notificationForm,
                      morePreferences: {
                        ...notificationForm.morePreferences,
                        option2: e.target.checked,
                      },
                    })
                  }
                />
                <span className="text-sm">Title text goes here</span>
              </label>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#8A63FF] text-white rounded-[30px] hover:bg-purple-700"
            >
              Save Changes */}
            </button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="px-10 min-h-screen w-[60vw] top-32">
      {/* Avatar Preview Above Tabs */}

      <div className="w-full mx-auto bg-white rounded-[40px] shadow-md">
        {/* Tabs */}
        <div className="flex border-b px-6 pt-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 mr-4 text-sm font-medium ${
                activeTab === tab.id
                  ? "border-b-2 border-[#8A63FF] text-[#8A63FF]"
                  : "text-gray-500 hover:text-[#8A63FF]"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
        {/* Content */}
        <div className="p-6">{renderContent()}</div>
      </div>
    </div>
  );
};
export default SettingsTabs;

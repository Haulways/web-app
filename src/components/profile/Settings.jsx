import React, { useContext, useState } from 'react'
import '../../pages/profile/profile.css';
import { AuthContext } from '../context/AuthContext';
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { Link,   useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { toast } from 'react-toastify';
import account from "../../assets/profileIcons/AccountIcon.png";
import Action from "../../assets/profileIcons/ActionIcon.png";
import help from "../../assets/profileIcons/helpIcon.png";
import request from "../../assets/profileIcons/notifyIcon.png";
import { Avatar, Dialog} from '@mui/material';
import camera from "../../assets/profileIcons/cameraAlt.png";
import { supabase } from '../../supabase/SupabaseConfig';
import { Title, useGetList, useRedirect } from 'react-admin';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { ThemeContext } from '../context/ThemeProvider';


const Settings = () => {
  const { theme } = React.useContext(ThemeContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate()
  const [accountCenter, setAccountCenter] = useState(false);
  const [actions, setActions] = useState(false);
  const [notification, setNotification] = useState(false);
  const [helpSupport, setHelpSupport] = useState(false);
  const { data: userDataArray } = useGetList('users', { filter: { uid: currentUser?.uid } });
  const userData = userDataArray && userDataArray[0];

  const { data: followers, total: totalFollowers } = useGetList(
    'followers', { filter: { followed_id: userData?.id } }
  );



  const openAccount = () => {
    setAccountCenter(true);
  }

  const closeAccount = () => {
    setAccountCenter(false);
  }

  const openAction = () => {
    setActions(true);
  }

  const closeAction = () => {
    setActions(false);
  }

  const openNotification = () => {
    setNotification(true);
  }

  const closeNotification = () => {
    setNotification(false);
  }

  const openHelp = () => {
    setHelpSupport(true);
  }

  const closeHelp = () => {
    setHelpSupport(false);
  }



  // logout user function 
  const logoutUser = () => {
    signOut(auth).then(() => {
      toast.success("SignOut successful.")
      navigate("/");

    }).catch((error) => {
      toast.error(error.message);
    });

  }


  // Add account function 
  const addAccount = () => {
    signOut(auth).then(() => {
      toast.success("SignOut successful.")
      navigate("/signup");

    }).catch((error) => {
      toast.error(error.message);
    });

  }



  const redirect = useRedirect();

  const goToProfile = () => (
    redirect(`/users/${userData?.id}/show`)
  )


  const formatFollowers = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K+';
    } else if (count >= 100 && count <= 999) {
      return (count / 100).toFixed(1) + 'H';
    } else {
      return count;
    }
  }


  return (
    <>
      <Title title='Settings' />
      {currentUser?.uid === userData?.uid && (
        <div className='feed--page'>

          <ul className='user__dropdown'>
            {/* settings */}
            <li className='settings'>
              <div><MdArrowBackIos className='cursor-pointer laptop:hidden tablet:hidden absolute left-[1rem] top-[5rem]' size={20} onClick={goToProfile} /></div>
              {/* <div className='text-center mx-auto font-[600] text-[20px]'>Settings</div> */}
            </li>

            {/* user info */}
            <li className='profile justify-between'>
              <div className='flex gap-x-[8px] items-center'>
                <div className='uImage--container'>
                  <div className='overflow-hidden relative rounded-full h-[60px] w-[60px] drop-shadow-lg'>
                    <Avatar sx={{ width: '60px', height: "60px" }}
                      src={userData.photoURL}
                    />
                  </div>
                  <Link to={`/users/${userData.id}/edit`}>
                    <img className='absolute top-[70%] right-[0] w-[20px] h-[20px] rounded-full' src={camera} alt='camera' />
                  </Link>
                </div>
                <div>
                  <p className='text-[16px] font-[600]'>{userData.displayName}</p>
                  <p className=' font-[400] text-[16px]'>
                    @{userData && userData.username ? userData.username.toLowerCase() : 'username'} - {formatFollowers(totalFollowers)} Followers
                  </p>
                </div>
              </div>

              <div>
                <Link to={`/users/${userData.id}/edit`}><MdArrowForwardIos size={20} />
                </Link>
              </div>
            </li>

            {/* account center */}
            <div className=' mt-[2rem] flex justify-between items-center cursor-pointer' onClick={openAccount}>
              <div className='flex gap-x-[18px] items-center w-[100%]'>
                <img src={account} alt='icon' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
                <div className='pl-[5px]'>
                  <p className='text-[16px] font-[500]'>Account Center</p>
                  <p className=' font-[400] text-[14px]  account--text'>
                    Password & security, personal details...
                  </p>
                </div>
              </div>
      
              <div >
                <MdArrowForwardIos size={20} />
              </div>

            </div>
            {/* Profile  */}
            <div className=' mt-[2rem] flex justify-between items-center cursor-pointer' onClick={openAction}>
              <div className='flex gap-x-[18px] items-center w-[100%]'>
                <img src={Action} alt='icon' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
                <div className='pl-[5px]'>
                  <p className='text-[16px] font-[500]'>Actions</p>
                  <p className=' font-[400] text-[14px]'>
                    Logout, add account
                  </p>
                </div>
              </div>
      
              <div >
                <MdArrowForwardIos size={20} />
              </div>

            </div>

            {/* Personal information */}
            <div className=' mt-[2rem] flex justify-between items-center cursor-pointer' onClick={openNotification}>
              <div className='flex gap-x-[18px] items-center w-[100%]'>
                <img src={request} alt='icon' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
                <div className='pl-[5px]'>
                  <p className='text-[16px] font-[500]'>Notifications</p>
                  <p className=' font-[400] text-[14px]  '>
                    Requests, updates
                  </p>
                </div>
              </div>
      
              <div >
                <MdArrowForwardIos size={20} />
              </div>

            </div>

           

            
            {/* privacy policy */}
            <div className=' mt-[2rem] flex justify-between items-center cursor-pointer' onClick={openHelp}>
              <div className='flex gap-x-[18px] items-center w-[100%]'>
                <img src={help} alt='icon' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
                <div className=''>
                  <p className='text-[16px] font-[500]'>Help and Support</p>
                  <p className=' font-[400] text-[14px] '>
                    About, privacy policy
                  </p>
                </div>
              </div>
      
              <div >
                <MdArrowForwardIos size={20} />
              </div>

            </div>

          </ul>

          <Account closeAccount={closeAccount} theme={theme} accountCenter={accountCenter} currentUser={currentUser} />

          <Actions closeAction={closeAction} actions={actions} theme={theme} />

          <Notification notification={notification} closeNotification={closeNotification} theme={theme} />

          <Help helpSupport={helpSupport} closeHelp={closeHelp} theme={theme} />

          
        </div>
      )}
    </>
  );
};

export default Settings


// Account 

export const Account = ({ closeAccount, accountCenter, currentUser, theme }) => {
  const [openNameForm, setOpenNameForm] = useState(false);
  const [openUNameForm, setOpenUNameForm] = useState(false);
  const [openImageForm, setOpenImageForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newUName, setNewUName] = useState('');
  const [newImage, setNewImage] = useState(null);

  const updateName = async () => {
    if (newName.trim() !== '') {
      const { data, error } = await supabase
        .from('users')
        .update({ displayName: newName })
        .eq('id', currentUser.uid);
  
      if (error) throw error;
  
      setNewName('');
      toast.success("Profile name updated");
  
    }
  };

  const updateUName = async () => {
    if (newUName.trim() !== '') {
      const { data, error } = await supabase
        .from('users')
        .update({ username: newUName })
        .eq('id', currentUser.uid);
    
        if (error) {
          console.log(error);
          throw error;
        }

        setNewUName('');
      toast.success("Profile username updated");
    
    }
  };

  const updateImage = async () => {
    console.log(newImage);
    if (newImage !== null) {
      const { data: uploadedFile, error: uploadError } = await supabase
        .storage
        .from('profileImages') // replace with your bucket name
        .upload(currentUser.displayName, newImage) // replace with your file path
  
      if (uploadError) {
        console.error(uploadError)
        return
      }

      // Retrieve the image URL after successful upload
      const { data: urlData, error: urlError } = supabase
        .storage
        .from('profileImages')
        .getPublicUrl(currentUser.displayName)

      if (urlError) {
        console.error(urlError)
        return
      }

      const imageUrl = urlData.publicUrl
  
      // Update the user's photoURL with the new image URL
      const { data: updatedUser, error: updateError } = await supabase
        .from('users')
        .update({ photoURL: imageUrl })
        .eq('id', currentUser.id)
  
      if (updateError) {
        console.error(updateError)
        return
      }
  
      console.log('Profile picture updated', updatedUser)
  
      setNewImage(null);
      toast.success("Profile picture updated");
    }
  };
  

  return (
    <Dialog
      open={accountCenter}
      onClose={closeAccount}
      fullScreen
      PaperProps={{ style: { padding: '0 1rem', backgroundColor: theme === 'light' ? '#fff' : '#222', color: theme === 'light' ? '#222' : '#fff',  } }}
    >
      <div><MdArrowBackIos className='cursor-pointer absolute left-[1rem] top-[1.5rem]' size={20} onClick={closeAccount} /></div>

      <div className='mb-[4rem]'>
        <h1 className='font-[700] text-[22px] mt-[5.5rem]'>Account Center</h1>

        {/* profile  */}
        <div className='mt-[2.5rem]'>
          <p className='font-[600] text-[18px]'>Profile</p>
          <p className='font-[400] text-[15px] '>Manage your profile info</p>
        </div>

        <div className='mt-[1.5rem] px-[20px] py-[25px]  text-[15px] rounded-[14px] font-[500] tablet:max-w-md laptop:max-w-md' style={{ backgroundColor: theme === "light" ? "#222" : "rgba(68, 68, 68, 0.2)", color: theme === "light" ? "#fff" : "#fff",}}>
          <div className='flex justify-between items-center mb-[1.5rem] ' onClick={() => setOpenNameForm(!openNameForm)}>
            <p>
              Name
            </p>
            <div className={openNameForm ? 'rotate-[90deg]' : ''}>
              <MdArrowForwardIos size={20} color='#fff' />
            </div>
            
          </div>
          {openNameForm && (
            <div className='mb-[1.5rem] mt-[-.5rem] flex items-center justify-between'>
              <input type="text" placeholder="E.g John doe" className='w-[70%] pl-[6px] mb-[1px]  font-[400] outline outline-1 outline-white py-[4px] rounded-[10px] bg-transparent' onChange={(e) => setNewName(e.target.value)} />
              <button className='bg-[#fff] text-[#222] font-[400] text-[14px] py-[4px] px-[10px] rounded-[8px]' onClick={updateName}>Update</button>
            </div>
          )}


          <div className='flex justify-between items-center mb-[1.5rem]' onClick={() => setOpenUNameForm(!openUNameForm)}>
            <p>
              Username
            </p>
            <div className={openUNameForm ? 'rotate-[90deg]' : ''}>
              <MdArrowForwardIos size={20} color='#fff' />
            </div>
          </div>
          {openUNameForm && (
            <div className='mb-[1.5rem] mt-[-.5rem] flex items-center justify-between'>
              <input type="text" placeholder="E.g Smart" className='w-[70%] pl-[6px] mb-[1px]  font-[400] outline outline-1 outline-white py-[4px] rounded-[10px] bg-transparent' onChange={(e) => setNewUName(e.target.value)} />
              <button className='bg-[#fff] text-[#222] font-[400] text-[14px] py-[4px] px-[10px] rounded-[8px]' onClick={updateUName}>Update</button>
            </div>
          )}

          <div className='flex justify-between items-center' onClick={() => setOpenImageForm(!openImageForm)}>
            <p>
              Profile picture
            </p>
            <div className={openImageForm ? 'rotate-[90deg]' : ''}>
              <MdArrowForwardIos size={20} color='#fff' />
            </div>
          </div>
          {openImageForm && (
            <div className='mt-[1.5rem]  flex items-center justify-between'>
              <label htmlFor="file">

                <span><CameraAltIcon sx={{ fontSize: '3rem' }} /></span>
                <input type="file" id="file" accept="image/*" style={{ display: "none" }} onChange={(e) => setNewImage(e.target.files[0])} />
              </label>
              <Avatar sx={{ width: '40px', height: "40px" }}
                      src={newImage && URL.createObjectURL(newImage)}
                    />
              <button className='bg-[#fff] text-[#222] font-[400] text-[14px] py-[4px] px-[10px] rounded-[8px]' onClick={updateImage}>Update</button>
            </div>
          )}
        </div>

         {/* Instagram and security */}
         <div className='mt-[2.5rem]'>
          <p className='font-[600] text-[19px]'>Instagram</p>
          <p className='font-[400]  leading-[20px] mt-[10px]'>Integrate your Instagram account with Haulway</p>
        </div>

        <div className='mt-[1.5rem] px-[20px] py-[25px]  text-[15px] rounded-[14px] font-[500] tablet:max-w-md laptop:max-w-md' style={{ backgroundColor: theme === "light" ? "#222" : "rgba(68, 68, 68, 0.2)", color: theme === "light" ? "#fff" : "#fff",}}>
          <div className='flex justify-between items-center mb-[1.5rem]'>
            <p>
              Username
            </p>
            <div>
              <MdArrowForwardIos size={20} color='#fff' />
            </div>
          </div>

          <div className='flex justify-between items-center mb-[1.5rem]'>
            <p>
              App ID
            </p>
            <div>
              <MdArrowForwardIos size={20} color='#fff' />
            </div>
          </div>

          <div className='flex justify-between items-center'>
            <p>
              API key
            </p>
            <div>
              <MdArrowForwardIos size={20} color='#fff' />
            </div>
          </div>
        </div>


        {/* password and security */}
        <div className='mt-[2.5rem]'>
          <p className='font-[600] text-[19px]'>Password and Security</p>
          <p className='font-[400]  leading-[20px] mt-[10px]'>Manage your passwords, login details and recovery options</p>
        </div>

        <div className='mt-[1.5rem] px-[20px] py-[25px]  text-[15px] rounded-[14px] font-[500] tablet:max-w-md laptop:max-w-md' style={{ backgroundColor: theme === "light" ? "#222" : "rgba(68, 68, 68, 0.2)", color: theme === "light" ? "#fff" : "#fff",}}>
          <div className='flex justify-between items-center mb-[1.5rem]'>
            <p>
              Change password
            </p>
            <div>
              <MdArrowForwardIos size={20} color='#fff' />
            </div>
          </div>

          <div className='flex justify-between items-center mb-[1.5rem]'>
            <p>
              Saved login
            </p>
            <div>
              <MdArrowForwardIos size={20} color='#fff' />
            </div>
          </div>

          <div className='flex justify-between items-center'>
            <p>
              Two-factor authentication
            </p>
            <div>
              <MdArrowForwardIos size={20} color='#fff' />
            </div>
          </div>
        </div>

      </div>

    </Dialog>
  );
};


// Actions 
export const Actions = ({ closeAction, actions, theme }) => {

  return (
    <Dialog
      open={actions}
      onClose={closeAction}
      fullScreen
      PaperProps={{ style: { padding: '0 1rem', backgroundColor: theme === 'light' ? '#fff' : '#222', color: theme === 'light' ? '#222' : '#fff', } }}
    >
      <div><MdArrowBackIos className='cursor-pointer absolute left-[1rem] top-[1.5rem]' size={20} onClick={closeAction} /></div>

      <div className='mb-[4rem]'>
        <h1 className='font-[700] text-[22px] mt-[5.5rem]'>Actions</h1>

        {/* profile  */}
        <div className='mt-[2.5rem]'>
          <p className='font-[600] text-[18px]'>Actions</p>
          <p className='font-[400] text-[15px]  leading-[20px] mt-[10px]'>Manage your accounts, and login preferences</p>
        </div>

        <div className='mt-[1.5rem] px-[20px] py-[25px]  text-[15px] rounded-[14px] font-[500] tablet:max-w-md laptop:max-w-md' style={{ backgroundColor: theme === "light" ? "#222" : "rgba(68, 68, 68, 0.2)", color: theme === "light" ? "#fff" : "#fff",}}>
          <div className='flex justify-between items-center mb-[1.5rem]'>
            <p>
              Logout
            </p>
            <div>
              <MdArrowForwardIos size={20} color='#fff' />
            </div>
          </div>

          <div className='flex justify-between items-center '>
            <p>
              Add account
            </p>
            <div>
              <MdArrowForwardIos size={20} color='#fff'/>
            </div>
          </div>
        </div>


       

      </div>

    </Dialog>
  )
};


// Notifications
export const Notification = ({ closeNotification, notification, theme }) => {

  return (
    <Dialog
      open={notification}
      onClose={closeNotification}
      fullScreen
      PaperProps={{ style: { padding: '0 1rem', backgroundColor: theme === 'light' ? '#fff' : '#222', color: theme === 'light' ? '#222' : '#fff', } }}
    >
      <div><MdArrowBackIos className='cursor-pointer absolute left-[1rem] top-[1.5rem]' size={20} onClick={closeNotification} /></div>

      <div className='mb-[4rem]'>
        <h1 className='font-[700] text-[22px] mt-[5.5rem]'>Notification</h1>

        {/* profile  */}
        <div className='mt-[2.5rem]'>
          <p className='font-[600] text-[18px]'>Notification</p>
          <p className='font-[400] text-[15px]  leading-[20px] mt-[10px]'>Manage your notifications and updates</p>
        </div>

        <div className='mt-[1.5rem] px-[20px] py-[25px]  text-[15px] rounded-[14px] font-[500] tablet:max-w-md laptop:max-w-md' style={{ backgroundColor: theme === "light" ? "#222" : "rgba(68, 68, 68, 0.2)", color: theme === "light" ? "#fff" : "#fff",}}>
          <div className='flex justify-between items-center mb-[1.5rem]'>
            <p>
              Notifications
            </p>
            <div>
              <MdArrowForwardIos size={20} color='#fff' />
            </div>
          </div>

          <div className='flex justify-between items-center '>
            <p>
              Updates
            </p>
            <div>
              <MdArrowForwardIos size={20} color='#fff'/>
            </div>
          </div>
        </div>


       

      </div>

    </Dialog>
  )
};

// Help and support
export const Help = ({ closeHelp, helpSupport, theme }) => {

  return (
    <Dialog
      open={helpSupport}
      onClose={closeHelp}
      fullScreen
      PaperProps={{ style: { padding: '0 1rem', backgroundColor: theme === 'light' ? '#fff' : '#222', color: theme === 'light' ? '#222' : '#fff', } }}
    >
      <div><MdArrowBackIos className='cursor-pointer absolute left-[1rem] top-[1.5rem]' size={20} onClick={closeHelp} /></div>

      <div className='mb-[4rem]'>
        <h1 className='font-[700] text-[22px] mt-[5.5rem]'>Help and support</h1>

        {/* profile  */}
        <div className='mt-[2.5rem]'>
          <p className='font-[600] text-[18px]'>Help and support</p>
          <p className='font-[400] text-[15px]  leading-[20px] mt-[10px]'>Get help and learn about our privacy policy</p>
        </div>

        <div className='mt-[1.5rem] px-[20px] py-[25px]  text-[15px] rounded-[14px] font-[500] tablet:max-w-md laptop:max-w-md' style={{ backgroundColor: theme === "light" ? "#222" : "rgba(68, 68, 68, 0.2)", color: theme === "light" ? "#fff" : "#fff",}}>
          <div className='flex justify-between items-center mb-[1.5rem]'>
            <p>
              About
            </p>
            <div>
              <MdArrowForwardIos size={20} color='#fff' />
            </div>
          </div>

          <div className='flex justify-between items-center '>
            <p>
              Privacy policy
            </p>
            <div>
              <MdArrowForwardIos size={20} color='#fff'/>
            </div>
          </div>
        </div>


       

      </div>

    </Dialog>
  )
};



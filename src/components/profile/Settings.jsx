import React, { useContext, useEffect, useState } from 'react'
import '../../pages/profile/profile.css';
import { AuthContext } from '../context/AuthContext';
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { toast } from 'react-toastify';
import account from "../../assets/profileIcons/AccountIcon.png";
import Action from "../../assets/profileIcons/ActionIcon.png";
import help from "../../assets/profileIcons/helpIcon.png";
import request from "../../assets/profileIcons/notifyIcon.png";
import { Avatar, Dialog } from '@mui/material';
import camera from "../../assets/profileIcons/cameraAlt.png";
import { supabase } from '../../supabase/SupabaseConfig';
import { Title, useGetList, useRedirect, useRefresh, useStore, useUpdate } from 'react-admin';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { ThemeContext } from '../context/ThemeProvider';
import { useGetIdentity } from 'react-admin';
import axios, { isCancel, AxiosError } from 'axios';



const Settings = () => {
  const { theme } = React.useContext(ThemeContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate()
  const refresh = useRefresh();
  const [accountCenter, setAccountCenter] = useState(false);
  const [actions, setActions] = useState(false);
  const [notification, setNotification] = useState(false);
  const [g_user, setG_User] = useStore("user");
  const [user_obj, setUser_obj] = useState(g_user);
  const { identity, isLoading: identityLoading } = useGetIdentity();
  const [helpSupport, setHelpSupport] = useState(false);
  const { data: userDataArray } = useGetList('users', { filter: { uid: user_obj?.uid } });
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

  useEffect(() => {
    if (currentUser) {
      setUser_obj(currentUser);
      refresh()
    }
  }, [currentUser])


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
      {user_obj?.uid === userData?.uid && (
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
                      src={userData?.photoURL}
                    />
                  </div>
                  <Link to={`/users/${userData?.id}/edit`}>
                    <img className='absolute top-[70%] right-[0] w-[20px] h-[20px] rounded-full' src={camera} alt='camera' />
                  </Link>
                </div>
                <div>
                  <p className='text-[16px] font-[600]'>{userData?.displayName}</p>
                  <p className=' font-[400] text-[16px]'>
                    @{userData && userData?.username ? userData?.username.toLowerCase() : 'username'} - {formatFollowers(totalFollowers)} Followers
                  </p>
                </div>
              </div>

              <div>
                <Link to={`/users/${userData?.id}/edit`}><MdArrowForwardIos size={20} />
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

          <Account closeAccount={closeAccount} theme={theme} accountCenter={accountCenter} currentUser={user_obj} />

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
  const [openBankForm, setOpenBankForm] = useState(false);
  const [bankName, setBankName] = useState('');
  const [PS_Bank_info, setPS_Bank_info] = useState(null);
  const [accNum, setAccNum] = useState('');
  const [accName, setAccName] = useState('');
  const [country, setCountry] = useState('');
  const [bank_list, setBankList] = useState([]);
  const [PS_sub_acc, setPS_sub_acc] = useState(null);
  const [update, { isLoading, error: upd_err }] = useUpdate();

  const { identity, isLoading: identityLoading } = useGetIdentity();

  const listBanks = async () => {
    const banks = await axios({
      method: 'get',
      baseURL: 'https://api.paystack.co',
      url: '/bank',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PS_SCRT_KEY}`
      }
    });

    if (banks) {
      setBankList(banks?.data?.data.map(bank => {
        return { value: bank.code, name: bank.name }
      }))
    };
    // return banks
  }

  const createSubAcc = async () => {

    const sub_acc = await axios({
      method: 'post',
      baseURL: 'https://api.paystack.co',
      url: '/subaccount',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PS_SCRT_KEY}`,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        "business_name": accName,
        "settlement_bank": PS_Bank_info.value,
        "account_number": accNum,
        "percentage_charge": 10
      })
    });

    if (sub_acc && sub_acc.data && sub_acc.data.status) {
      return sub_acc.data.data
    }
    else {
      return null
    }
  }

  const updateSubAcc = async () => {
    const sub_acc = await axios({
      method: 'put',
      baseURL: 'https://api.paystack.co',
      url: `/subaccount/${currentUser.ps_sub_account.subaccount_code}`,
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PS_SCRT_KEY}`,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        "business_name": accName,
        "settlement_bank": PS_Bank_info.value,
        "account_number": accNum,
        "percentage_charge": 10
      })
    });

    if (sub_acc && sub_acc.data && sub_acc.data.status) {
      return sub_acc.data.data
    }
    else {
      return null
    }
  }


  const resolveBank = async (accNum, bank_code) => {
    if (bankName.trim() !== '' && accNum.trim() !== '' && accNum.length === 10) {
      const bank = await axios({
        method: 'get',
        baseURL: 'https://api.paystack.co',
        url: `/bank/resolve?account_number=${accNum}&bank_code=${bank_code}`,
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_PS_SCRT_KEY}`
        },
      });

      if (bank && bank.data && bank.data.status) {
        toast.success("Confirm your Account Name");
        // console.log(bank.data.data)
        setAccName(bank.data.data.account_name)
      };
    }
    else {
      console.log("Incorrect Format")
    }

    // return banks
  }

  const createSplit = async (sub_accs_shares) => {

    const split = await axios({
      method: 'post',
      baseURL: 'https://api.paystack.co',
      url: '/split',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PS_SCRT_KEY}`,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        "name": "Percentage Split Demo",
        "type": "percentage",
        "currency": "NGN",
        "subaccounts": sub_accs_shares,
        "bearer_type": "subaccount",
        "bearer_subaccount": sub_accs_shares[0].subaccount
      })
    });

    if (split && split.data && split.data.status) {
      // toast.success(sub_acc.data.data.message);
      return split.data.data
    }
    else {
      return null
    }
    // return banks
  }

  useEffect(() => {
    listBanks();
  }, [])

  const split_acc = async (data) => {
    let split = null
    split = await createSplit(data);
    console.log(split)
  }

  // useEffect(() => {
  //   if (bankName) {
  //     console.log(bankName)
  //   };
  //   if (PS_Bank_info) {
  //     console.log(PS_Bank_info)
  //   };
  //   if (accNum) {
  //     console.log(accNum)
  //   };
  // }, [bankName, PS_Bank_info, accNum])



  const updateBankInfo = async () => {
    let sub_acc = null
    if (currentUser && currentUser.ps_sub_account) {
      sub_acc = await updateSubAcc();
      console.log(sub_acc)
    }
    else {
      sub_acc = await createSubAcc();
      console.log(sub_acc)
    }

    if (bankName.trim() !== '' && accNum.trim() !== '' && accName.trim() !== '') {

      const res = await toast.promise(
        update(
          'users',
          { id: currentUser.id, data: { bank_details: { bank_name: PS_Bank_info.name, acc_num: accNum, acc_name: accName, ps_bnk_code: PS_Bank_info.value, verified: true, verified_at: new Date() }, ps_sub_account: sub_acc }, }
        ),

        // supabase
        // .from('users')
        // .update({ bank_details: { bank_name: PS_Bank_info.name, acc_num: accNum, acc_name: accName, ps_bnk_code: PS_Bank_info.value, verified: true, verified_at: new Date() }, ps_sub_account: sub_acc })
        // .eq('id', user_obj.uid),

        {
          pending: `Updating Bank Details`,
          success: 'Bank Details Updated 👌',
          error: 'Bank Detail Update Failed 🤯'
        }
      )

      console.log(res);


      if (upd_err) throw error;



      setBankName('');
      setAccNum('')
      setAccName('')
      setPS_Bank_info(null)

      toast.success("Bank details Updated");

    }
    else {
      console.log("Incorrect Format")
    }
  };

  const updateName = async () => {
    if (newName.trim() !== '') {
      const { data, error } = await supabase
        .from('users')
        .update({ displayName: newName })
        .eq('id', user_obj.uid);

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
        .eq('id', user_obj.uid);

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
        .upload(user_obj.displayName, newImage) // replace with your file path

      if (uploadError) {
        console.error(uploadError)
        return
      }

      // Retrieve the image URL after successful upload
      const { data: urlData, error: urlError } = supabase
        .storage
        .from('profileImages')
        .getPublicUrl(user_obj.displayName)

      if (urlError) {
        console.error(urlError)
        return
      }

      const imageUrl = urlData.publicUrl

      // Update the user's photoURL with the new image URL
      const { data: updatedUser, error: updateError } = await supabase
        .from('users')
        .update({ photoURL: imageUrl })
        .eq('id', user_obj.id)

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
      PaperProps={{ style: { padding: '0 1rem', backgroundColor: theme === 'light' ? '#fff' : '#222', color: theme === 'light' ? '#222' : '#fff', } }}
    >
      <div><MdArrowBackIos className='cursor-pointer absolute left-[1rem] top-[1.5rem]' size={20} onClick={closeAccount} /></div>

      <div className='mb-[4rem]'>
        <h1 className='font-[700] text-[22px] mt-[5.5rem]'>Account Center</h1>

        {/* profile  */}
        <div className='mt-[2.5rem]'>
          <p className='font-[600] text-[18px]'>Profile</p>
          <p className='font-[400] text-[15px] '>Manage your profile info</p>
        </div>

        <div className='mt-[1.5rem] px-[20px] py-[25px]  text-[15px] rounded-[14px] font-[500] tablet:max-w-md laptop:max-w-md' style={{ backgroundColor: theme === "light" ? "#222" : "rgba(68, 68, 68, 0.2)", color: theme === "light" ? "#fff" : "#fff", }}>
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

        <div className='mt-[1.5rem] px-[20px] py-[25px]  text-[15px] rounded-[14px] font-[500] tablet:max-w-md laptop:max-w-md' style={{ backgroundColor: theme === "light" ? "#222" : "rgba(68, 68, 68, 0.2)", color: theme === "light" ? "#fff" : "#fff", }}>
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

        <div className='mt-[1.5rem] px-[20px] py-[25px]  text-[15px] rounded-[14px] font-[500] tablet:max-w-md laptop:max-w-md' style={{ backgroundColor: theme === "light" ? "#222" : "rgba(68, 68, 68, 0.2)", color: theme === "light" ? "#fff" : "#fff", }}>
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

        {/* Payments and Bank Info */}
        <div className='mt-[2.5rem]'>
          <p className='font-[600] text-[19px]'>Bank Details</p>
          <p className='font-[400]  leading-[20px] mt-[10px]'>Update your bank info to avoid payment failure</p>
        </div>

        <div className='mt-[1.5rem] px-[20px] py-[25px]  text-[15px] rounded-[14px] font-[500] tablet:max-w-md laptop:max-w-md' style={{ backgroundColor: theme === "light" ? "#222" : "rgba(68, 68, 68, 0.2)", color: theme === "light" ? "#fff" : "#fff", }}>

          <div className='flex justify-between items-center mb-[1.5rem] ' onClick={() => setOpenBankForm(!openBankForm)}>
            <p>
              Bank Name
            </p>
            <div className={openBankForm ? 'rotate-[90deg]' : ''}>
              <MdArrowForwardIos size={20} color='#fff' />
            </div>

          </div>
          {openBankForm && (
            <div className='mb-[1.5rem] mt-[-.5rem] flex items-center justify-between'>

              {bank_list ? (
                <select className='w-[100%] pl-[6px] mb-[1px] font-[400] outline outline-1 outline-white py-[4px] rounded-[10px] bg-transparent' onChange={(e) => { setBankName(bank_list.filter(bnk => { return bnk.value === e.target.value })[0].name); setPS_Bank_info(bank_list.filter(bnk => { return bnk.value === e.target.value })[0]) }}>{bank_list.map(bank => {
                  return <option className='text-black' value={bank?.value}>{bank?.name}</option>
                })}</select>
              ) : (<select className='w-[100%] pl-[6px] mb-[1px]  font-[400] outline outline-1 outline-white py-[4px] rounded-[10px] bg-transparent'><option value="bank">Bank</option></select>)}

              {/* <select className='w-[100%] pl-[6px] mb-[1px]  font-[400] outline outline-1 outline-white py-[4px] rounded-[10px] bg-transparent'><option value="bank">Bank</option></select> */}
              {/* <input type="text" placeholder="E.g John doe" className='w-[100%] pl-[6px] mb-[1px]  font-[400] outline outline-1 outline-white py-[4px] rounded-[10px] bg-transparent' onChange={(e) => setBankName(e.target.value)} /> */}
              {/* <button className='bg-[#fff] text-[#222] font-[400] text-[14px] py-[4px] px-[10px] rounded-[8px]' onClick={updateName}>Update</button> */}
            </div>
          )}


          <div className='flex justify-between items-center mb-[1.5rem]'
          // onClick={() => setOpenUNameForm(!openUNameForm)}
          >
            <p>
              Account Number
              {' - '}
              {currentUser && currentUser.bank_details ? (currentUser.bank_details.acc_num) : (null)}
            </p>

            <div className={openBankForm ? 'rotate-[90deg]' : ''}>
              {/* <MdArrowForwardIos size={20} color='#fff' /> */}
            </div>
          </div>
          {openBankForm && (
            <div className='mb-[1.5rem] mt-[-.5rem] flex items-center justify-between'>
              <input type="text" placeholder="Account Number" value={accNum} className='w-[80%] pl-[6px] mb-[1px]  font-[400] outline outline-1 outline-white py-[4px] rounded-[10px] bg-transparent' onChange={(e) => setAccNum(e.target.value)} />
              <button className='bg-[#fff] text-[#222] font-[400] text-[14px] py-[4px] px-[10px] rounded-[8px]' onClick={() => { resolveBank(accNum, PS_Bank_info.value) }}>Check</button>
            </div>
          )}

          <div className='flex justify-between items-center mb-[1.2rem]'
          // onClick={() => setOpenUNameForm(!openUNameForm)}
          >
            <p>
              Account Name
              {' - '}
              {currentUser && currentUser.bank_details ? (currentUser.bank_details.acc_name) : (null)}
            </p>
            <div className={openBankForm ? 'rotate-[90deg]' : ''}>
              {/* <MdArrowForwardIos size={20} color='#fff' /> */}
            </div>
          </div>
          {openBankForm && (
            <div className='mb-[1.2rem] mt-[-.5rem] flex items-center justify-between'>
              <input type="text" disabled placeholder="Account Name" value={accName} className='w-[100%] pl-[6px] mb-[1px]  font-[400] outline outline-1 outline-white py-[4px] rounded-[10px] bg-transparent'
              // onChange={(e) => setAccName(e.target.value)}
              />
              {/* <button className='bg-[#fff] text-[#222] font-[400] text-[14px] py-[4px] px-[10px] rounded-[8px]' onClick={() => {
                

              }}>split</button> */}
            </div>
          )}
          {openBankForm && (
            <div className='mb-[1.0rem] mt-[1.5rem] flex items-center justify-end'>
              {accName ? (
                <>
                  <button className='bg-[#fff] text-[#222] font-[400] text-[14px] py-[4px] px-[10px] rounded-[8px] mx-1' onClick={() => { updateBankInfo() }}>Yes, It's me</button>
                  <button className='bg-[#fff] text-[#222] font-[400] text-[14px] py-[4px] px-[10px] rounded-[8px] mx-1' onClick={() => {
                    setPS_Bank_info(null);
                    setBankName('');
                    setAccNum('');
                    setAccName('');
                  }}>Cancel</button>
                </>)
                : (null)}

            </div>)
          }



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

        <div className='mt-[1.5rem] px-[20px] py-[25px]  text-[15px] rounded-[14px] font-[500] tablet:max-w-md laptop:max-w-md' style={{ backgroundColor: theme === "light" ? "#222" : "rgba(68, 68, 68, 0.2)", color: theme === "light" ? "#fff" : "#fff", }}>
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
              <MdArrowForwardIos size={20} color='#fff' />
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

        <div className='mt-[1.5rem] px-[20px] py-[25px]  text-[15px] rounded-[14px] font-[500] tablet:max-w-md laptop:max-w-md' style={{ backgroundColor: theme === "light" ? "#222" : "rgba(68, 68, 68, 0.2)", color: theme === "light" ? "#fff" : "#fff", }}>
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
              <MdArrowForwardIos size={20} color='#fff' />
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

        <div className='mt-[1.5rem] px-[20px] py-[25px]  text-[15px] rounded-[14px] font-[500] tablet:max-w-md laptop:max-w-md' style={{ backgroundColor: theme === "light" ? "#222" : "rgba(68, 68, 68, 0.2)", color: theme === "light" ? "#fff" : "#fff", }}>
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
              <MdArrowForwardIos size={20} color='#fff' />
            </div>
          </div>
        </div>




      </div>

    </Dialog>
  )
};



import React, { useEffect, useState } from 'react';
import { getUsers, updateUser } from '@/shared/api';
import { Link } from 'react-router-dom';
import Loader from '@/widgets/Loader';

const UserProfile = () => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ name: string; email: string; address: string; phone: string; website: string }>({
    name: '',
    email: '',
    address: '',
    phone: '',
    website: '',
  });

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await getUsers();
        const currentUser = response.data[0];
        setUser(currentUser);
        setFormData({
          name: currentUser.name,
          email: currentUser.email,
          address: currentUser.address ? `${currentUser.address.street}, ${currentUser.address.city}` : '',
          phone: currentUser.phone,
          website: currentUser.website,
        });
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateUser(user.id, {
        name: formData.name,
        email: formData.email,
        address: {
          street: formData.address.split(',')[0].trim(),
          city: formData.address.split(',')[1].trim(),
          zipcode: user.address.zipcode,
        },
        phone: formData.phone,
        website: formData.website,
      });
      console.log('Updated user data:', formData);
      setIsEditing(false); 
      setUser((prev) => ({ ...prev, ...formData }));
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  if (loading) {
    return <Loader />;
  };

  if (!user) {
    return <div className='m-auto'>User not found</div>;
  };

  return (
    <div className='p-12 w-full max-w-max'>
      <div className='flex flex-col justify-between'>
        <h1 className='text-5xl'>{user.name}</h1>
        <Link to="/admin" className='text-xl my-8'>Admin panel</Link>
      </div>
      {isEditing ? (
        <form className='mt-0 text-xl flex flex-col gap-6' onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <div>
            <label className='block'>Name:</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className='border bg-transparent p-2 rounded w-full'
            />
          </div>
          <div>
            <label className='block'>Email:</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className='border bg-transparent p-2 rounded w-full'
            />
          </div>
          <div>
            <label className='block'>Address:</label>
            <textarea 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
              className='border bg-transparent p-2 rounded w-full'
            />
          </div>
          <div>
            <label className='block'>Phone:</label>
            <input 
              type="text" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              className='border bg-transparent p-2 rounded w-full'
            />
          </div>
          <div>
            <label className='block'>Website:</label>
            <input 
              type="text" 
              name="website" 
              value={formData.website} 
              onChange={handleChange} 
              className='border bg-transparent p-2 rounded w-full'
            />
          </div>
          <button type="submit" className='mt-4 bg-blue-500 text-white p-2 rounded'>
            Save Changes
          </button>
        </form>
      ) : (
        <div className='flex flex-col text-xl gap-6'>
          <p>Email: {user.email}</p>
          <p>Address: {user.address ? `${user.address.street}, ${user.address.city}` : 'N/A'}</p>
          <p>Phone: {user.phone}</p>
          <p>Website: {user.website}</p>
          <button onClick={() => setIsEditing(true)} className='mt-4 bg-blue-500 w-fit text-white py-2 px-4 rounded'>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
import React, { useState } from 'react';
import { updateUser } from '@/shared/api'; 
import { UserItemProps } from '@/shared/types';

const UserItem: React.FC<UserItemProps> = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ name: string; email: string; address: string; phone: string; website: string }>({
    name: user.name,
    email: user.email,
    address: user.address ? `${user.address.street}, ${user.address.city}` : '',
    phone: user.phone,
    website: user.website,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(user.id, {
        name: formData.name,
        email: formData.email,
        address: {
          street: formData.address.split(',')[0].trim(),
          city: formData.address.split(',')[1].trim(),
        },
        phone: formData.phone,
        website: formData.website,
      });
      onUpdate(user.id, formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  return (
    <div className='border-y w-full p-2'>
      {isEditing ? (
        <form onSubmit={handleSave} className='flex flex-col gap-6'>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className='border bg-transparent p-2 rounded my-1'
          />
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className='border bg-transparent p-2 rounded my-1'
          />
          <textarea 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
            className='border bg-transparent p-2 rounded my-1'
          />
          <input 
            type="text" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            className='border bg-transparent p-2 rounded my-1'
          />
          <input 
            type="text" 
            name="website" 
            value={formData.website} 
            onChange={handleChange} 
            className='border bg-transparent p-2 rounded my-1'
          />
          <button type="submit" className='bg-blue-500 text-white px-10 py-2 rounded-md w-fit'>Save</button>
        </form>
      ) : (
        <div className='flex flex-row items-center justify-between'>
          <div>{user.name} - {user.email}</div>
          <button onClick={() => setIsEditing(true)} className='bg-blue-500 text-white px-10 py-2 rounded-md w-fit'>Edit</button>
        </div>
      )}
    </div>
  );
};

export default UserItem;
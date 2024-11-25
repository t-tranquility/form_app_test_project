import React, { useEffect, useState } from 'react';
import { getUsers } from '@/shared/api'; 
import UserItem from './UserItem';
import Loader from '@/widgets/Loader';

const AdminPanel = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdateUser = (userId: number, updatedData: any) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === userId ? { ...user, ...updatedData } : user))
    );
  };

  if (loading) {
    return <Loader />;
  };

  return (
    <div className='p-12 w-full'>
      <h1 className='text-5xl'>Admin Panel</h1>
      <ul className='my-12'>
        {users.map((user) => (
          <UserItem key={user.id} user={user} onUpdate={handleUpdateUser} />
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
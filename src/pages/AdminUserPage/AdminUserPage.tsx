import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';

const AdminUserPage: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        // Fetch users (replace with actual API)
        setUsers([
            { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
            { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
        ]);
    }, []);

    const columns = [
        { title: 'User ID', dataIndex: 'id', key: 'id' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Role', dataIndex: 'role', key: 'role' },
        {
            title: 'Action',
            key: 'action',
            render: (text: any, record: any) => (
                <Button onClick={() => handleEditUser(record.id)}>Edit</Button>
            ),
        },
    ];

    const handleEditUser = (id: string) => {
        // Edit user logic
    };

    return (
        <div>
            <h2>Admin User Page</h2>
            <Table columns={columns} dataSource={users} rowKey="id" />
        </div>
    );
};

export default AdminUserPage;

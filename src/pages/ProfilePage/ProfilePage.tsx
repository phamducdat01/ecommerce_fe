import React, { useState } from 'react';
import { Layout, Avatar, Button, Form, Input, Col, Row, Card, message } from 'antd';
import styled from 'styled-components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DataUser, getUserById, IUser, updateUser } from '../../apis/user.api';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const { Content } = Layout;


const ProfilePage: React.FC = () => {

    const queryClient = useQueryClient()
    const [editing, setEditing] = useState(false);
    const [form] = Form.useForm();

    const userId = useSelector(((state: RootState) => state.auth.user?.userId))

    const { data: userData, isLoading, isError } = useQuery<IUser | null>({
        queryKey: ['user', userId],
        queryFn: () => userId ? getUserById(userId) : null,
        staleTime: 5 * 60 * 1000,
    });

    const mutation = useMutation({
        mutationFn: ({ userId, data }: { userId: string; data: DataUser }) => updateUser(userId, data),
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['user'] })
        },
    })

    const handleSave = async (values: DataUser) => {
        try {

            if (userId) mutation.mutate({ userId, data: values })
            // TODO: Gọi updateUser(userId, values) nếu có API cập nhật
            message.success('Cập nhật thành công');
            setEditing(false);
        } catch (err) {
            message.error('Cập nhật thất bại');
        }
    };

    const toggleEditing = () => {
        setEditing(!editing);
        form.setFieldsValue(userData); // reset form
    };

    if (isLoading) return <div>Đang tải dữ liệu...</div>;
    if (isError || !userData) return <div>Không thể tải thông tin người dùng.</div>;

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Content style={{ padding: '30px' }}>
                <ProfileCard>
                    <Row gutter={[24, 24]}>
                        <Col span={24} md={8}>
                            <Avatar
                                size={120}
                                src="https://www.gravatar.com/avatar/abc123"
                                alt="Avatar"
                                style={{ marginBottom: '20px' }}
                            />
                            <h2>{userData.name}</h2>
                            <p>{userData.email}</p>
                            <p><strong>Role:</strong> {userData.role}</p>
                        </Col>
                        <Col span={24} md={16}>
                            <Card title="Thông tin người dùng" >
                                {editing ? (
                                    <Form
                                        form={form}
                                        layout="vertical"
                                        onFinish={handleSave}
                                        initialValues={userData}
                                    >
                                        <Form.Item label="Tên" name="name" rules={[{ required: true }]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item label="Số điện thoại" name="phone">
                                            <Input />
                                        </Form.Item>
                                        <Form.Item label="Địa chỉ" name="address">
                                            <Input />
                                        </Form.Item>
                                        <Button type="primary" htmlType="submit">Lưu</Button>
                                        <Button onClick={toggleEditing} style={{ marginLeft: 10 }}>Huỷ</Button>
                                    </Form>
                                ) : (
                                    <>
                                        <p><strong>Tên:</strong> {userData.name}</p>
                                        <p><strong>Email:</strong> {userData.email}</p>
                                        <p><strong>SĐT:</strong> {userData.phone || 'N/A'}</p>
                                        <p><strong>Địa chỉ:</strong> {userData.address || 'N/A'}</p>
                                        <Button type="primary" onClick={toggleEditing}>
                                            Chỉnh sửa
                                        </Button>
                                    </>
                                )}
                            </Card>
                        </Col>
                    </Row>
                </ProfileCard>
            </Content>
        </Layout>
    );
};

const ProfileCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

export default ProfilePage;

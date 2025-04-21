import React, { useState } from 'react';
import { Layout, Avatar, Button, Form, Input, Col, Row, Card } from 'antd';
import styled from 'styled-components';

const { Content } = Layout;

interface ProfileFormValues {
    name: string;
    email: string;
}

const ProfilePage: React.FC = () => {
    const [editing, setEditing] = useState(false);
    const [form] = Form.useForm();

    // Dữ liệu người dùng mẫu
    const userData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'https://www.gravatar.com/avatar/abc123',
    };

    // Hàm lưu thông tin khi chỉnh sửa
    const handleSave = (values: ProfileFormValues) => {
        console.log('Saved Values:', values);
        setEditing(false);
    };

    // Hàm chuyển đổi giữa chế độ xem và chế độ chỉnh sửa
    const toggleEditing = () => {
        setEditing(!editing);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Content style={{ padding: '30px' }}>
                <ProfileCard>
                    <Row gutter={[24, 24]}>
                        <Col span={24} md={8}>
                            <Avatar
                                size={120}
                                src={userData.avatar}
                                alt="Avatar"
                                style={{ marginBottom: '20px' }}
                            />
                            <h2>{userData.name}</h2>
                            <p>{userData.email}</p>
                        </Col>
                        <Col span={24} md={16}>
                            <Card title="User Information" bordered={false}>
                                {editing ? (
                                    <Form form={form} layout="vertical" onFinish={handleSave} initialValues={userData}>
                                        <Form.Item label="Name" name="name">
                                            <Input />
                                        </Form.Item>
                                        <Form.Item label="Email" name="email">
                                            <Input />
                                        </Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Save
                                        </Button>
                                        <Button type="default" onClick={toggleEditing} style={{ marginLeft: '10px' }}>
                                            Cancel
                                        </Button>
                                    </Form>
                                ) : (
                                    <>
                                        <p><strong>Name:</strong> {userData.name}</p>
                                        <p><strong>Email:</strong> {userData.email}</p>
                                        <Button type="primary" onClick={toggleEditing}>Edit Profile</Button>
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

// Styled Components
const ProfileCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

export default ProfilePage;

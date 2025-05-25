import { DeleteOutlined, MinusOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { keepPreviousData, QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { Alert, Button, Card, Checkbox, InputNumber, message, Space, Spin, Table, Typography } from 'antd';
import type { ColumnType, TableProps } from 'antd/es/table';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

// Khởi tạo QueryClient
const queryClient = new QueryClient();

// Định nghĩa giao diện cho CartItem và Product
interface ICartItem {
    _id: string;
    userId: string;
    productId: string;
    quantity: number;
}

interface IProduct {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
}

// Định nghĩa loại dữ liệu cho bảng
interface TableDataType {
    key: string;
    _id: string;
    userId: string;
    productId: string;
    quantity: number;
    productName: string;
    productPrice: number;
    itemTotal: number;
    imageUrl: string;
    selected: boolean;
}

// Dữ liệu giả định
let mockCartItems: ICartItem[] = [
    { _id: 'cart1', userId: 'user123', productId: 'prod1', quantity: 2 },
    { _id: 'cart2', userId: 'user123', productId: 'prod2', quantity: 1 },
    { _id: 'cart3', userId: 'user123', productId: 'prod3', quantity: 3 },
];

const mockProducts: IProduct[] = [
    { _id: 'prod1', name: 'Wireless Headphones', price: 99.99, imageUrl: 'https://placehold.co/60x60/FF5733/FFFFFF?text=HP' },
    { _id: 'prod2', name: 'Mechanical Keyboard', price: 120.00, imageUrl: 'https://placehold.co/60x60/33FF57/FFFFFF?text=KB' },
    { _id: 'prod3', name: 'Gaming Mouse', price: 49.50, imageUrl: 'https://placehold.co/60x60/3357FF/FFFFFF?text=GM' },
    { _id: 'prod4', name: '27-inch Monitor', price: 299.00, imageUrl: 'https://placehold.co/60x60/FFFF33/000000?text=MN' },
];

const { Title, Text } = Typography;

// Styled Components
const PageContainer = styled.div`
  padding: 24px;
  background-color: #f7fafc;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
`;

const ContentWrapper = styled.div`
  max-width: 896px;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const StyledTitle = styled(Title)`
  text-align: center;
  margin-bottom: 32px;
  color: #2d3748;
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 192px;
`;

const StyledAlert = styled(Alert)`
  margin-bottom: 24px;
  border-radius: 8px;
`;

const StyledTable = styled(Table) <TableProps<TableDataType>>`
  margin-bottom: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  .ant-table-thead > tr > th {
    background-color: #f0f2f5;
    font-weight: 600;
  }
`;

const StyledCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 16px;
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;
`;

const TotalPrice = styled(Text)`
  margin-left: 16px;
  color: #3182ce;
`;

const PurchaseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

const StyledButton = styled(Button)`
  border-radius: 8px;
  padding: 8px 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 6px;
  object-fit: cover;
`;

// Hàm giả lập API
const fetchCartItemsApi = async (): Promise<ICartItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCartItems;
};

const fetchProductDetailsApi = async (productIds: string[]): Promise<IProduct[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockProducts.filter(product => productIds.includes(product._id));
};

const updateCartItemQuantityApi = async ({ cartItemId, newQuantity }: { cartItemId: string; newQuantity: number }): Promise<ICartItem> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const itemIndex = mockCartItems.findIndex(item => item._id === cartItemId);
    if (itemIndex > -1) {
        mockCartItems[itemIndex] = { ...mockCartItems[itemIndex], quantity: newQuantity };
        return mockCartItems[itemIndex];
    }
    throw new Error('Cart item not found');
};

const removeCartItemApi = async (cartItemId: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    mockCartItems = mockCartItems.filter(item => item._id !== cartItemId);
    return cartItemId;
};

const purchaseSelectedItemsApi = async (itemIdsToPurchase: string[]): Promise<string[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    mockCartItems = mockCartItems.filter(item => !itemIdsToPurchase.includes(item._id));
    return itemIdsToPurchase;
};

const CartPage: React.FC = () => {
    const [selectedCartItemIds, setSelectedCartItemIds] = useState<string[]>([]);

    // Lấy dữ liệu giỏ hàng
    const { data: cartItems = [], isLoading: isLoadingCart, error: cartError } = useQuery<ICartItem[]>({
        queryKey: ['cartItems'],
        queryFn: fetchCartItemsApi,
        placeholderData: keepPreviousData,
    });

    // Lấy chi tiết sản phẩm
    const productIdsInCart = cartItems.map(item => item.productId);
    const { data: products = [], isLoading: isLoadingProducts, error: productsError } = useQuery<IProduct[]>({
        queryKey: ['products', productIdsInCart],
        queryFn: () => fetchProductDetailsApi(productIdsInCart),
        enabled: productIdsInCart.length > 0,
        placeholderData: keepPreviousData,
    });

    // useMutation để cập nhật số lượng
    const updateQuantityMutation = useMutation({
        mutationFn: updateCartItemQuantityApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cartItems'] });
            message.success('Số lượng đã được cập nhật thành công!');
        },
        onError: (err) => {
            console.error('Lỗi khi cập nhật số lượng:', err);
            message.error('Không thể cập nhật số lượng. Vui lòng thử lại.');
        },
    });

    // useMutation để xóa mục
    const removeItemMutation = useMutation({
        mutationFn: removeCartItemApi,
        onSuccess: (removedId) => {
            queryClient.invalidateQueries({ queryKey: ['cartItems'] });
            setSelectedCartItemIds(prev => prev.filter(id => id !== removedId));
            message.success('Mục đã được xóa khỏi giỏ hàng.');
        },
        onError: (err) => {
            console.error('Lỗi khi xóa mục:', err);
            message.error('Không thể xóa mục. Vui lòng thử lại.');
        },
    });

    // useMutation để mua các mục đã chọn
    const purchaseItemsMutation = useMutation({
        mutationFn: purchaseSelectedItemsApi,
        onSuccess: (purchasedIds) => {
            queryClient.invalidateQueries({ queryKey: ['cartItems'] });
            setSelectedCartItemIds([]);
            message.success(`Đã mua ${purchasedIds.length} mục thành công!`);
        },
        onError: (err) => {
            console.error('Lỗi khi mua các mục:', err);
            message.error('Không thể mua các mục đã chọn. Vui lòng thử lại.');
        },
    });

    const hasError = cartError || productsError;
    const errorMessage = cartError?.message || productsError?.message || 'Đã xảy ra lỗi không xác định.';

    const isInitialLoading = isLoadingCart || isLoadingProducts;
    const showSpinner = isInitialLoading && (!cartItems.length && !products.length);
    const isMutating = updateQuantityMutation.isPending || removeItemMutation.isPending || purchaseItemsMutation.isPending;

    // Xử lý thay đổi số lượng
    const handleQuantityChange = useCallback((cartItemId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        updateQuantityMutation.mutate({ cartItemId, newQuantity });
    }, [updateQuantityMutation]);

    // Xử lý xóa mục
    const handleRemoveItem = useCallback((cartItemId: string) => {
        removeItemMutation.mutate(cartItemId);
    }, [removeItemMutation]);

    // Lấy chi tiết sản phẩm
    const getProductDetails = useCallback((productId: string) => {
        return products.find(p => p._id === productId);
    }, [products]);

    // Xử lý thay đổi checkbox
    const handleCheckboxChange = useCallback((cartItemId: string, checked: boolean) => {
        setSelectedCartItemIds(prev =>
            checked ? [...prev, cartItemId] : prev.filter(id => id !== cartItemId)
        );
    }, []);

    // Xử lý mua các mục đã chọn
    const handlePurchaseSelected = useCallback(() => {
        if (selectedCartItemIds.length === 0) {
            message.warning('Vui lòng chọn ít nhất một mục để mua.');
            return;
        }
        purchaseItemsMutation.mutate(selectedCartItemIds);
    }, [selectedCartItemIds, purchaseItemsMutation]);

    // Chuẩn bị dữ liệu bảng
    const tableData: TableDataType[] = cartItems.map(item => {
        const product = getProductDetails(item.productId);
        const itemTotal = product ? product.price * item.quantity : 0;
        return {
            key: item._id,
            ...item,
            productName: product ? product.name : 'Sản phẩm không xác định',
            productPrice: product ? product.price : 0,
            itemTotal: itemTotal,
            imageUrl: product ? product.imageUrl : 'https://placehold.co/60x60/CCCCCC/000000?text=N/A',
            selected: selectedCartItemIds.includes(item._id),
        };
    });

    // Tính tổng cộng
    const overallTotal = tableData
        .filter(item => item.selected)
        .reduce((sum, item) => sum + item.itemTotal, 0);

    // Định nghĩa các cột
    const columns: ColumnType<TableDataType>[] = [
        {
            title: (
                <Checkbox
                    onChange={(e) => {
                        if (e.target.checked) {
                            setSelectedCartItemIds(tableData.map(item => item.key));
                        } else {
                            setSelectedCartItemIds([]);
                        }
                    }}
                    checked={selectedCartItemIds.length === tableData.length && tableData.length > 0}
                    indeterminate={selectedCartItemIds.length > 0 && selectedCartItemIds.length < tableData.length}
                    disabled={tableData.length === 0 || isMutating}
                />
            ),
            dataIndex: 'selected',
            key: 'selected',
            width: 50,
            render: (selected: boolean, record: TableDataType) => (
                <Checkbox
                    checked={selected}
                    onChange={(e) => handleCheckboxChange(record.key, e.target.checked)}
                    disabled={isMutating}
                />
            ),
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'productName',
            key: 'productName',
            render: (text: string, record: TableDataType) => (
                <Space>
                    <ProductImage src={record.imageUrl} alt={text} />
                    <Text strong>{text}</Text>
                </Space>
            ),
        },
        {
            title: 'Giá',
            dataIndex: 'productPrice',
            key: 'productPrice',
            render: (price: number) => `$${price.toFixed(2)}`,
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (quantity: number, record: TableDataType) => (
                <Space>
                    <Button
                        icon={<MinusOutlined />}
                        onClick={() => handleQuantityChange(record._id, quantity - 1)}
                        disabled={quantity <= 1 || isMutating}
                    />
                    <InputNumber
                        min={1}
                        value={quantity}
                        onChange={(value) => handleQuantityChange(record._id, value || 1)}
                        disabled={isMutating}
                        style={{ width: 80, borderRadius: '6px' }}
                    />
                    <Button
                        icon={<PlusOutlined />}
                        onClick={() => handleQuantityChange(record._id, quantity + 1)}
                        disabled={isMutating}
                    />
                </Space>
            ),
        },
        {
            title: 'Tổng',
            dataIndex: 'itemTotal',
            key: 'itemTotal',
            render: (total: number) => `$${total.toFixed(2)}`,
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (_: any, record: TableDataType) => (
                <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveItem(record._id)}
                    disabled={isMutating}
                >
                    Xóa
                </Button>
            ),
        },
    ];

    return (
        <PageContainer>
            <ContentWrapper>
                <StyledTitle level={2}>Giỏ hàng của bạn</StyledTitle>

                {showSpinner && (
                    <SpinnerContainer>
                        <Spin size="large" />
                    </SpinnerContainer>
                )}

                {hasError && (
                    <StyledAlert
                        message="Lỗi"
                        description={errorMessage}
                        type="error"
                        showIcon
                        closable
                        onClose={() => { }}
                    />
                )}

                {!showSpinner && !hasError && (
                    <>
                        {tableData.length === 0 ? (
                            <StyledAlert
                                message="Giỏ hàng của bạn trống"
                                description="Có vẻ như bạn chưa thêm bất cứ thứ gì vào giỏ hàng. Hãy bắt đầu mua sắm!"
                                type="info"
                                showIcon
                            />
                        ) : (
                            <>
                                <StyledTable
                                    columns={columns}
                                    dataSource={tableData}
                                    pagination={false}
                                    rowKey="key"
                                    bordered
                                />
                                <StyledCard>
                                    <TotalContainer>
                                        <Text>Tổng cộng:</Text>
                                        <TotalPrice>${overallTotal.toFixed(2)}</TotalPrice>
                                    </TotalContainer>
                                    <PurchaseButtonContainer>
                                        <StyledButton
                                            type="primary"
                                            size="large"
                                            icon={<ShoppingCartOutlined />}
                                            onClick={handlePurchaseSelected}
                                            disabled={selectedCartItemIds.length === 0 || isMutating}
                                        >
                                            Mua các mục đã chọn ({selectedCartItemIds.length})
                                        </StyledButton>
                                    </PurchaseButtonContainer>
                                </StyledCard>
                            </>
                        )}
                    </>
                )}
            </ContentWrapper>
        </PageContainer>
    );
};

export default CartPage;
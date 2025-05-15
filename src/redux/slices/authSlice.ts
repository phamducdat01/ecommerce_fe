import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { REHYDRATE } from 'redux-persist';

interface User {
    userId: string;
    role: string;
}

interface AuthState {
    user: User | null;
}

const initialState: AuthState = { user: null };

// Khởi tạo user từ accessToken
const setUserFromToken = (token: string | null): User | null => {
    if (!token) return null;
    try {
        const decoded = jwtDecode<{ userId: string; role: string }>(token);
        return { userId: decoded.userId, role: decoded.role };
    } catch (error) {
        console.error('Invalid accessToken:', error);
        localStorage.removeItem('accessToken');
        return null;
    }
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('accessToken');
        },
    },
    extraReducers: (builder) => {
        builder.addCase(REHYDRATE, (state) => {
            // Đồng bộ user với accessToken sau khi redux-persist khôi phục
            state.user = setUserFromToken(localStorage.getItem('accessToken'));
        });
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
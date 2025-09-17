// // src/features/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signup, signin, resetPassword } from "../api/auth";

// signup thunk
export const signupUser = createAsyncThunk(
    "auth/signupUser",
    async (user, { rejectWithValue }) => {
        try {
            const data = await signup(user);
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// signin thunk
export const signinUser = createAsyncThunk(
    "auth/signinUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const user = await signin(email, password);
            if (!user) return rejectWithValue("Invalid email or password");
            // persist
            localStorage.setItem("user", JSON.stringify(user));
            return user;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// reset password thunk
export const resetPasswordUser = createAsyncThunk(
    "auth/resetPasswordUser",
    async ({ email, newPassword }, { rejectWithValue }) => {
        try {
            const data = await resetPassword(email, newPassword);
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);



const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    justSignedIn: false,
    loading: false,
    error: null,
    resetSuccess: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signout(state) {
            state.user = null;
            state.justSignedIn = false;
            state.loading = false;
            state.error = null;
            localStorage.removeItem("user");
        },
        resetJustSignedIn(state) {
            state.justSignedIn = false;
        },
        setUser(state, action) {
            state.user = action.payload;
            state.justSignedIn = true;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        clearResetSuccess(state) {
            state.resetSuccess = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // signup
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.justSignedIn = true;
                localStorage.setItem("user", JSON.stringify(action.payload));
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Signup failed";
            })

            // signin
            .addCase(signinUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signinUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.justSignedIn = true;
            })
            .addCase(signinUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Signin failed";
            })

            // reset password
            .addCase(resetPasswordUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetPasswordUser.fulfilled, (state) => {
                state.loading = false;
                state.resetSuccess = true; //  flag success
                // ✅ don't set state.user here
                // instead, maybe mark success in state so UI can show a message
            })
            .addCase(resetPasswordUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Reset password failed";
            });

    },
});

export const { signout, resetJustSignedIn, setUser } = authSlice.actions;
export default authSlice.reducer;

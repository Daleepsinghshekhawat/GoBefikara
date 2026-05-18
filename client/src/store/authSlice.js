import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../services";

const initialUser = (() => {
  try {
    const u = localStorage.getItem("gbf_user");
    return u ? JSON.parse(u) : null;
  } catch (e) {
    return null;
  }
})();

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await authService.login(credentials);
      localStorage.setItem("gbf_token", data.token);
      localStorage.setItem("gbf_user", JSON.stringify(data.user));
      return data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await authService.register(userData);
      localStorage.setItem("gbf_token", data.token);
      localStorage.setItem("gbf_user", JSON.stringify(data.user));
      return data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const getMe = createAsyncThunk(
  "auth/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await authService.getMe();
      localStorage.setItem("gbf_user", JSON.stringify(data.user));
      return data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: initialUser, loading: false, error: null },
  reducers: {
    logout(state) {
      localStorage.removeItem("gbf_token");
      localStorage.removeItem("gbf_user");
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    updateUser(state, action) {
      state.user = action.payload;
      try {
        localStorage.setItem("gbf_user", JSON.stringify(action.payload));
      } catch (e) {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state) => {
        state.loading = false;
        state.user = null;
      });
  },
});

export const { logout, updateUser } = authSlice.actions;
export default authSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPopular = createAsyncThunk('films/fetchPopular', async () => {
  const response = await fetch('http://localhost:5000/api/popular');
  return response.json();
});

export const searchFilms = createAsyncThunk('films/search', async (query) => {
  const response = await fetch(`http://localhost:5000/api/search?query=${query}`);
  return response.json();
});

const filmsSlice = createSlice({
  name: 'films',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopular.pending, (state) => { state.loading = true; })
      .addCase(fetchPopular.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.results || [];
      })
      .addCase(fetchPopular.rejected, (state) => {
        state.loading = false;
        state.error = 'Erreur de chargement';
      })
      .addCase(searchFilms.pending, (state) => { state.loading = true; })
      .addCase(searchFilms.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.results || [];
      })
      .addCase(searchFilms.rejected, (state) => {
        state.loading = false;
        state.error = 'Erreur de recherche';
      });
  }
});

export const { setSearchQuery } = filmsSlice.actions;
export default filmsSlice.reducer;
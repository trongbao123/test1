import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { matrix } from "../service/MatrixService"

export const updateMatric = async (id: any, data: any) => {
  const response = await matrix.updateMatrices(id, data)
  if (response?.data?.error) {
    alert("cập nhật thất bại")
  } else {
    alert("cập nhật thành công")
  }
  return response?.data?.data
}

const matrixSlice = createSlice({
  name: "matrix",
  initialState: {} as Record<string, any>,
  reducers: {}
})

export const { } = matrixSlice.actions

export default matrixSlice.reducer

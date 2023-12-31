import { useQuery, useQueryClient } from "react-query"
import { matrix } from "../service/MatrixService"
import { MatrixData } from "../interface/MatrixData"
import { useMutation } from 'react-query';

export const useMatrix = () => {
  const { data } = useQuery("repoData", async () => await matrix.getMatrix(), {
    staleTime: 2000
  })
  return data
}

export const useMatrixById = (id: any) => {
  const { data, isLoading, isError } = useQuery(["matrix", id], async () => await matrix.getMatrixDetails(id), {
    staleTime: 2000
  })
  return { data, isLoading, isError }
}

export const postMatrix = async (data: MatrixData) => {
  const response = await matrix.createMatrices(data)

  if (response?.data?.error === true) {
    alert("thêm thất bại");
  } else {
    alert("thêm mới thành công");
  }

  return response?.data?.data
}

export const useMatrixCell = () => {
  const { data, isLoading, isError } = useQuery("matrixCell", async () => await matrix.getMatricCell(), { staleTime: 200000 })
  return { data, isLoading, isError }
}

export const useMatrixCellById = (id: any) => {
  const { data, isLoading, isError } = useQuery(["matrixCell", id], async () => await matrix.getMatricCellDetails(id), { staleTime: 200000 })
  return { data, isLoading, isError }
}


export const postMatricCell = async (data: any) => {
  const response = await matrix.postMatricCell(data)

  if (response?.data?.error === false) {
    alert("thêm thành công")
  } else {
    alert("fails")
  }

  return response?.data
}

export const updateMatrixData = async (id: any, data: any) => {
  const response = await matrix.updateMatrices(id, data)
  return response?.data
}


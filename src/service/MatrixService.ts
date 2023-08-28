import { MatrixData } from "../interface/MatrixData"
import { BaseService } from "./BaseService"

export class matrixService extends BaseService {
  constructor() {
    super()
  }

  getMatrix = () => {
    return this.get("matrices", null);
  }

  getMatrixDetails = (id: any) => {
    return this.get(`matrices/${id}`, null);
  }

  createMatrices = (data: any) => {
    return this.post(`matrices`, data);
  }
  updateMatrices = (id: any, data: MatrixData) => {
    return this.put(`matrices/${id}`, data);
  }

  getMatricCell = () => {
    return this.get(`matrix-cells`, null);
  }

  getMatricCellDetails = (id: any) => {
    return this.get(`matrix-cells/${id}`, null);
  }

  putMatricCell = (id: any, data: any) => {
    return this.put(`matrix-cells/${id}`, data);
  }

  postMatricCell = (data: any) => {
    return this.put(`matrix-cells`, data);
  }
}

export const matrix = new matrixService();

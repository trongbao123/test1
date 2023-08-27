import { Alert, Box, Button, FormControl, Radio } from "@mui/material"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { TextField, Checkbox, InputLabel, FormHelperText } from "@material-ui/core"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMatrix, useMatrixById } from "../hook/matrix"
import { updateMatric } from "../store/Matrix"
import { matrix } from "../service/MatrixService"

interface Props {
  selectedMatrixId: any
}
const InitialMatrix: React.FC<Props> = ({ selectedMatrixId }) => {

  const { data } = useMatrixById(selectedMatrixId)
  const matrixData = useMatrix()
  const schema = yup.object().shape({
    name: yup.string().required("Tên bắt buộc!"),
    row: yup.string().required("Hàng bắt buộc!"),
    columns: yup.string().required("Cột bắt buộc!")
  })

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema)
  })


  const handleValue = () => {
    setValue("name", data?.data?.data?.name ? data?.data?.data?.name : "")
    setValue("row", data?.data?.data?.row ? data?.data?.data?.row : "")
    setValue("columns", data?.data?.data?.columns ? data?.data?.data?.columns : "")

  }

  useEffect(() => {
    handleValue()
  }, [selectedMatrixId, data])

  const onSubmit = async (data: any) => {
    if (!selectedMatrixId) {
      await matrix.createMatrices(data)
      await matrix.getMatrix()
      alert("thêm thành công")
    } else {
      await updateMatric(selectedMatrixId, data)
      await matrix.getMatrix()
      alert("Cập nhật thành công")
    }
  }



  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl style={{ flexDirection: "row", width: "100%" }}>
        <InputLabel style={{ paddingTop: 20, color: "red" }}>Tên Ma Trận(*)</InputLabel>
        <Controller name="name" control={control} rules={{ required: true }} render={({ field: { value, onChange } }) => <TextField style={{ width: "81%", marginLeft: 12 }} autoFocus className="input-desc" id="outlined-basic" label={"name"} variant="outlined" value={value ? value : ""} onChange={onChange} error={Boolean(errors.name)} />} />
        {errors.name && <FormHelperText style={{ color: "red" }}>{errors.name.message}</FormHelperText>}
      </FormControl>
      <div className="mt-3" style={{ display: "flex", justifyContent: "space-between" }}>
        <FormControl style={{ flexDirection: "row", width: "100%" }}>
          <InputLabel style={{ paddingTop: 20, color: "red" }}>Số cột(*)</InputLabel>
          <Controller name="columns" control={control} rules={{ required: true }} render={({ field: { value, onChange } }) => <TextField style={{ width: "55%", marginLeft: 60 }} type="number" autoFocus className="input-desc" id="outlined-basic" label={"columns"} variant="outlined" value={value ? value : ""} onChange={onChange} error={Boolean(errors.columns)} />} />
          {errors.columns && <FormHelperText style={{ color: "red" }}>{errors.columns.message}</FormHelperText>}
        </FormControl>
        <FormControl style={{ flexDirection: "row", width: "100%", marginLeft: 10 }}>
          <InputLabel style={{ paddingTop: 20, textAlign: "start", color: "red" }}>Số Hàng (*)</InputLabel>

          <Controller name="row" control={control} rules={{ required: true }} render={({ field: { value, onChange } }) => <TextField style={{ width: "55%", marginLeft: 60 }} type="number" autoFocus className="input-desc" id="outlined-basic" label={"rows"} variant="outlined" value={value ? value : ""} onChange={onChange} error={Boolean(errors.row)} />} />
          {errors.row && <FormHelperText style={{ color: "red" }}>{errors.row.message}</FormHelperText>}
        </FormControl>
      </div>

      <FormControl style={{ flexDirection: "row", width: "100%" }} className="mt-3">
        <InputLabel style={{ paddingTop: 20 }}>Ghi Chú</InputLabel>
        <TextField style={{ width: "80%", marginLeft: 65 }} autoFocus className="input-desc" id="outlined-basic" label={""} variant="outlined" value={""} />
      </FormControl>

      <FormControl style={{ flexDirection: "row", width: "100%" }} className="mt-3">
        <Radio autoFocus className="input-desc" id="outlined-basic" />
        <InputLabel style={{ paddingTop: 12 }}>Trạng thái kích hoạt</InputLabel>
      </FormControl>
      <Button style={{
        width: "50%",
        height: 50,
        backgroundColor: "#4be74b",
        color: "#FFFF",
        marginTop: 100,
        marginLeft: 300,
        marginBottom: 150
      }}
        onClick={handleSubmit(onSubmit)}>{!selectedMatrixId ? <div>Thêm</div> : <div>cập nhật</div>}</Button>

    </form>
  )
}

export default InitialMatrix

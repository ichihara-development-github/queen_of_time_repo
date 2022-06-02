
import { useState, useEffect, useRef, useContext } from 'react';

import { useForm } from 'react-hook-form';

import Image3 from "../../images/employee-default.jpg"
import { ConfigContext } from '../../contexts/config';
import { REQUEST_STATUS } from "../../components/const";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Avatar, ButtonBase, FormControl, IconButton, Input, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Stack } from '@mui/material';
import Button from '@mui/material/Button';

import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';

import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


export const NewEmployeeForm = ({

    sendParams,
    requestStatus,
}) => {

    
  const { register, handleSubmit,setError,clearErrors, watch, formState: { errors } } = useForm();
  const [visible, setVisible] = useState(false)
  
  const [age, setAge] = useState(20);
  const [validate, setValidates] = useState(false); 
  const [password, setPassword] = useState({password:"",passwordConfirm:""})
  const orgConfig = useContext(ConfigContext);

    
  const ageList = [...Array(orgConfig.params.maxAge-orgConfig.params.minAge + 1)].map((_, i) => i + orgConfig.params.minAge) 

  const handleChange = (e) => {
    setPassword({...password,[e.target.name]: e.target.value});
  }
 
  useEffect(()=> {
   if(password.password !== password.passwordConfirm){
     setValidates(false)
     setError("password",  { type: 'notMatch', message: "パスワードが一致しません。" })
   }else{
     clearErrors('password');
     setValidates(true)
   }
 }
 ,[password]
 )

 
 const uploadImage = useRef();

 const handleUpload = (e) => {
      const image = e.target.files[0];
      uploadImage.current.title = image.name;
      const reader = new FileReader();        
      reader.onload = (event) => {
        uploadImage.current.setAttribute('src', event.target.result)
      };
      reader.readAsDataURL(image);
 }




return (
  <Box>

    <form onSubmit={handleSubmit(sendParams)}>
    <Stack>
  
    <label style={{margin:"auto"}}>
      <Input
       {...register('image')} 
        style={{display: "none"}} 
        accept="image/*" 
        type="file"
        onChange={()=>handleUpload} />
       
        <img 
          style={{height: 100, width:100}}
          ref={uploadImage} 
          src={Image3}
         />
        
    </label> 
      
    <TextField
       {...register('name',{ required: "※氏名が入力されてません"})} 
        required
        label="氏名"
        size="small"
        margin="normal"
      />
      <span style={{color: "red"}}>{errors.name?.message}</span>
      
      <Stack direction="row" spacing={4}>
      <TextField
       {...register('telephone',{ required: "※電話番号が入力されてません"})} 
        required
        label="電話番号"
        variant="filled"
      />
       <span style={{color: "red"}}>{errors.tel?.message}</span>

      <Box sx={{width:"100px"}}>
      <FormControl fullWidth>
      <InputLabel >年齢</InputLabel>
      <Select
         {...register('age',{ required: "※年齢が入力されてません"})} 
         label="age"
         value={age}
      >
        {
          ageList.map(v => 
            <MenuItem 
              key={v} 
              value={v}
              onChange={e => setAge(e.target.value)}
              >{v}</MenuItem>
            )
        }
      </Select>
      <span style={{color: "red"}}>{errors.age?.message}</span>

      </FormControl>

      </Box>

      </Stack>
      <TextField
       {...register('email',{
          required: "※メールアドレスが入力されてません",
          maxLength: {
            value:60,
            message: "最大文字数(60)を越えています。"},
          pattern: {
            value:
              /^[a-z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/,
            message: 'メールアドレスの形式が正しくありません',
           }
          })} 
          size="large"
        required
        variant="standard"
        label="メールアドレス"
        margin="normal"
      />
      <span style={{color: "red"}}>{errors.email?.message}</span>

      <Stack direction="row" spacing={2}>
      <FormControl  sx={{my:2}}>
      
      <InputLabel >パスワード</InputLabel>
      <OutlinedInput
      　　 {...register('password',{
        　　 required: "※パスワードが入力されてません",
             minLength: {
               value:8,
               message: "半角英数字8文字以上で入力してください"},
              pattern: {
              value: /^[a-zA-Z0-9.?/-]{8,24}$/,
              message: 'パスワードの形式が正しくありません',
              }
            })} 
          label="パスワード"
          required
          type={visible ? 'text' : 'password'}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={()=>setVisible(!visible)}
                edge="end"
              >
                {visible ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        </FormControl>
        <FormControl>
        <InputLabel>パスワード(確認)</InputLabel>
         <OutlinedInput
          name="passwordConfirm"
          label="パスワード(確認)"
          required
          type={visible ? 'text' : 'password'}
          onChange={handleChange}
        />
        <span style={{color: "red"}}>{errors.password?.message}</span>

      </FormControl>
        
      </Stack>
    

    <Button 
      sx={{my:4}}
      disabled={!validate} 
      type="submit"
      variant="contained" 
      color="success"
      endIcon={ requestStatus == REQUEST_STATUS.POST?
        <CircularProgress sx={{width: "1.2rem", height:"1.2rem"}} color="inherit"/>
        :
        <SendIcon />
    }
  
    >登 録　
    </Button>

      
  </Stack>

  

  </form>
  </Box>
)

}
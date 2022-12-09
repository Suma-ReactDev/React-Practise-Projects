export const inputs =[
  {
    id:1,
    type:'text',
    placeholder:'First Name',
    name:'firstName',
    pattern:"^[a-zA-Z ]{2,30}$",
    errorMsg:"FirstName should include min 2 letters max 30 letters and no digits!"
  },
  {
    id:2,
    type:'text',
    placeholder:'Last Name',
    name:'lastName',
    pattern:"^[a-zA-Z ]{2,30}$",
    errorMsg:"Lastname should include letters only!"
  },
  {
    id:3,
    type:'email',
    placeholder:'Email',
    name:'emailId',
    errorMsg:"Please enter valid email!",
    pattern:"^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
  }
]
import Users from "../models/usermodel.js"

//create function
export const createUser = async (req, res) => {

  try {
    const { name,age, date } = req.body;
    console.log(req.body);
    const userData = new Users({
      name: name,
      age:age
    })
    // console.log(userData);
    console.log("--------------------------------");
    if (userData) {

      await userData.save();
      res.status(201).json({
        _id: userData._id,
        name: userData.name,
        age:userData.age
      });
      // ReloadLocation();
    }
    else {
      res.status(400).json({ error: "Invalid User Data" });
    }
  }
  catch (error) {
    res.status(404).json({ "message": "error in usercontroller" })
  }
}

//getall function.

export const getdata=async(req,res)=>{
  try{
    const userData=await Users.find();
    if(!userData){
      res.status(404).json({msg:"user not found"})
    }
    res.status(200).json(userData);
  }
  catch(error){
    res.status(500).json({err:error})
  }
}


//getbyid function.


export const iddata=async(req,res)=>{
 try{
  const userid=req.params.id;
  const userData=await Users.findById(userid);
  if(!userData){
    res.status(404).json({msg:"id not found"})
  }
  res.status(200).json(userData)
}
catch(error){
  res.status(500).json({err:error})
}
}


//update function

export const createU = async (req, res) => {
  try{
    const id=req.params.id;
    const userData=await Users.findById(id);

    if (!userData){
      res.status(404).json({msg:"user not exist"})
    }
    const updateData=await Users.findByIdAndUpdate(id,req.body,{new:true})
    res.status(200).json({msg:"successfully updated"});
  }
  catch (error) {
    res.status(404).json({ "message": "error in usercontroller" })
  }
}


//delete function

export const deluser=async(req,res)=>{
  try{
    const userid=req.params.id;
    const data=await Users.findById(userid)
    if(!data){
      res.status(500).json({msg:"data not found"})
    }
    const delData=await Users.findByIdAndDelete(userid)
    res.status(200).json({msg:"successfully deleted"})
  }
  catch(error){
    res.status(500).json({err:error})
  } 
}
import { userModel } from "../model/userSchema.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"



export const loginController = async(req,res)=>{
      try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: "Required fields are missing",
        status: false,
      });
      return;
    }

    const getData = await userModel.findOne({ email });

    console.log(getData);

    if (!getData) {
      res.json({
        message: "invalid credentials",
      });
      return;
    }

    const comparePassword = await bcrypt.compare(password, getData.password);

    console.log(comparePassword);

    if (!comparePassword) {
      res.json({
        message: "invalid credentials",
      });
      return;
    }

// token:

        var token = jwt.sign({ email }, process.env.JWT_SECRET_KEY);



    res.json({
      message: "login successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
}
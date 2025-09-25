import { otp_verification_model } from "../model/otpVerifySchema.js";
import { userModel } from "../model/userSchema.js";

export const verify_otp_Controller = async (req, res) => {
  try {
    const { email, otpCode } = req.body;

    const find_user = await userModel.findOne({ email });
    // console.log(find_user); // email posted on /verify-otp matched that if email exist in db 
    

    if (!find_user) {
      return res.status(403).json({
        message: "Invalid OTP..",
        status: false,
      });
    }

    const find_otp_user = await otp_verification_model.findOne({
      user_id: find_user._id,
      otpCode,
    });

    if (!find_otp_user) {
      res.status(403).json({
        message: "Invalid OTP..",
        status: false,
      });
      return;
    }

   

    res
      .status(200)
      .json({ message: "OTP verified successfully..", status: true });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      status: false,
    });
  }
};
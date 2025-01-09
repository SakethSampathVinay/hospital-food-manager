import jwt from "jsonwebtoken";

const authHospitalPantry = async (request, response, next) => {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return response
        .status(401)
        .json({ success: false, message: "Not Authorized. Login again." });
    }
    const token = authHeader.split(" ")[1];
    console.log(token);
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // Validate the token content (decoded payload)
    if (!token_decode || token_decode.email !== process.env.HOSPITAL_PANTRY) {
      return response
        .status(401)
        .json({ success: false, message: "Invalid token" });
    }
    next();
  } catch (error) {
    console.log(error);
    return response
      .status(401)
      .json({ success: false, message: "Unauthorized" });
  }
};

export default authHospitalPantry;

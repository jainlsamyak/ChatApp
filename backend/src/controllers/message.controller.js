import User from "../models/user.model.js";
import Messsage from "../models/message.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in get user list", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async () => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await Messsage.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },

        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessage controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendMessage = async (res, req) => {
  try {
    const { text, image } = req.body;
    const myId = req.user._id;
    const { id: receiverId } = req.params;

    let imageURL;
    if (image) {
      // upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageURL = uploadResponse.secure_url;
    }

    const newMessage = new Messsage({
      senderId,
      receiverId,
      text,
      image: imageURL,
    });
    await newMessage.save();
    res.status(201).json(newMessage);
    // realtime functionality goes here=>socket.io
  } catch (error) {
    console.log("Error in sendMEssage controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

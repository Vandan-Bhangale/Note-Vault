const User = require("../model/userModel");
const Note = require("../model/noteModel");

   exports.postLogin = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const existingUser = await User.findOne({ email });

            if (!existingUser) {
                return res.status(404).json({ message: "User not found" });
            }
            if (existingUser.password !== password) {
                return res.status(401).json({ message: "Incorrect password" });
            }

            // ✅ Store user in session
            req.session.user = {
                id: existingUser._id.toString(),
                email: existingUser.email
            };
            req.session.isLoggedIn = true;

            req.session.save(err => {
                if(err) {
                    console.log("Error while saving session: ",err);
                    return res.status(500).json({message: "Error while saving session"});
                } else {
                    console.log("Session saved successfully");
                    return res.status(200).json({message: "Login successful",
                        user: {id: existingUser._id.toString(), email: existingUser.email}
                    });
                }
            })
        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
};

exports.getStatus = (req,res,next) => {
    const user = req.session.user;
    if(user) {
        return res.status(200).json({isLoggedIn: true, user});
    }
    res.status(200).json({isLoggedIn: false});
}

exports.postLogout = (req,res) => {
    req.session.destroy(err => {
        if(err) {
            return res.status(500).json({ message: "Logout error" });
        }
        res.clearCookie('sessionId');
    res.status(200).json({message : "Logout successfull"});
    });
    
}

exports.postRegister = async(req,res,next) => {
    try {
        const {name,email,password} = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = await User.create({name,email,password});
        res.status(200).json(newUser);
        res.redirect("/Login");
    } catch(err) {
        res.status(400).json({ errors: err.message});
    }
};

exports.postNote = async (req,res) => {
    if(!req.session.user) {
        return res.status(401).json({message:"Not logged in"});
    }

    try {
        const {title,description,tags} = req.body;
        const newNote = await Note.create({
            title,
            description,
            tags,
            userId:req.session.user.id
        });
        res.status(200).json(newNote);
    } catch (error) {
        res.status(400).json({errors:error.message});
    }
}

exports.getNotes = async (req,res) => {
    try {
        if(!req.session.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const notes = await Note.find({userId:req.session.user.id}); 
        res.json(notes)
    } catch (error) {
        res.status(400).json({error:err.message});
    }
}

exports.deleteNote = async (req,res) => {
    try {
        if(!req.session.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const deleteId = await Note.findOneAndDelete({_id: req.params.id,userId:req.session.user.id});

        if(!deleteId) {
            res.status(400).json("Note not found");
        } else {
            res.status(200).json("Note deleted successfully.");
        }
    } catch (error) {
        res.status(400).json({message:"Error while deleting the note.",error:error.message});
    }
}

exports.getNoteById = async (req,res) => {
    try {
        if(!req.session.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const note = await Note.findOne({_id: req.params.id,userId:req.session.user.id});

        if(!note) {
            res.status(400).json("Note not found");
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(400).json("Error while fetching the note: ",{errors:error.message});
    }
}

exports.updateNote = async (req,res) => {
    try {
        if(!req.session.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const {title,description} = req.body;
        const updatedNote = await Note.findOneAndUpdate({_id: req.params.id,userId:req.session.user.id},{title,description},{new:true});

         if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({
        message: "Error while updating the note",
        error: error.message,
        });
    }
}


// exports.postLogout = (req,res,next) => {
//     req.session.destroy(err => {
//     if (err) return res.status(500).send("Logout failed");
//     res.clearCookie('connect.sid');
//     res.send("Logged out");
//   });
// }

// exports.checkAuth = (req,res,next) => {
//      if (req.session.user) {
//     res.json({ isLoggedIn: true, user: req.session.user });
//   } else {
//     res.json({ isLoggedIn: false });
//   }
// }
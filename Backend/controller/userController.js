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

            // ✅ Set cookie
            res.cookie('isLoggedIn', 'true', {
                httpOnly: false,        // allows frontend access (just for demo purposes)
                maxAge: 24 * 60 * 60 * 1000,  // 1 day
            });
            res.status(200).json({ message: "Login successful", user: existingUser });
        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
};

exports.postLogout = (req,res) => {
    res.clearCookie('isLoggedin');
    res.status(200).json({message : "Logout successfull"});
}

exports.postRegister = async(req,res,next) => {
    try {
        const {name,email,password} = req.body;
        const newUser = await User.create({name,email,password});
        res.status(200).json(newUser);
        res.redirect("/Login");
    } catch(err) {
        res.status(400).json({ errors: err.message});
    }
};

exports.postNote = async (req,res) => {
    try {
        const {title,description,tags} = req.body;
        const newNote = await Note.create({title,description,tags});
        res.status(200).json(newNote);
    } catch (error) {
        res.status(400).json({errors:err.message});
    }
}

exports.getNotes = async (req,res) => {
    try {
        const notes = await Note.find(); 
        res.json(notes)
    } catch (error) {
        res.status(400).json({error:err.message});
    }
}

exports.deleteNote = async (req,res) => {
    try {
        const deleteId = await Note.findByIdAndDelete(req.params.id);
        if(!deleteId) {
            res.status(400).json("Note not found");
        } else {
            res.status(200).json("Note deleted successfully.");
        }
    } catch (error) {
        res.status(400).json("Error while deleting the note.",{error:error.message});
    }
}

exports.getNoteById = async (req,res) => {
    try {
        const note = await Note.findById(req.params.id);
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
        const {title,description} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title,description},{new:true});
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
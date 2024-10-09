import Text from "../model/text.model.js";

export const CreateText=async (req, res)=>{
    const text = new Text({
        text: req.body.text,
        author: req.body.author,
        image: req.body.image
    });
    try {
        const newText = await text.save();
        res.status(201).json({message:"Texts saved successfully", text:newText})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
};

export const GetTexts=async (req, res)=>{
    try {
        const text = await Text.find();
        res.status(201).json({message:"Texts found", text:text}); 
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
}

export const UpdateText = async(req, res)=>{
    try {
        const text = await Text.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!text) {
            return res.status(404).json({message:"Text not found"});
        }
        res.status(200).json({message:"Text updated successfully", text:text});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
}

export const DeleteText = async(req, res)=>{
    try {
        const text = await Text.findByIdAndDelete(req.params.id);
        if(!text) {
            return res.status(404).json({message:"Text not found"});
        }
        res.status(200).json({message:"Text deleted successfully", text:text});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
}
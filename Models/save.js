
import mongoose, { trusted } from "mongoose";

const schema = mongoose.Schema;

const SaveSchema = new schema({

    name: {
        type: String,
        required: true,
    
    },

    size: {
        type: Object,
        required: true
    },
    droppedElements: [{
        type: Object,
        required: true
    }],
    bgColor: {
        type: String,
        default: "#ffffff"
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

export const saveModel = mongoose.model("projects", SaveSchema);
SaveSchema.index({ name: 1, user: 1 }, { unique: true });


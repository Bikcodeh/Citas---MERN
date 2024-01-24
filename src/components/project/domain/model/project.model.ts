import mongoose from "mongoose";
import { IProjectDocument } from "../interface";

const projectSchema = new mongoose.Schema<IProjectDocument>({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    deadline: {
        type: Date,
        default: Date.now()
    },
    client: {
        type: String,
        trim: true,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    collaborators: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, {
    timestamps: true
});

const Project = mongoose.model<IProjectDocument>('Project', projectSchema);
export default Project;
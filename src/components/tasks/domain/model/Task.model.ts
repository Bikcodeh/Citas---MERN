import mongoose from "mongoose";
import { Priority } from './../interface/index';
import { ITaskDocument } from "../interface";

const taskSchema = new mongoose.Schema<ITaskDocument>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    deadline: {
        type: Date,
        required: true,
        default: Date.now()
    },
    priority: {
        type: String,
        required: true,
        enum: Object.values(Priority)
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }
}, {
    timestamps: true
});

const TaskModel = mongoose.model('Task', taskSchema);
export default TaskModel;
import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    enum: ['To Do', 'In Progress', 'Under Review', 'Done'],
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'Urgent'],
  },
  deadline: {
    type: Date,
  },
  user: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema)
export default Task;
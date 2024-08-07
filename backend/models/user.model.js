import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'rather not say'],
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'teacher'],
    required: true
  },
  avatar: {
    type: String,
    default: ""
  },
  course: {
    type: String,
    required: function() { return this.role === 'student'; },
    enum: [
      'Graphics Designing',
      'Web and App Development',
      'Tecno Kids',
      'UI UX Designing',
      'Generative AI & Chatbox',
      'Digital Marketing',
      'Amazon Mastery'
    ]
  },
  batch: {
    type: String,
    required: function() { return this.role === 'student'; },
    enum: [
      'Batch 11',
      'Batch 12',
      'Batch 13',
      'Batch 14',
      'Batch 15',
      'Batch 16',
      'Batch 17'
    ]
  },
  courses: {
    type: [String],
    required: function() { return this.role === 'teacher'; },
    enum: [
      'Graphics Designing',
      'Web and App Development',
      'Tecno Kids',
      'UI UX Designing',
      'Generative AI & Chatbox',
      'Digital Marketing',
      'Amazon Mastery'
    ]
  },
  batches: {
    type: [String],
    required: function() { return this.role === 'teacher'; },
    enum: [
      'Batch 11',
      'Batch 12',
      'Batch 13',
      'Batch 14',
      'Batch 15',
      'Batch 16',
      'Batch 17'
    ]
  },
  // Uncomment if using the teacher field
  // teacher: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: function() { return this.role === 'student'; },
  //   default: null
  // },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
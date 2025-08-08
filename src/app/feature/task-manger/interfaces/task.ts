export interface Task {
  id: number;
  name: string;
  userId: number;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date;
  priority: string;
}

 interface Task {
  id: number;
  text: string;
  checked: boolean;
};

 interface User {
  login: string;
  password: string;
  tasks: Task[];
};

export {Task, User}
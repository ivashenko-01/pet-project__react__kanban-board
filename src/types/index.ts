export type Task_T = {
    id: string;
    title: string;
};

export type Column_T = {
    id: string;
    title: string;
    tasks: Task_T[];
};

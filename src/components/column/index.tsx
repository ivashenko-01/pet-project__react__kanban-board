import './index.css';

import { Task } from '../index';

import { Column_T } from '../../types';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';

import { RiMenu5Fill } from 'react-icons/ri';

export function Column({ column }: { column: Column_T }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: column.id,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };
    return (
        <>
            <li ref={setNodeRef} style={style} className="column">
                <div className="column-wrapper">
                    <div className="column-header-wrapper">
                        <div className="column-header">
                            <span className="column-holder" {...attributes} {...listeners}>
                                <RiMenu5Fill />
                            </span>
                            <span>{column.title}</span>
                        </div>
                        <div className="column-field__add-task">
                            <input type="text" placeholder="Добавить задачу" />
                        </div>
                    </div>
                    <SortableContext items={column.tasks} strategy={verticalListSortingStrategy}>
                        <div className="tasks">
                            {column.tasks.map((task) => (
                                <Task key={task.id} task={task} />
                            ))}
                        </div>
                    </SortableContext>
                </div>
            </li>
        </>
    );
}

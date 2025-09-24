import React from 'react';

import './index.css';
import { Task_T } from '../../types';

import { useSortable } from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';

export function Task({ task }: { task: Task_T }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: task.id,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    return (
        <>
            <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="task">
                {task.title}
            </div>
        </>
    );
}

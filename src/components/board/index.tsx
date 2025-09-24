import { useState } from 'react';

import './index.css';

import { Column } from '../index';

import { DATA } from '../../data';
import { closestCenter, DndContext } from '@dnd-kit/core';
import {
    arrayMove,
    horizontalListSortingStrategy,
    SortableContext,
    // verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { DragEndEvent } from '@dnd-kit/core';

export function Board() {
    const [columns, setColumns] = useState(DATA);

    const [inputValue, setInputValue] = useState('');

    const addColumn = () => {
        const newColumn = {
            id: String(Math.random()),
            title: inputValue,
            tasks: [],
        };
        setColumns((columns) => [...columns, newColumn]);
    };

    const onDragEnd = (event: DragEndEvent) => {
        // console.log('onDragEnd', event);
        const { active, over } = event;

        if (!over) {
            return;
        }
        if (active.id === over.id) {
            return;
        }

        if (active.data.current?.sortable.containerId === over.data.current?.sortable.containerId) {
            // Перетаскиваем задачи внутри одной колонки
            const sourceColumn = columns.find((col) => col.id === active.data.current?.sortable.containerId);
            const destinationColumn = columns.find((col) => col.id === over.data.current?.sortable.containerId);

            if (sourceColumn && destinationColumn) {
                const oldIndex = sourceColumn.tasks.findIndex((task) => task.id === active.id);
                const newIndex = destinationColumn.tasks.findIndex((task) => task.id === over.id);

                const updatedTasks = arrayMove(sourceColumn.tasks, oldIndex, newIndex);
                const updatedSourceColumn = {
                    ...sourceColumn,
                    tasks: updatedTasks,
                };

                setColumns((cols) => cols.map((col) => (col.id === sourceColumn.id ? updatedSourceColumn : col)));
            }
        }
        // setColumns((columns) => {
        //     const oldIndex = columns.findIndex((column) => column.id === active.id);
        //     const newIndex = columns.findIndex((column) => column.id === over?.id);
        //     return arrayMove(columns, oldIndex, newIndex);
        // });
    };
    return (
        <>
            <div className="board">
                <div className="board__total-column">Всего колонок: {columns.length}</div>
                <div className="field-add-column">
                    <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                    <button onClick={addColumn}>Добавить колонку</button>
                </div>
                <DndContext onDragEnd={onDragEnd} collisionDetection={closestCenter}>
                    <SortableContext items={columns} strategy={horizontalListSortingStrategy}>
                        <ul className="columns">
                            {columns.map((column) => (
                                <Column key={column.id} column={column} />
                            ))}
                        </ul>
                    </SortableContext>
                </DndContext>
            </div>
        </>
    );
}

import React from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { CheckCircle2, Circle, Clock, AlertTriangle } from 'lucide-react';

const tasks = [
  { id: 't1', title: 'Clean Sunset Villa', property: 'Sunset Villa', assignee: 'Maria G.', status: 'open', priority: 'high', due: 'Today, 2:00 PM' },
  { id: 't2', title: 'Fix AC', property: 'Downtown Loft', assignee: 'John T.', status: 'in_progress', priority: 'critical', due: 'Overdue' },
  { id: 't3', title: 'Routine Inspection', property: 'Mountain Cabin', assignee: 'Unassigned', status: 'open', priority: 'normal', due: 'Tomorrow' },
  { id: 't4', title: 'Restock Supplies', property: 'Seaside Condo', assignee: 'Maria G.', status: 'done', priority: 'low', due: 'Yesterday' },
];

export default function TasksList() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Tasks</h1>
                <p className="text-gray-500 mt-1">Manage cleaning and maintenance operations.</p>
            </div>
            <Button>Create Task</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
             {/* To Do Column */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                        <Circle className="h-4 w-4" /> To Do
                    </h3>
                    <Badge variant="secondary">{tasks.filter(t => t.status === 'open').length}</Badge>
                </div>
                {tasks.filter(t => t.status === 'open').map(task => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>

             {/* In Progress Column */}
             <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-blue-700 flex items-center gap-2">
                        <Clock className="h-4 w-4" /> In Progress
                    </h3>
                    <Badge variant="secondary">{tasks.filter(t => t.status === 'in_progress').length}</Badge>
                </div>
                {tasks.filter(t => t.status === 'in_progress').map(task => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>

            {/* Done Column */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-green-700 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" /> Done
                    </h3>
                    <Badge variant="secondary">{tasks.filter(t => t.status === 'done').length}</Badge>
                </div>
                {tasks.filter(t => t.status === 'done').map(task => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function TaskCard({ task }: { task: any }) {
    return (
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                    <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded">{task.property}</span>
                    {task.priority === 'critical' && <AlertTriangle className="h-4 w-4 text-red-500" />}
                </div>
                <div>
                    <h4 className="font-medium text-gray-900 leading-tight">{task.title}</h4>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                        <div className="h-5 w-5 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-[10px]">
                            {task.assignee === 'Unassigned' ? '?' : task.assignee.charAt(0)}
                        </div>
                        <span>{task.assignee}</span>
                    </div>
                    <span className={task.due === 'Overdue' ? 'text-red-600 font-medium' : ''}>{task.due}</span>
                </div>
            </CardContent>
        </Card>
    )
}

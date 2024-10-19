"use server";

import prisma from "@/lib/prisma";
import { ProjectState, TaskPriority, TaskState } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { ProjectForm } from "../admin/projects/newProject";
import { TaskForm } from "../admin/projects/newTaskButton";

export async function updateProjectState(id: string, state: ProjectState) {
    try {
        await prisma.workingProject.update({
            where: {
                id: id,
            },
            data: {
                state: state,
            },
        });
        return Promise.resolve();
    } catch (error: any) {
        return Promise.reject(new Error(error));
    } finally {
        revalidatePath("/dashboard/projects");
    }
}

export async function addNewProject(data: ProjectForm) {
    try {
        await prisma.workingProject.create({
            data: {
                name: data.name,
                dateDue: data.dateDue,
                client: {
                    connect: {
                        id: data.clientId,
                    },
                },
            },
        });
        return Promise.resolve();
    } catch (error: any) {
        return Promise.reject(new Error(error));
    } finally {
        revalidatePath("/dashboard/projects");
    }
}

export async function updateDueDate(id: string, dueDate: Date) {
    try {
        await prisma.workingProject.update({
            where: {
                id: id,
            },
            data: {
                dateDue: dueDate,
            },
        });
        return Promise.resolve();
    } catch (error: any) {
        return Promise.reject(new Error(error));
    } finally {
        revalidatePath("/dashboard/projects");
    }
}

export async function deleteProject(id: string) {
    try {
        await prisma.projectTask.deleteMany({
            where: {
                projectId: id,
            },
        });

        await prisma.workingProject.delete({
            where: {
                id: id,
            },
        });

        return Promise.resolve();
    } catch (error: any) {
        return Promise.reject(new Error(error));
    } finally {
        revalidatePath("/dashboard/projects");
    }
}

export async function updateTaskState(id: string, state: TaskState) {
    try {
        await prisma.projectTask.update({
            where: {
                id: id,
            },
            data: {
                status: state,
            },
        });
        return Promise.resolve();
    } catch (error: any) {
        return Promise.reject(new Error(error));
    } finally {
        revalidatePath("/dashboard/projects");
    }
}

export async function addNewTask(data: TaskForm) {
    try {
        await prisma.projectTask.create({
            data: {
                description: data.description,
                priority: data.priority,
                project: {
                    connect: {
                        id: data.projectId,
                    },
                },
            },
        });
        return Promise.resolve();
    } catch (error: any) {
        return Promise.reject(new Error(error));
    } finally {
        revalidatePath("/dashboard/projects");
    }
}

export async function deleteTask(id: string) {
    try {
        await prisma.projectTask.delete({
            where: {
                id: id,
            },
        });
        return Promise.resolve();
    } catch (error: any) {
        return Promise.reject(new Error(error));
    } finally {
        revalidatePath("/dashboard/projects");
    }
}

export async function updateTaskPriority(id: string, priority: TaskPriority) {
    try {
        await prisma.projectTask.update({
            where: {
                id: id,
            },
            data: {
                priority: priority,
            },
        });
        return Promise.resolve();
    } catch (error: any) {
        return Promise.reject(new Error(error));
    } finally {
        revalidatePath("/dashboard/projects");
    }
}

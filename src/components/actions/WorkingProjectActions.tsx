"use server";

import prisma from "@/lib/prisma";
import { ProjectState, TaskPriority, TaskState } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { ProjectForm } from "../admin/projects/newProject";
import { TaskForm } from "../admin/projects/newTaskButton";

export async function UpdateProjectState(id: string, state: ProjectState) {
    try {
        await prisma.workingProject.update({
            where: {
                id: id,
            },
            data: {
                state: state,
            },
        });
        return Promise.resolve({ status: 200, message: "success" });
    } catch (err: any) {
        return Promise.resolve({ status: 201, message: err });
    } finally {
        revalidatePath("/dashboard/projects");
    }
}

export async function AddNewProject(data: ProjectForm) {
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
        return Promise.resolve({ status: 200, message: "success" });
    } catch (err: any) {
        return Promise.resolve({ status: 201, message: err });
    } finally {
        revalidatePath("/dashboard/projects");
    }
}

export async function UpdateDueDate(id: string, dueDate: Date) {
    try {
        await prisma.workingProject.update({
            where: {
                id: id,
            },
            data: {
                dateDue: dueDate,
            },
        });
        return Promise.resolve({ status: 200, message: "success" });
    } catch (err: any) {
        return Promise.resolve({ status: 201, message: err });
    } finally {
        revalidatePath("/dashboard/projects");
    }
}

export async function DeleteProject(id: string) {
    try {
        await prisma.projectTask.deleteMany({
            where: {
                projectId: id,
            },
        });
    } catch (err: any) {
        return Promise.resolve({ status: 201, message: err });
    } finally {
        try {
            await prisma.workingProject.delete({
                where: {
                    id: id,
                },
            });
            return Promise.resolve({ status: 200, message: "success" });
        } catch (err: any) {
            return Promise.resolve({ status: 201, message: err });
        }
    }
}

export async function UpdateTaskState(id: string, state: TaskState) {
    try {
        await prisma.projectTask.update({
            where: {
                id: id,
            },
            data: {
                status: state,
            },
        });
        return Promise.resolve({ status: 200, message: "success" });
    } catch (err: any) {
        return Promise.resolve({ status: 201, message: err });
    } finally {
        revalidatePath("/dashboard/projects");
    }
}

export async function AddNewTask(data: TaskForm) {
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
        return Promise.resolve({ status: 200, message: "success" });
    } catch (err: any) {
        return Promise.resolve({ status: 201, message: err });
    } finally {
        revalidatePath("/dashboard/projects");
    }
}

export async function DeleteTask(id: string) {
    try {
        await prisma.projectTask.delete({
            where: {
                id: id,
            },
        });
        return Promise.resolve({ status: 200, message: "success" });
    } catch (err: any) {
        return Promise.resolve({ status: 201, message: err });
    } finally {
        revalidatePath("/dashboard/projects");
    }
}

export async function UpdateTaskPriority(id: string, priority: TaskPriority) {
    try {
        await prisma.projectTask.update({
            where: {
                id: id,
            },
            data: {
                priority: priority,
            },
        });
        return Promise.resolve({ status: 200, message: "success" });
    } catch (err: any) {
        return Promise.resolve({ status: 201, message: err });
    } finally {
        revalidatePath("/dashboard/projects");
    }
}

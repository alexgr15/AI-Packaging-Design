const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create or Update a project
exports.saveProject = async (req, res) => {
    try {
        const { id, name, data } = req.body;
        const userId = req.userId; // From authMiddleware

        if (!name || !data) {
            return res.status(400).json({ error: 'Name and data are required' });
        }

        let project;

        if (id) {
            // Update existing project
            // Verify ownership
            const existing = await prisma.project.findUnique({ where: { id: parseInt(id) } });

            if (!existing) {
                return res.status(404).json({ error: 'Project not found' });
            }

            if (existing.userId !== userId) {
                return res.status(403).json({ error: 'Not authorized to update this project' });
            }

            project = await prisma.project.update({
                where: { id: parseInt(id) },
                data: { name, data, updatedAt: new Date() }
            });
        } else {
            // Create new project
            project = await prisma.project.create({
                data: {
                    name,
                    data,
                    userId
                }
            });
        }

        res.json(project);
    } catch (error) {
        console.error('Save Project Error:', error);
        res.status(500).json({ error: 'Failed to save project' });
    }
};

// Get all projects for current user
exports.getUserProjects = async (req, res) => {
    try {
        const userId = req.userId;
        const projects = await prisma.project.findMany({
            where: { userId },
            orderBy: { updatedAt: 'desc' },
            select: { id: true, name: true, createdAt: true, updatedAt: true } // Don't fetch heavy JSON data for list
        });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
};

// Get single project
exports.getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const project = await prisma.project.findFirst({
            where: {
                id: parseInt(id),
                userId
            }
        });

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.json(project);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch project' });
    }
};

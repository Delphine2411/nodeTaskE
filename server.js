const express = require("express");
const app = express();

const PORT = 8080;

// Middleware
app.use(express.json()) ;

// Stockage en mémoire
let tasks = [];
let idUser = 1;

// Création d'une tâche
app.post("/tasks", (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: "Ajouter une nouvelle tâche" });
    }
    const newTask = { id: idUser++, title };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Lire la liste des tâches
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// Lire une tâche spécifique
app.get("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(task => task.id === id);
    if (!task) {
        return res.status(404).json({ error: "Tâche non trouvée" });
    }
    res.json(task);
});

// Modifier une tâche
app.put("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const index = tasks.findIndex(task => task.id === taskId);

    if (index === -1) {
        return res.status(404).json({ error: "Tâche non trouvée" });
    }
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: "Ajouter une nouvelle tâche" });
    }
    tasks[index].title = title;
    res.json(tasks[index]);
});

// Supprimer une tâche
app.delete("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== id);
    res.json({ message: "Tâche supprimée" });
});

// Lancer le serveur
app.listen(PORT, () => console.log(`API disponible sur http://localhost:${PORT}`));
